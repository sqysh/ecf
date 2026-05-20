'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/app/lib/constants/motion.constants'

const stories = [
  {
    name: 'Ethan',
    age: '12 years old',
    tag: 'Confidence & Focus',
    tagColor: 'primary',
    summary: 'From leaving early to thriving every day.',
    body: `Ethan struggled with self-confidence and had difficulty staying engaged and focused throughout the day. Last summer he often got picked up early, unable to make it through a full session. This year, through Khan Academy and our Reading Buddies program, Ethan is completing homework at the club, attending small group reading, and enjoying quiet reading time. His mother has commented on the incredible gains he has made — growing more social and mentally stronger every day.`,
    image: null,
    index: '01'
  },
  {
    name: 'Sam',
    age: '21 years old · Staff Member',
    tag: 'Lifelong Reading',
    tagColor: 'secondary',
    summary: 'A staff member who rediscovered the joy of reading.',
    body: `Sam couldn't remember the last time he picked up a book during his free time. He thought Drop Everything and Read was only for the kids — something silly. Now he understands that him reading to the younger kids gives them inspiration and drive. Sam has grown fond of this daily time and says it feels like therapy: "It's a nice break in the day for me. We can all just chill and relax together. I think everyone should do this."`,
    image: null,
    index: '02'
  },
  {
    name: 'Elyce',
    age: '5th Grade',
    tag: 'Math & Music',
    tagColor: 'primary',
    summary: 'Shy no more — music unlocked her love of learning.',
    body: `Fifth grader Elyce was incredibly shy when she entered ECF a year ago, having been home-schooled since the pandemic. She had difficulty relating to others, but our reading and music programs changed everything. She used her love of music to fuel her growth in math and build a lifelong love of reading and writing. Working with BBTM Education thru Music, Inc., Elyce now has a stage we are all excited to support her on.`,
    image: null,
    index: '03'
  },
  {
    name: 'Bethany & Mackenzie',
    age: 'Twins · 4th Grade',
    tag: 'Academic Excellence',
    tagColor: 'secondary',
    summary: `Twin brilliance — more than ready for what's next.`,
    body: `Twins Bethany and Mackenzie reinforced their learning from the school year, preparing for the challenges of fourth grade. They have reached familiar and proficient levels across their exercises, showing a grasp of key concepts and skills alongside the ability to tackle a wide variety of difficult tasks. The work they've done has more than prepared them for advanced topics and academic demands ahead.`,
    image: null,
    index: '04'
  },
  {
    name: 'Eva',
    age: 'Youth Member',
    tag: 'Resilience & Leadership',
    tagColor: 'primary',
    summary: 'From bullying and loss to helping her little sister.',
    body: `Eva has faced bullying, academic struggles, and personal loss — yet her journey to success is truly inspiring. With the support of her friend Slade and her caregiver, she is now thriving. At our 5K, Eva proudly shared that she's helping her younger sister with homework — a massive testament to her incredible growth and leadership. Thank you to ECF for contributing to our Reading and Math Enrichment program and helping to #CloseTheGap.`,
    image: null,
    index: '05'
  },
  {
    name: 'Enoch',
    age: 'Rising 1st Grader',
    tag: 'Math Breakthrough',
    tagColor: 'secondary',
    summary: 'Overwhelmed by math — now asking for more time to learn.',
    body: `At the start of the Summer Math and Reading Program, Enoch felt overwhelmed and frustrated as other kids succeeded around him. ECF provided group tutoring, interactive learning materials, and the individual attention he needed. By summer's end, Enoch was not only proficient at his level — he was asking for more time in the education room. He learned to add by twos, count to 150, and tackle 1st grade subtraction. He has grown a love of learning and is hungry to keep growing.`,
    image: null,
    index: '06'
  }
]

// ─── Shared layout ────────────────────────────────────────────────────────────
const sectionPad = 'py-16 xs:py-20 lg:py-24 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32'
const innerWidth = 'max-w-5xl mx-auto'

