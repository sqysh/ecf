'use client'

import { fadeUpItem, staggerContainer } from '@/app/lib/constants/motion.constants'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface StatItem {
  title: string
  number: string
  description: string
}

const stats: StatItem[] = [
  {
    title: '$367,500',
    number: 'In grants have gone out to ECF partner sites in the fall of 2024',
    description: ''
  },
  {
    title: '2,894',
    number: 'Total members in ECF',
    description: ''
  },
  {
    title: '35,461',
    number: 'Total hours read by members in the fall of 2024',
    description: ''
  },
  {
    title: '33,172',
    number: 'Total hours spent on math by members in the fall of 2024',
    description: ''
  }
]

export default function ByTheNumbers() {
  return (
    <section
      className="w-full bg-bg-light dark:bg-bg-dark py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32 border-b border-border-subtle dark:border-border-dark"
      aria-labelledby="by-the-numbers-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {/* Header */}
          <div className="flex flex-col xs:flex-row xs:items-end justify-between gap-4 mb-10 xs:mb-14 pb-8 border-b border-border-subtle dark:border-border-dark">
            <div>
              <motion.p
                variants={fadeUpItem}
                aria-hidden="true"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
              >
                {'// impact'}
              </motion.p>
              <motion.h2
                id="by-the-numbers-heading"
                variants={fadeUpItem}
                className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                By the Numbers
              </motion.h2>
            </div>

            <motion.a
              variants={fadeUpItem}
              href="#"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widests uppercase text-text-light dark:text-text-dark border-b border-primary-light dark:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 w-fit pb-0.5 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15 }}
            >
              See our impact
              <ArrowRight size={12} aria-hidden="true" />
            </motion.a>
          </div>

          {/* Stats list */}
          <motion.div variants={staggerContainer} className="space-y-0">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpItem}
                className="grid grid-cols-1 xs:grid-cols-3 gap-3 xs:gap-6 py-6 xs:py-8 border-b border-border-subtle dark:border-border-dark last:border-0 group cursor-default"
              >
                <p
                  className="font-mono font-bold text-text-light dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-200 leading-none"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  {stat.title}
                </p>

                <p className="font-mono text-[13px] xs:text-sm text-text-light/55 dark:text-text-dark/50 xs:col-span-2 leading-relaxed tracking-wide self-center">
                  {stat.number}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
