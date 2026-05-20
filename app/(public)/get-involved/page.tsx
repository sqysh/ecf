'use client'

import Picture from '@/app/components/ui/media/Picture'
import { motion } from 'framer-motion'
import { Heart, Users, Megaphone, BookOpen, Shield, Star, User, Zap } from 'lucide-react'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, easing: 'easeOut' } }
}

const waysToGive = [
  {
    icon: Heart,
    title: 'Donate',
    description:
      'Make a one-time or monthly gift to provide essential educational programs, tutoring, and resources to children in need.'
  },
  {
    icon: Users,
    title: 'Corporate Partnerships',
    description:
      'Partner with ECF through sponsorships, in-kind donations, matching gifts, or employee volunteer programs.'
  },
  {
    icon: Zap,
    title: 'Sponsor a Site',
    description:
      'Fund an ECF program in your community for a trimester or full year, ensuring local children receive resources.'
  },
  {
    icon: BookOpen,
    title: 'Grants & Foundations',
    description:
      'We welcome support from foundations and grant-makers to expand our programs and reach more young learners.'
  },
  {
    icon: Shield,
    title: 'Planned Giving',
    description: 'Include ECF in your will or estate planning to leave a lasting impact on future generations.'
  },
  {
    icon: Megaphone,
    title: 'Fundraise for ECF',
    description:
      'Host an event, run a fundraiser, or start a peer-to-peer campaign to help bring educational opportunities to children.'
  }
]

const waysToInvolve = [
  'Become a Volunteer – Share your skills and time to support local youth programs.',
  'Become a Corporate Partner – Engage your business in making a real difference.',
  'Start a Fundraiser – Create an online or community event to raise awareness and support.',
  'Spread the Word – Follow us on social media and share our mission with your network.'
]

const impact = [
  { icon: BookOpen, text: 'Provide tutoring and academic support in reading and math.' },
  { icon: Shield, text: 'Create safe and enriching out-of-school learning environments.' },
  { icon: Star, text: "Offer mental health resources to support students' well-being." },
  { icon: User, text: 'Expand our reach to underserved communities across the country.' }
]

