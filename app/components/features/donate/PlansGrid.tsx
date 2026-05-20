import { motion, AnimatePresence } from 'framer-motion'

// ─── Plan type ────────────────────────────────────────────────────────────────
export type Plan = {
  id: string
  name: string
  amount: number
  description: string
  highlighted?: boolean
}

// ─── Props ────────────────────────────────────────────────────────────────────
type PlansGridProps = {
  plans: Plan[]
  selectedPlan: string
  setSelectedPlan: (id: string) => void
  amount: number
  setAmount: (amount: number) => void
  customId: string // e.g. 'once-custom' | 'monthly-custom' | 'yearly-custom'
}

export function PlansGrid({ plans, selectedPlan, setSelectedPlan, amount, setAmount, customId }: PlansGridProps) {
  const handleSelect = (plan: Plan) => {
    setSelectedPlan(plan.id)
    if (plan.id !== customId) setAmount(plan.amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-2"
    >
      <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-light/35 dark:text-text-dark/30 mb-4">
        Select a plan
      </p>

      <div className="space-y-2">
        {plans.map((plan) => {
          const active = selectedPlan === plan.id
          const isCustom = plan.id === customId
          const highlighted = plan.highlighted && !active

          return (
            <div key={plan.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => handleSelect(plan)}
                className={`w-full px-4 py-3.5 border text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark ${
                  active
                    ? 'border-primary-light dark:border-primary-dark bg-primary-light/6 dark:bg-primary-dark/6'
                    : highlighted
                      ? 'border-secondary-light/40 dark:border-secondary-dark/40 bg-secondary-light/4 dark:bg-secondary-dark/4 hover:border-secondary-light dark:hover:border-secondary-dark'
                      : 'border-border-subtle dark:border-border-dark bg-transparent hover:border-text-light/20 dark:hover:border-text-dark/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className={`font-mono text-sm font-bold ${
                          active ? 'text-text-light dark:text-text-dark' : 'text-text-light/70 dark:text-text-dark/60'
                        }`}
                      >
                        {plan.name}
                      </p>
                      {plan.highlighted && (
                        <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 border border-secondary-light/40 dark:border-secondary-dark/40 text-secondary-light dark:text-secondary-dark">
                          Popular
                        </span>
                      )}
                    </div>
                    <p
                      className={`font-mono text-[11px] mt-0.5 tracking-wide ${
                        active
                          ? 'text-text-light/50 dark:text-text-dark/45'
                          : 'text-text-light/35 dark:text-text-dark/30'
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {!isCustom && (
                    <p
                      className={`font-mono text-lg font-bold shrink-0 ${
                        active
                          ? 'text-primary-light dark:text-primary-dark'
                          : 'text-text-light/50 dark:text-text-dark/40'
                      }`}
                    >
                      ${plan.amount}
                    </p>
                  )}
                </div>
              </button>

              {/* Custom amount input */}
              <AnimatePresence>
                {isCustom && active && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="relative mt-2">
                      <span
                        aria-hidden="true"
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-text-light/40 dark:text-text-dark/35"
                      >
                        $
                      </span>
                      <input
                        type="number"
                        value={amount || ''}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        placeholder="Enter amount"
                        step="0.01"
                        min="1"
                        autoFocus
                        aria-label="Custom donation amount"
                        className="w-full pl-8 pr-4 py-2.5 font-mono text-sm outline-none bg-white dark:bg-accent-dark text-text-light dark:text-text-dark border border-border-subtle dark:border-border-dark focus:border-primary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(201,243,31,0.08)] transition-all duration-200 placeholder:text-text-light/25 dark:placeholder:text-text-dark/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
