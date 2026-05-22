'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  Home,
  ArrowLeft,
  Calendar,
  Lock,
  Eye,
  Database,
  UserCheck,
  Mail,
  MapPin,
  ArrowRight
} from 'lucide-react'
import { PrimaryButton } from '@/app/components/ui/buttons/PrimaryButton'

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: Shield,
    content: `Education Comes First ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.`
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    icon: Database,
    content: `We may collect information about you in a variety of ways. The information we may collect on the website includes:`,
    subsections: [
      {
        title: 'Personal Data',
        content: `Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the website or when you choose to participate in various activities related to the website, such as making a donation or signing up for our newsletter.`
      },
      {
        title: 'Derivative Data',
        content: `Information our servers automatically collect when you access the website, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the website.`
      },
      {
        title: 'Financial Data',
        content: `Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you make a donation or purchase. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, Stripe, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.`
      },
      {
        title: 'Data from Social Networks',
        content: `User information from social networking sites, such as Google, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks.`
      }
    ]
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Your Information',
    icon: Eye,
    content: `Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:`,
    list: [
      'Create and manage your account',
      'Process your donations and send you receipts',
      'Email you regarding your account or donations',
      'Send you our newsletter and updates about our programs (with your consent)',
      'Improve our website and services',
      'Monitor and analyze usage and trends to improve your experience',
      'Notify you of updates to our website and services',
      'Respond to product and customer service requests',
      'Fulfill and manage donations and other transactions',
      'Generate a personal profile about you to make future visits more personalized',
      'Compile anonymous statistical data and analysis for use internally',
      'Prevent fraudulent transactions and protect against criminal activity'
    ]
  },
  {
    id: 'disclosure-of-information',
    title: 'Disclosure of Your Information',
    icon: UserCheck,
    content: `We may share information we have collected about you in certain situations. Your information may be disclosed as follows:`,
    subsections: [
      {
        title: 'By Law or to Protect Rights',
        content: `If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.`
      },
      {
        title: 'Third-Party Service Providers',
        content: `We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.`
      },
      {
        title: 'Business Transfers',
        content: `We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.`
      },
      {
        title: 'With Your Consent',
        content: `We may disclose your personal information for any other purpose with your consent.`
      }
    ]
  },
  {
    id: 'tracking-technologies',
    title: 'Tracking Technologies',
    icon: Eye,
    content: `We may use cookies, web beacons, tracking pixels, and other tracking technologies on the website to help customize the website and improve your experience. When you access the website, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the website.`
  },
  {
    id: 'third-party-websites',
    title: 'Third-Party Websites',
    icon: Link,
    content: `The website may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the website, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.`
  },
  {
    id: 'security',
    title: 'Security of Your Information',
    icon: Lock,
    content: `We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.`
  },
  {
    id: 'children-privacy',
    title: "Children's Privacy",
    icon: UserCheck,
    content: `We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.`
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    icon: Shield,
    content: `Depending on your location, you may have certain rights regarding your personal information:`,
    list: [
      'The right to access – You have the right to request copies of your personal data',
      'The right to rectification – You have the right to request that we correct any information you believe is inaccurate',
      'The right to erasure – You have the right to request that we erase your personal data, under certain conditions',
      'The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions',
      'The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions',
      'The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions'
    ]
  },
  {
    id: 'california-privacy',
    title: 'California Privacy Rights',
    icon: Shield,
    content: `California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year.`
  },
  {
    id: 'gdpr-compliance',
    title: 'GDPR Compliance',
    icon: Shield,
    content: `If you are from the European Economic Area (EEA), Education Comes First's legal basis for collecting and using the personal information described in this Privacy Policy depends on the personal information we collect and the specific context in which we collect it. We may process your personal information because:`,
    list: [
      'We need to perform a contract with you',
      'You have given us permission to do so',
      'The processing is in our legitimate interests and it is not overridden by your rights',
      'To comply with the law'
    ]
  },
  {
    id: 'do-not-track',
    title: 'Do Not Track',
    icon: Eye,
    content: `Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals.`
  },
  {
    id: 'policy-updates',
    title: 'Changes to This Privacy Policy',
    icon: Calendar,
    content: `We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.`
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: Shield,
    content: `If you have questions or comments about this Privacy Policy, please contact us at:`,
    contactInfo: {
      organization: 'Education Comes First',
      email: 'info@educationcomesfirst.org',
      address: 'Lynn, Massachusetts'
    }
  }
]

