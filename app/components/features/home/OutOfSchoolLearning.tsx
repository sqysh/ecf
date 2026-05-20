'use client'

import { motion } from 'framer-motion'
import { Scale, TrendingUp, Brain, Users } from 'lucide-react'

interface BenefitItem {
  icon: React.ReactNode
  title: string
  description: string
}

const benefits: BenefitItem[] = [
  {
    icon: <Scale className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />,
    title: 'Closes Achievement Gaps',
    description: ''
  },
  {
    icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />,
    title: 'Prevents Learning Loss',
    description: ''
  },
  {
    icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />,
    title: 'Inspires a Love of Learning',
    description: ''
  },
  {
    icon: <Users className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />,
    title: 'Builds Confidence & Social Skills',
    description: ''
  }
]

export default function OutOfSchoolLearning() {
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
      aria-labelledby="out-of-school-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <motion.p
              variants={itemVariants}
              aria-hidden="true"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
            >
              {'// why it matters'}
            </motion.p>

            <motion.h2
              id="out-of-school-heading"
              variants={itemVariants}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-tight mb-6 xs:mb-8"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Out of School Learning Matters
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed mb-5 tracking-wide"
            >
              Education doesn&apos;t end after the school day is over — children are always learning. Quality after
              school programs alongside summer camp day programs help students excel academically, build confidence in
              themselves, and develop essential life skills. Research has shown that students in these programs have
              better academic performance, graduate at a higher rate, and build a love of lifelong learning.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed mb-8 tracking-wide"
            >
              When we invest in after school learning, we are building a brighter future for our youth.
            </motion.p>

            <motion.a
              variants={itemVariants}
              href="#"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widests uppercase text-text-light dark:text-text-dark border-b border-primary-light dark:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 w-fit pb-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
            >
              More about Education Comes First
            </motion.a>
          </motion.div>

          {/* Right benefits grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4"
          >
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 hover:border-primary-light/40 dark:hover:border-primary-dark/40 p-4 xs:p-5 transition-colors duration-200"
              >
                <div
                  aria-hidden="true"
                  className="text-primary-light dark:text-primary-dark mb-4 inline-flex p-2 border border-primary-light/20 dark:border-primary-dark/20 bg-primary-light/6 dark:bg-primary-dark/6"
                >
                  {benefit.icon}
                </div>

                <h3 className="font-mono text-sm font-bold text-text-light dark:text-text-dark mb-2">
                  {benefit.title}
                </h3>
                {benefit.description && (
                  <p className="font-mono text-[11px] tracking-wide text-text-light/50 dark:text-text-dark/45 leading-relaxed">
                    {benefit.description}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
