'use client'

import { fadeUp, staggerContainer } from '@/app/lib/constants/motion.constants'
import { motion } from 'framer-motion'
import { Users, BookOpen, GraduationCap, Award, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    icon: Users,
    number: '2,500+',
    label: 'Students Served',
    description: 'Annually across all programs'
  },
  {
    icon: BookOpen,
    number: '15,000+',
    label: 'Tutoring Hours',
    description: 'Provided this year'
  },
  {
    icon: GraduationCap,
    number: '95%',
    label: 'Graduation Rate',
    description: 'Among program participants'
  },
  {
    icon: Award,
    number: '500+',
    label: 'Scholarships',
    description: 'Awarded since 2015'
  }
]

const impactAreas = [
  {
    title: 'Academic Excellence',
    description:
      'Our tutoring and mentorship programs help students achieve their full potential, with participants showing an average 25% improvement in grades.',
    metric: '85%',
    metricLabel: 'improved their GPA'
  },
  {
    title: 'College Readiness',
    description:
      'We guide students through the college application process, SAT/ACT prep, and financial aid applications to ensure higher education is accessible.',
    metric: '92%',
    metricLabel: 'enrolled in college'
  },
  {
    title: 'Career Development',
    description:
      'Through internships, job shadowing, and career workshops, we help students explore their interests and prepare for successful careers.',
    metric: '78%',
    metricLabel: 'secured internships'
  }
]

const highlights = [
  {
    quote:
      'Jacquelyn Mitra, author of the children’s book Tea and Cookies Day read her story to the group and, with the help of club staff, members created their own custom mug crafts while learning about the process of writing a children’s book.',
    author: 'Glenn Cove B&G Club'
  },
  {
    quote:
      'Parents of literacy participants are very pleased that we’ve created a tutoring program to help address the specific needs of the farthest behind girls. Parents were also excited about our book giveaways, which help them encourage reading at home too.',
    author: 'Marcus J.',
    role: 'Girls Inc'
  },
  {
    quote:
      'Our Brain Center (the hub of our Education Department) has, as the result of a recent community partnership, received over 300 new, age-appropriate books for our onsite library. This, coupled with our D.E.A.R. (Drop Everything And Read) daily independent reading session, has helped foster comfort and confidence in our members when it comes to reading and literacy.',
    author: 'Lowell Boys & Girls Club'
  }
]

const beforeAndAfterStats = [
  { label: 'Math is enjoyable', before: 51, after: 67 },
  { label: 'Math makes sense to me', before: 48, after: 63 },
  { label: "I'm motivated to read", before: 56, after: 79 },
  { label: "I understand what I'm reading", before: 53, after: 80 },
  { label: "I'm confident about my learning", before: 55, after: 71 }
]

// ─── Shared layout ────────────────────────────────────────────────────────────
const sectionPad = 'py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32'
const innerWidth = 'max-w-5xl mx-auto'

