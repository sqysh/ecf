'use client'

import { UserWithStats } from '@/app/(authenticated)/admin/users/page'
import { fmtCurreny } from '@/app/lib/utils/currency.utils'
import { fullName, initials } from '@/app/lib/utils/user.utils'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { fmtDateTime, formatDate } from '@/app/lib/utils/date.utils'
import { Section } from '../../layout/Section'
import { Field } from '../../ui/forms/Field'
import OrderStatusBadge from '../../domain/badges/OrderStatusBadge'

export default function UserDetailDrawer({ user, onClose }: { user: UserWithStats | null; onClose: () => void }) {
  const open = !!user

  return (
    <AnimatePresence>
      {open && user && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70" onClick={onClose} />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-accent-dark border-l border-neutral-200 dark:border-border-dark overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-accent-dark border-b border-neutral-200 dark:border-border-dark px-6 py-5 flex items-start justify-between gap-3 z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-neutral-100 dark:bg-border-dark text-neutral-700 dark:text-neutral-300 font-semibold text-base">
                  {initials(user.firstName, user.lastName, user.email)}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-neutral-900 dark:text-text-dark truncate">
                    {fullName(user.firstName, user.lastName, user.email)}
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-border-dark hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stats banner */}
            <div className="grid grid-cols-2 border-b border-neutral-200 dark:border-border-dark bg-neutral-50 dark:bg-bg-dark/40">
              <div className="px-6 py-4 border-r border-neutral-200 dark:border-border-dark">
                <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                  Lifetime Given
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-text-dark tabular-nums">
                  {fmtCurreny(user.totalGiven)}
                </p>
              </div>
              <div className="px-6 py-4">
                <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                  Donations
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-text-dark tabular-nums">
                  {user.orderCount}
                </p>
                {user.hasRecurring && (
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-secondary-light dark:text-secondary-dark mt-0.5">
                    Recurring active
                  </p>
                )}
              </div>
            </div>

            {/* Account */}
            <Section title="Account">
              <Field label="Role" value={user.role} />
              <Field label="User ID" value={user.id} mono copyable={user.id} />
              <Field
                label="Email Verified"
                value={user.emailVerified ? formatDate(user.emailVerified) : 'Not verified'}
              />
              <Field label="Joined" value={fmtDateTime(user.createdAt)} />
              <Field label="Last Login" value={user.lastLoginAt ? fmtDateTime(user.lastLoginAt) : 'Never'} />
            </Section>

            {/* Contact */}
            <Section title="Contact">
              <Field label="First Name" value={user.firstName} />
              <Field label="Last Name" value={user.lastName} />
              <Field label="Email" value={user.email} copyable={user.email} />
              {user.phone && <Field label="Phone" value={user.phone} copyable={user.phone} />}
            </Section>

            {/* Stripe */}
            {user.stripeCustomerId && (
              <Section title="Stripe">
                <Field
                  label="Customer ID"
                  value={
                    <a
                      href={`https://dashboard.stripe.com/customers/${user.stripeCustomerId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-light dark:text-secondary-dark hover:underline inline-flex items-center gap-1 font-mono text-xs break-all"
                    >
                      {user.stripeCustomerId}
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  }
                  copyable={user.stripeCustomerId}
                />
              </Section>
            )}

            {/* Donation history */}
            {user.orders.length > 0 && (
              <Section title={`Donation History (${user.orders.length})`}>
                <div className="divide-y divide-neutral-200 dark:divide-border-dark -mx-6">
                  {user.orders.slice(0, 10).map((o) => (
                    <div key={o.id} className="px-6 py-2.5 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-neutral-900 dark:text-text-dark tabular-nums">
                            {fmtCurreny(o.totalAmount)}
                          </p>
                          <OrderStatusBadge status={o.status} />
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {o.type === 'RECURRING_DONATION'
                            ? `Recurring · ${o.recurringFrequency ?? 'monthly'}`
                            : 'One-Time'}
                        </p>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                        {formatDate(o.createdAt)}
                      </p>
                    </div>
                  ))}
                  {user.orders.length > 10 && (
                    <p className="px-6 py-2 text-xs text-center text-neutral-500 dark:text-neutral-400">
                      +{user.orders.length - 10} more
                    </p>
                  )}
                </div>
              </Section>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
