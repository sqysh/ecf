'use client'

import Picture from '@/app/components/ui/media/Picture'
import { fadeUp, staggerContainer } from '@/app/lib/constants/motion.constants'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const whyItems = [
  {
    icon: '',
    title: 'Proven Results',
    description:
      "Research shows that consistent use of Khan Academy leads to higher math gains, no matter a student's background or learning environment."
  },
  {
    icon: '',
    title: 'Personalized Learning Paths',
    description:
      'Members receive customized lessons based on their skill level, helping them build confidence and master essential math concepts.'
  },
  {
    icon: '',
    title: 'Equity in Education',
    description:
      'Every child, regardless of location or support at home, can accelerate their learning with just a little extra time and effort.'
  }
]

const stats = [
  { value: '26', label: 'Grant-Funded Sites' },
  { value: '40-60', label: 'Minutes Per Week' },
  { value: '100%', label: 'Free to Students' }
]

const tickerItems = [
  'Personalized Learning',
  'Khan Academy',
  '26 Grant Sites',
  'Math Excellence',
  'Every Child Thrives'
]
// ─── Shared layout ────────────────────────────────────────────────────────────
const sectionPad = 'py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32'
const innerWidth = 'max-w-5xl mx-auto'

export default function MathPage() {
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
              {'// programs'}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              Math
            </motion.h1>
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="flex items-center gap-2 flex-wrap font-mono text-[11px] tracking-wide text-text-light/40 dark:text-text-dark/35"
            >
              <Link
                href="/"
                className="hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
              >
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href="/programs"
                className="hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
              >
                Programs
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-secondary-light dark:text-secondary-dark">Math</span>
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
              className="font-mono font-bold text-[11px] tracking-widests uppercase text-accent-dark px-6 flex items-center gap-4"
            >
              {item}
              <span className="text-accent-dark/40">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Intro + Khan Academy ───────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="intro-heading"
      >
        <div className={innerWidth}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left — logo + heading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-4"
            >
              {/* Khan logo — dark/light swap */}
              <div className="w-full max-w-45">
                <Picture
                  src="/images/khan-dark.png"
                  alt="Khan Academy"
                  className="hidden dark:block w-full"
                  priority={true}
                />
                <div className="dark:hidden block h-20.5">
                  <Picture src="/images/khan.svg" alt="Khan Academy" className="w-full h-full" priority={true} />
                </div>
              </div>
              <h2
                id="intro-heading"
                className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                Personalized Math Learning
              </h2>
            </motion.div>

            {/* Right — body + stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8 flex flex-col gap-8"
            >
              <p className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide">
                At Education Comes First, we believe that every child deserves a strong foundation in math. That&apos;s
                why all 26 of our grant-funded sites integrate Khan Academy — a free, expert-developed learning app —
                into our math programming.
              </p>

              {/* Stats strip */}
              <div
                className="grid xs:grid-cols-3 border border-border-subtle dark:border-border-dark divide-y xs:divide-y-0 xs:divide-x divide-border-subtle dark:divide-border-dark"
                role="region"
                aria-label="Program statistics"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="px-5 py-5 bg-white/50 dark:bg-accent-dark/40 text-center"
                  >
                    <p className="font-mono font-bold text-2xl xs:text-3xl text-primary-light dark:text-primary-dark leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="font-mono text-[10px] tracking-wide text-text-light/45 dark:text-text-dark/40">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} bg-accent/20 dark:bg-accent-dark/20 border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="process-heading"
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
                  {'// the process'}
                </p>
                <h2
                  id="process-heading"
                  className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  How It Works
                </h2>
              </motion.div>
              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                With Khan Academy, ECF members experience personalized learning tailored to their individual needs.
                Whether catching up, working at grade level, or striving to advance beyond, our members receive the
                focused practice they need to succeed.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                Each week, ECF members spend at least 40–60 minutes on Khan Academy, guided by dedicated staff who act
                as teachers within the platform. Through virtual classrooms, staff track progress, celebrate
                achievements, and provide targeted support.
              </motion.p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="border border-border-subtle dark:border-border-dark overflow-hidden">
                <Picture
                  src="/images/img-4.jpg"
                  alt="ECF student working on Khan Academy"
                  className="w-full h-64 xs:h-80 object-cover hover:scale-105 transition-transform duration-700"
                  priority={true}
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-full h-full border border-primary-light/25 dark:border-primary-dark/25 -z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Khan Academy ───────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="why-heading"
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
              {'// our approach'}
            </motion.p>
            <motion.h2
              id="why-heading"
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Why Khan Academy?
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4"
          >
            {whyItems.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-5 xs:px-6 py-6 hover:border-primary-light/30 dark:hover:border-primary-dark/30 transition-colors duration-200"
              >
                <h3 className="font-mono text-sm font-bold text-text-light dark:text-text-dark mb-3">{item.title}</h3>
                <p className="font-mono text-[12px] xs:text-[13px] text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── More than just an app ──────────────────────────────────────────── */}
      <section
        className={`${sectionPad} bg-accent/20 dark:bg-accent-dark/20 border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="beyond-heading"
      >
        <div className={innerWidth}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="border border-border-subtle dark:border-border-dark overflow-hidden aspect-square">
                <Picture
                  src="/images/img-20.jpg"
                  alt="ECF student working hands-on with math materials"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  priority={false}
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 w-full h-full border border-secondary-light/20 dark:border-secondary-dark/20 -z-10"
              />
            </motion.div>

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
                  {'// beyond the screen'}
                </p>
                <h2
                  id="beyond-heading"
                  className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  More Than Just an App
                </h2>
              </motion.div>
              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                At ECF, we combine Khan Academy with hands-on learning — including math manipulatives and homework help
                — to create a well-rounded math experience.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                By dedicating extra time outside of school hours, our members gain the skills and confidence needed to
                excel in math and beyond.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ────────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-label="Staff testimonial"
      >
        <div className={innerWidth}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-6 xs:px-10 py-8 xs:py-12"
          >
            {/* Dot column */}
            <div aria-hidden="true" className="flex flex-col gap-2 mb-6">
              <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark" />
              <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-50" />
              <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-20" />
            </div>

            <blockquote>
              <p className="font-mono text-sm xs:text-base lg:text-lg text-text-light/75 dark:text-text-dark/70 leading-relaxed tracking-wide mb-8">
                &quot;Cesar and Aybrielle have shown great improvement in their ability to recognize sight words and
                read age-appropriate materials. They love learning using the tablets. For the first time, they&apos;ve
                both shown an interest and excitement to learn new ways of reading, math, and spelling.&quot;
              </p>
              <footer className="flex items-center gap-3">
                <div aria-hidden="true" className="w-8 h-px bg-border-subtle dark:bg-border-dark" />
                <cite className="font-mono text-[10px] font-bold tracking-widests uppercase text-secondary-light dark:text-secondary-dark not-italic">
                  ECF Staff Member
                </cite>
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className={sectionPad} aria-labelledby="math-cta-heading">
        <div className={innerWidth}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-6 xs:px-10 py-8 xs:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div>
              <p
                aria-hidden="true"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
              >
                {'// make a difference'}
              </p>
              <h2
                id="math-cta-heading"
                className="font-mono font-bold text-text-light dark:text-text-dark mb-2"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
              >
                Building Stronger Math Foundations
              </h2>
              <p className="font-mono text-[12px] tracking-wide text-text-light/50 dark:text-text-dark/45 max-w-md leading-relaxed">
                We&apos;re proud to provide students with the tools they need to succeed — making a lasting impact one
                skill at a time.
              </p>
            </div>

            <div className="flex flex-col xs:flex-row gap-3 shrink-0">
              <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }}>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
                >
                  Donate <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }}>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-border-subtle dark:border-border-dark text-text-light/60 dark:text-text-dark/50 hover:text-text-light dark:hover:text-text-dark hover:border-text-light/25 dark:hover:border-text-dark/25 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
                >
                  Get Involved
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
