import { validateNameForm } from '@/app/lib/utils/form.utils'
import { ICheckoutStep2 } from '@/types/checkout.types'
import { ChevronRight, User } from 'lucide-react'
import { CheckoutCard } from './CheckoutCard'
import { FormFieldset } from '../../ui/forms/FormFieldset'
import { TextField } from '../../ui/forms/TextField'
import { PrimaryButton } from '../../ui/buttons/PrimaryButton'

export function CheckoutStep2({ onSubmit, isLoading = false, inputs, setErrors, handleInput, errors }: ICheckoutStep2) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validateNameForm(inputs, setErrors)) onSubmit()
  }

  return (
    <CheckoutCard eyebrow="// step 2" title="Your Information">
      <form onSubmit={handleSubmit} noValidate className="space-y-7">
        <FormFieldset icon={User} legend="Full name">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            <TextField
              id="firstName"
              label="First name"
              value={inputs?.firstName ?? ''}
              onChange={handleInput}
              placeholder="Maria"
              autoComplete="given-name"
              required
              error={errors?.firstName}
            />
            <TextField
              id="lastName"
              label="Last name"
              value={inputs?.lastName ?? ''}
              onChange={handleInput}
              placeholder="Santos"
              autoComplete="family-name"
              required
              error={errors?.lastName}
            />
          </div>
        </FormFieldset>

        <PrimaryButton
          type="submit"
          loading={isLoading}
          loadingLabel="Saving..."
          trailingIcon={ChevronRight}
          aria-label="Continue to payment"
        >
          Continue to Payment
        </PrimaryButton>
      </form>
    </CheckoutCard>
  )
}
