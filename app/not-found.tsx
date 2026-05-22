'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Home, ArrowLeft, Search, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PrimaryButton } from './components/ui/buttons/PrimaryButton'

export default function NotFound() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center space-y-8 sm:space-y-10"
      >
        {/* Eyebrow */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-secondary-light dark:text-secondary-dark"
        >
          {'// error 404'}
        </motion.p>

        {/* 404 number */}
        <motion.div
          initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={reduceMotion ? { duration: 0.3 } : { delay: 0.2, type: 'spring', stiffness: 180, damping: 18 }}
        >
          <h1
            className="font-mono font-bold leading-none text-secondary-light dark:text-primary-dark tracking-tight"
            style={{ fontSize: 'clamp(5rem, 18vw, 11rem)' }}
            aria-label="404"
          >
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 sm:space-y-4"
        >
          <h2 className="font-mono text-2xl xs:text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark">
            Page not found
          </h2>
          <p className="font-mono text-sm sm:text-base text-text-light/85 dark:text-text-dark/80 max-w-lg mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-md mx-auto"
        >
          <Link href="/" className="flex-1">
            <PrimaryButton type="button" loading={false} leadingIcon={Home} aria-label="Go to homepage">
              Go Home
            </PrimaryButton>
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            aria-label="Go back to the previous page"
            className="flex-1 flex items-center justify-center gap-2 px-4 xs:px-5 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-neutral-300 dark:border-border-dark text-text-light dark:text-text-dark hover:border-text-light/60 dark:hover:border-text-dark/60 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark min-h-11"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Go Back
          </button>
        </motion.div>

        {/* Helpful links */}
        <motion.nav
          aria-label="Other places to look"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-8 border-t border-neutral-200 dark:border-border-dark"
        >
          <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65 mb-4">
            You might be looking for
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center font-mono text-xs">
            {[
              { href: '/who-we-are/about', label: 'About Us' },
              { href: '/our-work/impact', label: 'Impact' },
              { href: '/donate', label: 'Donate' },
              { href: '/contact', label: 'Contact' }
            ].map((link, i, arr) => (
              <li key={link.href} className="flex items-center gap-x-4">
                <Link
                  href={link.href}
                  className="font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                >
                  {link.label}
                </Link>
                {i < arr.length - 1 && (
                  <span aria-hidden="true" className="text-text-light/55 dark:text-text-dark/50">
                    •
                  </span>
                )}
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* Contact card */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-md mx-auto bg-white/50 dark:bg-accent-dark/40 border border-neutral-200 dark:border-border-dark p-5 sm:p-6 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <Search className="w-5 h-5 text-secondary-light dark:text-primary-dark shrink-0" aria-hidden="true" />
            <p className="font-mono text-sm font-bold text-text-light dark:text-text-dark">
              Can&apos;t find what you need?
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
          >
            Contact us and we&apos;ll help you out
            <ArrowRight size={11} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
