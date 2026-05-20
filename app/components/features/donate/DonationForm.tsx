import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { IPaymentMethod } from '@/types/entities/payment-method'
import { useDonationSubmit } from '@/app/lib/hooks/useDonationSubmit'
import { calculateStripeFees } from '@/app/lib/utils/stripe.utils'
import { useDefaultCard } from '@/app/lib/hooks/useDefaultCard'
import { getDonateCheckoutAmount, setDonateCheckoutForm as setForm } from '@/app/lib/utils/donate.utils'
import { useInitializeForm } from '@/app/lib/hooks/useInitializeForm'
import { Step3DonationAmountSection } from './Step3DonationAmountSection'
import { CheckoutStep3UserInfo } from './CheckoutStep3UserInfo'
import { SavedCardSelector } from './SavedCardSelector'
import { CardElementField } from './CardElementField'
import { SaveCardToggle } from '../../ui/forms/SaveCardToggle'
import { CoverFeesToggle } from '../../ui/forms/CoverFeesToggle'
import { FormError } from '../../ui/forms/FormError'
import { SubmitButton } from '../../ui/forms/SubmitButton'

export type TDonateCheckoutForm = {
  savedCards: IPaymentMethod[]
  inputs: any
  setStep: (step: number) => void
}

export function DonateCheckoutForm({ savedCards, inputs, setStep }: TDonateCheckoutForm) {
  // ── Store ─────────────────────────────────────────────────────────────────
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

  const setDefaultCard = useCallback((value: string) => setForm({ selectedCardId: value }), [])

  useDefaultCard(savedCards, setDefaultCard)
  useInitializeForm({ savedCards, ...{ selectedPlan: 'once_friend', amount: 25, donationType: 'once' } })

  // ── Submit ─────────────────────────────────────────────────────────────────
  const { handleSubmit } = useDonationSubmit({ inputs, finalAmount, feesCovered, usingSavedCard, fullName })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
      {/* ── Donation type + amount ── */}
      <Step3DonationAmountSection inputs={inputs} />

      {/* Contact Information */}
      <CheckoutStep3UserInfo name={fullName} setStep={setStep} />

      {/* ── Payment ── */}
      <fieldset className="border-0 p-0 m-0">
        <legend className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
          Payment Method
        </legend>
        <div className="space-y-6">
          {isAuthed && (
            <SavedCardSelector
              savedCards={savedCards}
              selectedCardId={inputs?.selectedCardId}
              useNewCard={inputs?.useNewCard}
              onSelectCard={(id) => setForm({ selectedCardId: id })}
              onUseNewCard={() => setForm({ useNewCard: true, selectedCardId: null })}
              onUseSavedCard={() =>
                setForm({ useNewCard: false, selectedCardId: savedCards[0]?.stripePaymentId ?? null, saveCard: false })
              }
            />
          )}

          {(!isAuthed || savedCards.length === 0 || inputs?.useNewCard) && (
            <CardElementField formName="donateCheckoutForm" />
          )}

          <SaveCardToggle formName="donateCheckoutForm" />
          <CoverFeesToggle formName="donateCheckoutForm" processingFee={processingFee} />
        </div>
      </fieldset>

      {/* ── Error ── */}
      <FormError formName="donateCheckoutForm" />

      <SubmitButton formName="donateCheckoutForm" isValid={isValid} label={`Donate $${finalAmountDisplay}`} />

      <p className="text-xs dark:text-zinc-500 text-neutral-600 text-center">
        Secured by Stripe, Powered by{' '}
        <span>
          <a className="sqysh-gradient hover:underline" href="https://sqysh.io?lead_source=ecf">
            Sqysh
          </a>
        </span>
      </p>
    </form>
  )
}
