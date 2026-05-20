import { FormName } from '@/app/lib/store/slices/formSlice'
import { useFormSelector } from '@/app/lib/store/store'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type Props = {
  formName: FormName
}

export function FormError({ formName }: Props) {
  const { forms } = useFormSelector()
  const inputs = forms?.[formName]?.inputs

  return (
    <AnimatePresence>
      {inputs?.error && (
        <motion.p
          key="error"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          role="alert"
          aria-live="assertive"
          className="font-mono text-[11px] tracking-wide text-red-400 flex items-start gap-2"
        >
          <X size={12} strokeWidth={2.5} aria-hidden="true" className="shrink-0 mt-0.5" />
          {inputs.error}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
