'use client'

import { FormName, setInputs } from '@/app/lib/store/slices/formSlice'
import { store, useFormSelector } from '@/app/lib/store/store'
import { CreditCard } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { SwitchCard } from '../../ui/forms/SwitchCard'

export function SaveCardToggle({ formName }: { formName: FormName }) {
  const session = useSession()
  const isAuthed = session.status === 'authenticated'
  const { forms } = useFormSelector()
  const inputs = forms?.[formName]?.inputs
  const checked = !!inputs?.saveCard
  const usingExistingCard = !!inputs?.selectedCardId && !inputs?.useNewCard

  if (!isAuthed || usingExistingCard) return null

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
