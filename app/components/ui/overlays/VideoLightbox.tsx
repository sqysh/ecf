import { useUI } from '@/app/lib/hooks/useUI'
import { useUiSelector } from '@/app/lib/store/store'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function VideoLightbox() {
  const { videoLightbox, videoUrl } = useUiSelector()
  const { closeVideoLightbox } = useUI()

  return (
    <>
      <AnimatePresence>
        {videoLightbox && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Container */}
            <motion.div
              onClick={closeVideoLightbox}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="relative w-full max-w-4xl bg-bg-dark rounded-md sm:rounded-lg overflow-hidden shadow-2xl">
                {/* Video Container */}
                <div className="relative w-full bg-black aspect-video">
                  <video
                    autoPlay
                    controls
                    className="w-full h-full text-xs sm:text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                </div>

                {/* Close Button */}
                <motion.button
                  onClick={closeVideoLightbox}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-text-light/20 dark:bg-primary-dark/20 hover:bg-text-light/40 dark:hover:bg-primary-dark/40 flex items-center justify-center transition-colors shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close video"
                >
                  <X size={20} className="text-white sm:w-6 sm:h-6" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
