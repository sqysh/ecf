import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { IPaymentMethod } from '@/types/entities/payment-method'
import { useDonationSubmit } from '@/app/lib/hooks/useDonationSubmit'
import { calculateStripeFees } from '@/app/lib/utils/stripe.utils'
import { useDefaultCard } from '@/app/lib/hooks/useDefaultCard'
import { getDonateCheckoutAmount, setDonateCheckoutForm as setForm } from '@/app/lib/utils/donate.utils'
import { useInitializeForm } from '@/app/lib/hooks/useInitializeForm'
import { ArrowRight } from 'lucide-react'
import { Step3DonationAmountSection } from './Step3DonationAmountSection'
import { CheckoutStep3UserInfo } from './CheckoutStep3UserInfo'
import { FormFieldset } from '../../ui/forms/FormFieldset'
import { SavedCardSelector } from './SavedCardSelector'
import { CardElementField } from './CardElementField'
import { SaveCardToggle } from './SaveCardToggle'
import { CoverFeesToggle } from './CoverFeesToggle'
import { FormError } from './FormError'
import { PrimaryButton } from '../../ui/buttons/PrimaryButton'

export type TDonateCheckoutForm = {
  savedCards: IPaymentMethod[]
  inputs: any
  setStep: (step: number) => void
}

export function CheckoutStep3({ savedCards, inputs, setStep }: TDonateCheckoutForm) {
  const session = useSession()
  const isAuthed = session.status === 'authenticated'

  // ── Derived ───────────────────────────────────────────────────────────────
  const baseAmount = getDonateCheckoutAmount(inputs)
  const processingFee = Math.round(calculateStripeFees(baseAmount) * 100) / 100
  const finalAmount = Math.round((inputs?.coverFees ? baseAmount + calculateStripeFees(baseAmount) : baseAmount) * 100)
  const finalAmountDisplay = (finalAmount / 100).toFixed(2)
  const feesCovered = inputs?.coverFees ? calculateStripeFees(baseAmount) : 0
  const usingSavedCard = !!(inputs?.selectedCardId && !inputs?.useNewCard)
  const fullName = `${inputs?.firstName?.trim() ?? ''} ${inputs?.lastName?.trim() ?? ''}`.trim()

  const derivedName =
    inputs?.firstName || inputs?.lastName ? { firstName: inputs.firstName, lastName: inputs.lastName } : null

  const isValid = (usingSavedCard ? true : inputs?.cardComplete) && !!derivedName
  const loading = !!inputs?.loading
  const ready = isValid && !loading

  const setDefaultCard = useCallback((value: string) => setForm({ selectedCardId: value }), [])

  useDefaultCard(savedCards, setDefaultCard)
  useInitializeForm({
    savedCards,
    ...{ selectedPlan: 'once_friend', amount: 25, donationType: 'once' }
  })

  const { handleSubmit } = useDonationSubmit({
    inputs,
    finalAmount,
    feesCovered,
    usingSavedCard,
    fullName
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
      {/* ── Donation type + amount ── */}
      <Step3DonationAmountSection inputs={inputs} />

      {/* Contact Information */}
      <CheckoutStep3UserInfo name={fullName} setStep={setStep} />

      {/* ── Payment ── */}
      <FormFieldset legend="Payment Method">
        <div className="space-y-6">
          {isAuthed && (
            <SavedCardSelector
              savedCards={savedCards}
              selectedCardId={inputs?.selectedCardId}
              useNewCard={inputs?.useNewCard}
              onSelectCard={(id) => setForm({ selectedCardId: id })}
              onUseNewCard={() => setForm({ useNewCard: true, selectedCardId: null })}
              onUseSavedCard={() =>
                setForm({
                  useNewCard: false,
                  selectedCardId: savedCards[0]?.stripePaymentId ?? null,
                  saveCard: false
                })
              }
            />
          )}

          {(!isAuthed || savedCards.length === 0 || inputs?.useNewCard) && (
            <CardElementField formName="donateCheckoutForm" />
          )}

          <SaveCardToggle formName="donateCheckoutForm" />
          <CoverFeesToggle formName="donateCheckoutForm" processingFee={processingFee} />
        </div>
      </FormFieldset>

      {/* ── Error ── */}
      <FormError formName="donateCheckoutForm" />

      <PrimaryButton
        type="submit"
        loading={loading}
        disabled={!ready}
        loadingLabel="Processing..."
        trailingIcon={ArrowRight}
        aria-label={`Donate $${finalAmountDisplay}`}
      >
        Donate ${finalAmountDisplay}
      </PrimaryButton>

      <p className="font-mono text-[11px] tracking-wide text-text-light/70 dark:text-text-dark/65 text-center">
        Secured by Stripe, Powered by{' '}
        <a
          className="sqysh-gradient font-bold underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
          href="https://sqysh.io?lead_source=ecf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sqysh
        </a>
      </p>
    </form>
  )
}
