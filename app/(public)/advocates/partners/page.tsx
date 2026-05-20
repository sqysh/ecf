'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, ExternalLink, CheckCircle } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/app/lib/constants/motion.constants'

const regions = [
  {
    state: 'Massachusetts',
    count: 18,
    color: 'primary',
    sites: [
      { name: 'Girls Inc of Boston and Lynn', url: 'https://girlsinclynn.org/' },
      { name: 'Boys & Girls Club of Lynn', url: 'https://www.bgcl.org/' },
      { name: 'Boys & Girls Club of Greater Haverhill', url: 'https://www.haverhillbgc.org/' },
      { name: 'Boys & Girls Club of Greater Lowell', url: 'https://lbgc.org/' },
      { name: 'Boys & Girls Club of Lawrence', url: 'https://www.lawrencebgc.com/' },
      { name: 'Boys & Girls Club of Lower Merrimack Valley', url: 'https://www.bgclmv.org/' },
      { name: 'James L. McKeown Boys & Girls Club', url: 'https://bgcwoburn.org/' },
      { name: 'Boys & Girls Club of Greater Salem', url: 'https://www.bgcgs.org/' },
      { name: 'Private Jewels Boxing Club', url: 'https://privatejewelsfitness.com/' },
      { name: 'Bernardo Boxing', url: 'http://bernardo-boxing.square.site/' },
      { name: 'Building Bridges Through Music', url: 'https://www.bbtmusic.org/' },
      { name: 'Demakes Family YMCA of Lynn', url: 'https://www.ymcametronorth.org/locations/lynn-ymca/' },
      { name: 'Saugus Family YMCA', url: 'https://www.ymcametronorth.org/locations/saugus-family-ymca/' },
      { name: 'Haverhill YMCA', url: 'https://www.northshoreymca.org/locations/haverhill-ymca/' },
      { name: 'The REAL Program', url: 'https://www.therealprogram.org/' },
      { name: 'Campfire North Shore', url: 'https://www.campfirenorthshore.org/' },
      { name: 'NAGLY', url: 'https://www.nagly.org/' },
      { name: 'LEAP for Education', url: 'https://leap4ed.org/' }
    ]
  },
  {
    state: 'New York',
    count: 4,
    color: 'secondary',
    sites: [
      { name: 'Boys & Girls Club of Grenville Baker', url: 'https://gbbgc.org/' },
      { name: 'Boys & Girls Club of Oyster Bay-East Norwich', url: 'http://www.bgcoben.org/' },
      { name: 'Glen Cove Boys & Girls Club', url: 'https://www.glencovebgc.org/' },
      { name: 'Friends of the Children NY', url: 'https://friendsnewyork.org/' }
    ]
  },
  {
    state: 'Tennessee',
    count: 1,
    color: 'primary',
    sites: [{ name: 'Boys & Girls Club of Middle Tennessee', url: 'https://bgcmt.org/' }]
  },
  {
    state: 'Michigan',
    count: 1,
    color: 'secondary',
    sites: [{ name: 'Boys & Girls Club of Troy', url: 'https://www.bgctroy.org/' }]
  },
  {
    state: 'Florida',
    count: 1,
    color: 'primary',
    sites: [{ name: 'Boys & Girls Club of Tabula Rasa', url: 'https://www.bgctr.org/' }]
  },
  {
    state: 'Puerto Rico',
    count: 1,
    color: 'secondary',
    sites: [
      {
        name: 'Federación Puertorriqueña de Boxeo',
        url: 'http://www.deporteboricua.com/federaci-n-puertorrique-a-boxeo.html'
      }
    ]
  }
]

const benefits = [
  'Educational Mentors',
  'Foster Enthusiasm',
  'High-Stakes Learning Environment',
  'Encouraging Creativity'
]

// ─── Shared layout ────────────────────────────────────────────────────────────
const sectionPad = 'py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32'
const innerWidth = 'max-w-5xl mx-auto'

