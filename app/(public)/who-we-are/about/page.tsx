'use client'

import Picture from '@/app/components/ui/media/Picture'
import { fadeUp, staggerContainer } from '@/app/lib/constants/motion.constants'
import { motion } from 'framer-motion'
import { Book, Calculator, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const focusAreas = [
  {
    icon: Book,
    title: 'Literacy',
    number: '01',
    description: 'Learning to read is a critical milestone that serves as the foundation for academic success.',
    bullets: [
      'Ensure literacy achievement by age 10',
      'Foster a lifelong love of learning through reading',
      'Help children discover diverse interests'
    ]
  },
  {
    icon: Calculator,
    title: 'Mathematics',
    number: '02',
    description: 'Mathematical education develops essential analytical and reasoning skills for critical thinking.',
    bullets: [
      'Develop analytical thinking and reasoning abilities',
      'Build critical thinking skills about the world',
      'Teach logical problem-solving approaches'
    ]
  },
  {
    icon: Users,
    title: 'Social Skills',
    number: '03',
    description:
      'Social development enables children to build meaningful relationships and maintain positive mental health.',
    bullets: [
      'Learn and practice healthy social behaviors',
      'Support mental health and personal interests',
      'Develop strong, positive relationship skills'
    ]
  }
]

// ─── Section padding shared class ─────────────────────────────────────────────
const sectionPad = 'py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32'
const innerWidth = 'max-w-5xl mx-auto'

export default function AboutECF() {
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
              {'// about us'}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              About Us
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
              <span className="text-secondary-light dark:text-secondary-dark">About Us</span>
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ────────────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="mission-heading"
      >
        <div className={innerWidth}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left — sticky label + CTA */}
            <div className="lg:col-span-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="lg:sticky lg:top-24 flex flex-col gap-6"
              >
                <motion.div variants={fadeUp}>
                  <p
                    aria-hidden="true"
                    className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
                  >
                    {'// our mission'}
                  </p>
                  <h2
                    id="mission-heading"
                    className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                  >
                    Inspiring Potential,{' '}
                    <span className="text-primary-light dark:text-primary-dark">Building Futures</span>
                  </h2>
                </motion.div>

                <motion.a
                  variants={fadeUp}
                  href="#opportunities"
                  className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-[0.1em] uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark w-fit transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
                  whileHover={{ y: -1, boxShadow: '0 6px 24px rgba(201,243,31,0.20)' }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  Learn more <ArrowRight size={12} aria-hidden="true" />
                </motion.a>
              </motion.div>
            </div>

            {/* Right — content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-8 flex flex-col gap-6"
            >
              {[
                'We at Education Comes First firmly stand by this. ECF is fueled with a passionate intent to provide the highest quality educational opportunities to underprivileged youth.',
                'Our mission is to work with and support organizations with grant funding whose target is ending learning poverty.',
                "Education Comes First's mission is to inspire kids to realize the depth of their potential by providing all the tools needed to further both their academic and social education outside of the classroom, seeing them achieve their full potential."
              ].map((text, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
                >
                  {text}
                </motion.p>
              ))}

              {/* Pull quote */}
              <motion.div
                variants={fadeUp}
                className="flex items-start gap-5 border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-5 py-6"
              >
                <div aria-hidden="true" className="flex flex-col gap-2 pt-1 shrink-0">
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark" />
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-50" />
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-20" />
                </div>
                <div>
                  <p className="font-mono text-base xs:text-lg font-bold text-text-light dark:text-text-dark mb-1">
                    &quot;Ending Learning Poverty&quot;
                  </p>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30">
                    Our guiding principle
                  </p>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 xs:grid-cols-3 gap-0 border border-border-subtle dark:border-border-dark divide-x divide-border-subtle dark:divide-border-dark"
                role="region"
                aria-label="Impact statistics"
              >
                {[
                  { value: '500+', label: 'Students Supported' },
                  { value: '$1M+', label: 'Grants Awarded' },
                  { value: '95%', label: 'Success Rate' }
                ].map(({ value, label }) => (
                  <div key={label} className="px-4 xs:px-5 py-5">
                    <p className="font-mono text-2xl xs:text-3xl font-bold text-secondary-light dark:text-secondary-dark mb-1">
                      {value}
                    </p>
                    <p className="font-mono text-[10px] tracking-wide text-text-light/45 dark:text-text-dark/40">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Opportunities ──────────────────────────────────────────────────── */}
      <section
        id="opportunities"
        className={`${sectionPad} bg-accent/30 dark:bg-accent-dark/30 border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="opportunities-heading"
      >
        <div className={innerWidth}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {/* Header */}
            <motion.div variants={fadeUp} className="mb-10 xs:mb-14">
              <p
                aria-hidden="true"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
              >
                {'// what we offer'}
              </p>
              <h2
                id="opportunities-heading"
                className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
              >
                Opportunities Rise, <span className="text-primary-light dark:text-primary-dark">Where Kids Thrive</span>
              </h2>
            </motion.div>

            {/* Focus area cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 mb-10 xs:mb-12">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  custom={index}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 hover:border-secondary-light/40 dark:hover:border-secondary-dark/40 px-5 py-6 transition-colors duration-200"
                >
                  <h3 className="font-mono text-lg xs:text-xl font-bold text-text-light dark:text-text-dark mb-3 group-hover:text-secondary-light dark:group-hover:text-secondary-dark transition-colors">
                    {area.title}
                  </h3>
                  <p className="font-mono text-[12px] text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide mb-5">
                    {area.description}
                  </p>
                  <ul className="space-y-2" aria-label={`${area.title} bullet points`}>
                    {area.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-2.5">
                        <div
                          aria-hidden="true"
                          className="w-1.5 h-1.5 bg-secondary-light dark:bg-secondary-dark mt-1.5 shrink-0"
                        />
                        <span className="font-mono text-[11px] tracking-wide text-text-light/55 dark:text-text-dark/50">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <motion.p
              variants={fadeUp}
              className="font-mono text-[13px] xs:text-sm text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide max-w-2xl"
            >
              Education Comes First offers a wide variety of resources such as supplemental education, additional
              funding to enhance learning spaces with literary tools, advanced technology, and educational equipment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Learning poverty ───────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="poverty-heading"
      >
        <div className={innerWidth}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <div className="relative border border-border-subtle dark:border-border-dark overflow-hidden">
                <div className="aspect-video">
                  <Picture
                    priority={false}
                    src="https://cdn.prod.website-files.com/64d30483ab274b8194387d0b/64ffa31dd2ad81a9d4102fdf_bgcl-kids-playing.jpg"
                    alt="Children playing a math game with their teacher"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating stat */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-4 left-4 border border-border-subtle dark:border-border-dark bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-sm px-4 py-3"
                >
                  <p className="font-mono text-2xl font-bold text-text-light dark:text-text-dark">10 yrs</p>
                  <p className="font-mono text-[10px] tracking-wide text-text-light/45 dark:text-text-dark/40 mt-0.5">
                    Critical reading age
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-6"
            >
              <motion.div variants={fadeUp}>
                <p
                  aria-hidden="true"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
                >
                  {'// the challenge'}
                </p>
                <h2
                  id="poverty-heading"
                  className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  Ending Learning <span className="text-primary-light dark:text-primary-dark">Poverty</span>
                </h2>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                Learning poverty means being unable to read and understand a simple text by age 10. We believe we can
                help fill the opportunity gap by supporting out-of-school organizations that are established as youth
                development professionals.
              </motion.p>

              {/* Mini stats */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 border border-border-subtle dark:border-border-dark divide-x divide-border-subtle dark:divide-border-dark"
                role="region"
                aria-label="Learning poverty statistics"
              >
                {[
                  { value: '60%', label: 'Global rate' },
                  { value: '100K+', label: 'Kids affected' }
                ].map(({ value, label }) => (
                  <div key={label} className="px-4 xs:px-5 py-4">
                    <p className="font-mono text-2xl font-bold text-text-light dark:text-text-dark mb-1">{value}</p>
                    <p className="font-mono text-[10px] tracking-wide text-text-light/40 dark:text-text-dark/35">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.a
                variants={fadeUp}
                href="/contact-us"
                className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-[0.1em] uppercase border border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark text-white w-fit transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark min-h-11"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.15 }}
              >
                Help fill the gap <ArrowRight size={12} aria-hidden="true" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className={`${sectionPad}`} aria-labelledby="cta-heading">
        <div className={innerWidth}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="border border-primary-light/30 dark:border-primary-dark/30 bg-primary-light/6 dark:bg-primary-dark/6 px-6 xs:px-10 py-10 xs:py-14 text-center"
          >
            <p
              aria-hidden="true"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
            >
              {'// get involved'}
            </p>
            <h2
              id="cta-heading"
              className="font-mono font-bold text-text-light dark:text-text-dark mb-4"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.75rem)' }}
            >
              Want to get involved with ECF?
            </h2>
            <p className="font-mono text-[13px] xs:text-sm text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide mb-8 max-w-xl mx-auto">
              Contact us if you&apos;d like to support, partner, or become a sponsor.
            </p>
            <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 font-mono text-[11px] font-bold tracking-[0.1em] uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
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
