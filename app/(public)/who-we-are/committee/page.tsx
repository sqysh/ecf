'use client'

import { fadeUp, staggerContainer } from '@/app/lib/constants/motion.constants'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const members = [
  {
    name: 'Brian Theirrien',
    role: 'Grant Manager, Advocate of ECF',
    quote:
      "We're here to support inspiring organizations who believe in our mission by providing the tools they need to enhance their classroom activities."
  },
  { name: 'Tim Demakes', role: 'President' },
  { name: 'Susan F. Altamore Carusi', role: 'Secretary' },
  { name: 'Steven G. Stewart', role: 'Treasurer' },
  { name: 'Michael H. Conway', role: 'Board Member' },
  { name: 'Nick Meninno', role: 'Board Member' },
  { name: 'Brendan Ward', role: 'Board Member' },
  { name: 'Adriana Moschella', role: 'Board Member' },
  { name: 'Dan Cahill', role: 'Board Member' },
  { name: 'Grace Duran', role: 'Administrative Assistant' }
]

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .map((n) => n[0])
    .join('')

const tickerItems = ['Connect', 'Support', 'Partner', 'Sponsor', 'Donate', 'Education Comes First']

// ─── Shared layout constants ──────────────────────────────────────────────────
const sectionPad = 'py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32'
const innerWidth = 'max-w-5xl mx-auto'

export default function ExecutiveAdvocacyCommittee() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}>
        <div className={innerWidth}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col gap-4">
            <motion.p
              variants={fadeUp}
              aria-hidden="true"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark"
            >
              {'// leadership'}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(1.75rem, 6vw, 5rem)' }}
            >
              Executive Advocacy Committee
            </motion.h1>

            {/* Breadcrumb */}
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-text-light/40 dark:text-text-dark/35"
            >
              <Link
                href="/"
                className="hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
              >
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-secondary-light dark:text-secondary-dark">Executive Advocacy Committee</span>
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* ── Ticker ─────────────────────────────────────────────────────────── */}
      <div
        className="bg-primary-light dark:bg-primary-dark overflow-hidden py-2.5 border-b border-primary-light/20 dark:border-primary-dark/20"
        aria-hidden="true"
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-0 whitespace-nowrap"
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="font-mono font-bold text-[11px] tracking-widest uppercase text-accent-dark px-6 flex items-center gap-4"
            >
              {item}
              <span className="text-accent-dark/40">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Members grid ───────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="members-heading"
      >
        <div className={innerWidth}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-8 xs:mb-12"
          >
            <motion.p
              variants={fadeUp}
              aria-hidden="true"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
            >
              {'// our team'}
            </motion.p>
            <motion.h2
              id="members-heading"
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
            >
              Committee Members
            </motion.h2>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4">
            <AnimatePresence mode="popLayout">
              {members.map((member, index) =>
                member.name === 'Brian Theirrien' ? (
                  /* Brian — featured wide card */
                  <div
                    key={member.name}
                    className="col-span-1 xs:col-span-2 lg:col-span-3 xl:col-span-4 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4"
                  >
                    {/* Avatar card */}
                    <motion.div
                      layout
                      custom={index}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 16 }}
                      className="border border-border-subtle dark:border-border-dark overflow-hidden"
                    >
                      <div className="aspect-video bg-accent dark:bg-accent-dark flex items-center justify-center relative">
                        <span
                          className="font-mono font-bold text-text-light/8 dark:text-text-dark/8 select-none absolute"
                          style={{ fontSize: 'clamp(4rem, 10vw, 6rem)' }}
                          aria-hidden="true"
                        >
                          {getInitials(member.name)}
                        </span>
                        <span
                          className="font-mono font-bold text-secondary-light dark:text-secondary-dark relative z-10 select-none"
                          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
                          aria-hidden="true"
                        >
                          {getInitials(member.name)}
                        </span>
                      </div>
                      <div className="px-4 py-3.5 bg-white/50 dark:bg-accent-dark/50 border-t border-border-subtle dark:border-border-dark">
                        <p className="font-mono font-bold text-sm text-text-light dark:text-text-dark">{member.name}</p>
                        <p className="font-mono text-[10px] tracking-wide text-primary-light dark:text-primary-dark mt-0.5">
                          {member.role}
                        </p>
                      </div>
                    </motion.div>

                    {/* Quote card */}
                    <motion.div
                      layout
                      custom={index + 1}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 16 }}
                      className="col-span-1 xl:col-span-3 border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-5 xs:px-8 py-6 xs:py-8 flex flex-col justify-between gap-4"
                    >
                      {/* Quote mark */}
                      <div aria-hidden="true" className="flex flex-col gap-2 shrink-0">
                        <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark" />
                        <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-50" />
                        <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-20" />
                      </div>
                      <p className="font-mono text-sm xs:text-base lg:text-lg text-text-light/65 dark:text-text-dark/60 leading-relaxed tracking-wide flex-1">
                        {member.quote}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  /* Regular member card */
                  <motion.div
                    key={member.name}
                    layout
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 16 }}
                    className="border border-border-subtle dark:border-border-dark overflow-hidden group hover:border-secondary-light/40 dark:hover:border-secondary-dark/40 transition-colors duration-200"
                  >
                    <div className="aspect-video bg-accent dark:bg-accent-dark flex items-center justify-center relative">
                      <span
                        className="font-mono font-bold text-text-light/8 dark:text-text-dark/8 select-none absolute"
                        style={{ fontSize: 'clamp(4rem, 10vw, 6rem)' }}
                        aria-hidden="true"
                      >
                        {getInitials(member.name)}
                      </span>
                      <span
                        className="font-mono font-bold text-secondary-light dark:text-secondary-dark relative z-10 select-none group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-200"
                        style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
                        aria-hidden="true"
                      >
                        {getInitials(member.name)}
                      </span>
                    </div>
                    <div className="px-4 py-3.5 bg-white/50 dark:bg-accent-dark/50 border-t border-border-subtle dark:border-border-dark">
                      <p className="font-mono font-bold text-sm text-text-light dark:text-text-dark">{member.name}</p>
                      <p className="font-mono text-[10px] tracking-wide text-secondary-light dark:text-secondary-dark mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className={sectionPad} aria-labelledby="eac-cta-heading">
        <div className={innerWidth}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-6 xs:px-10 py-8 xs:py-12 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-6"
          >
            <div>
              <p
                aria-hidden="true"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
              >
                {'// get involved'}
              </p>
              <h2
                id="eac-cta-heading"
                className="font-mono font-bold text-text-light dark:text-text-dark mb-2"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
              >
                Want to support ECF?
              </h2>
              <p className="font-mono text-[12px] tracking-wide text-text-light/50 dark:text-text-dark/45">
                Contact us if you&apos;d like to support, partner, or become a sponsor.
              </p>
            </div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11 shrink-0"
              >
                Contact us <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
