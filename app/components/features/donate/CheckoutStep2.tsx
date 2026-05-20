import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Loader2, User } from 'lucide-react'

export type TUserName = {
  firstName: string
  lastName: string
}

type ICheckoutStep2 = {
  onSubmit: any
  isLoading: boolean
  inputs: any
  setErrors: any
  handleInput: any
  errors: any
}

export function validateNameForm(inputs: TUserName, setErrors: (arg0: Partial<TUserName>) => void): boolean {
  const newErrors: Partial<TUserName> = {}
  if (!inputs?.firstName?.trim()) newErrors.firstName = 'First name is required'
  if (!inputs?.lastName?.trim()) newErrors.lastName = 'Last name is required'
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const inputClass =
  'w-full px-3.5 py-3 font-mono text-[13px] outline-none bg-white dark:bg-accent-dark text-text-light dark:text-text-dark placeholder:text-text-light/25 dark:placeholder:text-text-dark/20 border border-border-subtle dark:border-border-dark focus:border-primary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(201,243,31,0.08)] transition-all duration-200 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11'

export function CheckoutStep2({ onSubmit, isLoading = false, inputs, setErrors, handleInput, errors }: ICheckoutStep2) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validateNameForm(inputs, setErrors)) onSubmit()
  }

  return (
    <div className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/50 p-5 xs:p-8">
      {/* Header */}
      <p
        aria-hidden="true"
        className="font-mono text-[10px] tracking-[0.18em] uppercase text-secondary-light dark:text-secondary-dark mb-1"
      >
        {'// step 2'}
      </p>
      <h2 className="font-mono text-lg xs:text-xl font-bold text-text-light dark:text-text-dark mb-6 xs:mb-8">
        Your Information
      </h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-7">
        {/* ── Name ──────────────────────────────────────────────────────── */}
        <fieldset>
          <legend className="flex items-center gap-2 mb-4">
            <User size={13} strokeWidth={2} aria-hidden="true" className="text-text-light/35 dark:text-text-dark/30" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-light/35 dark:text-text-dark/30">
              Full name
            </span>
          </legend>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="block font-mono text-[10px] tracking-[0.14em] uppercase mb-1.5 text-text-light/45 dark:text-text-dark/40"
              >
                First name <span aria-hidden="true">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={inputs?.firstName ?? ''}
                onChange={handleInput}
                placeholder="Maria"
                autoComplete="given-name"
                aria-required="true"
                aria-invalid={!!errors?.firstName}
                aria-describedby={errors?.firstName ? 'firstName-error' : undefined}
                className={inputClass}
              />
              <AnimatePresence>
                {errors?.firstName && (
                  <motion.p
                    id="firstName-error"
                    role="alert"
                    className="font-mono text-[10px] tracking-wide text-red-400 mt-1.5"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.firstName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block font-mono text-[10px] tracking-[0.14em] uppercase mb-1.5 text-text-light/45 dark:text-text-dark/40"
              >
                Last name <span aria-hidden="true">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={inputs?.lastName ?? ''}
                onChange={handleInput}
                placeholder="Santos"
                autoComplete="family-name"
                aria-required="true"
                aria-invalid={!!errors?.lastName}
                aria-describedby={errors?.lastName ? 'lastName-error' : undefined}
                className={inputClass}
              />
              <AnimatePresence>
                {errors?.lastName && (
                  <motion.p
                    id="lastName-error"
                    role="alert"
                    className="font-mono text-[10px] tracking-wide text-red-400 mt-1.5"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.lastName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </fieldset>

        {/* ── Submit ────────────────────────────────────────────────────── */}
        <motion.button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
          whileHover={!isLoading ? { y: -1, boxShadow: '0 6px 24px rgba(201,243,31,0.20)' } : {}}
          whileTap={!isLoading ? { y: 0 } : {}}
          transition={{ duration: 0.15 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <motion.span
                key="loading"
                className="flex items-center gap-2.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 size={13} className="animate-spin" aria-hidden="true" /> Saving...
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                className="flex items-center gap-2.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Continue to Payment <ChevronRight size={13} aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </div>
  )
}
