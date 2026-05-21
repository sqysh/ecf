'use client'

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3" role="separator" aria-orientation="horizontal">
      <div className="flex-1 h-px bg-neutral-200 dark:bg-border-dark" aria-hidden="true" />
      <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65">
        or
      </span>
      <div className="flex-1 h-px bg-neutral-200 dark:bg-border-dark" aria-hidden="true" />
    </div>
  )
}
