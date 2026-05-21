'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { RadioGroup, SelectableCard } from '../../ui/forms/RadioGroup'

// ─── Plan type ────────────────────────────────────────────────────────────
export type Plan = {
  id: string
  name: string
  amount: number
  description: string
  highlighted?: boolean
}

// ─── Props ────────────────────────────────────────────────────────────────
type PlansGridProps = {
  plans: Plan[]
  selectedPlan: string
  setSelectedPlan: (id: string) => void
  amount: number
  setAmount: (amount: number) => void
  customId: string // e.g. 'once-custom' | 'monthly-custom' | 'yearly-custom'
}

export function PlansGrid({ plans, selectedPlan, setSelectedPlan, amount, setAmount, customId }: PlansGridProps) {
  const reduceMotion = useReducedMotion()
  const values = plans.map((p) => p.id)

  const handleChange = (newId: string) => {
    setSelectedPlan(newId)
    const plan = plans.find((p) => p.id === newId)
    if (plan && newId !== customId) setAmount(plan.amount)
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-2"
    >
      <p
        id="plans-grid-label"
        className="font-mono text-[10px] tracking-[0.18em] uppercase font-bold text-text-light/65 dark:text-text-dark/65 mb-4"
      >
        Select a plan
      </p>

      <RadioGroup
        label="Select a plan"
        values={values}
        selectedValue={selectedPlan}
        onChange={handleChange}
        orientation="vertical"
        className="space-y-2"
      >
        {plans.map((plan) => {
          const active = selectedPlan === plan.id
          const isCustom = plan.id === customId

          return (
            <div key={plan.id}>
              <SelectableCard
                id={plan.id}
                highlighted={plan.highlighted}
                ariaLabel={
                  isCustom ? `${plan.name} — ${plan.description}` : `${plan.name}, ${plan.description}, $${plan.amount}`
                }
                className="px-4 py-3.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className={`font-mono text-sm font-bold ${
                          active ? 'text-text-light dark:text-text-dark' : 'text-text-light/85 dark:text-text-dark/80'
                        }`}
                      >
                        {plan.name}
                      </p>
                      {plan.highlighted && (
                        <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 border border-secondary-light/60 dark:border-secondary-dark/60 text-secondary-light dark:text-secondary-dark">
                          Popular
                        </span>
                      )}
                    </div>
                    <p
                      className={`font-mono text-[11px] mt-0.5 tracking-wide ${
                        active
                          ? 'text-text-light/80 dark:text-text-dark/75'
                          : 'text-text-light/70 dark:text-text-dark/65'
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {!isCustom && (
                    <p
                      className={`font-mono text-lg font-bold shrink-0 ${
                        active
                          ? 'text-secondary-light dark:text-primary-dark'
                          : 'text-text-light/75 dark:text-text-dark/70'
                      }`}
                    >
                      ${plan.amount}
                    </p>
                  )}
                </div>
              </SelectableCard>

              {/* Custom amount input — only renders when "custom" plan is active.
                  Lives outside the SelectableCard so the input gets its own
                  tab stop and the radio's keyboard semantics aren't disrupted. */}
              <AnimatePresence>
                {isCustom && active && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="relative mt-2">
                      <label htmlFor="custom-amount-input" className="sr-only">
                        Custom donation amount in dollars
                      </label>
                      <span
                        aria-hidden="true"
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-text-light/75 dark:text-text-dark/70"
                      >
                        $
                      </span>
                      <input
                        id="custom-amount-input"
                        type="number"
                        value={amount || ''}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        placeholder="Enter amount"
                        step="0.01"
                        min="1"
                        autoFocus
                        className="w-full pl-8 pr-4 py-2.5 font-mono text-sm outline-none bg-white dark:bg-accent-dark text-text-light dark:text-text-dark border border-neutral-300 dark:border-border-dark focus:border-secondary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(0,162,209,0.12)] transition-all duration-200 placeholder:text-text-light/55 dark:placeholder:text-text-dark/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark min-h-11"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </RadioGroup>
    </motion.div>
  )
}
