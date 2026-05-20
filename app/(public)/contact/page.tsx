'use client'

import Picture from '@/app/components/ui/media/Picture'
import ContactForm from '@/app/components/features/contact/ContactForm'
import { motion } from 'framer-motion'

const contactInfo = [
  {
    title: 'Address',
    details: '25 Henry Avenue\nLynn, MA 01902'
  },
  {
    title: 'Phone',
    details: '(781) 593-1772'
  },
  {
    title: 'Email',
    details: 'info@bgcl.org'
  },
  {
    title: 'Hours',
    details: 'Mon-Fri: 9:00 AM - 5:00 PM\nSat: 10:00 AM - 2:00 PM'
  }
]

export default function Contact() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <div className="max-w-5xl mx-auto px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32">
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
            {'// get in touch'}
          </p>
          <h1
            className="font-mono font-bold text-text-light dark:text-text-dark leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Contact Us
          </h1>
          <p className="font-mono text-[13px] xs:text-sm text-text-light/55 dark:text-text-dark/50 tracking-wide leading-relaxed max-w-md">
            We&apos;d love to hear from you.{' '}
            <span className="text-primary-light dark:text-primary-dark">Get in touch with us today.</span>
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-8 xs:gap-10 lg:gap-12 items-start py-16 xs:py-20 pb-20 xs:pb-32">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <ContactForm />
          </motion.div>

          {/* Right — info */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-1 flex flex-col gap-4"
          >
            {/* Image */}
            <div className="relative overflow-hidden border border-border-subtle dark:border-border-dark h-56 xs:h-72 lg:h-80">
              <Picture
                src="/images/img-16.jpg"
                alt="Education Comes First — visit our club"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                priority={true}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-5">
                <p className="font-mono text-sm font-bold text-white mb-0.5">Visit Our Club</p>
                <p className="font-mono text-[11px] tracking-wide text-white/70">Come see what we&apos;re all about</p>
              </div>
            </div>

            {/* Contact info cards */}
            <div className="flex flex-col gap-3">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-4 xs:px-5 py-4"
                >
                  <p className="font-mono text-[10px] tracking-widests uppercase text-text-light/40 dark:text-text-dark/35 mb-1.5">
                    {info.title}
                  </p>
                  <p className="font-mono text-sm text-text-light dark:text-text-dark whitespace-pre-line leading-relaxed">
                    {info.details}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