export default function HowToGetInvolved() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <div className="max-w-container mx-auto px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="py-16 xs:py-20 lg:py-24 border-b border-border-subtle dark:border-border-dark"
        >
          <p
            aria-hidden="true"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
          >
            {'// make an impact'}
          </p>
          <h1
            className="font-mono font-bold text-text-light dark:text-text-dark leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Get Involved
          </h1>
          <p className="font-mono text-[13px] xs:text-sm text-text-light/55 dark:text-text-dark/50 tracking-wide leading-relaxed max-w-md">
            Every child deserves quality education.{' '}
            <span className="text-primary-light dark:text-primary-dark">Help us expand our reach today.</span>
          </p>
        </motion.div>

        {/* Support & Impact */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 xs:py-20 border-b border-border-subtle dark:border-border-dark"
        >
          {/* Split — text + image */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-28">
            <motion.div variants={containerVariants} className="flex flex-col">
              <motion.p
                variants={itemVariants}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-4"
              >
                {'// who we are'}
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="font-mono font-bold text-text-light dark:text-text-dark leading-tight mb-6"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
              >
                Support Education Comes First
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="font-mono text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed mb-4"
              >
                At ECF, we believe every child deserves quality education. We partner with nonprofit youth organizations
                to uphold high educational standards, boosting confidence, social-emotional well-being, and a love for
                learning — especially in reading and math.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="font-mono text-sm text-text-light/60 dark:text-text-dark/55 leading-relaxed mb-8"
              >
                With your support, we can expand our reach and impact more young lives across the United States.
              </motion.p>
              <motion.div variants={containerVariants} className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  variants={itemVariants}
                  href="/contact-us"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-light dark:bg-primary-dark text-black font-mono text-sm font-medium hover:opacity-85 transition-opacity"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Donate Now →
                </motion.a>
                <motion.a
                  variants={itemVariants}
                  href="#ways-to-give"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border-subtle dark:border-border-dark text-text-light dark:text-text-dark font-mono text-sm font-medium hover:border-secondary-light dark:hover:border-secondary-dark transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden border border-border-subtle dark:border-border-dark h-80 md:h-96 lg:h-full min-h-80"
            >
              <Picture
                src="/images/img-17.jpg"
                alt="Kids Learning"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                priority={false}
                width={800}
                height={800}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Impact Stats */}
          <motion.div variants={containerVariants}>
            <motion.p
              variants={itemVariants}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
            >
              {'// your impact'}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-mono font-bold text-text-light dark:text-text-dark leading-tight mb-12"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              What Your Support Enables
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-subtle dark:bg-border-dark"
            >
              {impact.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="group bg-bg-light dark:bg-bg-dark p-8 sm:p-10 hover:bg-accent dark:hover:bg-accent-dark transition-colors duration-150"
                  >
                    <Icon className="w-8 h-8 text-primary-light dark:text-primary-dark mb-4" strokeWidth={1.5} />
                    <p className="font-mono text-sm text-text-light/70 dark:text-text-dark/65 leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="py-16 xs:py-20 border-b border-border-subtle dark:border-border-dark"
        >
          <div className="bg-primary-light dark:bg-primary-dark px-8 sm:px-12 md:px-16 py-12 md:py-16">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/50 mb-3">
              {'// transform lives'}
            </p>
            <h3
              className="font-mono font-bold text-black leading-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
            >
              Transform Lives Today
            </h3>
            <p className="font-mono text-sm text-black/70 leading-relaxed max-w-xl mb-8">
              Every donation directly supports programs that empower young learners and create meaningful opportunities
              for children across the nation.
            </p>

            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-mono text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Make Your Donation →
            </Link>
          </div>
        </motion.div>

        {/* Ways to Give */}
        <motion.div
          id="ways-to-give"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 xs:py-20 border-b border-border-subtle dark:border-border-dark"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
          >
            {'// ways to give'}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-mono font-bold text-text-light dark:text-text-dark leading-tight mb-12"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Ways to Give
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-subtle dark:bg-border-dark mb-12"
          >
            {waysToGive.map((way, idx) => {
              const Icon = way.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-bg-light dark:bg-bg-dark p-8 hover:bg-accent dark:hover:bg-accent-dark transition-colors duration-150"
                >
                  <Icon className="w-8 h-8 text-primary-light dark:text-primary-dark mb-5" strokeWidth={1.5} />
                  <h3 className="font-mono text-sm font-medium text-text-light dark:text-text-dark mb-2">
                    {way.title}
                  </h3>
                  <p className="font-mono text-xs text-text-light/55 dark:text-text-dark/50 leading-relaxed">
                    {way.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-light dark:bg-primary-dark text-black font-mono text-sm font-medium hover:opacity-85 transition-opacity"
            >
              Contact Us to Get Involved →
            </Link>
          </motion.div>
        </motion.div>

        {/* Ways to Get Involved */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 xs:py-20 pb-24 xs:pb-32"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
          >
            {'// get involved'}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-mono font-bold text-text-light dark:text-text-dark leading-tight mb-12"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Ways to Get Involved
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="space-y-px bg-border-subtle dark:bg-border-dark max-w-2xl mb-12"
          >
            {waysToInvolve.map((way, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex gap-4 items-start bg-bg-light dark:bg-bg-dark px-6 py-5 hover:bg-accent dark:hover:bg-accent-dark transition-colors duration-150 group"
              >
                <span className="font-mono text-[10px] text-primary-light dark:text-primary-dark mt-1 tracking-widest shrink-0 select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="font-mono text-sm text-text-light/70 dark:text-text-dark/65 leading-relaxed">{way}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-light dark:bg-primary-dark text-black font-mono text-sm font-medium hover:opacity-85 transition-opacity"
            >
              Contact Us to Get Involved →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
