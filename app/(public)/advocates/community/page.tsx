'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Heart, Globe, Users, BookOpen, Cpu, Handshake } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/app/lib/constants/motion.constants'

const partners = [
  {
    name: 'Spectrum Cable (Tabula Rasa)',
    description: 'Supporting digital literacy and technology access for students.',
    icon: Cpu,
    color: 'secondary',
    index: '01'
  },
  {
    name: 'PBS',
    description:
      'Enhancing educational pilot programming through reading, technology, media, and interactive learning.',
    icon: Globe,
    color: 'primary',
    index: '02'
  },
  {
    name: 'Tutoring & Therapeutic Schools',
    description: 'Providing specialized academic and mental health support for students who need it most.',
    icon: Heart,
    color: 'secondary',
    index: '03'
  },
  {
    name: 'Bentley University',
    description: 'Engaging college students in mentorship and tutoring initiatives that inspire the next generation.',
    icon: Users,
    color: 'primary',
    index: '04'
  },
  {
    name: 'Panda Express',
    description: 'Funding incentive-based programs through generous sponsorships and employee volunteerism.',
    icon: Handshake,
    color: 'secondary',
    index: '05'
  },
  {
    name: 'Lynn Labs for LEAP',
    description: 'Fostering STEM education and hands-on learning experiences for youth in our programs.',
    icon: Cpu,
    color: 'primary',
    index: '06'
  },
  {
    name: 'First Books',
    description: 'Supplying high-quality books to encourage literacy and a love for reading to support our work.',
    icon: BookOpen,
    color: 'secondary',
    index: '07'
  },
  {
    name: 'Haverhill Promise',
    description: 'Strengthening community-wide literacy efforts to create lasting change for young learners.',
    icon: Heart,
    color: 'primary',
    index: '08'
  }
]

const contributions = [
  { label: 'Financial Contributions', color: 'primary' },
  { label: 'Volunteer Work', color: 'secondary' },
  { label: 'Shared Expertise', color: 'primary' },
  { label: 'Strategic Collaboration', color: 'secondary' },
  { label: 'Sponsorships', color: 'primary' },
  { label: 'Mentorship', color: 'secondary' }
]

// ─── Shared layout ────────────────────────────────────────────────────────────
const sectionPad = 'py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32'
const innerWidth = 'max-w-5xl mx-auto'

