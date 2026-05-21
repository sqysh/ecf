import { createPaymentMethod } from '@/app/lib/actions/createPaymentMethod'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { store, useFormSelector } from '@/app/lib/store/store'
import { createFormActions } from '@/app/lib/store/slices/formSlice'
import { FormField, inputClass } from '../../ui/forms/FormField'
import { CardElementField } from '../donate/CardElementField'
import CustomSwitch from '../../ui/forms/CustomSwitch'
import { PrimaryButton } from '../../ui/buttons/PrimaryButton'
import { GhostButton } from '../../ui/buttons/GhostButton'

const validatePaymentMethodForm = (inputs: any, setErrors: (newErrors: Record<string, string>) => void) => {
  const newErrors: Record<string, string> = {}

  // Card details (Stripe Element completeness)
  if (!inputs?.cardComplete) {
    newErrors.card = 'Please complete your card details'
  }

  // Cardholder name
  if (!inputs?.cardholderName?.trim()) {
    newErrors.cardholderName = 'Cardholder name is required'
  }

  setErrors(newErrors)

  return Object.keys(newErrors).length === 0
}

export function AddCardForm({ onClose }: { onClose: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { forms } = useFormSelector()
  const { handleInput, setErrors } = createFormActions('paymentMethodForm', store.dispatch)

  const inputs = forms.paymentMethodForm.inputs
  const errors = forms.paymentMethodForm.errors

  const [savingCard, setSavingCard] = useState(false)

  const handleSaveCard = async () => {
    if (!stripe || !elements) return

    if (!validatePaymentMethodForm(inputs, setErrors)) return

    setSavingCard(true)

    try {
      const card = elements.getElement(CardElement)
      if (!card) return

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card
      })

      if (error || !paymentMethod) return

      const result = await createPaymentMethod(paymentMethod.id)

      if (!result.success) {
        throw new Error(result.error || 'Failed to save payment method')
      }

      router.refresh()
      onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setSavingCard(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Cardholder name */}
      <FormField label="Cardholder name" id="card-name" error={errors.cardholderName}>
        <input
          id="card-name"
          type="text"
          name="cardholderName"
          value={inputs?.cardholderName ?? ''}
          onChange={handleInput}
          autoComplete="cc-name"
          placeholder="Jane Smith"
          className={inputClass}
          disabled={savingCard}
        />
      </FormField>

      {/* Stripe Card Element */}
      <FormField label="Card details" id="card-element" error={errors.cardComplete}>
        <CardElementField formName="paymentMethodForm" />
      </FormField>

      {/* Default payment checkbox */}
      <CustomSwitch
        id="default-payment"
        label="Set as default payment method"
        checked={inputs?.isDefault}
        value="isDefault"
        formName="paymentMethodForm"
        disabled={savingCard}
      />

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <PrimaryButton onClick={handleSaveCard} disabled={savingCard}>
          {savingCard ? 'Saving...' : 'Save card'}
        </PrimaryButton>

        <GhostButton onClick={onClose} disabled={savingCard}>
          Cancel
        </GhostButton>
      </div>
    </div>
  )
}
