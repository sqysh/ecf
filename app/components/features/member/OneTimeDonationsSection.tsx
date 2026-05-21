import { ArrowRight, Heart, Plus } from 'lucide-react'
import { Section } from './Section'
import { GhostLink } from '../../ui/buttons/GhostLink'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import Link from 'next/link'
import { formatDate } from '@/app/lib/utils/date.utils'
import { StatusPill } from './StatusPill'
import { PrimaryLink } from '../../ui/buttons/PrimaryLink'

export function OneTimeDonationsSection({
  oneTime
}: {
  oneTime: {
    id: string
    date: string
    amount: number
    status: string
  }[]
}) {
  const reduceMotion = useReducedMotion()

  return (
    <Section
      label="One-time donations"
      icon={Heart}
      custom={1}
      action={
        <GhostLink href="/donate" aria-label="Make a one-time donation">
          <Plus size={12} aria-hidden="true" /> Donate
        </GhostLink>
      }
    >
      {oneTime.length > 0 ? (
        <div className="border border-neutral-200 dark:border-border-dark divide-y divide-neutral-200 dark:divide-border-dark">
          {oneTime.map((d, i) => (
            <motion.div
              key={d.id}
              custom={i}
              variants={reduceMotion ? undefined : fadeUp}
              initial={reduceMotion ? false : 'hidden'}
              animate="visible"
            >
              <Link
                href={`/order-confirmation/${d.id}`}
                className="flex items-center justify-between gap-4 px-4 xs:px-5 py-3.5 hover:bg-black/3 dark:hover:bg-white/3 transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark group"
                aria-label={`View confirmation for donation of $${d.amount.toFixed(2)} on ${formatDate(d.date)}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <p className="font-mono text-[11px] text-text-light/75 dark:text-text-dark/70 shrink-0">
                    {formatDate(d.date)}
                  </p>
                  <StatusPill status={d.status} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <p className="font-mono text-base font-bold text-text-light dark:text-text-dark">
                    ${d.amount.toFixed(2)}
                  </p>
                  <ArrowRight
                    size={12}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="text-text-light/55 dark:text-text-dark/50 group-hover:text-text-light dark:group-hover:text-text-dark transition-colors duration-150"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="border border-neutral-200 dark:border-border-dark px-5 py-10 text-center">
          <Heart
            size={28}
            strokeWidth={1.5}
            aria-hidden="true"
            className="mx-auto mb-3 text-text-light/40 dark:text-text-dark/35"
          />
          <p className="font-mono text-[11px] text-text-light/75 dark:text-text-dark/70 tracking-wide mb-4">
            No one-time donations yet
          </p>
          <PrimaryLink href="/donate">
            <Plus size={12} aria-hidden="true" /> Make a donation
          </PrimaryLink>
        </div>
      )}
    </Section>
  )
}
