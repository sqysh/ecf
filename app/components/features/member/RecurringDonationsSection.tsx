import { CalendarClock, Plus, Zap } from 'lucide-react'
import { Section } from './Section'
import { GhostLink } from '../../ui/buttons/GhostLink'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { formatDate } from '@/app/lib/utils/date.utils'
import { StatusPill } from './StatusPill'
import Link from 'next/link'
import { PrimaryLink } from '../../ui/buttons/PrimaryLink'

export function RecurringDonationsSection({
  recurring
}: {
  recurring: {
    id: string
    amount: number
    frequency: string
    startDate: string
    status: string
    nextDate: string | any
    stripeSubscriptionId: string
  }[]
}) {
  const reduceMotion = useReducedMotion()
  return (
    <Section
      label="Recurring donations"
      icon={CalendarClock}
      custom={2}
      action={
        <GhostLink href="/donate" aria-label="Set up a recurring donation">
          <Plus size={12} aria-hidden="true" /> Subscribe
        </GhostLink>
      }
    >
      {recurring.length > 0 ? (
        <div className="space-y-0 border border-neutral-200 dark:border-border-dark divide-y divide-neutral-200 dark:divide-border-dark">
          {recurring.map((d, i) => (
            <motion.div
              key={d.id}
              custom={i}
              variants={reduceMotion ? undefined : fadeUp}
              initial={reduceMotion ? false : 'hidden'}
              animate="visible"
              className="px-4 xs:px-5 py-4 bg-white/40 dark:bg-accent-dark/30 transition-colors duration-150"
            >
              <div className="flex items-start xs:items-center justify-between gap-3 flex-wrap mb-3">
                <div>
                  <p className="font-mono font-bold text-text-light dark:text-text-dark">
                    ${d.amount.toFixed(2)}{' '}
                    <span className="font-normal text-[11px] text-text-light/75 dark:text-text-dark/70">
                      / {d.frequency}
                    </span>
                  </p>
                  <p className="font-mono text-[10px] tracking-wide text-text-light/70 dark:text-text-dark/65 mt-0.5">
                    Next: {formatDate(d.nextDate)}
                  </p>
                </div>
                <StatusPill status={d.status} />
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/order-confirmation/${d.id}`}
                  className="font-mono text-[10px] tracking-widest uppercase font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                >
                  Confirmation
                </Link>
                <span aria-hidden="true" className="text-text-light/55 dark:text-text-dark/50 text-xs">
                  ·
                </span>
                <Link
                  href={`/member/portal/${d.stripeSubscriptionId}`}
                  className={`font-mono text-[10px] tracking-widest uppercase font-bold underline underline-offset-2 hover:no-underline transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    d.status === 'cancelled'
                      ? 'text-text-light/75 dark:text-text-dark/70 hover:text-text-light dark:hover:text-text-dark focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark'
                      : 'text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 focus-visible:outline-red-700 dark:focus-visible:outline-red-400'
                  }`}
                  aria-label={
                    d.status === 'cancelled'
                      ? `View details of cancelled $${d.amount.toFixed(2)} ${d.frequency} subscription`
                      : `Manage or cancel $${d.amount.toFixed(2)} ${d.frequency} subscription`
                  }
                >
                  {d.status === 'cancelled' ? 'View details' : 'Manage / Cancel'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="border border-neutral-200 dark:border-border-dark px-5 py-10 text-center">
          <Zap
            size={28}
            strokeWidth={1.5}
            aria-hidden="true"
            className="mx-auto mb-3 text-text-light/40 dark:text-text-dark/35"
          />
          <p className="font-mono text-[11px] text-text-light/75 dark:text-text-dark/70 tracking-wide mb-4">
            No recurring donations yet
          </p>
          <PrimaryLink href="/donate">
            <Plus size={12} aria-hidden="true" /> Set up recurring
          </PrimaryLink>
        </div>
      )}
    </Section>
  )
}
