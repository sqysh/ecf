export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ComponentType<{ className?: string }>
  accent?: boolean
}) {
  return (
    <div className="bg-white dark:bg-accent-dark border border-neutral-200 dark:border-border-dark p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {label}
        </span>
        <div
          className={`w-8 h-8 flex items-center justify-center ${
            accent
              ? 'bg-primary-dark/15 text-neutral-900 dark:text-primary-dark'
              : 'bg-neutral-100 dark:bg-border-dark text-neutral-600 dark:text-neutral-300'
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-3xl font-bold leading-none text-neutral-900 dark:text-text-dark">{value}</p>
      {sub && <p className="text-xs text-neutral-500 dark:text-neutral-400">{sub}</p>}
    </div>
  )
}
