'use client'

import { setCloseContactDrawer } from '@/app/lib/store/slices/uiSlice'
import { store, useUiSelector } from '@/app/lib/store/store'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, MapPin, Mail, Phone, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import LogoHorizontalDark from '@/public/svg/LogoHorizontalDark'
import { useLockBodyScroll } from '@/app/lib/hooks/useLockBodyScroll'
import { useUserRole } from '@/app/lib/hooks/useUserRole'
import Link from 'next/link'
import { headerNavLinks } from '@/app/lib/constants/navigation.constants'
import { MotionLink } from '../ui/media/MotionLink'
import Picture from '../ui/media/Picture'
import { PrimaryButton } from '../ui/buttons/PrimaryButton'
import { NavAccordion } from './NavAccordion'
import { SOCIAL_MEDIA_DATA } from '@/app/lib/constants/shared.constants'
import { SectionHeading } from './SectionHeading'

export default function ContactDrawer() {
  const { contactDrawer } = useUiSelector()
  const { isAdmin, isSupporter } = useUserRole()
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  const onClose = () => store.dispatch(setCloseContactDrawer())
  useLockBodyScroll(contactDrawer)

  const navLinks = headerNavLinks(pathname ?? '/')

  // Focus management: when drawer opens, save current focus + move to close button.
  // When it closes, restore focus to whatever triggered it.
  useEffect(() => {
    if (contactDrawer) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement
      // Defer focus to next tick so the drawer is actually rendered/animated in
      const t = setTimeout(() => closeButtonRef.current?.focus(), 50)
      return () => clearTimeout(t)
    } else if (previouslyFocusedRef.current) {
      previouslyFocusedRef.current.focus()
      previouslyFocusedRef.current = null
    }
  }, [contactDrawer])

  // Escape key closes the drawer.
  useEffect(() => {
    if (!contactDrawer) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [contactDrawer])

  // Focus trap — Tab/Shift+Tab loops inside the drawer.
  useEffect(() => {
    if (!contactDrawer || !drawerRef.current) return
    const drawer = drawerRef.current

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    drawer.addEventListener('keydown', handleKey)
    return () => drawer.removeEventListener('keydown', handleKey)
  }, [contactDrawer])

  return (
    <AnimatePresence>
      {contactDrawer && (
        <>
          {/* Overlay */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={reduceMotion ? { x: 0, opacity: 0 } : { x: '100%' }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={reduceMotion ? { duration: 0.15 } : { type: 'spring', damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation and contact"
            className="fixed right-0 top-0 h-full w-full sm:w-96 max-w-full bg-bg-light dark:bg-bg-dark border-l border-neutral-200 dark:border-border-dark z-50 overflow-y-auto"
          >
            {/* Close */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute top-4 right-4 p-2 bg-white dark:bg-accent-dark border border-neutral-300 dark:border-border-dark hover:border-secondary-light dark:hover:border-secondary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark min-h-11 min-w-11 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-text-light dark:text-text-dark" aria-hidden="true" />
            </button>

            <div className="px-6 xs:px-8 pt-16 pb-8 flex flex-col gap-8">
              {/* Logo */}
              <MotionLink href="/" onClick={onClose} aria-label="Education Comes First — home">
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
              <p className="font-mono text-xs text-text-light/85 dark:text-text-dark/80 leading-relaxed">
                Empowering students through educational programs, mentorship, and community support. We believe in
                unlocking potential and building brighter futures for every student.
              </p>

              <div aria-hidden="true" className="border-t border-neutral-200 dark:border-border-dark" />

              {/* Navigation */}
              <nav aria-label="Primary">
                <SectionHeading>Navigate</SectionHeading>
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <NavAccordion
                      key={link.linkKey}
                      text={link.textKey}
                      href={link.linkKey}
                      isActive={link.isActive}
                      dropdown={link.dropdown}
                      onLinkClick={onClose}
                      reduceMotion={!!reduceMotion}
                    />
                  ))}
                </div>
              </nav>

              <div aria-hidden="true" className="border-t border-neutral-200 dark:border-border-dark" />

              {/* Email */}
              <div>
                <SectionHeading>Email</SectionHeading>
                <a
                  href="mailto:info@educationcomesfirst.org"
                  className="flex items-center gap-2 font-mono text-xs font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  info@educationcomesfirst.org
                </a>
              </div>

              <div aria-hidden="true" className="border-t border-neutral-200 dark:border-border-dark" />

              {/* Social */}
              <div>
                <SectionHeading>Follow Us</SectionHeading>
                <div className="flex items-center gap-2">
                  {SOCIAL_MEDIA_DATA.map((i) => {
                    const Icon = i.icon
                    return (
                      <a
                        key={i.label}
                        href={i.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow Education Comes First on Facebook (opens in new tab)"
                        className="w-9 h-9 border border-neutral-300 dark:border-border-dark flex items-center justify-center text-text-light/75 dark:text-text-dark/70 hover:border-secondary-light hover:text-secondary-light dark:hover:border-secondary-dark dark:hover:text-secondary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                      >
                        <Icon />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* CTA */}
              <Link href="/contact" onClick={onClose} className="block">
                <PrimaryButton
                  type="button"
                  loading={false}
                  trailingIcon={ArrowRight}
                  aria-label="Get in touch with Education Comes First"
                >
                  Let&apos;s Talk
                </PrimaryButton>
              </Link>

              {/* Auth link */}
              <div className="text-center">
                <Link
                  href={isAdmin ? '/admin/dashboard' : isSupporter ? '/member/portal' : '/login'}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-bold tracking-wide text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                >
                  {isAdmin ? 'Dashboard' : isSupporter ? 'Member Portal' : 'Login'}{' '}
                  <ArrowRight size={11} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