export default function OurImpact() {
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
              {'// our impact'}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              Our Impact
            </motion.h1>
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
              <span className="text-secondary-light dark:text-secondary-dark">Our Impact</span>
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
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex gap-0 whitespace-nowrap"
        >
          {[...stats, ...stats, ...stats].map((item, i) => (
            <span
              key={i}
              className="font-mono font-bold text-[11px] tracking-widest uppercase text-accent-dark px-6 flex items-center gap-4"
            >
              {item.label} {item.description}
              <span className="text-accent-dark/40">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Stats grid ─────────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="stats-heading"
      >
        <div className={innerWidth}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-8 xs:mb-10"
          >
            <motion.p
              variants={fadeUp}
              aria-hidden="true"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
            >
              {'// by the numbers'}
            </motion.p>
            <motion.h2
              id="stats-heading"
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              The Numbers
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 border border-border-subtle dark:border-border-dark divide-y xs:divide-y-0 xs:divide-x divide-border-subtle dark:divide-border-dark"
            role="region"
            aria-label="Impact statistics"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                className="px-5 xs:px-6 py-6 xs:py-8 bg-white/50 dark:bg-accent-dark/40 hover:bg-white/80 dark:hover:bg-accent-dark/70 transition-colors duration-200"
              >
                <p
                  className="font-mono font-bold leading-none mb-2 text-primary-light dark:text-primary-dark"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  {stat.number}
                </p>
                <p className="font-mono text-sm font-bold text-text-light dark:text-text-dark mb-1">{stat.label}</p>
                <p className="font-mono text-[11px] tracking-wide text-text-light/45 dark:text-text-dark/40 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Impact areas ───────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} bg-accent/20 dark:bg-accent-dark/20 border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="impact-areas-heading"
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
              {'// our focus'}
            </motion.p>
            <motion.h2
              id="impact-areas-heading"
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Where We <span className="text-primary-light dark:text-primary-dark">Make a Difference</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 xs:grid-cols-2 gap-px bg-border-subtle dark:bg-border-dark border border-border-subtle dark:border-border-dark"
          >
            {impactAreas.map((area, i) => (
              <motion.div
                key={area.title}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="bg-bg-light dark:bg-bg-dark p-6 xs:p-8 group hover:bg-white/80 dark:hover:bg-accent-dark/60 transition-colors duration-200 flex flex-col justify-between gap-6 relative overflow-hidden"
              >
                {/* Index + metric */}
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-text-light/25 dark:text-text-dark/20">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="border border-secondary-light/30 dark:border-secondary-dark/30 px-3 py-2 text-center">
                    <p className="font-mono text-xl xs:text-2xl font-bold text-secondary-light dark:text-secondary-dark leading-none">
                      {area.metric}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-text-light/40 dark:text-text-dark/35 mt-0.5">
                      {area.metricLabel}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-lg xs:text-xl font-bold uppercase text-text-light dark:text-text-dark mb-2 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-200">
                    {area.title}
                  </h3>
                  <p className="font-mono text-[12px] xs:text-[13px] text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide">
                    {area.description}
                  </p>
                </div>

                {/* Animated bottom line */}
                <div
                  className="h-px w-0 group-hover:w-full bg-primary-light dark:bg-primary-dark transition-all duration-500"
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Before & after ─────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="confidence-heading"
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
              {'// members reported'}
            </motion.p>
            <motion.h2
              id="confidence-heading"
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Student Confidence Growth
            </motion.h2>
          </motion.div>

          {/* Column headers */}
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 mb-5" aria-hidden="true">
            <p className="font-mono text-[10px] tracking-widests uppercase text-secondary-light dark:text-secondary-dark text-center w-16">
              Before
            </p>
            <div />
            <p className="font-mono text-[10px] tracking-widests uppercase text-primary-light dark:text-primary-dark text-center w-16">
              After
            </p>
          </div>

          <div className="space-y-3">
            {beforeAndAfterStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-4 xs:px-5 py-4 hover:border-primary-light/30 dark:hover:border-primary-dark/30 transition-colors duration-200"
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-text-light/40 dark:text-text-dark/35 mb-4">
                  {stat.label}
                </p>

                <div className="flex items-center gap-4">
                  {/* Before */}
                  <div className="text-center shrink-0 w-14 xs:w-16">
                    <p className="font-mono text-xl xs:text-2xl font-bold text-secondary-light dark:text-secondary-dark leading-none">
                      {stat.before}%
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-text-light/35 dark:text-text-dark/30 mt-0.5">
                      before
                    </p>
                  </div>

                  {/* Progress bars */}
                  <div className="flex-1 space-y-2">
                    <div className="h-1.5 bg-border-subtle dark:bg-border-dark overflow-hidden">
                      <motion.div
                        className="h-full bg-secondary-light dark:bg-secondary-dark"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.before}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
                        role="progressbar"
                        aria-valuenow={stat.before}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${stat.label} before: ${stat.before}%`}
                      />
                    </div>
                    <div className="h-1.5 bg-border-subtle dark:bg-border-dark overflow-hidden">
                      <motion.div
                        className="h-full bg-primary-light dark:bg-primary-dark"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.after}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.35, ease: 'easeOut' }}
                        role="progressbar"
                        aria-valuenow={stat.after}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${stat.label} after: ${stat.after}%`}
                      />
                    </div>
                  </div>

                  {/* After */}
                  <div className="text-center shrink-0 w-14 xs:w-16">
                    <p className="font-mono text-xl xs:text-2xl font-bold text-primary-light dark:text-primary-dark leading-none">
                      {stat.after}%
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-text-light/35 dark:text-text-dark/30 mt-0.5">
                      after
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="font-mono text-[10px] tracking-wide text-text-light/30 dark:text-text-dark/25 text-center mt-8"
          >
            Based on student self-assessments before and after program participation
          </motion.p>
        </div>
      </section>

      {/* ── Member highlights ──────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} bg-accent/20 dark:bg-accent-dark/20 border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="highlights-heading"
      >
        <div className={innerWidth}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-8 xs:mb-12 flex flex-col xs:flex-row xs:items-end justify-between gap-6"
          >
            <div>
              <motion.p
                variants={fadeUp}
                aria-hidden="true"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
              >
                {'// voices'}
              </motion.p>
              <motion.h2
                id="highlights-heading"
                variants={fadeUp}
                className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
              >
                Member <span className="text-primary-light dark:text-primary-dark">Highlights</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="font-mono text-[12px] text-text-light/45 dark:text-text-dark/40 tracking-wide max-w-xs leading-relaxed xs:text-right"
            >
              Real stories from the people who make Education Comes First possible.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4"
          >
            {highlights.map((highlight, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 hover:border-primary-light/30 dark:hover:border-primary-dark/30 px-5 xs:px-6 py-6 flex flex-col justify-between gap-5 relative overflow-hidden group transition-colors duration-200"
              >
                {/* Background index number */}
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -right-1 font-mono font-bold text-text-light/3 dark:text-text-dark/3 leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(5rem, 12vw, 8rem)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Dot column quote mark */}
                <div aria-hidden="true" className="flex flex-col gap-2 shrink-0">
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark" />
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-50" />
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-20" />
                </div>

                <p className="font-mono text-[13px] xs:text-sm text-text-light/70 dark:text-text-dark/65 leading-relaxed tracking-wide flex-1">
                  {highlight.quote}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border-subtle dark:border-border-dark">
                  <div className="w-7 h-7 border border-primary-light/30 dark:border-primary-dark/30 bg-primary-light/6 dark:bg-primary-dark/6 flex items-center justify-center shrink-0">
                    <Heart
                      size={12}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-primary-light dark:text-primary-dark"
                    />
                  </div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widests text-text-light dark:text-text-dark">
                    {highlight.author}
                  </p>
                </div>

                {/* Animated bottom line */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-primary-light dark:bg-primary-dark transition-all duration-500"
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className={sectionPad} aria-labelledby="impact-cta-heading">
        <div className={innerWidth}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="border border-primary-light/25 dark:border-primary-dark/25 bg-primary-light/6 dark:bg-primary-dark/6 px-6 xs:px-10 py-10 xs:py-14 text-center"
          >
            <p
              aria-hidden="true"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
            >
              {'// get involved'}
            </p>
            <h2
              id="impact-cta-heading"
              className="font-mono font-bold text-text-light dark:text-text-dark mb-4"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.75rem)' }}
            >
              Be Part of Our Impact
            </h2>
            <p className="font-mono text-[13px] xs:text-sm text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide mb-8 max-w-xl mx-auto">
              Your support helps us reach more students and create more success stories. Join us in making education
              accessible for all.
            </p>
            <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }}>
              <a
                href="/donate"
                className="inline-flex items-center gap-2.5 px-6 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
              >
                Donate now <ArrowRight size={12} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
