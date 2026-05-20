export function FormField({
  label,
  id,
  children,
  error
}: {
  label: string
  id: string
  children: React.ReactNode
  error?: any
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] tracking-widest uppercase text-text-light/40 dark:text-text-dark/35 mb-1.5"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1 font-mono text-[11px] text-red-500/80 dark:text-red-400/80">{error}</p>}
    </div>
  )
}

export const inputClass =
  'w-full px-3.5 py-2.5 font-mono text-sm outline-none bg-white dark:bg-accent-dark text-text-light dark:text-text-dark border border-border-subtle dark:border-border-dark focus:border-primary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(201,243,31,0.08)] transition-all duration-200 placeholder:text-text-light/25 dark:placeholder:text-text-dark/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark'
