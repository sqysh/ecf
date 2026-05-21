export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-neutral-200 dark:border-border-dark">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  )
}
