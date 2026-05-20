'use client'

import { setCloseContactDrawer } from '@/app/lib/store/slices/uiSlice'
import { store, useUiSelector } from '@/app/lib/store/store'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Mail, Phone } from 'lucide-react'
import LogoHorizontalDark from '@/public/svg/LogoHorizontalDark'
import { useLockBodyScroll } from '@/app/lib/hooks/useLockBodyScroll'
import { useUserRole } from '@/app/lib/hooks/useUserRole'
import { MotionLink } from '../../ui/media/MotionLink'
import Picture from '../../ui/media/Picture'

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      fill="currentColor"
    />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      fill="currentColor"
    />
  </svg>
)

export default function ContactDrawer() {
  const { contactDrawer } = useUiSelector()
  const { isAdmin, isSupporter } = useUserRole()
  const onClose = () => store.dispatch(setCloseContactDrawer())
  useLockBodyScroll(contactDrawer)

  return (
    <AnimatePresence>
      {contactDrawer && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/50 dark:bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-80 bg-bg-light dark:bg-bg-dark border-l border-border-light dark:border-border-dark z-50 overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark hover:border-secondary-light dark:hover:border-secondary-dark transition-colors"
            >
              <X className="w-4 h-4 text-text-light dark:text-text-dark" />
            </button>

            <div className="px-8 pt-16 pb-8 flex flex-col gap-8">
              {/* Logo */}
              <MotionLink href="/" onClick={onClose}>
                <div className="w-32 sm:w-40">
                  <Picture
                    src="/svg/logo-horizontal-light.svg"
                    alt="Education Comes First"
                    className="dark:hidden block w-full h-full hover:opacity-80 transition-opacity"
                    priority={true}
                  />
                  <LogoHorizontalDark />
                </div>
              </MotionLink>

              {/* Description */}
              <p className="font-mono text-xs text-text-light/55 dark:text-text-dark/50 leading-relaxed">
                Empowering students through educational programs, mentorship, and community support. We believe in
                unlocking potential and building brighter futures for every student.
              </p>

              {/* Divider */}
              <div className="border-t border-border-light dark:border-border-dark" />

              {/* Address */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-light/35 dark:text-text-dark/30 mb-3">
                  Address
                </p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0 mt-0.5" />
                  <p className="font-mono text-xs text-text-light/70 dark:text-text-dark/60 leading-relaxed">
                    123 Education Street
                    <br />
                    Your City, ST 12345
                  </p>
                </div>
              </div>

              {/* Email */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-light/35 dark:text-text-dark/30 mb-3">
                  Email
                </p>

                <a
                  href="mailto:info@educationcomesfirst.org"
                  className="flex items-center gap-2 font-mono text-xs text-text-light/70 dark:text-text-dark/60 hover:text-secondary-light dark:hover:text-secondary-dark transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  info@educationcomesfirst.org
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-light/35 dark:text-text-dark/30 mb-3">
                  Call Now
                </p>

                <a
                  href="tel:+11234567890"
                  className="flex items-center gap-2 font-mono text-xs text-text-light/70 dark:text-text-dark/60 hover:text-secondary-light dark:hover:text-secondary-dark transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  +1 (123) 456-7890
                </a>
              </div>

              {/* Divider */}
              <div className="border-t border-border-light dark:border-border-dark" />

              {/* Social */}
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-border-light dark:border-border-dark flex items-center justify-center text-text-light/50 dark:text-text-dark/40 hover:border-secondary-light dark:hover:border-secondary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-border-light dark:border-border-dark flex items-center justify-center text-text-light/50 dark:text-text-dark/40 hover:border-secondary-light dark:hover:border-secondary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors"
                >
                  <LinkedInIcon />
                </a>
              </div>

              {/* CTA */}
              <MotionLink
                href="/contact"
                onClick={onClose}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-center gap-2 w-full bg-primary-light dark:bg-primary-dark text-black font-mono text-xs font-medium py-3 hover:opacity-85 transition-opacity"
              >
                Let&apos;s Talk →
              </MotionLink>

              {/* Auth link */}
              <div className="text-center">
                <MotionLink
                  href={isAdmin ? '/admin/dashboard' : '/login'}
                  onClick={onClose}
                  className="font-mono text-[10px] text-secondary-light dark:text-secondary-dark hover:opacity-75 transition-opacity"
                >
                  {isAdmin ? 'Dashboard' : isSupporter ? 'Member Portal' : 'Login'} →
                </MotionLink>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
