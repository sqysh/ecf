'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { GoogleIcon } from '../ui/icons'

interface GoogleSignInButtonProps {
  onClick: () => void
  loading: boolean
  disabled?: boolean
  loadingLabel?: string
  ariaDescribedBy?: string
}

export function GoogleSignInButton({
  onClick,
  loading,
  disabled = false,
  loadingLabel = 'Signing in...',
  ariaDescribedBy
}: GoogleSignInButtonProps) {
  const reduceMotion = useReducedMotion()
  const isDisabled = loading || disabled

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label="Continue with Google"
      aria-busy={loading}
      aria-describedby={ariaDescribedBy}
      className="w-full flex items-center justify-center gap-2.5 px-4 xs:px-5 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-text-light/40 dark:border-text-dark/40 text-text-light dark:text-text-dark bg-transparent hover:border-text-light/70 dark:hover:border-text-dark/70 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark min-h-11"
      whileHover={!reduceMotion && !isDisabled ? { y: -1 } : {}}
      whileTap={!reduceMotion && !isDisabled ? { y: 0 } : {}}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.span
            key="loading"
            className="flex items-center gap-2.5"
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
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GoogleIcon /> Continue with Google
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
