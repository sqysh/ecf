import { FormName } from '@/app/lib/store/slices/formSlice'
import { useFormSelector } from '@/app/lib/store/store'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'

type Props = {
  formName: FormName
  isValid: boolean
  label: string
}

export function SubmitButton({ formName, isValid, label }: Props) {
  const { forms } = useFormSelector()
  const inputs = forms?.[formName]?.inputs
  const loading = !!inputs?.loading
  const ready = isValid && !loading

  return (
    <motion.button
      type="submit"
      disabled={!ready}
      aria-disabled={!ready}
      aria-busy={loading}
      whileHover={ready ? { y: -1, boxShadow: '0 6px 24px rgba(201,243,31,0.20)' } : {}}
      whileTap={ready ? { y: 0 } : {}}
      transition={{ duration: 0.15 }}
      className={`w-full flex items-center justify-center gap-2.5 px-6 py-3 font-mono text-[11px] font-bold tracking-[0.1em] uppercase border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11 ${
        ready
          ? 'border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark cursor-pointer'
          : 'border-border-subtle dark:border-border-dark bg-transparent text-text-light/25 dark:text-text-dark/20 cursor-not-allowed'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.span
            key="loading"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-live="polite"
          >
            <Loader2 size={13} className="animate-spin" aria-hidden="true" />
            Processing...
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {label}
            <ArrowRight size={13} aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