export default function CommunityPartnersPage() {
  return (
    <main className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark overflow-x-hidden">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}>
        <div className={innerWidth}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col gap-6">
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <p
                aria-hidden="true"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark"
              >
                {'// education comes first'}
              </p>
              <h1
                className="font-mono font-bold leading-none text-text-light dark:text-text-dark"
                style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
              >
                <span className="block">Community</span>
                <span className="block relative">
                  Partners
                  <motion.span
                    aria-hidden="true"
                    className="absolute bottom-1 left-0 h-2 xs:h-3 bg-primary-light dark:bg-primary-dark -z-10 opacity-50"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
                  />
                </span>
                <span className="block text-transparent" style={{ WebkitTextStroke: '2px currentColor' }}>
                  & Relations
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="font-mono text-[13px] xs:text-sm text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide max-w-xl"
            >
              The strength of our impact comes from the incredible support of our community partners — through
              sponsorships, volunteer efforts, shared resources, and strategic collaborations.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col xs:flex-row items-start xs:items-center gap-4">
              <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }}>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
                >
                  Become a partner <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </motion.div>

              <nav
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
                <span className="text-secondary-light dark:text-secondary-dark">Community Partners</span>
              </nav>
            </motion.div>
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
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-mono font-bold text-[11px] tracking-widests uppercase text-accent-dark px-8 flex items-center gap-5"
            >
              Spectrum <span className="opacity-30">✦</span> PBS <span className="opacity-30">✦</span> Bentley
              University <span className="opacity-30">✦</span> Panda Express <span className="opacity-30">✦</span> Lynn
              Labs <span className="opacity-30">✦</span> First Books <span className="opacity-30">✦</span> Haverhill
              Promise <span className="opacity-30">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Intro + stat callout ───────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="network-heading"
      >
        <div className={innerWidth}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-5"
            >
              <motion.div variants={fadeUp}>
                <p
                  aria-hidden="true"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
                >
                  {'// our network'}
                </p>
                <h2
                  id="network-heading"
                  className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  A Growing Network <span className="text-primary-light dark:text-primary-dark">of Change-Makers</span>
                </h2>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                Over the years, we&apos;ve cultivated strong relationships with leaders across five states and Puerto
                Rico, each contributing to our mission in meaningful ways — from funding programs to mentoring youth
                directly.
              </motion.p>

              {/* Contribution tags */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {contributions.map((c) => (
                  <span
                    key={c.label}
                    className={`font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 border ${
                      c.color === 'primary'
                        ? 'border-primary-light/30 dark:border-primary-dark/30 text-primary-light dark:text-primary-dark bg-primary-light/6 dark:bg-primary-dark/6'
                        : 'border-secondary-light/30 dark:border-secondary-dark/30 text-secondary-light dark:text-secondary-dark bg-secondary-light/6 dark:bg-secondary-dark/6'
                    }`}
                  >
                    {c.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Stat callout */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-8 py-10 xs:py-14 flex flex-col items-center text-center">
                <p
                  className="font-mono font-bold text-primary-light dark:text-primary-dark leading-none mb-3"
                  style={{ fontSize: 'clamp(4rem, 12vw, 7rem)' }}
                >
                  8
                </p>
                <p className="font-mono text-sm font-bold uppercase tracking-widests text-text-light dark:text-text-dark mb-3">
                  Community Partners
                </p>
                <p className="font-mono text-[11px] tracking-wide text-text-light/45 dark:text-text-dark/40 max-w-xs leading-relaxed">
                  Each partner broadens our reach and deepens our impact across 5 states and Puerto Rico.
                </p>
              </div>
              {/* Offset border */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-full h-full border border-primary-light/20 dark:border-primary-dark/20 -z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Partners grid ──────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} bg-accent/20 dark:bg-accent-dark/20 border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="partners-heading"
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
              {'// partners'}
            </motion.p>
            <motion.h2
              id="partners-heading"
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Those Who <span className="text-primary-light dark:text-primary-dark">Make It Possible</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 xs:grid-cols-2 gap-px bg-border-subtle dark:bg-border-dark border border-border-subtle dark:border-border-dark"
          >
            {partners.map((partner, i) => {
              const isPrimary = partner.color === 'primary'
              return (
                <motion.div
                  key={partner.name}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="bg-bg-light dark:bg-bg-dark px-6 xs:px-8 py-7 xs:py-9 group hover:bg-white/70 dark:hover:bg-accent-dark/60 transition-colors duration-200 flex flex-col gap-5 relative overflow-hidden"
                >
                  {/* Index + icon */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-9 h-9 border flex items-center justify-center ${
                        isPrimary
                          ? 'border-primary-light/30 dark:border-primary-dark/30 bg-primary-light/6 dark:bg-primary-dark/6'
                          : 'border-secondary-light/30 dark:border-secondary-dark/30 bg-secondary-light/6 dark:bg-secondary-dark/6'
                      }`}
                    >
                      <partner.icon
                        size={14}
                        strokeWidth={2}
                        aria-hidden="true"
                        className={
                          isPrimary
                            ? 'text-primary-light dark:text-primary-dark'
                            : 'text-secondary-light dark:text-secondary-dark'
                        }
                      />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-text-light/20 dark:text-text-dark/15 tracking-widests">
                      {partner.index}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-mono text-base xs:text-lg font-bold uppercase mb-2 text-text-light dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-200 leading-tight">
                      {partner.name}
                    </h3>
                    <p className="font-mono text-[12px] xs:text-[13px] text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide">
                      {partner.description}
                    </p>
                  </div>

                  {/* Animated bottom line */}
                  <div
                    aria-hidden="true"
                    className="h-px w-0 group-hover:w-full bg-primary-light dark:bg-primary-dark transition-all duration-500 mt-auto"
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Together we create change ──────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="together-heading"
      >
        <div className={innerWidth}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-5"
            >
              <motion.div variants={fadeUp}>
                <p
                  aria-hidden="true"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
                >
                  {'// our mission'}
                </p>
                <h2
                  id="together-heading"
                  className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  Together, We Create <span className="text-primary-light dark:text-primary-dark">Lasting Change</span>
                </h2>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                These partnerships broaden our reach, deepen our impact, and create lasting opportunities for young
                learners.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                Our mission is to inspire youngsters to realize their full potential by furthering their education
                outside of the classroom — particularly by enhancing their performance in mathematics, reading, and
                social development.
              </motion.p>

              <motion.a
                variants={fadeUp}
                href="/contact-us"
                className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widests uppercase text-text-light dark:text-text-dark border-b border-primary-light dark:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 pb-0.5 w-fit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                Explore opportunities <ArrowRight size={12} aria-hidden="true" />
              </motion.a>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-3"
              role="region"
              aria-label="Impact statistics"
            >
              {[
                { value: '8', label: 'Community partners', accent: 'primary' },
                { value: '5+', label: 'States reached', accent: 'secondary' },
                { value: '26', label: 'Partner sites', accent: 'secondary' },
                { value: '2,800+', label: 'Youth impacted', accent: 'primary' }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 hover:border-primary-light/30 dark:hover:border-primary-dark/30 px-4 xs:px-5 py-5 xs:py-6 transition-colors duration-200"
                >
                  <p
                    className={`font-mono font-bold leading-none mb-1.5 ${
                      item.accent === 'primary'
                        ? 'text-primary-light dark:text-primary-dark'
                        : 'text-secondary-light dark:text-secondary-dark'
                    }`}
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                  >
                    {item.value}
                  </p>
                  <p className="font-mono text-[10px] tracking-widests uppercase text-text-light/40 dark:text-text-dark/35">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className={sectionPad} aria-labelledby="community-cta-heading">
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
                {'// support the future'}
              </p>
              <h2
                id="community-cta-heading"
                className="font-mono font-bold text-text-light dark:text-text-dark mb-2"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
              >
                Support the Future <span className="text-primary-light dark:text-primary-dark">of Learning</span>
              </h2>
              <p className="font-mono text-[12px] tracking-wide text-text-light/50 dark:text-text-dark/45 max-w-md leading-relaxed">
                Contact us today to explore partnership opportunities and help us continue empowering the next
                generation.
              </p>
            </div>
            <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }}>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11 shrink-0"
              >
                Contact us <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
