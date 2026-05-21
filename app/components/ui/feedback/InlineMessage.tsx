'use client'

import { AuthErrorInfo } from '@/app/lib/utils/error.utils'
import { motion, useReducedMotion } from 'framer-motion'

export function InlineMessage({
  type,
  title,
  message,
  id,
  icon: Icon
}: {
  type: 'success' | 'error'
  message: string
  title?: string
  id?: string
  icon?: AuthErrorInfo['icon']
}) {
  const isError = type === 'error'
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      id={id}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      initial={reduceMotion ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-2.5 px-4 py-3 text-[11px] font-mono tracking-wide border ${
        isError
          ? 'border-red-600/70 bg-red-50 text-red-700 dark:border-red-400/50 dark:bg-red-400/10 dark:text-red-400'
          : 'border-secondary-light/70 bg-secondary-light/10 text-secondary-light-strong dark:border-primary-dark/50 dark:bg-primary-dark/10 dark:text-primary-dark'
      }`}
    >
      {Icon && (
        <span className="mt-px shrink-0" aria-hidden="true">
          <Icon size={13} strokeWidth={2.5} />
        </span>
      )}
      <span>
        {title && <span className="block font-bold mb-0.5">{title}</span>}
        <span>{message}</span>
      </span>
    </motion.div>
  )
}
