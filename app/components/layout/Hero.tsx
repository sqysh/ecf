'use client'

import { motion } from 'framer-motion'
import ScrollDown from '../ui/buttons/ScrollDown'
import SocialSidebar from '../features/home/SocialSidebar'
import { containerVariants, itemVariants } from '@/app/lib/constants/motion.constants'
import AnimatedTextFill from '../features/home/AnimatedTextFill'
import PlayButton from '../ui/buttons/PlayButton'

export const Hero = () => {
  return (
    <div className="w-full h-80 sm:h-112 md:h-128 lg:h-220 overflow-hidden relative flex justify-center">
      {/* Video Background */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-130"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <source src="/videos/ecf-hero.mp4" type="video/mp4" />
      </motion.video>
      <ScrollDown />
      <SocialSidebar />

      {/* Overlay Gradient */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-white/30 via-white/10 to-white/30 dark:from-black/50 dark:via-black/70 dark:to-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="max-w-container w-full px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col justify-center items-start h-full space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[128px] font-black leading-tight sm:leading-snug md:leading-none"
              variants={itemVariants}
            >
              Empowering Youth through{' '}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
              >
                <AnimatedTextFill />
              </motion.span>
            </motion.div>

            <motion.p
              className="text-white text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              Education Comes First partners with nonprofit youth organizations to ensure learning continues beyond the
              classroom.
            </motion.p>
          </motion.div>

          {/* Play Button */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <PlayButton />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
