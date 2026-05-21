import { fadeUp } from '@/app/lib/constants/motion.constants'
import { useReducedMotion, motion } from 'framer-motion'

export function Section({
  label,
  icon: Icon,
  action,
  children,
  custom = 0
}: {
  label: string
  icon: React.ElementType
  action?: React.ReactNode
  children: React.ReactNode
  custom?: number
}) {
  const reduceMotion = useReducedMotion()
  const id = `section-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <motion.section
      custom={custom}
      variants={reduceMotion ? undefined : fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      animate="visible"
      aria-labelledby={id}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon size={13} strokeWidth={2} aria-hidden="true" className="text-text-light/65 dark:text-text-dark/65" />
          <h2
            id={id}
            className="font-mono text-[10px] tracking-[0.18em] uppercase font-bold text-text-light/65 dark:text-text-dark/65"
          >
            {label}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </motion.section>
  )
}
