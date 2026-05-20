import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Sparkles, Zap } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { GoogleIcon } from '../../ui/icons'

export function CheckoutStep1({ redirectTo }: { redirectTo: string }) {
  const [email, setEmail] = useState('')
  const [magicSent, setMagicSent] = useState(false)
  const [loadingMagic, setLoadingMagic] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      <div className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/50 p-6 xs:p-8">
        {/* Header */}
        <div className="mb-6">
          <p
            aria-hidden="true"
            className="font-mono text-[10px] tracking-[0.18em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
          >
            {'// sign in'}
          </p>
          <h2 className="font-mono text-lg font-bold text-text-light dark:text-text-dark mb-1">Sign in to continue</h2>
          <p className="font-mono text-[11px] tracking-wide text-text-light/40 dark:text-text-dark/35">
            You&apos;ll be returned to checkout after signing in
          </p>

          {/* No account needed notice */}
          <div className="mt-4 flex items-start gap-2.5 px-3.5 py-3 border border-primary-light/30 dark:border-primary-dark/30 bg-primary-light/6 dark:bg-primary-dark/6">
            <Sparkles
              size={13}
              strokeWidth={2}
              aria-hidden="true"
              className="text-primary-light dark:text-primary-dark shrink-0 mt-0.5"
            />
            <p className="font-mono text-[11px] tracking-wide text-text-light/60 dark:text-text-dark/55 leading-relaxed">
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-4"
              role="status"
              aria-live="polite"
            >
              <div className="w-10 h-10 border border-primary-light/30 dark:border-primary-dark/30 bg-primary-light/6 dark:bg-primary-dark/6 flex items-center justify-center mx-auto mb-4">
                <Check
                  size={16}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="text-primary-light dark:text-primary-dark"
                />
              </div>
              <p className="font-mono text-sm font-bold text-text-light dark:text-text-dark mb-1">Check your email</p>
              <p className="font-mono text-[11px] tracking-wide text-text-light/40 dark:text-text-dark/35 mb-4 leading-relaxed">
                We sent a magic link to <span className="text-text-light dark:text-text-dark font-bold">{email}</span>
              </p>
              <button
                onClick={() => {
                  setMagicSent(false)
                  setEmail('')
                }}
                className="font-mono text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
              >
                Use a different email
              </button>
            </motion.div>
          ) : (
            /* ── Form ───────────────────────────────────────────────────── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {/* Google */}
              <motion.button
                onClick={handleGoogle}
                disabled={loadingGoogle || loadingMagic}
                aria-label="Continue with Google"
                aria-busy={loadingGoogle}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-border-subtle dark:border-border-dark text-text-light dark:text-text-dark bg-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {loadingGoogle ? (
                    <motion.span
                      key="g-load"
                      className="flex items-center gap-2.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Loader2 size={13} className="animate-spin" aria-hidden="true" /> Redirecting...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="g-idle"
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

              {/* Divider */}
              <div className="flex items-center gap-3" aria-hidden="true">
                <div className="flex-1 h-px bg-border-subtle dark:bg-border-dark" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-text-light/20 dark:text-text-dark/20">
                  or
                </span>
                <div className="flex-1 h-px bg-border-subtle dark:bg-border-dark" />
              </div>

              {/* Magic link form */}
              <form onSubmit={handleMagicLink} className="space-y-3" noValidate>
                <div>
                  <label
                    htmlFor="signin-email"
                    className="block font-mono text-[10px] tracking-[0.14em] uppercase mb-1.5 text-text-light/45 dark:text-text-dark/40"
                  >
                    Email address
                  </label>
                  <input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError(null)
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    disabled={loadingMagic || loadingGoogle}
                    aria-describedby={error ? 'signin-error' : undefined}
                    className="w-full px-3.5 py-3 font-mono text-[13px] outline-none bg-white dark:bg-accent-dark text-text-light dark:text-text-dark placeholder:text-text-light/25 dark:placeholder:text-text-dark/20 border border-border-subtle dark:border-border-dark focus:border-primary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(201,243,31,0.08)] transition-all duration-200 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      id="signin-error"
                      role="alert"
                      className="font-mono text-[10px] tracking-wide text-red-400"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={!email || loadingMagic || loadingGoogle}
                  aria-busy={loadingMagic}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
                  whileHover={{ y: -1, boxShadow: '0 6px 24px rgba(201,243,31,0.20)' }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {loadingMagic ? (
                      <motion.span
                        key="loading"
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Loader2 size={13} className="animate-spin" aria-hidden="true" /> Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Zap size={13} strokeWidth={2.5} aria-hidden="true" /> Send Magic Link
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="font-mono text-[10px] tracking-wide text-text-light/25 dark:text-text-dark/20 text-center mt-6 leading-relaxed">
          By signing in you agree to our{' '}
          <a
            href="/terms"
            className="hover:underline text-text-light/35 dark:text-text-dark/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
          >
            Terms
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            className="hover:underline text-text-light/35 dark:text-text-dark/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
