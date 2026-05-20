import { useUI } from '@/app/lib/hooks/useUI'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export default function PlayButton() {
  const { openVideoLightbox } = useUI()
  const open = () => openVideoLightbox('/videos/ecf-2.mp4')

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulsing ring container */}
      <motion.div
        className="absolute inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full border-2 border-white dark:border-primary-dark"
        style={{
          width: 'clamp(3.5rem, 8vw, 5rem)',
          height: 'clamp(3.5rem, 8vw, 5rem)'
        }}
        animate={{
          scale: [1, 1.5],
          opacity: [1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeOut'
        }}
      />

      {/* Button */}
      <motion.button
        onClick={open}
        className="relative w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-white dark:bg-bg-dark shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Play video"
      >
        <Play size={32} className="text-text-light dark:text-primary-dark fill-current" strokeWidth={1.5} />
      </motion.button>
    </div>
  )
}
