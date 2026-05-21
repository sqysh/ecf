import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Sparkles, Zap } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { GoogleSignInButton } from '../../auth/GoogleSignInButton'
import { AuthDivider } from '../../auth/AuthDivider'
import { AuthEmailField } from '../../ui/forms/AuthEmailField'
import { PrimaryButton } from '../../ui/buttons/PrimaryButton'

export function CheckoutStep1({ redirectTo }: { redirectTo: string }) {
  const [email, setEmail] = useState('')
  const [magicSent, setMagicSent] = useState(false)
  const [loadingMagic, setLoadingMagic] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoadingMagic(true)
    setError(null)
    try {
      const res = await signIn('email', { email, redirect: false, redirectTo })
      if (res?.error) setError('Something went wrong. Please try again.')
      else setMagicSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoadingMagic(false)
    }
  }

  async function handleGoogle() {
    setLoadingGoogle(true)
    setError(null)
    await signIn('google', { redirect: true, redirectTo })
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="border border-neutral-200 dark:border-border-dark bg-white/50 dark:bg-accent-dark/50 p-6 xs:p-8">
        {/* Header */}
        <div className="mb-6">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase font-bold text-secondary-light dark:text-secondary-dark mb-2">
            {'// sign in'}
          </p>
          <h2 className="font-mono text-lg font-bold text-text-light dark:text-text-dark mb-1">Sign in to continue</h2>
          <p className="font-mono text-[11px] tracking-wide text-text-light/70 dark:text-text-dark/70">
            You&apos;ll be returned to checkout after signing in
          </p>

          {/* No account needed notice */}
          <div className="mt-4 flex items-start gap-2.5 px-3.5 py-3 border border-secondary-light/40 dark:border-primary-dark/40 bg-secondary-light/10 dark:bg-primary-dark/10">
            <Sparkles
              size={13}
              strokeWidth={2}
              aria-hidden="true"
              className="text-secondary-light dark:text-primary-dark shrink-0 mt-0.5"
            />
            <p className="font-mono text-[11px] tracking-wide text-text-light/85 dark:text-text-dark/80 leading-relaxed">
              <span className="font-bold text-text-light dark:text-text-dark">No account needed.</span> Enter your email
              or sign in with Google — we&apos;ll handle the rest.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {magicSent ? (
            /* ── Sent state ─────────────────────────────────────────────── */
            <motion.div
              key="sent"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-4"
              role="status"
              aria-live="polite"
            >
              <div className="w-10 h-10 border border-secondary-light/40 dark:border-primary-dark/40 bg-secondary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mx-auto mb-4">
                <Check
                  size={16}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="text-secondary-light dark:text-primary-dark"
                />
              </div>
              <p className="font-mono text-sm font-bold text-text-light dark:text-text-dark mb-1">Check your email</p>
              <p className="font-mono text-[11px] tracking-wide text-text-light/75 dark:text-text-dark/70 mb-4 leading-relaxed">
                We sent a magic link to <span className="text-text-light dark:text-text-dark font-bold">{email}</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setMagicSent(false)
                  setEmail('')
                }}
                className="font-mono text-[10px] tracking-widest uppercase font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
              >
                Use a different email
              </button>
            </motion.div>
          ) : (
            /* ── Form ───────────────────────────────────────────────────── */
            <motion.div
              key="form"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <GoogleSignInButton
                onClick={handleGoogle}
                loading={loadingGoogle}
                disabled={loadingMagic}
                loadingLabel="Redirecting..."
              />

              <AuthDivider />

              {/* Magic link form */}
              <form onSubmit={handleMagicLink} className="space-y-3" noValidate>
                <AuthEmailField
                  id="signin-email"
                  value={email}
                  onChange={(value) => {
                    setEmail(value)
                    setError(null)
                  }}
                  disabled={loadingMagic || loadingGoogle}
                  error={!!error}
                  errorMessage={error ?? ''}
                />

                <PrimaryButton
                  type="submit"
                  loading={loadingMagic}
                  disabled={!email || loadingGoogle}
                  loadingLabel="Sending..."
                  leadingIcon={Zap}
                >
                  Send Magic Link
                </PrimaryButton>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="font-mono text-[10px] tracking-wide text-text-light/70 dark:text-text-dark/65 text-center mt-6 leading-relaxed">
          By signing in you agree to our{' '}
          <a
            href="/terms"
            className="font-bold underline underline-offset-2 hover:no-underline text-secondary-light dark:text-secondary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
          >
            Terms
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            className="font-bold underline underline-offset-2 hover:no-underline text-secondary-light dark:text-secondary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
