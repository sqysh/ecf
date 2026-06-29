import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import Stripe from 'stripe'
import { createLog } from '@/app/lib/actions/createLog'
import { stripe } from '@/app/lib/stripe'
import { pusher } from '@/app/lib/pusher'
import sendConfirmationEmail from '@/app/lib/utils/email.utils'
import { savePaymentMethod } from '@/app/lib/actions/savePaymentMethod'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    await createLog('error', 'Webhook signature verification failed', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type as string) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Skip if this is part of a subscription
        if ((paymentIntent as any).invoice) {
          break
        }

        await handlePaymentIntentSucceeded(paymentIntent)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_method.attached':
        await handlePaymentMethodAttached(event.data.object as Stripe.PaymentMethod)
        break

      case 'payment_method.detached':
        await handlePaymentMethodDetached(event.data.object as Stripe.PaymentMethod)
        break

      case 'payment_method.updated':
        await handlePaymentMethodUpdated(event.data.object as Stripe.PaymentMethod)
        break

      case 'customer.subscription.created':
        const newSub = event.data.object as Stripe.Subscription

        // Fetch the full subscription
        const fullSub = await stripe.subscriptions.retrieve(newSub.id)

        if (fullSub.status === 'incomplete') {
          break
        }
        if (fullSub.status === 'active') {
          await handleSubscriptionCreated(fullSub)
        }
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        const updatedSub = event.data.object as Stripe.Subscription

        // Handle status changes that affect the order
        const statusesToHandle = ['active', 'past_due', 'canceled', 'unpaid', 'incomplete']

        if (statusesToHandle.includes(updatedSub.status)) {
          await handleSubscriptionUpdated(updatedSub)
        }
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      default:
        await createLog('info', 'Unhandled webhook event', {
          eventType: event.type,
          eventId: event.id
        })
        break
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    await createLog('error', 'Webhook handler failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })

    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const { id, amount, metadata } = paymentIntent

  try {
    if (!metadata?.orderType) return

    const existingOrder = await prisma.order.findFirst({
      where: { paymentIntentId: id }
    })
    if (existingOrder) return

    const orderType = (metadata?.orderType as 'ONE_TIME_DONATION' | 'RECURRING_DONATION') || 'ONE_TIME_DONATION'

    const userId = metadata.userId || null

    const order = await prisma.order.create({
      data: {
        type: orderType,
        status: 'CONFIRMED',
        totalAmount: amount / 100,
        paymentMethod: 'stripe',
        paymentIntentId: id,
        customerEmail: (metadata?.email as string) || '',
        customerName: (metadata?.name as string) || '',
        userId,
        paidAt: new Date(),
        coverFees: metadata.coverFees === 'true',
        feesCovered: parseFloat(metadata.feesCovered || '0'),
        isRecurring: metadata.donationType === 'monthly' || metadata.donationType === 'yearly',
        recurringFrequency:
          metadata.donationType === 'monthly' ? 'monthly' : metadata.donationType === 'yearly' ? 'yearly' : null,
        paymentMethodId: (paymentIntent.payment_method as string) || null
      }
    })

    // ── Save card if requested ─────────────────────────────────────────────
    // Done here (server-side, in the webhook) rather than from the client so
    // it doesn't depend on the user staying on the page after redirect.
    if (metadata.saveCard === 'true' && userId && paymentIntent.payment_method) {
      const saveResult = await savePaymentMethod(
        userId,
        paymentIntent.payment_method as string,
        true // mark as default
      )

      if (!saveResult.success) {
        await createLog('error', 'Order created but card save failed', {
          orderId: order.id,
          userId,
          paymentIntentId: id,
          error: saveResult.error
        })
        // Don't fail the whole webhook — the order succeeded, that's the
        // important thing. The user can re-save the card from the portal.
      }
    }

    // Send confirmation email
    await sendConfirmationEmail(order, orderType, amount)

    // Push to Pusher
    const channelId = userId || `guest-${paymentIntent.id}`
    await pusher.trigger(`payment-${channelId}`, 'order-created', {
      orderId: order.id,
      amount: order.totalAmount,
      status: order.status,
      type: order.type,
      createdAt: order.createdAt
    })

    await createLog('info', 'Order created from payment intent', {
      orderId: order.id,
      userId,
      type: orderType,
      paymentIntentId: id,
      amount: amount / 100,
      cardSaved: metadata.saveCard === 'true'
    })
  } catch (error) {
    await createLog('error', 'Failed to create order from payment intent', {
      error: error instanceof Error ? error.message : 'Unknown error',
      amount: amount / 100,
      paymentIntentId: id
    })
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const { id, last_payment_error, metadata } = paymentIntent

  try {
    const orderType = (metadata?.orderType as 'ONE_TIME_DONATION' | 'RECURRING_DONATION') || 'ONE_TIME_DONATION'
    const userId = metadata?.userId && metadata.userId !== 'guest' ? metadata.userId : null

    const order = await prisma.order.create({
      data: {
        type: orderType,
        status: 'FAILED',
        totalAmount: paymentIntent.amount / 100,
        paymentMethod: 'stripe',
        paymentIntentId: id,
        customerEmail: (metadata?.email as string) || '',
        customerName: (metadata?.name as string) || 'Guest',
        userId,
        failureReason: last_payment_error?.message || 'Payment failed',
        failureCode: last_payment_error?.code || null
      }
    })

    // Push to same channel as successful orders
    const channelId = userId || `guest-${paymentIntent.id}`
    await pusher.trigger(`payment-${channelId}`, 'order-failed', {
      orderId: order.id,
      error: last_payment_error?.message || 'Payment failed',
      type: orderType
    })

    await createLog('error', 'Payment failed from Stripe webhook', {
      orderId: order.id,
      userId,
      type: orderType,
      paymentIntentId: id,
      failureReason: last_payment_error?.message,
      failureCode: last_payment_error?.code
    })
  } catch (error) {
    await createLog('error', 'Error handling payment failure', {
      error: error instanceof Error ? error.message : 'Unknown error',
      paymentIntentId: id
    })
  }
}

async function handlePaymentMethodAttached(paymentMethod: Stripe.PaymentMethod) {
  try {
    const customerId = typeof paymentMethod.customer === 'string' ? paymentMethod.customer : paymentMethod.customer?.id

    if (!customerId) return

    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId }
    })

    if (!user) return

    // Set all existing cards to non-default
    await prisma.paymentMethod.updateMany({
      where: { userId: user.id },
      data: { isDefault: false }
    })

    // Upsert — create if new, update if already exists
    await prisma.paymentMethod.upsert({
      where: { stripePaymentId: paymentMethod.id },
      update: { isDefault: true },
      create: {
        stripePaymentId: paymentMethod.id,
        cardholderName: paymentMethod.billing_details?.name || 'Unknown',
        cardBrand: paymentMethod.card?.brand || 'unknown',
        cardLast4: paymentMethod.card?.last4 || '0000',
        cardExpMonth: paymentMethod.card?.exp_month || 0,
        cardExpYear: paymentMethod.card?.exp_year || 0,
        isDefault: true,
        userId: user.id
      }
    })

    await createLog('info', 'Payment method attached via webhook', {
      paymentMethodId: paymentMethod.id,
      userId: user.id
    })
  } catch (error) {
    await createLog('error', 'Error handling payment method attached', {
      error: error instanceof Error ? error.message : 'Unknown error',
      paymentMethodId: paymentMethod.id
    })
  }
}

