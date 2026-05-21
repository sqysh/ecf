'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface FormFieldsetProps {
  icon?: LucideIcon
  legend: string
  children: ReactNode
  className?: string
}

export function FormFieldset({ icon: Icon, legend, children, className = '' }: FormFieldsetProps) {
  return (
    <fieldset className={className}>
      <legend className="flex items-center gap-2 mb-4">
        {Icon && (
          <Icon size={13} strokeWidth={2} aria-hidden="true" className="text-text-light/65 dark:text-text-dark/60" />
        )}
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase font-bold text-text-light/65 dark:text-text-dark/60">
          {legend}
        </span>
      </legend>
      {children}
    </fieldset>
  )
}
