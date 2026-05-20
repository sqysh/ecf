import { FormName, setInputs } from '@/app/lib/store/slices/formSlice'
import { store, useFormSelector } from '@/app/lib/store/store'
import { Heart } from 'lucide-react'

export function CoverFeesToggle({ formName, processingFee }: { formName: FormName; processingFee: number }) {
  const { forms } = useFormSelector()
  const inputs = forms?.[formName]?.inputs
  const checked = !!inputs?.coverFees

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => store.dispatch(setInputs({ formName, data: { coverFees: !checked } }))}
      className={`w-full flex items-center justify-between gap-3 xs:gap-4 px-4 py-3 border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark ${
        checked
          ? 'border-primary-light dark:border-primary-dark bg-primary-light/6 dark:bg-primary-dark/6'
          : 'border-border-subtle dark:border-border-dark bg-transparent hover:border-text-light/20 dark:hover:border-text-dark/20'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 text-left min-w-0">
        <Heart
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className={`shrink-0 transition-colors duration-200 ${
            checked ? 'text-primary-light dark:text-primary-dark' : 'text-text-light/35 dark:text-text-dark/30'
          }`}
        />
        <div className="min-w-0 flex-1">
          <p
            className={`font-mono text-[11px] font-bold tracking-wide truncate ${
              checked ? 'text-text-light dark:text-text-dark' : 'text-text-light/60 dark:text-text-dark/50'
            }`}
          >
            Cover processing fees
          </p>
          <p className="font-mono text-[10px] tracking-wide text-text-light/35 dark:text-text-dark/30 truncate mt-0.5">
            Add ${processingFee.toFixed(2)} so 100% goes to the cause
          </p>
        </div>
      </div>

      {/* Toggle */}
      <div
        aria-hidden="true"
        className={`w-9 h-5 relative shrink-0 border transition-colors duration-200 ${
          checked
            ? 'bg-primary-light dark:bg-primary-dark border-primary-light dark:border-primary-dark'
            : 'bg-transparent border-border-subtle dark:border-border-dark'
        }`}
      >
        <div
          className={`w-3.5 h-3.5 absolute top-0.5 transition-all duration-200 ${
            checked ? 'left-4.5 bg-accent-dark' : 'left-0.5 bg-text-light/25 dark:bg-text-dark/25'
          }`}
        />
      </div>
    </button>
  )
}
