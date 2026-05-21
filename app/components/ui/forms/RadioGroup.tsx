'use client'

import { ReactNode, KeyboardEvent, useRef, useCallback, useContext, createContext } from 'react'

// ─── Context ──────────────────────────────────────────────────────────────
// SelectableCard reads from this rather than from cloned props, so it can
// live anywhere in the tree — including inside wrapper divs.

interface RadioGroupContextValue {
  selectedValue: string
  onChange: (value: string) => void
  values: string[]
  firstValue: string
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroup() {
  const ctx = useContext(RadioGroupContext)
  if (!ctx) {
    throw new Error('SelectableCard must be rendered inside a <RadioGroup>.')
  }
  return ctx
}

// ─── RadioGroup ───────────────────────────────────────────────────────────

interface RadioGroupProps {
  label: string
  /** Ordered list of all option ids in the group. Required for arrow nav. */
  values: string[]
  selectedValue: string
  onChange: (value: string) => void
  /** 'horizontal' enables Left/Right arrow keys, 'vertical' enables Up/Down.
   *  Default 'vertical' (matches the WAI-ARIA APG default). */
  orientation?: 'horizontal' | 'vertical'
  children: ReactNode
  className?: string
}

export function RadioGroup({
  label,
  values,
  selectedValue,
  onChange,
  orientation = 'vertical',
  children,
  className = ''
}: RadioGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null)

  const focusValue = useCallback((value: string) => {
    if (!groupRef.current) return
    const el = groupRef.current.querySelector<HTMLElement>(`[data-radio-value="${value}"]`)
    el?.focus()
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const currentValue = target.getAttribute('data-radio-value')
    if (!currentValue) return

    const currentIndex = values.indexOf(currentValue)
    if (currentIndex === -1) return

    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
    const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'

    let nextIndex = currentIndex
    if (e.key === nextKey) {
      nextIndex = (currentIndex + 1) % values.length
    } else if (e.key === prevKey) {
      nextIndex = (currentIndex - 1 + values.length) % values.length
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = values.length - 1
    } else {
      return
    }

    e.preventDefault()
    const nextValue = values[nextIndex]
    onChange(nextValue)
    focusValue(nextValue)
  }

  return (
    <RadioGroupContext.Provider
      value={{
        selectedValue,
        onChange,
        values,
        firstValue: values[0]
      }}
    >
      <div ref={groupRef} role="radiogroup" aria-label={label} onKeyDown={handleKeyDown} className={className}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

// ─── SelectableCard ──────────────────────────────────────────────────────

export interface SelectableCardProps {
  id: string
  /** Visual emphasis (e.g. "Popular"). Cosmetic — doesn't affect a11y. */
  highlighted?: boolean
  children: ReactNode
  className?: string
  ariaLabel?: string
}

export function SelectableCard({ id, highlighted = false, children, className = '', ariaLabel }: SelectableCardProps) {
  const { selectedValue, onChange, firstValue } = useRadioGroup()
  const checked = selectedValue === id

  // Roving tabindex: selected option is tabbable. If nothing is selected,
  // the first option is tabbable so the user can enter the group with Tab.
  const tabIndex = checked || (!selectedValue && id === firstValue) ? 0 : -1

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onChange(id)
    }
    // Arrow keys bubble up to RadioGroup.
  }

  return (
    <div
      role="radio"
      aria-checked={checked}
      aria-label={ariaLabel}
      data-radio-value={id}
      tabIndex={tabIndex}
      onClick={() => onChange(id)}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer border text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark ${
        checked
          ? 'border-secondary-light dark:border-primary-dark bg-secondary-light/10 dark:bg-primary-dark/10'
          : highlighted
            ? 'border-secondary-light/50 dark:border-secondary-dark/50 bg-secondary-light/5 dark:bg-secondary-dark/5 hover:border-secondary-light dark:hover:border-secondary-dark'
            : 'border-neutral-300 dark:border-border-dark bg-transparent hover:border-text-light/40 dark:hover:border-text-dark/40'
      } ${className}`}
    >
      {children}
    </div>
  )
}
