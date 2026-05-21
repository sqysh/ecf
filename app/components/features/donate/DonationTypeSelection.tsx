'use client'

import { donateOptions } from '@/app/lib/constants/donate.constants'
import { FC } from 'react'
import { RadioGroup, SelectableCard } from '../../ui/forms/RadioGroup'

export const DonationTypeSelection: FC<{
  donationType: string
  setDonationType: (donationType: 'once' | 'monthly' | 'yearly') => void
  setSelectedPlan: (selectedPlan: string) => void
}> = ({ donationType, setDonationType, setSelectedPlan }) => {
  const values = donateOptions.map((o) => o.type)

  const handleChange = (newType: string) => {
    const opt = donateOptions.find((o) => o.type === newType)
    if (!opt) return
    setSelectedPlan(opt.plan)
    setDonationType(newType as 'once' | 'monthly' | 'yearly')
  }

  return (
    <RadioGroup
      label="Donation frequency"
      values={values}
      selectedValue={donationType}
      onChange={handleChange}
      orientation="horizontal"
      className="grid sm:grid-cols-3 gap-2 mb-8"
    >
      {donateOptions.map(({ type, label, sub }) => {
        const active = donationType === type
        return (
          <SelectableCard key={type} id={type} ariaLabel={`${label} — ${sub}`} className="p-3 text-center">
            <p
              className={`font-mono text-sm font-bold tracking-wide ${
                active ? 'text-text-light dark:text-text-dark' : 'text-text-light/75 dark:text-text-dark/70'
              }`}
            >
              {label}
            </p>
            <p
              className={`font-mono text-[11px] mt-0.5 tracking-wide ${
                active ? 'text-text-light/80 dark:text-text-dark/75' : 'text-text-light/70 dark:text-text-dark/65'
              }`}
            >
              {sub}
            </p>
          </SelectableCard>
        )
      })}
    </RadioGroup>
  )
}
