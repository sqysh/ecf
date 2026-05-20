'use client'

import { fadeUpItem, staggerContainer } from '@/app/lib/constants/motion.constants'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUp } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="w-full border-t border-border-subtle dark:border-border-dark">
      {/* Upper footer */}
      <div className="px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32 pt-16 xs:pt-20 lg:pt-24 pb-12 xs:pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Big heading */}
            <motion.h2
              variants={fadeUpItem}
              className="font-mono font-bold text-text-light dark:text-text-dark text-center leading-none mb-10 xs:mb-14 py-8 xs:py-10 border border-border-subtle dark:border-border-dark"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 9rem)' }}
            >
              GET IN TOUCH
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12 xs:mb-16">
              {/* Left */}
              <motion.div variants={staggerContainer} className="flex flex-col gap-4 xs:gap-5">
                <motion.p
                  variants={fadeUpItem}
                  className="font-mono text-[13px] xs:text-sm text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide"
                >
                  Education Comes First 501(C)(3) Nonprofit Organization EIN 87-3478137
                </motion.p>

                <motion.a
                  variants={fadeUpItem}
                  href="mailto:info@educationcomfirst.org"
                  className="font-mono text-sm xs:text-base font-bold text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 break-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark underline decoration-border-subtle dark:decoration-border-dark hover:decoration-primary-light dark:hover:decoration-primary-dark"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                >
                  info@educationcomfirst.org
                </motion.a>
              </motion.div>

              {/* Right links */}
              <motion.div variants={staggerContainer} className="grid grid-cols-1 xs:grid-cols-3 gap-3">
                {[
                  { label: 'Facebook', href: '#' },
                  { label: 'Partners', href: '#' },
                  { label: 'Donate', href: '/donate' }
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    variants={fadeUpItem}
                    href={link.href}
                    className="border border-border-subtle dark:border-border-dark hover:border-primary-light/40 dark:hover:border-primary-dark/40 px-4 py-5 xs:py-6 flex items-center justify-between gap-3 group transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="font-mono text-[11px] font-bold tracking-widests uppercase text-text-light/60 dark:text-text-dark/50 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-200">
                      {link.label}
                    </span>
                    <ArrowRight
                      size={12}
                      aria-hidden="true"
                      className="shrink-0 text-text-light/30 dark:text-text-dark/25 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-200"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div variants={fadeUpItem} className="h-px bg-border-subtle dark:bg-border-dark" />
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle dark:border-border-dark px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32 py-5 xs:py-6">
        <div className="max-w-5xl mx-auto flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
          <div className="font-mono text-[10px] tracking-wide text-text-light/30 dark:text-text-dark/25">
            <p>
              © 2026 <span className="text-primary-light dark:text-primary-dark">Education Comes First</span>. All
              rights reserved.
            </p>
            <p className="mt-1">
              Built by <span className="sqysh-gradient font-semibold">Sqysh</span>
            </p>
          </div>

          <div className="flex items-center gap-5 xs:gap-6">
            <Link
              href="/terms"
              className="font-mono text-[10px] tracking-wide text-text-light/30 dark:text-text-dark/25 hover:text-text-light dark:hover:text-text-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="font-mono text-[10px] tracking-wide text-text-light/30 dark:text-text-dark/25 hover:text-text-light dark:hover:text-text-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
            >
              Privacy Policy
            </Link>
          </div>

          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark flex items-center justify-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark self-end xs:self-auto"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ArrowUp size={14} aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
