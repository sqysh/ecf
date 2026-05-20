import { type AuthErrorInfo } from '@/app/lib/utils/error.utils'
import { motion } from 'framer-motion'

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
  return (
    <motion.div
      id={id}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-2.5 px-4 py-3 text-[11px] font-mono tracking-wide border ${
        isError
          ? 'border-red-400/30 bg-red-400/6 text-red-400'
          : 'border-primary-light/30 dark:border-primary-dark/30 bg-primary-light/6 dark:bg-primary-dark/6 text-primary-light dark:text-primary-dark'
      }`}
    >
      {Icon && (
        <span className="mt-px shrink-0" aria-hidden="true">
          <Icon size={13} strokeWidth={2.5} />
        </span>
      )}
      <span>
        {title && <span className="block font-bold mb-0.5">{title}</span>}
        <span className={title ? 'opacity-80' : ''}>{message}</span>
      </span>
    </motion.div>
  )
}
