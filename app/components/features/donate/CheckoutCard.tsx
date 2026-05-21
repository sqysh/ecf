'use client'

import { ReactNode } from 'react'

interface CheckoutCardProps {
  eyebrow?: string
  title: string
  children: ReactNode
  className?: string
}

export function CheckoutCard({ eyebrow, title, children, className = '' }: CheckoutCardProps) {
  return (
    <div
      className={`border border-neutral-200 dark:border-border-dark bg-white/50 dark:bg-accent-dark/50 p-5 xs:p-8 ${className}`}
    >
      {eyebrow && (
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase font-bold text-secondary-light dark:text-secondary-dark mb-1">
          {eyebrow}
        </p>
      )}
      <h2 className="font-mono text-lg xs:text-xl font-bold text-text-light dark:text-text-dark mb-6 xs:mb-8">
        {title}
      </h2>
      {children}
    </div>
  )
}
