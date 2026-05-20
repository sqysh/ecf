import { FC } from 'react'
export const DonationTypeSelection: FC<{
  donationType: string
  setDonationType: (donationType: 'once' | 'monthly' | 'yearly') => void
  setSelectedPlan: (selectedPlan: string) => void
}> = ({ donationType, setDonationType, setSelectedPlan }) => {
  const options: {
    type: 'once' | 'monthly' | 'yearly'
    plan: string
    label: string
    sub: string
  }[] = [
    { type: 'once', plan: 'once_friend', label: 'One-Time', sub: 'Single donation' },
    { type: 'monthly', plan: 'monthly_supporter', label: 'Monthly', sub: 'Recurring support' },
    { type: 'yearly', plan: 'yearly-3000', label: 'Yearly', sub: 'Annual subscription' }
  ]

  return (
    <div className="grid sm:grid-cols-3 gap-2 mb-8">
      {options.map(({ type, plan, label, sub }) => {
        const active = donationType === type
        return (
          <button
            key={type}
            type="button"
            aria-pressed={active}
            onClick={() => {
              setSelectedPlan(plan)
              setDonationType(type)
            }}
            className={`p-3 border text-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark ${
              active
                ? 'border-primary-light dark:border-primary-dark bg-primary-light/6 dark:bg-primary-dark/6'
                : 'border-border-subtle dark:border-border-dark bg-transparent hover:border-text-light/20 dark:hover:border-text-dark/20'
            }`}
          >
            <p
              className={`font-mono text-sm font-bold tracking-wide ${
                active ? 'text-text-light dark:text-text-dark' : 'text-text-light/60 dark:text-text-dark/50'
              }`}
            >
              {label}
            </p>
            <p
              className={`font-mono text-[11px] mt-0.5 tracking-wide ${
                active ? 'text-text-light/50 dark:text-text-dark/45' : 'text-text-light/35 dark:text-text-dark/30'
              }`}
            >
              {sub}
            </p>
          </button>
        )
      })}
    </div>
  )
}
