'use client'

import { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface TextFieldProps {
  id: string
  name?: string
  label: string
  type?: HTMLInputTypeAttribute
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  autoComplete?: string
  required?: boolean
  disabled?: boolean
  error?: string
  ariaDescribedBy?: string
}

export function TextField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  required = false,
  disabled = false,
  error,
  ariaDescribedBy
}: TextFieldProps) {
  const reduceMotion = useReducedMotion()
  const errorId = `${id}-error`
  const hasError = !!error

  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] tracking-[0.14em] uppercase font-bold mb-1.5 text-text-light/80 dark:text-text-dark/80"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name ?? id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : ariaDescribedBy}
        disabled={disabled}
        className={`w-full px-3.5 py-3 font-mono text-[13px] outline-none transition-all duration-200 bg-white dark:bg-accent-dark text-text-light dark:text-text-dark placeholder:text-text-light/55 dark:placeholder:text-text-dark/55 border disabled:opacity-50 min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 ${
          hasError
            ? 'border-red-600 dark:border-red-400 shadow-[0_0_0_3px_rgba(220,38,38,0.12)] focus-visible:outline-red-600 dark:focus-visible:outline-red-400'
            : 'border-neutral-300 dark:border-border-dark focus:border-secondary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(0,162,209,0.12)] focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark'
        }`}
      />
      <AnimatePresence>
        {hasError && (
          <motion.p
            id={errorId}
            role="alert"
            className="font-mono text-[11px] tracking-wide font-bold text-red-700 dark:text-red-400 mt-1.5"
            initial={reduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
