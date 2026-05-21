export function SectionCard({
  title,
  count,
  action,
  children
}: {
  title: string
  count?: string | number
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-accent-dark border border-neutral-200 dark:border-border-dark">
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-border-dark">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-text-dark">{title}</h2>
          {count !== undefined && (
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-border-dark px-2 py-0.5">
              {count}
            </span>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}
