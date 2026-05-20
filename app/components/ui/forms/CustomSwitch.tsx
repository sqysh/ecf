import { FormName, setInputs } from '@/app/lib/store/slices/formSlice'
import { store } from '@/app/lib/store/store'

type Props = {
  checked: boolean
  value: any
  disabled?: boolean
  formName: FormName
  label?: string
  id?: string
}

export default function CustomSwitch({ checked, value, formName, disabled = false, label, id = 'switch' }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 mt-1">
      {label && (
        <label
          htmlFor={id}
          className="font-mono text-[11px] text-text-light/50 dark:text-text-dark/40 cursor-pointer select-none"
        >
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && store.dispatch(setInputs({ formName, data: { [value]: !checked } }))}
        className={`
          relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${checked ? 'bg-secondary-light dark:bg-secondary-dark' : 'bg-border-subtle dark:bg-border-dark'}
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark
        `}
      >
        <span
          className={`
            inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200
            ${checked ? 'translate-x-4.5' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  )
}