export default function PrivacyPolicyPage() {
  const reduceMotion = useReducedMotion()
  const lastUpdated = 'February 9, 2026'

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-20 lg:py-24 border-b border-neutral-200 dark:border-border-dark"
        aria-labelledby="privacy-heading"
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
              Privacy Policy
            </span>
          </motion.nav>

          <div className="max-w-4xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-secondary-light dark:text-secondary-dark mb-3">
                {'// privacy policy'}
              </p>

              <div className="flex items-center gap-3 mb-4">
                <div
                  aria-hidden="true"
                  className="w-11 h-11 border border-secondary-light/60 dark:border-primary-dark/60 bg-secondary-light/10 dark:bg-primary-dark/10 flex items-center justify-center shrink-0"
                >
                  <Shield className="w-5 h-5 text-secondary-light dark:text-primary-dark" aria-hidden="true" />
                </div>
                <h1 id="privacy-heading" className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  Privacy Policy
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
                    <Lock className="w-4 h-4 text-secondary-light dark:text-primary-dark" aria-hidden="true" />
                    <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-text-light dark:text-text-dark">
                      Quick Navigation
                    </h2>
                  </div>

                  <nav aria-label="Privacy policy sections">
                    <ul className="space-y-0.5">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="block font-mono text-xs text-text-light/85 dark:text-text-dark/80 hover:text-secondary-light dark:hover:text-secondary-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors py-2 px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                          >
                            {section.title}
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

                  {/* Privacy badge */}
                  <div className="mt-6 p-4 border border-secondary-light/40 dark:border-primary-dark/40 bg-secondary-light/10 dark:bg-primary-dark/10">
                    <div className="flex items-start gap-3">
                      <Shield
                        className="w-4 h-4 text-secondary-light dark:text-primary-dark shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light dark:text-text-dark mb-1.5">
                          Your Privacy Matters
                        </p>
                        <p className="font-mono text-[11px] text-text-light/85 dark:text-text-dark/80 leading-relaxed">
                          We are committed to protecting your personal information and being transparent about how we
                          use it.
                        </p>
                      </div>
                    </div>
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
              <div className="mb-12 p-6 border border-secondary-light/40 dark:border-primary-dark/40 bg-secondary-light/8 dark:bg-primary-dark/8">
                <div className="flex items-start gap-4">
                  <div
                    aria-hidden="true"
                    className="w-11 h-11 border border-secondary-light/60 dark:border-primary-dark/60 bg-secondary-light/10 dark:bg-primary-dark/10 flex items-center justify-center shrink-0"
                  >
                    <Shield className="w-5 h-5 text-secondary-light dark:text-primary-dark" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-mono text-lg font-bold text-text-light dark:text-text-dark mb-2">
                      Your privacy is our priority
                    </h3>
                    <p className="font-mono text-sm text-text-light/85 dark:text-text-dark/80 leading-relaxed">
                      At Education Comes First, we respect your privacy and are committed to protecting your personal
                      information. This policy explains how we collect, use, and safeguard your data when you interact
                      with our services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {sections.map((section) => (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                    aria-labelledby={`${section.id}-heading`}
                  >
                    <h2
                      id={`${section.id}-heading`}
                      className="font-mono text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark mb-4 leading-tight"
                    >
                      {section.title}
                    </h2>

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

                    {section.subsections && (
                      <div className="space-y-6 mt-6">
                        {section.subsections.map((subsection, i) => (
                          <div
                            key={i}
                            className="pl-4 border-l-2 border-secondary-light/40 dark:border-primary-dark/40"
                          >
                            <h3 className="font-mono text-base font-bold text-text-light dark:text-text-dark mb-2">
                              {subsection.title}
                            </h3>
                            <p className="font-mono text-sm text-text-light/85 dark:text-text-dark/80 leading-relaxed">
                              {subsection.content}
                            </p>
                          </div>
                        ))}
                      </div>
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
                  </article>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-border-dark">
                <div className="border border-neutral-200 dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 p-8 text-center">
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 border border-secondary-light/60 dark:border-primary-dark/60 bg-secondary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <Shield className="w-6 h-6 text-secondary-light dark:text-primary-dark" aria-hidden="true" />
                  </div>
                  <h3 className="font-mono text-xl font-bold text-text-light dark:text-text-dark mb-3">
                    Have privacy questions?
                  </h3>
                  <p className="font-mono text-sm text-text-light/85 dark:text-text-dark/80 mb-6 max-w-2xl mx-auto leading-relaxed">
                    If you have any questions or concerns about how we handle your personal information, we&apos;re here
                    to help.
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md mx-auto">
                    <Link href="/contact" className="flex-1">
                      <PrimaryButton
                        type="button"
                        loading={false}
                        trailingIcon={ArrowRight}
                        aria-label="Contact us about privacy questions"
                      >
                        Contact Us
                      </PrimaryButton>
                    </Link>

                    <Link
                      href="/terms"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-neutral-300 dark:border-border-dark text-text-light dark:text-text-dark hover:border-text-light/60 dark:hover:border-text-dark/60 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark min-h-11"
                    >
                      View Terms
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
