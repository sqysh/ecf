export function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, string> = {
    SUPERUSER: 'bg-primary-dark/15 text-neutral-900 dark:text-primary-dark border border-primary-dark/30',
    ADMIN: 'bg-secondary-light/10 text-secondary-light dark:bg-secondary-dark/10 dark:text-secondary-dark',
    SUPPORTER: 'bg-neutral-100 text-neutral-600 dark:bg-border-dark dark:text-neutral-300'
  }
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 whitespace-nowrap ${
        styles[role] ?? styles.SUPPORTER
      }`}
    >
      {role}
    </span>
  )
}
