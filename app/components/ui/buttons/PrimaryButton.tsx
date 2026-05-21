'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Loader2, LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface PrimaryButtonProps {
  onClick?: () => void
  children: ReactNode
  'aria-label'?: string
  'aria-describedby'?: string
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit'
  /** Optional icon shown before children when not loading (e.g. Zap) */
  leadingIcon?: LucideIcon
  /** Optional icon shown after children when not loading (e.g. ChevronRight) */
  trailingIcon?: LucideIcon
  /** Label rendered next to the spinner. Also announced to AT. */
  loadingLabel?: string
}

// ── Primary button ──────────────────────────────────────────────────
export function PrimaryButton({
  onClick,
  children,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  disabled = false,
  loading = false,
  type = 'button',
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  loadingLabel = 'Loading...'
}: PrimaryButtonProps) {
  const reduceMotion = useReducedMotion()
  const isDisabled = disabled || loading

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      className="flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-[11px] font-bold tracking-widest uppercase border border-secondary-light dark:border-primary-dark bg-secondary-light dark:bg-primary-dark text-white dark:text-accent-dark hover:bg-secondary-light/90 dark:hover:bg-primary-dark/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark min-h-10"
      whileHover={!reduceMotion && !isDisabled ? { y: -1, boxShadow: '0 4px 16px rgba(0,162,209,0.25)' } : {}}
      whileTap={!reduceMotion && !isDisabled ? { y: 0 } : {}}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.span
            key="loading"
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 size={13} className={reduceMotion ? '' : 'animate-spin'} aria-hidden="true" />
            {loadingLabel}
            <span className="sr-only" role="status" aria-live="polite">
              {loadingLabel}, please wait.
            </span>
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {LeadingIcon && <LeadingIcon size={13} strokeWidth={2.5} aria-hidden="true" />}
            {children}
            {TrailingIcon && <TrailingIcon size={13} aria-hidden="true" />}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
