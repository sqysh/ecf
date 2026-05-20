import { motion } from 'framer-motion'

export default function ScrollDown() {
  return (
    <motion.div
      className="absolute left-2 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-8 sm:gap-10"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        className="text-white text-xs sm:text-sm font-bold tracking-widest uppercase"
        style={{ writingMode: 'sideways-lr', transform: 'rotate(180deg)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Scroll Down
      </motion.div>

      <motion.div
        className="w-px h-16 sm:h-20 bg-linear-to-t from-white to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      />
    </motion.div>
  )
}
