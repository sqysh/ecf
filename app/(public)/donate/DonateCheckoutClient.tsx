'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Picture from '@/app/components/ui/media/Picture'
import { MotionLink } from '@/app/components/ui/media/MotionLink'
import LogoHorizontalDark from '@/public/svg/LogoHorizontalDark'
import { useSession } from 'next-auth/react'
import { store, useFormSelector } from '@/app/lib/store/store'
import { createFormActions, setInputs } from '@/app/lib/store/slices/formSlice'
import { useEffect, useState } from 'react'
import { updateUserName } from '@/app/lib/actions/updateUserName'
import { CheckoutStepIndicator } from '../../components/features/donate/CheckoutStepIndicator'
import { donateCheckoutStepLabels, impactItems } from '@/app/lib/constants/donate.constants'
import { CheckoutStep1 } from '@/app/components/features/donate/CheckoutStep1'
import { CheckoutStep2 } from '@/app/components/features/donate/CheckoutStep2'
import { CheckoutStep3 } from '@/app/components/features/donate/CheckoutStep3'

export default function DonateCheckoutClient({ savedCards, name }: any) {
  const reduceMotion = useReducedMotion()
  // ── Store ───────────────────────────────────────────────────────────────────
  const session = useSession()
  const isAuthed = session.status === 'authenticated'
  const { forms } = useFormSelector()
  const { handleInput, setErrors } = createFormActions('donateCheckoutForm', store.dispatch)

  // ── Derived ─────────────────────────────────────────────────────────────────
  const hasUserInfo = !!(name?.firstName?.trim() && name?.lastName?.trim())
  const inputs = forms?.donateCheckoutForm?.inputs
  const errors = forms?.donateCheckoutForm?.errors

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [step, setStep] = useState(() => {
    if (!isAuthed) return 1
    if (hasUserInfo) return 3
    return 2
  })

  // ── Effects ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    store.dispatch(setInputs({ formName: 'donateCheckoutForm', data: { ...name } }))
  }, [name])

  const handleStep2 = async () => {
    if (inputs?.firstName && inputs?.lastName) {
      await updateUserName({ firstName: inputs.firstName, lastName: inputs.lastName })
    }
    setStep(3)
  }

  return (
    <div className="min-h-dvh bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-border-subtle dark:border-border-dark px-4 xs:px-6 md:px-12 py-5 xs:py-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col xs:flex-row xs:items-center justify-between gap-4"
          >
            {/* Logo */}
            <MotionLink href="/" className="w-40 xs:w-48 h-auto shrink-0">
              <Picture
                src="/svg/logo-horizontal-light.svg"
                alt="Education Comes First"
                className="dark:hidden block w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                priority={true}
              />
              <LogoHorizontalDark />
            </MotionLink>

            {/* Heading */}
            <div>
              <h1 className="font-mono text-lg xs:text-xl font-bold text-text-light dark:text-text-dark leading-tight">
                Empower Students
              </h1>
              <p className="font-mono text-[11px] text-text-light/45 dark:text-text-dark/40 tracking-wide mt-0.5">
                501(c)(3) Nonprofit Organization
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 xs:px-6 py-10 xs:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xs:gap-12 items-start">
          {/* ── Left — Impact stats ─────────────────────────────────────────── */}
          <motion.aside
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-1"
            aria-label="Donation impact"
          >
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase font-bold text-text-light/65 dark:text-text-dark/65 mb-4">
              Your impact
            </p>
            <div className="border border-neutral-200 dark:border-border-dark divide-y divide-neutral-200 dark:divide-border-dark">
              {impactItems.map(({ amount, description }) => (
                <div key={amount} className="px-4 py-3.5">
                  <p className="font-mono text-xl font-bold text-secondary-light dark:text-primary-dark">{amount}</p>
                  <p className="font-mono text-[11px] text-text-light/75 dark:text-text-dark/70 mt-0.5 tracking-wide leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            {/* Trust badge */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/60 text-center mt-6"
            >
              501(c)(3) Nonprofit Organization
            </motion.p>
          </motion.aside>

          {/* Right Column - Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            {/* Step Indicator */}
            <CheckoutStepIndicator
              current={step}
              total={donateCheckoutStepLabels.length}
              labels={donateCheckoutStepLabels}
            />

            {/* Sign In */}
            {step === 1 && <CheckoutStep1 redirectTo="/donate" />}

            {/* User Info */}
            {step === 2 && (
              <CheckoutStep2
                onSubmit={handleStep2}
                isLoading={false}
                errors={errors}
                handleInput={handleInput}
                inputs={inputs}
                setErrors={setErrors}
              />
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-2"
              >
                <div className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/50 px-4 xs:px-6 md:px-8 py-6 xs:py-8">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-light/35 dark:text-text-dark/30 mb-1">
                    {'// checkout'}
                  </p>
                  <h2 className="font-mono text-lg xs:text-xl font-bold text-text-light dark:text-text-dark mb-6 xs:mb-8">
                    Make Your Donation
                  </h2>

                  <CheckoutStep3 savedCards={savedCards} inputs={inputs} setStep={setStep} />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
