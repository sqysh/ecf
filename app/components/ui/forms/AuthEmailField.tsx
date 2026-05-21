'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

interface AuthEmailFieldProps {
  id: string
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  shakeKey?: number
  ariaDescribedBy?: string
  placeholder?: string
  label?: string
}

export function AuthEmailField({
  id,
  value,
  onChange,
  onEnter,
  disabled = false,
  error = false,
  errorMessage = 'Enter a valid email address',
  shakeKey,
  ariaDescribedBy,
  placeholder = 'you@example.com',
  label = 'Email address'
}: AuthEmailFieldProps) {
  const reduceMotion = useReducedMotion()
  const errorId = `${id}-error`

  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] tracking-[0.14em] uppercase font-bold mb-1.5 text-text-light/80 dark:text-text-dark/80"
      >
        {label}
      </label>
      <motion.div
        key={shakeKey}
        animate={error && !reduceMotion ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
      >
        <input
          id={id}
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onEnter) {
              e.preventDefault()
              onEnter()
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="email"
          required
          aria-invalid={error}
          aria-describedby={error ? errorId : ariaDescribedBy}
          className={`w-full px-3.5 py-3 font-mono text-[13px] outline-none transition-all duration-200 bg-white dark:bg-accent-dark text-text-light dark:text-text-dark placeholder:text-text-light/55 dark:placeholder:text-text-dark/55 border disabled:opacity-50 min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 ${
            error
              ? 'border-red-600 dark:border-red-400 shadow-[0_0_0_3px_rgba(220,38,38,0.12)] focus-visible:outline-red-600 dark:focus-visible:outline-red-400'
              : 'border-neutral-300 dark:border-border-dark focus:border-secondary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(0,162,209,0.12)] focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark'
          }`}
        />
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            className="font-mono text-[11px] mt-1.5 tracking-wide font-bold text-red-700 dark:text-red-400"
            initial={reduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
