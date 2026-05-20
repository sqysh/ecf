import { backdropVariants, panelVariants } from '@/app/lib/constants/motion.constants'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export type TModalShell = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
}

export type ModalType = 'add-card' | 'one-time' | 'recurring' | null

export function ModalShell({ open, onClose, title, description, children }: TModalShell) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-end xs:items-center justify-center px-4 pb-4 xs:pb-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby={description ? 'modal-description' : undefined}
            className="w-full max-w-md bg-bg-light dark:bg-bg-dark border border-border-subtle dark:border-border-dark"
            onClick={(e) => e.stopPropagation()}
            aria-hidden="false"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between px-5 xs:px-6 py-5 border-b border-border-subtle dark:border-border-dark">
              <div>
                <h2 id="modal-title" className="font-mono text-sm font-bold text-text-light dark:text-text-dark">
                  {title}
                </h2>
                {description && (
                  <p
                    id="modal-description"
                    className="font-mono text-[11px] text-text-light/40 dark:text-text-dark/35 mt-1 tracking-wide"
                  >
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 text-text-light/35 dark:text-text-dark/30 hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark -mt-0.5 -mr-0.5 min-h-9 min-w-9 flex items-center justify-center"
              >
                <X size={15} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-5 xs:px-6 py-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
