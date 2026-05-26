'use server'

import { stripe } from '@/app/lib/stripe'
import prisma from '@/prisma/client'
import { createLog } from './createLog'

export async function savePaymentMethod(userId: string, paymentMethodId: string, isDefault: boolean = false) {
  try {
    // 1. Get the user's Stripe customer ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true }
    })

    if (!user?.stripeCustomerId) {
      return { success: false, error: 'Customer not found.' }
    }

    // 2. Attach the PaymentMethod to the customer on Stripe's side.
    //    This is what makes the card actually reusable for future charges.
    //    If it's already attached (e.g. user retried, webhook ran twice),
    //    Stripe throws — we treat that as success and continue.
    try {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: user.stripeCustomerId
      })
    } catch (err) {
      const isAlreadyAttached =
        err instanceof Error && 'code' in err && (err as { code?: string }).code === 'resource_already_exists'

      if (!isAlreadyAttached) throw err
    }

    // 3. Retrieve the (now-attached) PaymentMethod for its card details
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)

    // 4. If this card should be the default, update Stripe and your DB
    if (isDefault) {
      // Tell Stripe — used when Stripe charges future subscriptions
      await stripe.customers.update(user.stripeCustomerId, {
        invoice_settings: { default_payment_method: paymentMethodId }
      })

      // Mirror it in your DB
      await prisma.paymentMethod.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false }
      })
    }

    // 5. Save (or update) the row in your DB
    await prisma.paymentMethod.upsert({
      where: { stripePaymentId: paymentMethodId },
      update: { isDefault },
      create: {
        stripePaymentId: paymentMethodId,
        cardBrand: paymentMethod.card?.brand || 'unknown',
        cardLast4: paymentMethod.card?.last4 || '0000',
        cardExpMonth: paymentMethod.card?.exp_month || 0,
        cardExpYear: paymentMethod.card?.exp_year || 0,
        cardholderName: paymentMethod.billing_details?.name ?? null,
        isDefault,
        userId
      }
    })

    return { success: true }
  } catch (error) {
    await createLog('error', 'Failed to save payment method', {
      userId,
      paymentMethodId,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return {
      success: false,
      error: 'Failed to save payment method. Please try again.'
    }
  }
}