async function handlePaymentMethodDetached(paymentMethod: Stripe.PaymentMethod) {
  try {
    await prisma.paymentMethod.deleteMany({
      where: { stripePaymentId: paymentMethod.id }
    })

    await createLog('info', 'Payment method detached', {
      paymentMethodId: paymentMethod.id
    })
  } catch (error) {
    await createLog('error', 'Error handling payment method detach', {
      paymentMethodId: paymentMethod.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function handlePaymentMethodUpdated(paymentMethod: Stripe.PaymentMethod) {
  try {
    if (!paymentMethod.customer) return

    await prisma.paymentMethod.update({
      where: { stripePaymentId: paymentMethod.id },
      data: {
        cardBrand: paymentMethod.card?.brand || 'unknown',
        cardLast4: paymentMethod.card?.last4 || '0000',
        cardExpMonth: paymentMethod.card?.exp_month || 0,
        cardExpYear: paymentMethod.card?.exp_year || 0
      }
    })

    await createLog('info', 'Payment method updated', {
      paymentMethodId: paymentMethod.id,
      customerId: typeof paymentMethod.customer === 'string' ? paymentMethod.customer : paymentMethod.customer?.id
    })
  } catch (error) {
    await createLog('error', 'Error updating payment method', {
      paymentMethodId: paymentMethod.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    await createLog('info', 'Stripe subscription created', {
      subscriptionId: subscription.id,
      customerId: subscription.customer,
      status: subscription.status,
      frequency: subscription.metadata?.frequency || 'monthly',
      amount: subscription.items.data[0]?.price.unit_amount || 0,
      customerEmail: subscription.metadata?.email,
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      createdAt: new Date(subscription.created * 1000)
    })
  } catch (error) {
    await createLog('error', 'Failed to log subscription creation', {
      subscriptionId: subscription.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const result = await prisma.order.updateMany({
      where: {
        stripeSubscriptionId: subscription.id,
        status: { in: ['PENDING', 'CONFIRMED'] }
      },
      data: { status: 'CANCELLED', nextBillingDate: null }
    })

    // Grab a row for the userId (for the Pusher notify)
    const order = await prisma.order.findFirst({
      where: { stripeSubscriptionId: subscription.id },
      orderBy: { createdAt: 'desc' }
    })

    await createLog('info', 'Recurring donation cancelled', {
      subscriptionId: subscription.id,
      rowsUpdated: result.count,
      userId: order?.userId
    })

    if (order?.userId) {
      await pusher.trigger(`user-${order.userId}`, 'subscription-cancelled', {
        subscriptionId: subscription.id
      })
    }
  } catch (error) {
    await createLog('error', 'Error cancelling recurring donation', {
      subscriptionId: subscription.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const nextBillingDate = (subscription as any).current_period_end
      ? new Date((subscription as any).current_period_end * 1000)
      : null

    // Update forward-looking field only — don't rewrite historical payment statuses.
    await prisma.order.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: { nextBillingDate }
    })

    const order = await prisma.order.findFirst({
      where: { stripeSubscriptionId: subscription.id },
      orderBy: { createdAt: 'desc' }
    })

    await createLog('info', 'Subscription updated', {
      subscriptionId: subscription.id,
      orderId: order?.id,
      status: subscription.status
    })

    if (order?.userId) {
      await pusher.trigger(`user-${order.userId}`, 'subscription-updated', {
        subscriptionId: subscription.id,
        status: subscription.status,
        nextBillingDate
      })
    }
  } catch (error) {
    await createLog('error', 'Error updating subscription', {
      subscriptionId: subscription.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const invoiceWithSub = invoice as any
    let subscriptionId: string | null = null
    if (invoiceWithSub.parent?.subscription_details?.subscription) {
      subscriptionId = invoiceWithSub.parent.subscription_details.subscription
    }
    if (!subscriptionId) return

    const isFirstPayment = invoice.billing_reason === 'subscription_create'

    // Idempotency: one row per invoice. Retries of the same invoice no-op.
    const existingOrder = await prisma.order.findUnique({
      where: { stripeInvoiceId: invoice.id }
    })
    if (existingOrder) return

    let paymentIntentId: string | null = null
    const invoicePayments = await stripe.invoicePayments.list({ invoice: invoice.id })
    const defaultPayment = invoicePayments.data.find((p) => p.is_default)
    if (defaultPayment?.payment?.type === 'payment_intent') {
      paymentIntentId =
        typeof defaultPayment.payment.payment_intent === 'string'
          ? defaultPayment.payment.payment_intent
          : (defaultPayment.payment.payment_intent as any)?.id || null
    }

    const subscription = (await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['default_payment_method']
    })) as Stripe.Subscription

    const userId = subscription.metadata?.userId || null
    const frequency = subscription.metadata?.frequency || 'monthly'
    const amount = invoice.amount_paid / 100
    const coverFees = subscription.metadata?.coverFees === 'true'
    const feesCovered = parseFloat(subscription.metadata?.feesCovered || '0')

    function getNextBillingDate(sub: any): Date {
      const f = sub.metadata?.frequency || 'monthly'
      const anchor = new Date(sub.billing_cycle_anchor * 1000)
      if (f === 'yearly') return new Date(anchor.setFullYear(anchor.getFullYear() + 1))
      return new Date(anchor.setMonth(anchor.getMonth() + 1))
    }

    const order = await prisma.order.create({
      data: {
        type: 'RECURRING_DONATION',
        status: 'CONFIRMED',
        totalAmount: amount,
        paymentMethod: 'stripe',
        customerEmail: subscription.metadata?.email || invoice.customer_email || '',
        customerName: subscription.metadata?.name || '',
        customerPhone: subscription.metadata?.phone || '',
        userId,
        stripeSubscriptionId: subscriptionId,
        stripeInvoiceId: invoice.id,
        paymentIntentId: paymentIntentId || null,
        paymentMethodId:
          typeof subscription.default_payment_method === 'string'
            ? subscription.default_payment_method
            : subscription.default_payment_method?.id || null,
        isRecurring: true,
        recurringFrequency: frequency,
        coverFees,
        feesCovered,
        paidAt: invoice.status_transitions?.paid_at ? new Date(invoice.status_transitions.paid_at * 1000) : new Date(),
        nextBillingDate: getNextBillingDate(subscription),
        billingAddress: {
          addressLine1: subscription.metadata?.addressLine1 || '',
          addressLine2: subscription.metadata?.addressLine2 || '',
          city: subscription.metadata?.city || '',
          state: subscription.metadata?.state || '',
          zipPostalCode: subscription.metadata?.zipPostalCode || '',
          country: subscription.metadata?.country || ''
        },
        notes: subscription.metadata?.notes || null
      }
    })

    await createLog('info', `Recurring donation ${isFirstPayment ? 'created' : 'renewed'}`, {
      orderId: order.id,
      subscriptionId,
      invoiceId: invoice.id,
      amount,
      isFirstPayment
    })

    if (isFirstPayment) {
      await sendConfirmationEmail(order, 'RECURRING_DONATION', amount * 100)
    }

    const channelId = `payment-${subscriptionId}`
    await pusher.trigger(channelId, 'order-created', {
      orderId: order.id,
      amount: order.totalAmount,
      status: order.status,
      type: order.type,
      frequency,
      coverFees,
      feesCovered,
      createdAt: order.createdAt
    })
  } catch (error) {
    await createLog('error', 'Error handling invoice payment', {
      invoiceId: invoice.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
