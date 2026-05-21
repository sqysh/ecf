export function StatusPill({ status }: { status: string }) {
  const active = status === 'active' || status === 'succeeded'

  return (
    <span
      className={`font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border ${
        active
          ? 'border-secondary-light/60 dark:border-primary-dark/60 text-secondary-light dark:text-primary-dark bg-secondary-light/10 dark:bg-primary-dark/10'
          : 'border-neutral-300 dark:border-border-dark text-text-light/75 dark:text-text-dark/70 bg-transparent'
      }`}
    >
      {status}
    </span>
  )
}
