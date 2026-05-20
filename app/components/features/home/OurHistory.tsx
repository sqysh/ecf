'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Picture from '../ui/media/Picture'

export default function OurHistory() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const stats = [
    { number: '20+', label: 'Years of Vision' },
    { number: '2,800+', label: 'Youth Served' },
    { number: '26', label: 'Partner Sites' }
  ]

  return (
    <section
      className="w-full bg-bg-light dark:bg-bg-dark py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32 border-b border-border-subtle dark:border-border-dark"
      aria-labelledby="our-history-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-10 xs:mb-14">
            <div className="flex items-center gap-4 mb-4">
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
                {'// since 2021'}
              </p>
            </div>
            <h2
              id="our-history-heading"
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Our Story
            </h2>
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6 mb-6 xs:mb-8">
            {/* Image */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.15 }}
              className="lg:col-span-2 relative overflow-hidden h-72 xs:h-96 lg:h-full min-h-80 border border-border-subtle dark:border-border-dark"
            >
              <Picture
                src="/images/img-12.jpg"
                alt="The Conway family, founders of Education Comes First"
                className="w-full h-full object-cover"
                priority={false}
                width={800}
                height={600}
              />
            </motion.div>

            {/* Stats column */}
            <motion.div variants={containerVariants} className="flex flex-col gap-3 xs:gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 hover:border-primary-light/40 dark:hover:border-primary-dark/40 px-5 py-5 xs:py-6 transition-colors duration-200"
                >
                  <p
                    className="font-mono font-bold text-primary-light dark:text-primary-dark leading-none mb-2"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                  >
                    {stat.number}
                  </p>
                  <p className="font-mono text-[11px] tracking-wide text-text-light/50 dark:text-text-dark/45">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Content block */}
          <motion.div
            variants={containerVariants}
            className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-5 xs:px-8 py-6 xs:py-8"
          >
            <motion.p
              variants={itemVariants}
              className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide mb-5 max-w-3xl"
            >
              The vision for Education Comes First began over 20 years ago with Mike, Phyllis, and Christian Conway, who
              dreamed of creating equal educational opportunities for children in under-resourced communities. In 2021,
              with Brian and Grace, that dream became reality.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide mb-7 max-w-3xl"
            >
              Today, we empower 2,800+ youth across 26 partner sites in five states, helping them become leaders, stay
              on track to graduate, and explore meaningful futures through college, trades, or other pathways.
            </motion.p>

            <motion.a
              variants={itemVariants}
              href="/our-history"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widests uppercase text-text-light dark:text-text-dark border-b border-primary-light dark:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 pb-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15 }}
            >
              Explore our full history
              <ArrowRight size={12} aria-hidden="true" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
