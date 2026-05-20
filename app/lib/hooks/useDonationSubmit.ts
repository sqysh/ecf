import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useSession } from 'next-auth/react'
import { createPaymentIntentForCheckout } from '../actions/createPaymentIntentForCheckout'
import { createSubscriptionWithSavedCard } from '../actions/createSubscriptionWithSavedCard'
import { createSetupIntentForSubscription } from '../actions/createSetupIntentForSubscription'
import { createSubscriptionAfterSetup } from '../actions/createSubscriptionAfterSetup'
import { usePaymentProcessor } from './usePaymentProcessor'
import { setDonateCheckoutForm as setForm } from '../utils/donate.utils'

export function useDonationSubmit({ inputs, finalAmount, feesCovered, usingSavedCard, fullName }: any) {
  const stripe = useStripe()
  const elements = useElements()
  const session = useSession()
  const userEmail = session.data?.user?.email
  const { setupPusherListenerOneTime, getPaymentMethodId, setupPusherListenerRecurring } = usePaymentProcessor()

  const pusherCallbacks = [
    (value: string) => setForm({ error: value }),
    (value: string) => setForm({ processingStatus: value }),
    () => setForm({ loading: false })
  ] as const

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    if (inputs.amount < 5) return setForm({ error: 'Minimum donation is $5' })
    setForm({ loading: true, error: null, processingStatus: 'processing' })

    try {
      if (inputs?.donationType === 'once') {
        await handleOneTimeDonation({
          stripe,
          elements,
          session,
          userEmail,
          inputs,
          finalAmount,
          feesCovered,
          usingSavedCard,
          fullName,
          pusherCallbacks,
          setupPusherListenerOneTime,
          getPaymentMethodId
        })
      } else {
        await handleRecurringDonation({
          stripe,
          elements,
          session,
          userEmail,
          inputs,
          finalAmount,
          feesCovered,
          usingSavedCard,
          fullName,
          pusherCallbacks,
          setupPusherListenerRecurring
        })
      }
    } catch (err) {
      setForm({
        loading: false,
        error: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        processingStatus: 'failed'
      })
    }
  }

  return { handleSubmit }
}

async function handleOneTimeDonation({
  stripe,
  elements,
  session,
  userEmail,
  inputs,
  finalAmount,
  feesCovered,
  usingSavedCard,
  fullName,
  pusherCallbacks,
  setupPusherListenerOneTime,
  getPaymentMethodId
}: any) {
  const intentResult = await createPaymentIntentForCheckout({
    userId: session?.data?.user?.id,
    name: fullName,
    email: userEmail,
    amount: finalAmount,
    orderType: 'ONE_TIME_DONATION',
    description: `One-time donation from ${fullName}`,
    saveCard: inputs?.saveCard,
    coverFees: inputs?.coverFees,
    feesCovered,
    savedCardId: usingSavedCard ? inputs?.selectedCardId : undefined
  })

  if (!intentResult.success) {
    throw new Error(intentResult.error || 'Failed to create payment intent')
  }

  if (usingSavedCard) {
    setupPusherListenerOneTime(false, inputs?.selectedCardId, inputs?.processingStatus, ...pusherCallbacks)
    return
  }

  const cardElement = elements.getElement(CardElement)
  if (!cardElement) throw new Error('Card element not found')

  const { error, paymentIntent } = await stripe.confirmCardPayment(intentResult.clientSecret!, {
    payment_method: { card: cardElement, billing_details: { name: fullName, email: userEmail } }
  })

  if (error) throw new Error(error.message || 'Payment failed')

  if (paymentIntent?.status === 'succeeded') {
    setupPusherListenerOneTime(
      inputs?.saveCard,
      getPaymentMethodId(paymentIntent.payment_method),
      inputs?.processingStatus,
      ...pusherCallbacks
    )
  }
}

async function handleRecurringDonation({
  stripe,
  elements,
  session,
  userEmail,
  inputs,
  finalAmount,
  feesCovered,
  usingSavedCard,
  fullName,
  pusherCallbacks,
  setupPusherListenerRecurring
}: any) {
  const frequency = inputs?.donationType === 'monthly' ? 'monthly' : ('yearly' as 'monthly' | 'yearly')
  const recurringBase = {
    userId: session?.data?.user?.id,
    email: userEmail,
    name: fullName,
    amount: finalAmount,
    frequency,
    coverFees: inputs?.coverFees,
    feesCovered
  }

  if (usingSavedCard) {
    const result = await createSubscriptionWithSavedCard({ ...recurringBase, savedCardId: inputs?.selectedCardId })
    if (!result.success) throw new Error(result.error || 'Failed to create subscription')
    setupPusherListenerRecurring(result, inputs?.processingStatus, ...pusherCallbacks)
    return
  }

  const setupResult = await createSetupIntentForSubscription({
    userId: session?.data?.user?.id,
    email: userEmail,
    name: fullName,
    amount: finalAmount,
    frequency,
    coverFees: inputs?.coverFees,
    feesCovered
  })

  if (!setupResult.success) throw new Error(setupResult.error || 'Failed to create setup intent')

  const cardElement = elements.getElement(CardElement)
  if (!cardElement) throw new Error('Card element not found')

  const { error } = await stripe.confirmCardSetup(setupResult.clientSecret, {
    payment_method: { card: cardElement, billing_details: { name: fullName, email: userEmail } }
  })

  if (error) throw new Error(error.message || 'Card confirmation failed')

  const subscriptionResult = await createSubscriptionAfterSetup({
    setupIntentId: setupResult.setupIntentId!,
    email: userEmail,
    name: fullName,
    frequency,
    amount: finalAmount,
    coverFees: inputs?.coverFees,
    feesCovered
  })

  if (!subscriptionResult.success) throw new Error(subscriptionResult.error || 'Failed to create subscription')
  setupPusherListenerRecurring(subscriptionResult, inputs?.processingStatus, ...pusherCallbacks)
}
