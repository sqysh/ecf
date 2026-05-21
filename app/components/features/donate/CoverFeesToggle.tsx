'use client'

import { FormName, setInputs } from '@/app/lib/store/slices/formSlice'
import { store, useFormSelector } from '@/app/lib/store/store'
import { Heart } from 'lucide-react'
import { SwitchCard } from '../../ui/forms/SwitchCard'

export function CoverFeesToggle({ formName, processingFee }: { formName: FormName; processingFee: number }) {
  const { forms } = useFormSelector()
  const inputs = forms?.[formName]?.inputs
  const checked = !!inputs?.coverFees

  return (
    <SwitchCard
      checked={checked}
      onChange={(next) => store.dispatch(setInputs({ formName, data: { coverFees: next } }))}
      icon={Heart}
      title="Cover processing fees"
      description={`Add $${processingFee.toFixed(2)} so 100% goes to the cause`}
    />
  )
}
