'use client'

import { LucideIcon } from 'lucide-react'

interface SwitchCardProps {
  checked: boolean
  onChange: (next: boolean) => void
  icon: LucideIcon
  title: string
  description: string
  ariaLabel?: string
}

/**
 * Card-shaped on/off switch with an icon, title, and sub-line.
 * Uses role="switch" — the right semantic for "feature on/off" toggles
 * (as opposed to checkboxes, which are for "select from a list").
 */
export function SwitchCard({ checked, onChange, icon: Icon, title, description, ariaLabel }: SwitchCardProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel ?? title}
      onClick={() => onChange(!checked)}
      className={`w-full flex items-center justify-between gap-3 xs:gap-4 px-4 py-3 border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark ${
        checked
          ? 'border-secondary-light dark:border-primary-dark bg-secondary-light/10 dark:bg-primary-dark/10'
          : 'border-neutral-300 dark:border-border-dark bg-transparent hover:border-text-light/40 dark:hover:border-text-dark/40'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 text-left min-w-0">
        <Icon
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className={`shrink-0 transition-colors duration-200 ${
            checked ? 'text-secondary-light dark:text-primary-dark' : 'text-text-light/75 dark:text-text-dark/70'
          }`}
        />
        <div className="min-w-0 flex-1">
          <p
            className={`font-mono text-[11px] font-bold tracking-wide truncate ${
              checked ? 'text-text-light dark:text-text-dark' : 'text-text-light/85 dark:text-text-dark/80'
            }`}
          >
            {title}
          </p>
          <p className="font-mono text-[10px] tracking-wide text-text-light/70 dark:text-text-dark/65 truncate mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {/* Track + thumb — decorative; aria-checked carries the semantic */}
      <div
        aria-hidden="true"
        className={`w-9 h-5 relative shrink-0 border transition-colors duration-200 ${
          checked
            ? 'bg-secondary-light dark:bg-primary-dark border-secondary-light dark:border-primary-dark'
            : 'bg-transparent border-neutral-400 dark:border-border-dark'
        }`}
      >
        <div
          className={`w-3.5 h-3.5 absolute top-0.5 transition-all duration-200 ${
            checked ? 'left-4.5 bg-white dark:bg-accent-dark' : 'left-0.5 bg-text-light/55 dark:bg-text-dark/55'
          }`}
        />
      </div>
    </button>
  )
}
