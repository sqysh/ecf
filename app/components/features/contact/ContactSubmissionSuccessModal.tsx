import { setCloseContactSubmissionSuccessModal } from '@/app/lib/store/slices/uiSlice'
import { store, useUiSelector } from '@/app/lib/store/store'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'

export default function ContactSubmissionSuccessModal() {
  const onClose = () => store.dispatch(setCloseContactSubmissionSuccessModal())
  const { contactSubmissionSuccessModal } = useUiSelector()

  return (
    <AnimatePresence>
      {contactSubmissionSuccessModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark p-5 xs:p-6 sm:p-8 md:p-10 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-text-light/40 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-4 sm:mb-6"
            >
              <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-secondary-light dark:text-secondary-dark" />
            </motion.div>

            {/* Title */}
            <h3 className="text-center font-mono text-xl xs:text-2xl sm:text-3xl font-medium text-text-light dark:text-text-dark mb-3">
              Message Sent Successfully
            </h3>

            {/* Message */}
            <p className="text-center font-mono text-sm text-text-light/55 dark:text-text-dark/50 mb-6 sm:mb-8 px-2">
              Thanks for reaching out! We&apos;ll review your message and get back to you shortly.
            </p>

            {/* Button */}
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-primary-light dark:bg-primary-dark text-black font-mono text-sm font-medium hover:opacity-85 transition-opacity"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
