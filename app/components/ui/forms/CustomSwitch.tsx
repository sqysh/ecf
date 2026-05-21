'use client'

import { FormName, setInputs } from '@/app/lib/store/slices/formSlice'
import { store } from '@/app/lib/store/store'
import { useId } from 'react'

type Props = {
  /** The form input key to toggle (e.g. 'isDefault'). */
  value: string
  formName: FormName
  checked: boolean
  /** Visible label rendered to the left of the switch. */
  label?: string
  /** Used when no visible `label` is provided. */
  ariaLabel?: string
  disabled?: boolean
  /** Optional explicit id. If omitted, a stable one is generated. */
  id?: string
}

/**
 * Compact inline switch — label on the left, small track on the right.
 * For full-bleed bordered card toggles with icon + subtitle, use SwitchCard.
 */
export default function Switch({ checked, value, formName, disabled = false, label, ariaLabel, id }: Props) {
  // Auto-generate a stable id if the caller doesn't supply one.
  const generatedId = useId()
  const switchId = id ?? generatedId

  const handleToggle = () => {
    if (disabled) return
    store.dispatch(setInputs({ formName, data: { [value]: !checked } }))
  }

  return (
    <div className="flex items-center justify-between gap-3">
      {label && (
        <label
          htmlFor={switchId}
          className={`font-mono text-[11px] text-text-light/85 dark:text-text-dark/80 select-none ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {label}
        </label>
      )}

      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label ? undefined : ariaLabel}
        disabled={disabled}
        onClick={handleToggle}
        className={`relative inline-flex h-5 w-9 items-center shrink-0 border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark ${
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        } ${
          checked
            ? 'bg-secondary-light dark:bg-primary-dark border-secondary-light dark:border-primary-dark'
            : 'bg-transparent border-neutral-400 dark:border-border-dark'
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-3.5 w-3.5 transform transition-transform duration-200 ${
            checked
              ? 'translate-x-[1.125rem] bg-white dark:bg-accent-dark'
              : 'translate-x-0.5 bg-text-light/55 dark:bg-text-dark/55'
          }`}
        />
      </button>
    </div>
  )
}
