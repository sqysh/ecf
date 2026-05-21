'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { logAuthError } from '@/app/lib/actions/logAuthError'
import { useUiSelector } from '@/app/lib/store/store'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { getAuthErrorMessage } from '@/app/lib/utils/error.utils'
import { fadeUp, staggerChildren } from '@/app/lib/constants/motion.constants'
import { Cursor, GoogleIcon } from '@/app/components/ui/icons'
import { EMAIL_REGEX } from '@/app/lib/regex'
import { Loader2, Zap } from 'lucide-react'
import { LocalError } from '@/types/common'
import { InlineMessage } from '@/app/components/ui/feedback/InlineMessage'

export default function LoginPage() {
  const reduceMotion = useReducedMotion()
  const { isDark } = useUiSelector()
  const searchParams = useSearchParams()

  const urlError = searchParams.get('error')
  const errorInfo = urlError ? getAuthErrorMessage(urlError) : null

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  const [magicState, setMagicState] = useState<'idle' | 'loading' | 'sent'>('idle')
  const [magicError, setMagicError] = useState<LocalError | null>(null)

  const [googleState, setGoogleState] = useState<'idle' | 'loading'>('idle')
  const [googleError, setGoogleError] = useState<LocalError | null>(null)

  const [logoutSuccess, setLogoutSuccess] = useState(false)

  // ─── Log URL auth errors ────────────────────────────────────────────────────
  useEffect(() => {
    const knownErrors = [
      'AccessDenied',
      'Verification',
      'EmailSignin',
      'OAuthSignin',
      'OAuthCallback',
      'SessionRequired',
      'Configuration'
    ]

    if (!urlError || urlError === 'undefined' || urlError === 'null' || !errorInfo) return

    logAuthError({
      error: urlError,
      title: errorInfo.title,
      message: errorInfo.message,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      email: localStorage.getItem('lastMagicLinkEmail') ?? undefined,
      isKnownError: knownErrors.includes(urlError)
    })
  }, [urlError, errorInfo])

  // ─── Handle post-logout redirect ───────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('logout') !== 'success') return

    setLogoutSuccess(true)
    window.history.replaceState({}, '', '/login')
  }, [])

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (googleState !== 'idle') return

    setGoogleError(null)
    setGoogleState('loading')

    try {
      await signIn('google', { redirect: true, redirectTo: '/login' })
    } catch (error) {
      const msg = error instanceof Error ? error.message : ''
      setGoogleError({
        title: 'Google sign-in failed',
        message: msg.toLowerCase().includes('popup')
          ? 'Please allow popups and try again.'
          : 'Unable to connect with Google. Please try again.'
      })
    } finally {
      setGoogleState('idle')
    }
  }

  const handleMagicLink = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (magicState !== 'idle') return

    setMagicError(null)

    if (!email || !EMAIL_REGEX.test(email)) {
      setEmailError(true)
      setShakeKey((k) => k + 1)
      setTimeout(() => setEmailError(false), 1600)
      return
    }

    setMagicState('loading')

    try {
      localStorage.setItem('lastMagicLinkEmail', email)

      const result = await signIn('email', {
        email,
        redirect: false
      })

      if (result?.ok) {
        setMagicState('sent')
        setEmail('')
      } else {
        setMagicError({
          title: 'Failed to send magic link',
          message: result?.error === 'EmailSignin' ? "That email address wasn't recognised." : 'Please try again.'
        })
        setMagicState('idle')
      }
    } catch {
      setMagicError({
        title: 'Something went wrong',
        message: 'Unable to send magic link. Please try again.'
      })
      setMagicState('idle')
    }
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center relative overflow-hidden transition-colors duration-300">
      {/* Subtle grid — decorative */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
        }}
      />

      {/* Ambient blobs — decorative, paused for reduced-motion */}
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="fixed -top-35 -right-25 w-120 h-120 rounded-full pointer-events-none bg-primary-light dark:bg-primary-dark"
            style={{ filter: 'blur(110px)', opacity: isDark ? 0.12 : 0.13 }}
            animate={{ x: [0, -20, 0], y: [0, 25, 0], scale: [1, 1.07, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="fixed -bottom-25 -left-20 w-90 h-90 rounded-full pointer-events-none bg-secondary-light dark:bg-secondary-dark"
            style={{ filter: 'blur(100px)', opacity: isDark ? 0.1 : 0.09 }}
            animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Skip link */}
      <a
        href="#login-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-light dark:focus:bg-primary-dark focus:text-accent-dark focus:font-mono focus:text-sm focus:font-bold"
      >
        Skip to login form
      </a>

      <main className="relative z-10 w-full px-4 py-8 flex items-center justify-center min-h-screen">
        <motion.div
          className="w-full max-w-md"
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full border border-text-light/25 dark:border-text-dark/25 bg-white/85 dark:bg-accent-dark/85 backdrop-blur-xl transition-colors duration-300">
            {/* Header strip */}
            <div className="flex items-center gap-2 px-4 xs:px-5 py-3 border-b border-text-light/20 dark:border-text-dark/20 bg-black/3 dark:bg-white/3">
              <span className="ml-auto text-[10px] tracking-widest uppercase font-mono font-bold text-text-light/65 dark:text-text-dark/65">
                auth.ecf.org
              </span>
            </div>

            {/* Body */}
            <motion.div
              id="login-form"
              className="px-5 xs:px-9 pt-8 xs:pt-10 pb-6 xs:pb-8 flex flex-col gap-0"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              {/* Brand */}
              <motion.div className="mb-6 xs:mb-8" variants={fadeUp}>
                <p className="text-[10px] tracking-[0.18em] uppercase mb-2 font-mono font-bold text-secondary-light dark:text-secondary-dark">
                  {'// portal access'}
                </p>
                <h1 className="text-lg xs:text-xl font-bold leading-snug font-mono text-text-light dark:text-text-dark">
                  Education
                  <br />
                  <span className="text-secondary-light dark:text-primary-dark">Comes First</span>
                  <span aria-hidden="true">
                    <Cursor />
                  </span>
                </h1>
                <p className="text-xs mt-2 tracking-wide font-mono text-text-light/70 dark:text-text-dark/70">
                  Sign in to continue to your account
                </p>
              </motion.div>

              {/* Logout success */}
              <AnimatePresence>
                {logoutSuccess && (
                  <motion.div className="mb-4" variants={fadeUp}>
                    <InlineMessage
                      id="logout-success"
                      type="success"
                      title="You've been signed out"
                      message="Sign back in any time to continue supporting education."
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* URL error */}
              <AnimatePresence>
                {errorInfo && (
                  <motion.div className="mb-4" variants={fadeUp}>
                    <InlineMessage
                      id="url-error"
                      type="error"
                      icon={errorInfo.icon}
                      title={errorInfo.title}
                      message={errorInfo.message}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Google */}
              <motion.div className="flex flex-col gap-2" variants={fadeUp}>
                <motion.button
                  onClick={handleGoogleSignIn}
                  disabled={googleState !== 'idle'}
                  aria-label="Continue with Google"
                  aria-busy={googleState === 'loading'}
                  aria-describedby={googleError ? 'google-error' : undefined}
                  className="w-full flex items-center justify-center gap-2.5 px-4 xs:px-5 py-3 text-[11px] font-bold tracking-widest uppercase font-mono border border-text-light/40 dark:border-text-dark/40 text-text-light dark:text-text-dark bg-transparent hover:border-text-light/70 dark:hover:border-text-dark/70 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark min-h-11"
                  whileHover={!reduceMotion && googleState === 'idle' ? { y: -1 } : {}}
                  whileTap={!reduceMotion && googleState === 'idle' ? { y: 0 } : {}}
                  transition={{ duration: 0.15 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {googleState === 'idle' ? (
                      <motion.span
                        key="g-idle"
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <GoogleIcon /> Continue with Google
                      </motion.span>
                    ) : (
                      <motion.span
                        key="g-load"
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Loader2 size={13} className={reduceMotion ? '' : 'animate-spin'} aria-hidden="true" />
                        Signing in...
                        <span className="sr-only" role="status" aria-live="polite">
                          Signing in with Google, please wait.
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <AnimatePresence>
                  {googleError && (
                    <InlineMessage
                      id="google-error"
                      type="error"
                      title={googleError.title}
                      message={googleError.message}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5 xs:my-6" role="separator" aria-orientation="horizontal">
                <div className="flex-1 h-px bg-text-light/25 dark:bg-text-dark/25" aria-hidden="true" />
                <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-text-light/65 dark:text-text-dark/65">
                  or
                </span>
                <div className="flex-1 h-px bg-text-light/25 dark:bg-text-dark/25" aria-hidden="true" />
              </div>

              {/* Email + magic link */}
              <motion.div className="flex flex-col gap-2" variants={fadeUp}>
                <div>
                  <label
                    htmlFor="email-input"
                    className="block text-[10px] tracking-[0.14em] uppercase mb-1.5 font-mono font-bold text-text-light/80 dark:text-text-dark/80"
                  >
                    Email address
                  </label>
                  <motion.div
                    key={shakeKey}
                    animate={emailError && !reduceMotion ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (magicError) setMagicError(null)
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleMagicLink(e)}
                      placeholder="you@school.org"
                      disabled={magicState === 'sent'}
                      autoComplete="email"
                      required
                      aria-invalid={emailError}
                      aria-describedby={emailError ? 'email-field-error' : magicError ? 'magic-error' : undefined}
                      className={`w-full px-3.5 py-3 text-[13px] outline-none transition-all duration-200 font-mono bg-white dark:bg-accent-dark text-text-light dark:text-text-dark placeholder:text-text-light/55 dark:placeholder:text-text-dark/55 border disabled:opacity-50 min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        emailError
                          ? 'border-red-600 dark:border-red-400 shadow-[0_0_0_3px_rgba(220,38,38,0.12)] focus-visible:outline-red-600 dark:focus-visible:outline-red-400'
                          : 'border-text-light/40 dark:border-text-dark/40 focus:border-secondary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(0,162,209,0.12)] focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark'
                      }`}
                    />
                  </motion.div>

                  <AnimatePresence>
                    {emailError && (
                      <motion.p
                        id="email-field-error"
                        role="alert"
                        className="text-[11px] mt-1.5 tracking-wide font-mono font-bold text-red-700 dark:text-red-400"
                        initial={reduceMotion ? false : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        Enter a valid email address
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Magic link button ↔ success */}
                <AnimatePresence mode="wait" initial={false}>
                  {magicState !== 'sent' ? (
                    <motion.button
                      key="magic-btn"
                      onClick={handleMagicLink}
                      disabled={magicState === 'loading'}
                      aria-label="Send magic link sign-in email"
                      aria-busy={magicState === 'loading'}
                      aria-describedby={magicError ? 'magic-error' : undefined}
                      className="w-full flex items-center justify-center gap-2.5 px-4 xs:px-5 py-3 text-[11px] font-bold tracking-widest uppercase font-mono border border-secondary-light dark:border-primary-dark bg-secondary-light dark:bg-primary-dark text-white dark:text-accent-dark hover:bg-secondary-light/90 dark:hover:bg-primary-dark/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark min-h-11"
                      whileHover={
                        !reduceMotion && magicState === 'idle'
                          ? { y: -1, boxShadow: '0 6px 24px rgba(0,162,209,0.25)' }
                          : {}
                      }
                      whileTap={!reduceMotion && magicState === 'idle' ? { y: 0 } : {}}
                      transition={{ duration: 0.15 }}
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {magicState === 'idle' ? (
                          <motion.span
                            key="idle"
                            className="flex items-center gap-2.5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Zap size={13} strokeWidth={2.5} aria-hidden="true" /> Send Magic Link
                          </motion.span>
                        ) : (
                          <motion.span
                            key="loading"
                            className="flex items-center gap-2.5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Loader2 size={13} className={reduceMotion ? '' : 'animate-spin'} aria-hidden="true" />
                            Sending...
                            <span className="sr-only" role="status" aria-live="polite">
                              Sending magic link, please wait.
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="sent"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      role="status"
                      aria-live="polite"
                    >
                      <InlineMessage
                        type="success"
                        title="Check your inbox"
                        message={`We sent a sign-in link to ${email}.`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Magic link send error */}
                <AnimatePresence>
                  {magicError && (
                    <InlineMessage
                      id="magic-error"
                      type="error"
                      title={magicError.title}
                      message={magicError.message}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 xs:px-9 py-4 text-[11px] tracking-wide font-mono border-t border-text-light/20 dark:border-text-dark/20 text-text-light/70 dark:text-text-dark/70 transition-colors duration-300">
              <span>
                First time?{' '}
                <span className="text-text-light dark:text-text-dark font-bold">Sign in to create your account</span>
              </span>
              <a
                href="/privacy"
                className="font-bold underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
              >
                Privacy
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
