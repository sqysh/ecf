'use client'

import { motion } from 'framer-motion'
import {} from 'lucide-react'

interface FacebookIconProps {
  size?: number
  className?: string
  strokeWidth?: number
}

function FacebookIcon({ size = 24, className = '', strokeWidth = 2 }: FacebookIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      width={size}
      height={size}
      className={className}
    >
      <g className="">
        <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
      </g>
    </svg>
  )
}

export default function SocialSidebar() {
  const socials = [{ icon: FacebookIcon, href: '#', label: 'Facebook' }]

  return (
    <motion.div
      className="absolute right-2 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-8 sm:gap-10"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        className="text-white text-xs sm:text-sm font-bold tracking-widest uppercase"
        style={{ writingMode: 'sideways-lr', transform: 'rotate(180deg)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Follow Us
      </motion.div>

      <motion.div
        className="w-px h-16 sm:h-20 bg-linear-to-t from-white to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      />

      <motion.div
        className="flex flex-col gap-8 sm:gap-10 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
      >
        {socials.map((social, idx) => {
          const Icon = social.icon
          return (
            <motion.a
              key={idx}
              href={social.href}
              aria-label={social.label}
              className="text-white hover:text-primary-light dark:hover:text-primary-dark transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <Icon size={20} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
            </motion.a>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
