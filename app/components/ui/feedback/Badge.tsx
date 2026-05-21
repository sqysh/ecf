type Variant = 'success' | 'warning' | 'danger' | 'neutral' | 'info' | 'accent'

const variants: Record<Variant, string> = {
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  danger: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  neutral: 'bg-neutral-100 text-neutral-600 dark:bg-border-dark dark:text-neutral-300',
  info: 'bg-secondary-light/10 text-secondary-light dark:bg-secondary-dark/10 dark:text-secondary-dark',
  accent: 'bg-primary-dark/15 text-neutral-900 dark:text-primary-dark border border-primary-dark/30'
}

export default function Badge({
  variant = 'neutral',
  size = 'sm',
  children
}: {
  variant?: Variant
  size?: 'xs' | 'sm'
  children: React.ReactNode
}) {
  const sizeClass = size === 'xs' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5'
  return (
    <span className={`font-semibold uppercase tracking-wide whitespace-nowrap ${sizeClass} ${variants[variant]}`}>
      {children}
    </span>
  )
}