export default function PartnerSitesPage() {
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
              {/* Large stacked heading */}
              <h1
                className="font-mono font-bold leading-none text-text-light dark:text-text-dark"
                style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
              >
                <span className="block">Advocate</span>
                <span className="block relative">
                  Partner
                  {/* Animated underline highlight */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute bottom-1 left-0 h-2 xs:h-3 bg-primary-light dark:bg-primary-dark -z-10 opacity-50"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
                  />
                </span>
                <span className="block text-transparent" style={{ WebkitTextStroke: '2px currentColor' }}>
                  Sites
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="font-mono text-[13px] xs:text-sm text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide max-w-xl"
            >
              ECF partner sites foster enthusiasm and commitment to getting the most from after-school hours — turning
              programs into high-stakes learning environments.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col xs:flex-row items-start xs:items-center gap-4">
              <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }}>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
                >
                  Apply for a grant <ArrowRight size={12} aria-hidden="true" />
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
                <span className="text-secondary-light dark:text-secondary-dark">Partner Sites</span>
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
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-mono font-bold text-[11px] tracking-widests uppercase text-accent-dark px-8 flex items-center gap-5"
            >
              Massachusetts <span className="opacity-30">✦</span> New York <span className="opacity-30">✦</span>{' '}
              Tennessee <span className="opacity-30">✦</span> Michigan <span className="opacity-30">✦</span> Florida{' '}
              <span className="opacity-30">✦</span> Puerto Rico <span className="opacity-30">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Stats band ─────────────────────────────────────────────────────── */}
      <section className="border-b border-border-subtle dark:border-border-dark" aria-label="ECF by the numbers">
        <div className={`${innerWidth} px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32`}>
          <div className="grid grid-cols-2 xs:grid-cols-4 border-x border-border-subtle dark:border-border-dark divide-x divide-border-subtle dark:divide-border-dark">
            {[
              { value: '26', label: 'Partner sites' },
              { value: '5', label: 'States' },
              { value: '1', label: 'U.S. territory' },
              { value: '2,800+', label: 'Youth served' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-1 px-4 xs:px-6 py-6 xs:py-8"
              >
                <span className="font-mono font-bold text-2xl xs:text-3xl text-primary-light dark:text-primary-dark leading-none">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] tracking-widests uppercase text-text-light/45 dark:text-text-dark/40">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we offer ──────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="offer-heading"
      >
        <div className={innerWidth}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Text + benefits */}
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
                  {'// our model'}
                </p>
                <h2
                  id="offer-heading"
                  className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  What We <span className="text-primary-light dark:text-primary-dark">Offer Partners</span>
                </h2>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                Our model allows the provider to control programming, curriculum, and enrichment. ECF encourages
                creativity, offers coaching, preferred online supplemental educational programs, data tracking, and
                support with goal setting.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-mono text-[13px] xs:text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide"
              >
                We offer a streamlined grant application process, with supportive guidance on grant implementation, data
                tracking, and impact reports.
              </motion.p>

              {/* Benefits list */}
              <motion.div variants={staggerContainer} className="flex flex-col gap-2.5">
                {benefits.map((b, i) => (
                  <motion.div key={b} custom={i} variants={fadeUp} className="flex items-center gap-3">
                    <CheckCircle
                      size={14}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-primary-light dark:text-primary-dark shrink-0"
                    />
                    <span className="font-mono text-[12px] font-bold uppercase tracking-wide text-text-light dark:text-text-dark">
                      {b}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-6 xs:px-8 py-8 xs:py-10 relative overflow-hidden">
                {/* Dot column */}
                <div aria-hidden="true" className="flex flex-col gap-2 mb-6">
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark" />
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-50" />
                  <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-20" />
                </div>

                <blockquote>
                  <p className="font-mono text-[13px] xs:text-sm text-text-light/70 dark:text-text-dark/65 leading-relaxed tracking-wide italic mb-6">
                    &quot;Due to the generous support of Education Comes First, we were able to provide better quality
                    programming with pure academic and social outcomes that positively impacted over 200 youth per
                    day!&quot;
                  </p>
                  <footer className="flex items-center gap-3 pt-5 border-t border-border-subtle dark:border-border-dark">
                    <div className="w-7 h-7 border border-primary-light/30 dark:border-primary-dark/30 bg-primary-light/6 dark:bg-primary-dark/6 flex items-center justify-center shrink-0">
                      <MapPin
                        size={12}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="text-primary-light dark:text-primary-dark"
                      />
                    </div>
                    <cite className="font-mono text-[10px] font-bold uppercase tracking-widests text-text-light/50 dark:text-text-dark/45 not-italic">
                      ECF Grant Recipient
                    </cite>
                  </footer>
                </blockquote>

                {/* Bottom accent */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-px bg-primary-light dark:bg-primary-dark"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-full h-full border border-primary-light/20 dark:border-primary-dark/20 -z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Partner sites by region ────────────────────────────────────────── */}
      <section
        className={`${sectionPad} bg-accent/20 dark:bg-accent-dark/20 border-b border-border-subtle dark:border-border-dark`}
        aria-labelledby="sites-heading"
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
              {'// locations'}
            </motion.p>
            <motion.h2
              id="sites-heading"
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Current <span className="text-primary-light dark:text-primary-dark">Partner Sites</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-mono text-[12px] xs:text-[13px] text-text-light/50 dark:text-text-dark/45 tracking-wide mt-3 max-w-xl leading-relaxed"
            >
              We currently partner with 26 sites across Massachusetts, New York, Tennessee, Michigan, Florida, and
              Puerto Rico.
            </motion.p>
          </motion.div>

          <div className="space-y-3 xs:space-y-4">
            {regions.map((region, i) => {
              const isPrimary = region.color === 'primary'
              return (
                <motion.div
                  key={region.state}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="border border-border-subtle dark:border-border-dark bg-bg-light dark:bg-bg-dark overflow-hidden group hover:border-primary-light/40 dark:hover:border-primary-dark/40 transition-colors duration-200"
                >
                  {/* Region header */}
                  <div className="flex items-center justify-between px-5 xs:px-6 py-4 border-b border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/30">
                    <div className="flex items-center gap-3">
                      <div
                        aria-hidden="true"
                        className={`w-2 h-2 ${isPrimary ? 'bg-primary-light dark:bg-primary-dark' : 'bg-secondary-light dark:bg-secondary-dark'}`}
                      />
                      <h3 className="font-mono text-sm xs:text-base font-bold uppercase tracking-wide text-text-light dark:text-text-dark">
                        {region.state}
                      </h3>
                    </div>
                    <span
                      className={`font-mono text-[9px] font-bold uppercase tracking-widests px-2.5 py-1 border ${
                        isPrimary
                          ? 'border-primary-light/30 dark:border-primary-dark/30 text-primary-light dark:text-primary-dark bg-primary-light/6 dark:bg-primary-dark/6'
                          : 'border-secondary-light/30 dark:border-secondary-dark/30 text-secondary-light dark:text-secondary-dark bg-secondary-light/6 dark:bg-secondary-dark/6'
                      }`}
                    >
                      {region.count} site{region.count !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Sites grid */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 divide-y xs:divide-y-0 xs:divide-x divide-border-subtle dark:divide-border-dark">
                    {region.sites.map((site) => (
                      <a
                        key={site.name}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.name} — opens in new tab`}
                        className="flex items-center justify-between gap-3 px-5 xs:px-6 py-4 hover:bg-black/2 dark:hover:bg-white/2 transition-colors duration-150 group/site focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
                      >
                        <span className="font-mono text-[12px] xs:text-[13px] text-text-light/60 dark:text-text-dark/55 group-hover/site:text-text-light dark:group-hover/site:text-text-dark transition-colors leading-snug">
                          {site.name}
                        </span>
                        <ExternalLink
                          size={12}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="text-text-light/20 dark:text-text-dark/15 group-hover/site:text-secondary-light dark:group-hover/site:text-secondary-dark transition-colors shrink-0"
                        />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Become a partner ───────────────────────────────────────────────── */}
      <section className={sectionPad} aria-labelledby="partner-cta-heading">
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
                {'// join us'}
              </p>
              <h2
                id="partner-cta-heading"
                className="font-mono font-bold text-text-light dark:text-text-dark mb-2"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
              >
                Interested in <span className="text-primary-light dark:text-primary-dark">Becoming a Partner?</span>
              </h2>
              <p className="font-mono text-[12px] tracking-wide text-text-light/50 dark:text-text-dark/45 max-w-md leading-relaxed">
                Contact us if you&apos;d like to support, partner, or become a sponsor. Every partnership expands our
                reach and impact.
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
