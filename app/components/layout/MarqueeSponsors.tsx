'use client'

import { motion } from 'framer-motion'
import LogoIconLight from '@/public/svg/LogoIconLight'
import LogoIconDark from '@/public/svg/LogoIconDark'
import Picture from '../ui/media/Picture'

const sponsorImages = [
  '/images/sponsor-1.png',
  '/images/sponsor-2.png',
  '/images/sponsor-3.png',
  '/images/sponsor-4.png',
  '/images/sponsor-5.png',
  '/images/sponsor-6.png',
  '/images/sponsor-7.png',
  '/images/sponsor-8.png',
  '/images/sponsor-9.png',
  '/images/sponsor-10.png',
  '/images/sponsor-11.png',
  '/images/sponsor-12.png',
  '/images/sponsor-13.png',
  '/images/sponsor-14.png',
  '/images/sponsor-15.png',
  '/images/sponsor-16.png',
  '/images/sponsor-17.png',
  '/images/sponsor-18.png',
  '/images/sponsor-19.png',
  '/images/sponsor-20.png',
  '/images/sponsor-21.png',
  '/images/sponsor-22.png',
  '/images/sponsor-23.png',
  '/images/sponsor-24.png',
  '/images/sponsor-25.png'
]

interface MarqueeSponsorsProps {
  sponsors?: string[]
}

export default function MarqueeSponsors({ sponsors = sponsorImages }: MarqueeSponsorsProps) {
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors]

  return (
    <motion.div
      className="w-full bg-primary-light dark:bg-primary-dark py-1 sm:py-2 md:py-3 lg:py-4 xl:py-6 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4"
        animate={{ x: [0, -100 * sponsors.length] }}
        transition={{
          duration: 50,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear'
        }}
      >
        {duplicatedSponsors.map((sponsor, idx) => (
          <motion.div
            key={idx}
            className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Picture
              src={sponsor}
              alt={`Sponsor ${(idx % sponsors.length) + 1}`}
              className="h-8 sm:h-10 md:h-12 lg:h-16 xl:h-24 w-auto object-contain filter hover:brightness-110 transition-all"
              priority={false}
              width={100}
              height={100}
            />
            <div className="w-6 sm:w-8 md:w-10 shrink-0">
              <LogoIconLight />
              <LogoIconDark />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
