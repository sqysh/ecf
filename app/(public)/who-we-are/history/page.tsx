'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, Users, BookOpen, GraduationCap } from 'lucide-react'
import Picture from '@/app/components/ui/media/Picture'
import { fadeUp, staggerContainer } from '@/app/lib/constants/motion.constants'

const milestones = [
  {
    year: '20+ Years Ago',
    title: 'The Dream is Born',
    body: 'Mike, Phyllis, and Christian Conway begin dreaming of a world where every child — regardless of zip code — has access to high-quality educational support. The seeds of Education Comes First are planted in a belief that opportunity should never be determined by geography.',
    accent: 'primary'
  },
  {
    year: '2021',
    title: 'Education Comes First Launches',
    body: 'Brian and Grace partner with the Conways to officially launch Education Comes First as a nonprofit. Together they build an organization dedicated to supporting out-of-school agencies, expanding educational programming across reading, math, social development, and academic confidence.',
    accent: 'secondary'
  },
  {
    year: 'Early Days',
    title: 'Four Pilot Programs',
    body: 'ECF launches with just four pilot programs across Massachusetts and New York. Small in scale, but enormous in ambition — these first sites become the proof of concept that the model works and that students thrive with the right support.',
    accent: 'primary'
  },
  {
    year: 'Today',
    title: '26 Sites. 5 States. 2,800+ Youth.',
    body: 'What began as four programs has grown into a movement. ECF now operates across 26 sites spanning five states and one U.S. territory, serving more than 2,800 young people ages 5 to 18. Students are empowered to lead in their classrooms, stay on track to graduate, and pursue college, trades, or meaningful careers.',
    accent: 'secondary'
  }
]

const stats = [
  { icon: MapPin, value: '26', label: 'Sites' },
  { icon: Users, value: '2,800+', label: 'Youth Served' },
  { icon: BookOpen, value: '5', label: 'States' },
  { icon: GraduationCap, value: '20+', label: 'Years of Vision' }
]

// ─── Shared layout ────────────────────────────────────────────────────────────
const sectionPad = 'py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32'
const innerWidth = 'max-w-5xl mx-auto'

