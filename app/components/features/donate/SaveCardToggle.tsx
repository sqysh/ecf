'use client'

import { FormName, setInputs } from '@/app/lib/store/slices/formSlice'
import { store, useFormSelector } from '@/app/lib/store/store'
import { CreditCard, Info } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { SwitchCard } from '../../ui/forms/SwitchCard'

export function SaveCardToggle({ formName }: { formName: FormName }) {
  const session = useSession()
  const isAuthed = session.status === 'authenticated'
  const { forms } = useFormSelector()
  const inputs = forms?.[formName]?.inputs
  const checked = !!inputs?.saveCard
  const usingExistingCard = !!inputs?.selectedCardId && !inputs?.useNewCard
  const isRecurring = inputs?.donationType === 'monthly' || inputs?.donationType === 'yearly'

  // Don't render anything if not signed in or using an existing saved card.
  if (!isAuthed || usingExistingCard) return null

  // For recurring donations, the card is saved automatically (required for renewals).
  // Show an info notice instead of a toggle so users understand what's happening.
  if (isRecurring) {
    return (
      <div className="flex items-start gap-2.5 px-4 py-3 border border-neutral-200 dark:border-border-dark bg-white/50 dark:bg-accent-dark/40">
        <Info
          size={13}
          strokeWidth={2}
          aria-hidden="true"
          className="text-secondary-light dark:text-primary-dark shrink-0 mt-0.5"
        />
        <p className="font-mono text-[11px] text-text-light/85 dark:text-text-dark/80 leading-relaxed">
          <span className="font-bold text-text-light dark:text-text-dark">Card saved for renewals.</span> Recurring
          donations require a card on file. You can remove it anytime from your member portal.
        </p>
      </div>
    )
  }

  // One-time donations — toggle visible, user chooses.
  return (
    <SwitchCard
      checked={checked}
      onChange={(next) => store.dispatch(setInputs({ formName, data: { saveCard: next } }))}
      icon={CreditCard}
      title="Save card for future payments"
      description="One-click checkout next time"
    />
  )
}
