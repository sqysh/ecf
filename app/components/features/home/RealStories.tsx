'use client'

import { motion } from 'framer-motion'

export default function RealStories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, easing: 'easeOut' }
    }
  }

  return (
    <section
      className="w-full py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32 border-b border-border-subtle dark:border-border-dark"
      aria-labelledby="real-stories-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {/* Tag line */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
            <motion.div
              aria-hidden="true"
              className="h-px w-16 bg-primary-light dark:bg-primary-dark shrink-0"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ originX: 'left' }}
            />
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
              {'// real stories, real impact'}
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="real-stories-heading"
            variants={itemVariants}
            className="font-mono font-bold text-text-light dark:text-text-dark leading-tight mb-8 xs:mb-12"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
          >
            Hear from the Oyster Bay ECF kids themselves how our reading and math programs are helping them grow!
          </motion.h2>

          {/* CTA */}
          <motion.a
            variants={itemVariants}
            href="#"
            className="inline-flex items-center gap-2.5 px-6 py-3 font-mono text-[11px] font-bold tracking-[0.1em] uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
            whileHover={{ y: -1, boxShadow: '0 6px 24px rgba(201,243,31,0.20)' }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.15 }}
          >
            Watch the video
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
