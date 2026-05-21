'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Mic, Headphones, Puzzle, BookMarked } from 'lucide-react'
import { fadeUp } from '@/app/lib/constants/motion.constants'

interface SectionHeadingProps {
  label: string
  heading: string
  highlight?: string
  className?: string
}

function SectionHeading({ label, heading, highlight, className = '' }: SectionHeadingProps) {
  return (
    <div className={`${className} mb-6`}>
      <span className="font-caveat text-xl sm:text-2xl text-secondary-light dark:text-secondary-dark block mb-3">
        {label}
      </span>
      <h2 className="font-kanit text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        {heading} <br />
        {highlight && (
          <span className="bg-linear-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>
      <div className="h-1 w-20 bg-primary-light dark:bg-primary-dark" />
    </div>
  )
}

const programs = [
  {
    icon: BookOpen,
    title: 'Book Clubs',
    description:
      'Small groups read and discuss stories together, helping members build comprehension and critical thinking skills.',
    index: '01',
    color: 'primary'
  },
  {
    icon: Mic,
    title: "Storytelling & Reader's Theater",
    description:
      'Kids bring books to life by acting out scenes, making reading an interactive and unforgettable experience.',
    index: '02',
    color: 'secondary'
  },
  {
    icon: BookMarked,
    title: 'Author Visits & Creative Projects',
    description:
      'Hands-on activities encourage creativity while reinforcing literacy skills in a fun, engaging environment.',
    index: '03',
    color: 'primary'
  },
  {
    icon: Headphones,
    title: 'Audiobooks & Read-Alouds',
    description:
      'Listening to books expands vocabulary and improves fluency, especially for emerging and developing readers.',
    index: '04',
    color: 'secondary'
  },
  {
    icon: Users,
    title: '"Reading Buddies" Program',
    description: 'Older members mentor younger readers, fostering confidence, connection, and leadership skills.',
    index: '05',
    color: 'primary'
  },
  {
    icon: Puzzle,
    title: 'Literacy Games & Challenges',
    description:
      'Word puzzles, scavenger hunts, and interactive quizzes make reading exciting and genuinely rewarding.',
    index: '06',
    color: 'secondary'
  }
]

const challenges = [
  { month: 'October', name: 'Spooky Stories Challenge', emoji: '🎃' },
  { month: 'March', name: 'Read Across America Week', emoji: '📚' },
  { month: 'Summer', name: 'Summer Adventure Reading Quest', emoji: '☀️' }
]

export default function ReadingPage() {
  return (
    <div className="min-h-screen text-text-light dark:text-text-dark">
      {/* Hero Section - Seamless */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-kanit text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-text-light dark:text-text-dark"
            >
              Reading
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
            >
              <Link
                href="/"
                className="font-lato text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark transition-colors"
              >
                Home
              </Link>
              <span className="text-text-light/40 dark:text-text-dark/40">/</span>
              <span className="font-caveat text-xl sm:text-2xl text-secondary-light dark:text-secondary-dark">
                Reading
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <section className="bg-primary-light dark:bg-primary-dark py-4 overflow-hidden border-b border-primary-light/20 dark:border-primary-dark/20">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-kanit font-black text-sm uppercase tracking-widest text-accent-dark px-8 flex items-center gap-6"
            >
              Book Clubs <span className="opacity-30">✦</span> Reader&apos;s Theater{' '}
              <span className="opacity-30">✦</span> Author Visits <span className="opacity-30">✦</span> Audiobooks{' '}
              <span className="opacity-30">✦</span> Reading Buddies <span className="opacity-30">✦</span> Literacy Games{' '}
              <span className="opacity-30">✦</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── HOW WE MAKE READING FUN ── */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 bg-bg-light dark:bg-bg-dark">
        <div className="max-w-container mx-auto  grid grid-cols-1 1150:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading label=" Our Approach" heading="How We Make" highlight="Reading Fun" />
            <p className="text-base sm:text-lg text-text-light/70 dark:text-text-dark/70 leading-relaxed mb-8">
              ECF members participate in exciting, themed reading challenges throughout the year — aligned with
              holidays, special events, and cultural celebrations. Our goal is to make reading a joyful experience every
              single time.
            </p>

            {/* Challenge cards */}
            <div className="space-y-3">
              {challenges.map((c, i) => (
                <motion.div
                  key={c.name}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border-light dark:border-border-dark bg-accent dark:bg-accent-dark group hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 flex items-center justify-center shrink-0 text-lg">
                    {c.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-light/40 dark:text-text-dark/40">
                      {c.month}
                    </p>
                    <p className="font-kanit font-bold uppercase text-sm sm:text-base">{c.name}</p>
                  </div>
                  <div className="ml-auto h-px w-0 group-hover:w-8 bg-primary-light dark:bg-primary-dark transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stat card */}
          <motion.div
            className="relative h-64 sm:h-80"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute top-4 left-4 right-4 bottom-0 rounded-2xl border-2 border-primary-light dark:border-primary-dark rotate-2 bg-primary-light/8 dark:bg-primary-dark/8" />
            <div className="absolute top-2 left-2 right-2 bottom-2 rounded-2xl border border-border-light dark:border-border-dark -rotate-1 bg-secondary-light/5 dark:bg-secondary-dark/5" />
            <div className="absolute inset-0 rounded-2xl bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark flex flex-col items-center justify-center p-8 text-center">
              <span className="font-kanit text-6xl sm:text-7xl font-black text-primary-light dark:text-primary-dark">
                40–60
              </span>
              <span className="font-kanit text-lg font-bold uppercase tracking-widest mt-2">Minutes Per Week</span>
              <p className="text-sm text-text-light/50 dark:text-text-dark/50 mt-3 max-w-xs leading-relaxed">
                Every ECF site dedicates dedicated out-of-school reading time each week to build lasting literacy
                habits.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAMS GRID ── */}
      <section className="border-t border-border-light dark:border-border-dark py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading label="Programs" heading="More Ways We" highlight="Engage Readers" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-light dark:bg-border-dark border border-border-light dark:border-border-dark rounded-xl overflow-hidden">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-bg-light dark:bg-bg-dark p-7 sm:p-10 group hover:bg-accent dark:hover:bg-accent-dark transition-colors duration-300 flex flex-col gap-5"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      program.color === 'primary'
                        ? 'bg-primary-light/20 dark:bg-primary-dark/20'
                        : 'bg-secondary-light/20 dark:bg-secondary-dark/20'
                    }`}
                  >
                    <program.icon
                      className={`w-5 h-5 ${
                        program.color === 'primary'
                          ? 'text-primary-light dark:text-primary-dark'
                          : 'text-secondary-light dark:text-secondary-dark'
                      }`}
                    />
                  </div>
                  <span className="font-kanit text-xs font-black text-text-light/20 dark:text-text-dark/20 tracking-widest">
                    {program.index}
                  </span>
                </div>

                <div>
                  <h3 className="font-kanit text-xl sm:text-2xl font-black uppercase mb-2 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300 leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-sm text-text-light/60 dark:text-text-dark/60 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="h-px w-0 group-hover:w-full bg-primary-light dark:bg-primary-dark transition-all duration-500 mt-auto" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFELONG READERS ── */}
      <section className="bg-bg-light dark:bg-bg-dark px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto grid grid-cols-1 1150:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Stat cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {[
              { value: '6', label: 'Reading Programs', color: 'primary' },
              { value: '40–60', label: 'Min / Week', color: 'secondary' },
              { value: '26', label: 'Sites Nationwide', color: 'secondary' },
              { value: '∞', label: 'Love for Books', color: 'primary' }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-5 rounded-xl border border-border-light dark:border-border-dark group hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-300"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span
                  className={`font-kanit text-3xl sm:text-4xl font-black block mb-1 ${
                    item.color === 'primary'
                      ? 'text-primary-light dark:text-primary-dark'
                      : 'text-secondary-light dark:text-secondary-dark'
                  }`}
                >
                  {item.value}
                </span>
                <span className="text-xs text-text-light/50 dark:text-text-dark/50 font-bold uppercase tracking-wider">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading label="Our Mission" heading="Creating" highlight="Lifelong Readers" />
            <p className="text-base sm:text-lg text-text-light/70 dark:text-text-dark/70 leading-relaxed mb-5">
              At Education Comes First, we firmly believe that reading should be accessible, empowering, and a lifelong
              joy for every child.
            </p>
            <p className="text-base sm:text-lg text-text-light/70 dark:text-text-dark/70 leading-relaxed mb-8">
              By combining structured reading time with activities that genuinely engage students, we help members build
              strong literacy skills, expand their imaginations, and fall in love with books.
            </p>
            <Link
              href="/our-impact"
              className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-full border-2 border-text-light dark:border-text-dark hover:bg-text-light hover:text-bg-light dark:hover:bg-text-dark dark:hover:text-bg-dark transition-all duration-300 group"
            >
              See Our Impact
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border-light dark:border-border-dark bg-accent dark:bg-accent-dark">
        <motion.div
          className="max-w-container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <h3 className="font-kanit text-3xl sm:text-4xl font-black uppercase mb-2">
              Join Us in Building a<br />
              <span className="text-primary-light dark:text-primary-dark">Culture of Reading!</span>
            </h3>
            <p className="text-text-light/60 dark:text-text-dark/60 text-sm sm:text-base max-w-md mt-2">
              Through weekly reading time, themed challenges, and creative literacy activities — we&apos;re fostering a
              love for books that will last a lifetime.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="shrink-0 inline-flex items-center gap-2 font-kanit font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-full bg-primary-light dark:bg-primary-dark text-accent-dark hover:scale-105 transition-transform duration-300 group"
          >
            Get Involved
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
