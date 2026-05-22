'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Home, ArrowLeft, Calendar, Scale, Mail, MapPin, ArrowRight } from 'lucide-react'
import { PrimaryButton } from '@/app/components/ui/buttons/PrimaryButton'

export default function TermsConditionsPage() {
  const reduceMotion = useReducedMotion()
  const lastUpdated = 'February 9, 2026'

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: `By accessing and using the Education Comes First website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.`
    },
    {
      id: 'use-license',
      title: 'Use License',
      content: `Permission is granted to temporarily download one copy of the materials on Education Comes First's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:`,
      list: [
        'Modify or copy the materials',
        'Use the materials for any commercial purpose or for any public display',
        'Attempt to reverse engineer any software contained on our website',
        'Remove any copyright or other proprietary notations from the materials',
        'Transfer the materials to another person or "mirror" the materials on any other server'
      ]
    },
    {
      id: 'donations',
      title: 'Donations and Payments',
      content: `All donations made through our website are processed securely through our payment partners. By making a donation, you agree to:`,
      list: [
        'Provide accurate payment information',
        'Ensure you have authorization to use the payment method provided',
        'Understand that all donations are final and non-refundable unless otherwise required by law',
        'Receive receipts and communications related to your donation',
        'Allow us to use your donation for our educational programs and operational costs'
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts',
      content: `When creating an account on our platform, you agree to:`,
      list: [
        'Provide accurate and complete information',
        'Maintain the security of your account credentials',
        'Notify us immediately of any unauthorized use of your account',
        'Accept responsibility for all activities that occur under your account',
        'Not share your account with others'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Protection',
      content: `Your privacy is important to us. Our collection and use of personal information is described in our Privacy Policy. By using our services, you consent to our collection and use of your data as outlined in that policy.`
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Education Comes First or its content suppliers and is protected by international copyright laws.`
    },
    {
      id: 'prohibited-uses',
      title: 'Prohibited Uses',
      content: `You may not use our website:`,
      list: [
        'In any way that violates any applicable federal, state, local, or international law',
        'To transmit any advertising or promotional material without our prior written consent',
        'To impersonate or attempt to impersonate Education Comes First or its employees',
        `To engage in any conduct that restricts or inhibits anyone's use of the website`,
        'To introduce viruses, trojans, worms, or other malicious code'
      ]
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      content: `The materials on Education Comes First's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.`
    },
    {
      id: 'limitations',
      title: 'Limitations of Liability',
      content: `In no event shall Education Comes First or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our website.`
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      content: `Education Comes First may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms and conditions.`
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      content: `These terms and conditions are governed by and construed in accordance with the laws of the State of Massachusetts, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: `If you have any questions about these Terms and Conditions, please contact us:`,
      contactInfo: {
        organization: 'Education Comes First',
        email: 'info@educationcomesfirst.org',
        address: 'Lynn, Massachusetts'
      }
    }
  ]

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-20 lg:py-24 border-b border-neutral-200 dark:border-border-dark"
        aria-labelledby="terms-heading"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <motion.nav
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[11px] tracking-wide mb-6"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 text-text-light/85 dark:text-text-dark/80 underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
            >
              <Home size={12} aria-hidden="true" />
              Home
            </Link>
            <span aria-hidden="true" className="text-text-light/55 dark:text-text-dark/50">
              /
            </span>
            <span aria-current="page" className="font-bold text-secondary-light dark:text-secondary-dark">
              Terms &amp; Conditions
            </span>
          </motion.nav>

          <div className="max-w-4xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-secondary-light dark:text-secondary-dark mb-3">
                {'// terms & conditions'}
              </p>

              <div className="flex items-center gap-3 mb-4">
                <div
                  aria-hidden="true"
                  className="w-11 h-11 border border-secondary-light/60 dark:border-primary-dark/60 bg-secondary-light/10 dark:bg-primary-dark/10 flex items-center justify-center shrink-0"
                >
                  <Scale className="w-5 h-5 text-secondary-light dark:text-primary-dark" aria-hidden="true" />
                </div>
                <h1 id="terms-heading" className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  Terms &amp; Conditions
                </h1>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 font-mono text-xs text-text-light/85 dark:text-text-dark/80"
            >
              <Calendar size={13} aria-hidden="true" />
              <span>
                Last updated: <span className="font-bold text-text-light dark:text-text-dark">{lastUpdated}</span>
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* ── Sidebar — TOC ─────────────────────────────────────── */}
            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4"
              aria-label="Table of contents"
            >
              <div className="lg:sticky lg:top-24">
                <div className="bg-white/50 dark:bg-accent-dark/40 border border-neutral-200 dark:border-border-dark p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-secondary-light dark:text-primary-dark" aria-hidden="true" />
                    <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-text-light dark:text-text-dark">
                      Table of Contents
                    </h2>
                  </div>

                  <nav aria-label="Terms sections">
                    <ul className="space-y-0.5">
                      {sections.map((section, index) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="flex items-center gap-2 font-mono text-xs text-text-light/85 dark:text-text-dark/80 hover:text-secondary-light dark:hover:text-secondary-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors py-2 px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                          >
                            <span
                              aria-hidden="true"
                              className="text-[10px] font-bold text-text-light/65 dark:text-text-dark/65 shrink-0"
                            >
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span>{section.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-border-dark">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                    >
                      <ArrowLeft size={12} aria-hidden="true" />
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* ── Content ───────────────────────────────────────────── */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-8"
            >
              {/* Intro banner */}
              <div className="mb-12 p-6 bg-white/50 dark:bg-accent-dark/40 border-l-2 border-secondary-light dark:border-primary-dark">
                <p className="font-mono text-sm text-text-light/85 dark:text-text-dark/80 leading-relaxed">
                  Please read these Terms and Conditions carefully before using the Education Comes First website and
                  services. These terms govern your access to and use of our services, and by accessing or using our
                  services, you agree to be bound by these terms.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                    aria-labelledby={`${section.id}-heading`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <span
                        aria-hidden="true"
                        className="shrink-0 w-9 h-9 border border-secondary-light/60 dark:border-primary-dark/60 bg-secondary-light/10 dark:bg-primary-dark/10 flex items-center justify-center font-mono text-xs font-bold text-secondary-light dark:text-primary-dark"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2
                        id={`${section.id}-heading`}
                        className="font-mono text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark leading-tight pt-1"
                      >
                        {section.title}
                      </h2>
                    </div>

                    <div className="pl-13">
                      <p className="font-mono text-sm sm:text-base leading-relaxed text-text-light/85 dark:text-text-dark/80 mb-4">
                        {section.content}
                      </p>

                      {section.list && (
                        <ul className="space-y-2.5 mb-6">
                          {section.list.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span
                                aria-hidden="true"
                                className="w-1 h-1 bg-secondary-light dark:bg-primary-dark mt-2.5 shrink-0"
                              />
                              <span className="font-mono text-sm sm:text-base text-text-light/85 dark:text-text-dark/80 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.contactInfo && (
                        <div className="mt-4 p-5 bg-white/50 dark:bg-accent-dark/40 border border-neutral-200 dark:border-border-dark">
                          <p className="font-mono text-sm font-bold text-text-light dark:text-text-dark mb-3">
                            {section.contactInfo.organization}
                          </p>
                          <div className="space-y-2">
                            <p className="font-mono text-sm text-text-light/85 dark:text-text-dark/80 flex items-center gap-2">
                              <Mail size={13} aria-hidden="true" className="shrink-0" />
                              <span>Email:</span>
                              <a
                                href={`mailto:${section.contactInfo.email}`}
                                className="font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                              >
                                {section.contactInfo.email}
                              </a>
                            </p>
                            <p className="font-mono text-sm text-text-light/85 dark:text-text-dark/80 flex items-center gap-2">
                              <MapPin size={13} aria-hidden="true" className="shrink-0" />
                              <span>{section.contactInfo.address}</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-border-dark">
                <div className="border border-neutral-200 dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 p-8 text-center">
                  <h3 className="font-mono text-xl font-bold text-text-light dark:text-text-dark mb-3">
                    Questions about our terms?
                  </h3>
                  <p className="font-mono text-sm text-text-light/85 dark:text-text-dark/80 mb-6 max-w-2xl mx-auto leading-relaxed">
                    If you have any questions or concerns about these Terms and Conditions, please don&apos;t hesitate
                    to reach out to us.
                  </p>
                  <div className="max-w-xs mx-auto">
                    <Link href="/contact" className="block">
                      <PrimaryButton
                        type="button"
                        loading={false}
                        trailingIcon={ArrowRight}
                        aria-label="Contact us about terms and conditions"
                      >
                        Contact Us
                      </PrimaryButton>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