export default function SuccessStoriesPage() {
  return (
    <main className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark overflow-x-hidden">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className={`${sectionPad} border-b border-border-subtle dark:border-border-dark`}>
        <div className={innerWidth}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col gap-4">
            <motion.p
              variants={fadeUp}
              aria-hidden="true"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark"
            >
              {'// student spotlights'}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              Success Stories
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
              <span className="text-secondary-light dark:text-secondary-dark">Success Stories</span>
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* ── Name ticker ────────────────────────────────────────────────────── */}
      <div
        className="bg-primary-light dark:bg-primary-dark overflow-hidden py-2.5 border-b border-primary-light/20 dark:border-primary-dark/20"
        aria-hidden="true"
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="font-mono font-bold text-[11px] tracking-widests uppercase text-accent-dark px-8 flex items-center gap-5"
            >
              Ethan <span className="opacity-30">✦</span> Sam <span className="opacity-30">✦</span> Elyce{' '}
              <span className="opacity-30">✦</span> Bethany & Mackenzie <span className="opacity-30">✦</span> Eva{' '}
              <span className="opacity-30">✦</span> Enoch <span className="opacity-30">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Stories ────────────────────────────────────────────────────────── */}
      <section className={`${sectionPad}`} aria-label="Student success stories">
        <div className={innerWidth}>
          <div className="divide-y divide-border-subtle dark:divide-border-dark">
            {stories.map((story, i) => {
              const isEven = i % 2 === 0
              const isPrimary = story.tagColor === 'primary'

              return (
                <motion.article
                  key={story.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  aria-labelledby={`story-name-${i}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-16 py-12 xs:py-16 lg:py-20 items-center"
                >
                  {/* ── Text ── */}
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    {/* Index + tag */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono text-[10px] font-bold text-text-light/20 dark:text-text-dark/20 tracking-widests">
                        {story.index}
                      </span>
                      <span
                        className={`font-mono text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 border ${
                          isPrimary
                            ? 'border-primary-light/30 dark:border-primary-dark/30 text-primary-light dark:text-primary-dark bg-primary-light/6 dark:bg-primary-dark/6'
                            : 'border-secondary-light/30 dark:border-secondary-dark/30 text-secondary-light dark:text-secondary-dark bg-secondary-light/6 dark:bg-secondary-dark/6'
                        }`}
                      >
                        {story.tag}
                      </span>
                    </div>

                    {/* Name */}
                    <h2
                      id={`story-name-${i}`}
                      className="font-mono font-bold uppercase leading-none text-text-light dark:text-text-dark mb-1"
                      style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
                    >
                      {story.name}
                    </h2>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widests text-text-light/35 dark:text-text-dark/30 mb-6">
                      {story.age}
                    </p>

                    <p className="font-mono text-sm xs:text-base font-bold text-text-light dark:text-text-dark mb-4 leading-snug">
                      {story.summary}
                    </p>
                    <p className="font-mono text-[12px] xs:text-[13px] text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide">
                      {story.body}
                    </p>

                    {/* Animated underline on hover */}
                    <div
                      aria-hidden="true"
                      className={`mt-8 h-px w-0 group-hover:w-16 transition-all duration-500 ${
                        isPrimary
                          ? 'bg-primary-light dark:bg-primary-dark'
                          : 'bg-secondary-light dark:bg-secondary-dark'
                      }`}
                    />
                  </div>

                  {/* ── Quote card ── */}
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <motion.div
                      className={`relative border overflow-hidden px-6 xs:px-8 py-8 xs:py-10 bg-white/50 dark:bg-accent-dark/40 ${
                        isPrimary
                          ? 'border-primary-light/20 dark:border-primary-dark/20'
                          : 'border-secondary-light/20 dark:border-secondary-dark/20'
                      }`}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Ghost index */}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-4 -right-2 font-mono font-bold text-text-light/3 dark:text-text-dark/3 leading-none select-none pointer-events-none"
                        style={{ fontSize: 'clamp(5rem, 14vw, 9rem)' }}
                      >
                        {story.index}
                      </span>

                      {/* Dot column */}
                      <div aria-hidden="true" className="flex flex-col gap-2 mb-6">
                        <div
                          className={`w-2 h-2 ${isPrimary ? 'bg-primary-light dark:bg-primary-dark' : 'bg-secondary-light dark:bg-secondary-dark'}`}
                        />
                        <div
                          className={`w-2 h-2 opacity-50 ${isPrimary ? 'bg-primary-light dark:bg-primary-dark' : 'bg-secondary-light dark:bg-secondary-dark'}`}
                        />
                        <div
                          className={`w-2 h-2 opacity-20 ${isPrimary ? 'bg-primary-light dark:bg-primary-dark' : 'bg-secondary-light dark:bg-secondary-dark'}`}
                        />
                      </div>

                      {/* First name large */}
                      <p
                        className="font-mono font-bold uppercase leading-none text-text-light dark:text-text-dark mb-4"
                        style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
                        aria-hidden="true"
                      >
                        {story.name.split(' ')[0]}
                      </p>

                      {/* Divider */}
                      <div
                        aria-hidden="true"
                        className={`h-px w-10 mb-6 ${isPrimary ? 'bg-primary-light dark:bg-primary-dark' : 'bg-secondary-light dark:bg-secondary-dark'}`}
                      />

                      <blockquote>
                        <p className="font-mono text-[12px] xs:text-[13px] text-text-light/55 dark:text-text-dark/50 leading-relaxed tracking-wide italic">
                          &quot;{story.summary}&quot;
                        </p>
                        <footer className="mt-4">
                          <cite className="font-mono text-[10px] font-bold uppercase tracking-widests text-text-light/30 dark:text-text-dark/25 not-italic">
                            {story.age}
                          </cite>
                        </footer>
                      </blockquote>

                      {/* Bottom accent line */}
                      <div
                        aria-hidden="true"
                        className={`absolute bottom-0 left-0 right-0 h-px ${
                          isPrimary
                            ? 'bg-primary-light dark:bg-primary-dark'
                            : 'bg-secondary-light dark:bg-secondary-dark'
                        }`}
                      />
                    </motion.div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Closing quote ──────────────────────────────────────────────────── */}
      <section
        className={`${sectionPad} bg-accent/20 dark:bg-accent-dark/20 border-t border-border-subtle dark:border-border-dark`}
        aria-label="Closing message"
      >
        <div className={`${innerWidth} text-center`}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Dot column centered */}
            <div aria-hidden="true" className="flex gap-2">
              <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark" />
              <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-50" />
              <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-20" />
            </div>

            <p
              className="font-mono font-bold uppercase leading-tight text-text-light dark:text-text-dark max-w-3xl"
              style={{ fontSize: 'clamp(1.25rem, 4vw, 2.5rem)' }}
            >
              Stories like these are what make the work that{' '}
              <span className="text-primary-light dark:text-primary-dark">Education Comes First</span> does so
              important.
            </p>

            <p className="font-mono text-[13px] xs:text-sm text-text-light/50 dark:text-text-dark/45 max-w-md leading-relaxed tracking-wide">
              We want to ensure our students feel empowered, strong, and happy.
            </p>

            <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }}>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2.5 px-6 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
              >
                Get Involved <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
