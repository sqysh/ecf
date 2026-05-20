import { MotionLink } from '../media/MotionLink'

// ─── Ghost link ─────────────────────────────────────────────────────────────
export function GhostLink({
  href,
  children,
  'aria-label': ariaLabel
}: {
  href: string
  children: React.ReactNode
  'aria-label'?: string
}) {
  return (
    <MotionLink
      href={href}
      aria-label={ariaLabel}
      className="flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-[11px] font-bold tracking-widest uppercase border border-border-subtle dark:border-border-dark text-text-light/60 dark:text-text-dark/50 hover:text-text-light dark:hover:text-text-dark hover:border-text-light/25 dark:hover:border-text-dark/25 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-10"
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </MotionLink>
  )
}
