'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion, useReducedMotion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export function CheckoutStep3UserInfo({ name, setStep }: { name: string | null; setStep: (step: number) => void }) {
  const session = useSession()
  const email = session.data?.user?.email
  const [signingOut, setSigningOut] = useState(false)
  const reduceMotion = useReducedMotion()

  if (!name && !email) return null

  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="font-mono text-[10px] tracking-[0.18em] uppercase font-bold text-text-light/65 dark:text-text-dark/65 mb-4">
        Contact
      </legend>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="border border-neutral-200 dark:border-border-dark divide-y divide-neutral-200 dark:divide-border-dark mb-3"
      >
        {/* Email */}
        <div className="flex items-start gap-3 sm:gap-6 px-4 py-3">
          <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65 shrink-0 w-14 sm:w-20 mt-0.5">
            Email
          </p>
          <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <p className="font-mono text-sm text-text-light dark:text-text-dark truncate">{email || '—'}</p>
            <button
              type="button"
              onClick={async () => {
                setSigningOut(true)
                await signOut({ redirectTo: '/login' })
              }}
              disabled={signingOut}
              aria-label="Sign out and use a different account"
              aria-busy={signingOut}
              className="font-mono text-[10px] tracking-wide font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors self-start disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
            >
              {signingOut ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 size={11} className={reduceMotion ? '' : 'animate-spin'} aria-hidden="true" />
                  Signing out...
                  <span className="sr-only" role="status" aria-live="polite">
                    Signing out, please wait.
                  </span>
                </span>
              ) : (
                'Not you?'
              )}
            </button>
          </div>
        </div>

        {/* Name */}
        {name?.trim() && (
          <div className="flex items-center gap-3 sm:gap-6 px-4 py-3">
            <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65 shrink-0 w-14 sm:w-20">
              Name
            </p>
            <p className="font-mono text-sm text-text-light dark:text-text-dark truncate flex-1 min-w-0">{name}</p>
          </div>
        )}
      </motion.div>

      <p className="font-mono text-[11px] text-text-light/70 dark:text-text-dark/65 tracking-wide">
        Need to update your details?{' '}
        <button
          type="button"
          onClick={() => setStep(2)}
          aria-label="Go back to update your details"
          className="font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
        >
          Go back
        </button>
      </p>
    </fieldset>
  )
}
