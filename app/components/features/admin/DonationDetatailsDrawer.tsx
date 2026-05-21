'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X, Copy, ExternalLink } from 'lucide-react'
import { IOrder } from '@/types/entities/order'
import { useState } from 'react'

function fmt(dollars: number) {
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

function fmtDateTime(d: string | Date | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

function Field({
  label,
  value,
  mono,
  copyable
}: {
  label: string
  value: React.ReactNode
  mono?: boolean
  copyable?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!copyable) return
    navigator.clipboard.writeText(copyable)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="py-3 border-b border-neutral-200 dark:border-border-dark last:border-0">
      <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
        {label}
      </p>
      <div className="flex items-center justify-between gap-2">
        <div
          className={`text-sm text-neutral-900 dark:text-text-dark min-w-0 flex-1 ${
            mono ? 'font-mono text-xs break-all' : ''
          }`}
        >
          {value || <span className="text-neutral-400 dark:text-neutral-500">—</span>}
        </div>
        {copyable && (
          <button
            onClick={handleCopy}
            className="p-1 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer shrink-0"
            title="Copy"
          >
            {copied ? (
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Copied</span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-neutral-200 dark:border-border-dark">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  )
}

export default function DonationDetailDrawer({ donation, onClose }: { donation: IOrder | null; onClose: () => void }) {
  const open = !!donation
  const billing = (donation?.billingAddress as Record<string, string> | null) ?? null

  return (
    <AnimatePresence>
      {open && donation && (
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
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-text-dark truncate">
                  {donation.customerName}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{donation.customerEmail}</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-border-dark hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Amount banner */}
            <div className="px-6 py-5 border-b border-neutral-200 dark:border-border-dark bg-neutral-50 dark:bg-bg-dark/40">
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                Total Amount
              </p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-text-dark tabular-nums">
                {fmt(donation.totalAmount)}
              </p>
              {donation.coverFees && donation.feesCovered > 0 && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Includes {fmt(donation.feesCovered / 100)} in covered fees
                </p>
              )}
            </div>

            {/* Order info */}
            <Section title="Order">
              <Field
                label="Type"
                value={
                  donation.type === 'RECURRING_DONATION'
                    ? `Recurring · ${donation.recurringFrequency ?? 'monthly'}`
                    : 'One-Time'
                }
              />
              <Field label="Status" value={donation.status} />
              <Field label="Created" value={fmtDateTime(donation.createdAt)} />
              {donation.paidAt && <Field label="Paid" value={fmtDateTime(donation.paidAt)} />}
              {donation.nextBillingDate && <Field label="Next Billing" value={fmtDateTime(donation.nextBillingDate)} />}
            </Section>

            {/* Customer */}
            <Section title="Customer">
              <Field label="Name" value={donation.customerName} />
              <Field label="Email" value={donation.customerEmail} copyable={donation.customerEmail} />
              {donation.customerPhone && (
                <Field label="Phone" value={donation.customerPhone} copyable={donation.customerPhone} />
              )}
              {donation.userId && <Field label="User Account" value="Linked" />}
            </Section>

            {/* Billing address */}
            {billing && Object.keys(billing).length > 0 && (
              <Section title="Billing Address">
                {billing.line1 && <Field label="Address" value={billing.line1} />}
                {billing.line2 && <Field label="Address 2" value={billing.line2} />}
                {(billing.city || billing.state || billing.postalCode) && (
                  <Field
                    label="City / State / Zip"
                    value={`${billing.city ?? ''}${billing.state ? `, ${billing.state}` : ''} ${billing.postalCode ?? ''}`.trim()}
                  />
                )}
                {billing.country && <Field label="Country" value={billing.country} />}
              </Section>
            )}

            {/* Payment */}
            <Section title="Payment">
              <Field label="Method" value={donation.paymentMethod ?? 'Unknown'} />
              {donation.paymentIntentId && (
                <Field
                  label="Payment Intent"
                  value={
                    <a
                      href={`https://dashboard.stripe.com/payments/${donation.paymentIntentId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-light dark:text-secondary-dark hover:underline inline-flex items-center gap-1 font-mono text-xs break-all"
                    >
                      {donation.paymentIntentId}
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  }
                  copyable={donation.paymentIntentId}
                />
              )}
              {donation.stripeSubscriptionId && (
                <Field
                  label="Subscription"
                  value={
                    <a
                      href={`https://dashboard.stripe.com/subscriptions/${donation.stripeSubscriptionId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-light dark:text-secondary-dark hover:underline inline-flex items-center gap-1 font-mono text-xs break-all"
                    >
                      {donation.stripeSubscriptionId}
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  }
                  copyable={donation.stripeSubscriptionId}
                />
              )}
            </Section>

            {/* Failure info */}
            {(donation.failureReason || donation.failureCode) && (
              <Section title="Failure">
                {donation.failureCode && <Field label="Code" mono value={donation.failureCode} />}
                {donation.failureReason && <Field label="Reason" value={donation.failureReason} />}
              </Section>
            )}

            {/* Notes */}
            {donation.notes && (
              <Section title="Notes">
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed py-2">{donation.notes}</p>
              </Section>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