// ─── Timeline card ────────────────────────────────────────────────────────────
function TimelineCard({ milestone }: { milestone: (typeof milestones)[0] }) {
  const isPrimary = milestone.accent === 'primary'
  return (
    <div>
      <span
        className={`inline-block font-mono text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 border mb-3 ${
          isPrimary
            ? 'border-primary-light/30 dark:border-primary-dark/30 text-primary-light dark:text-primary-dark bg-primary-light/6 dark:bg-primary-dark/6'
            : 'border-secondary-light/30 dark:border-secondary-dark/30 text-secondary-light dark:text-secondary-dark bg-secondary-light/6 dark:bg-secondary-dark/6'
        }`}
      >
        {milestone.year}
      </span>
      <h3 className="font-mono text-base xs:text-lg font-bold text-text-light dark:text-text-dark uppercase mb-2 leading-tight">
        {milestone.title}
      </h3>
      <p className="font-mono text-[12px] xs:text-[13px] text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide">
        {milestone.body}
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// OUR HISTORY PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function OurHistory() {
  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}>
        <div className={innerWidth}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col gap-4">
            <motion.p
              variants={fadeUp}
              aria-hidden="true"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark"
            >
              {'// our history'}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              Our History
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
              <span className="text-secondary-light dark:text-secondary-dark">Our History</span>
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
              {item.value} {item.label}
              <span className="text-accent-dark/40">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Origin story ───────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="origin-heading"
      >
        <div className={innerWidth}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp}>
                <p
                  aria-hidden="true"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
                >
                  {'// origin'}
                </p>
                <h2
                  id="origin-heading"
                  className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  Rooted in a <span className="text-primary-light dark:text-primary-dark">Dream</span>
                </h2>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                The vision for Education Comes First began over 20 years ago with Mike, Phyllis, and Christian Conway,
                who dreamed of creating equal educational opportunities for children in under-resourced communities.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                They believed that every child, regardless of their zip code, deserved access to high-quality
                educational support — and they spent two decades building the foundation to make that belief a reality.
              </motion.p>

              {/* Stat callout */}
              <motion.div
                variants={fadeUp}
                className="flex items-start gap-5 border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-5 py-5"
              >
                <div aria-hidden="true" className="flex flex-col gap-2 pt-1 shrink-0">
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark" />
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-50" />
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-20" />
                </div>
                <div>
                  <p
                    className="font-mono font-bold leading-none text-primary-light dark:text-primary-dark mb-1"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                  >
                    20+
                  </p>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30">
                    Years of vision before launch
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="border border-border-subtle dark:border-border-dark overflow-hidden">
                <Picture
                  src="/images/img-12.jpg"
                  priority={true}
                  className="w-full h-64 xs:h-80 object-cover hover:scale-105 transition-transform duration-700"
                  alt="The Conway family — founders of Education Comes First"
                />
              </div>
              {/* Offset border accent */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-full h-full border border-primary-light/30 dark:border-primary-dark/30 -z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} bg-accent/20 dark:bg-accent-dark/20 border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="timeline-heading"
      >
        <div className={innerWidth}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-10 xs:mb-14"
          >
            <motion.p
              variants={fadeUp}
              aria-hidden="true"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
            >
              {'// timeline'}
            </motion.p>
            <motion.h2
              id="timeline-heading"
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              The <span className="text-primary-light dark:text-primary-dark">Journey</span>
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line — desktop */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 bottom-0 w-px bg-border-subtle dark:bg-border-dark -translate-x-1/2 hidden sm:block"
            />
            {/* Vertical line — mobile */}
            <div
              aria-hidden="true"
              className="absolute left-3 top-0 bottom-0 w-px bg-border-subtle dark:bg-border-dark sm:hidden"
            />

            <div className="space-y-10 xs:space-y-16">
              {milestones.map((m, i) => {
                const isEven = i % 2 === 0
                const isPrimary = m.accent === 'primary'
                return (
                  <motion.div
                    key={m.year}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-start gap-x-8"
                  >
                    {/* Left slot */}
                    <div className={`hidden sm:block pb-0 ${isEven ? 'sm:text-right' : ''}`}>
                      {isEven ? <TimelineCard milestone={m} /> : null}
                    </div>

                    {/* Center dot — desktop */}
                    <div className="hidden sm:flex flex-col items-center pt-1">
                      <div
                        className={`w-3 h-3 border-2 shrink-0 ${
                          isPrimary
                            ? 'border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark'
                            : 'border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark'
                        }`}
                      />
                    </div>

                    {/* Mobile dot */}
                    <div
                      aria-hidden="true"
                      className={`absolute left-1.5 top-1.5 w-3 h-3 border-2 sm:hidden ${
                        isPrimary
                          ? 'border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark'
                          : 'border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark'
                      }`}
                    />

                    {/* Right slot — desktop; full width on mobile */}
                    <div className="pl-8 sm:pl-0">
                      {/* Mobile: always show */}
                      <div className="sm:hidden">
                        <TimelineCard milestone={m} />
                      </div>
                      {/* Desktop: only odd */}
                      {!isEven && (
                        <div className="hidden sm:block">
                          <TimelineCard milestone={m} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Today ──────────────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="today-heading"
      >
        <div className={innerWidth}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Stats grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-3 order-2 lg:order-1"
              role="region"
              aria-label="ECF by the numbers"
            >
              {[
                { value: '26', label: 'Sites nationwide', accent: 'primary' },
                { value: '5', label: 'States + 1 territory', accent: 'secondary' },
                { value: '2,800+', label: 'Youth ages 5–18', accent: 'secondary' },
                { value: '2021', label: 'Year founded', accent: 'primary' }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-4 xs:px-5 py-5 xs:py-6 hover:border-primary-light/30 dark:hover:border-primary-dark/30 transition-colors duration-200"
                  aria-label={`${item.value} ${item.label}`}
                >
                  <p
                    className="font-mono font-bold leading-none mb-1.5"
                    style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      color: item.accent === 'primary' ? 'var(--color-primary-light)' : 'var(--color-secondary-light)'
                    }}
                  >
                    {item.value}
                  </p>
                  <p className="font-mono text-[10px] tracking-widests uppercase text-text-light/40 dark:text-text-dark/35">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Text + image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-6 order-1 lg:order-2"
            >
              <div className="border border-border-subtle dark:border-border-dark overflow-hidden">
                <Picture
                  src="/images/img-13.png"
                  className="w-full h-48 xs:h-64 object-cover object-top hover:scale-105 transition-transform duration-700"
                  alt="ECF students at a program site"
                  priority={false}
                />
              </div>

              <motion.div variants={fadeUp}>
                <p
                  aria-hidden="true"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
                >
                  {'// where we are now'}
                </p>
                <h2
                  id="today-heading"
                  className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  Growing <span className="text-primary-light dark:text-primary-dark">Every Day</span>
                </h2>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                What began with just four pilot programs in Massachusetts and New York has grown to 26 sites across five
                states and one U.S. territory, serving more than 2,800 youth ages 5 to 18.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                ECF empowers students to become leaders, stay on track to graduate, and explore meaningful futures
                through college, trades, or other pathways.
              </motion.p>

              <motion.a
                variants={fadeUp}
                href="/our-impact"
                className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widests uppercase text-text-light dark:text-text-dark border-b border-primary-light dark:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 pb-0.5 w-fit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                Learn about our impact <ArrowRight size={12} aria-hidden="true" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className={sectionPad} aria-labelledby="history-cta-heading">
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
                id="history-cta-heading"
                className="font-mono font-bold text-text-light dark:text-text-dark mb-2"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
              >
                Want to get involved?
              </h2>
              <p className="font-mono text-[12px] tracking-wide text-text-light/50 dark:text-text-dark/45 max-w-md">
                Contact us if you&apos;d like to support, partner, or become a sponsor. Every contribution fuels the
                next chapter.
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
    </div>
  )
}
