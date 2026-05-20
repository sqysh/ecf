'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Heart, RefreshCw, Receipt, ArrowRight } from 'lucide-react'
import { IOrder } from '@/types/entities/order'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { formatDate } from '@/app/lib/utils/date.utils'
import { formatTime } from '@/app/lib/utils/time.utils'

const formatType = (type: string) =>
  type === 'ONE_TIME_DONATION'
    ? 'One-time donation'
    : type === 'RECURRING_DONATION'
      ? 'Recurring donation'
      : type.replace(/_/g, ' ').toLowerCase()

// ─── Detail row ───────────────────────────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border-subtle dark:border-border-dark last:border-0">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/40 dark:text-text-dark/35 shrink-0 mt-0.5">
        {label}
      </p>
      <p className="font-mono text-[12px] text-text-light dark:text-text-dark text-right">{value}</p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ORDER CONFIRMATION PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function OrderConfirmationPage({ order }: { order: IOrder }) {
  const donationAmount = order.totalAmount - (order.coverFees ? order.feesCovered : 0)
  const isRecurring = order.isRecurring || order.type === 'RECURRING_DONATION'

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-light dark:focus:bg-primary-dark focus:text-accent-dark focus:font-mono focus:text-sm"
      >
        Skip to main content
      </a>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-border-subtle dark:border-border-dark px-4 xs:px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            aria-label="Education Comes First — home"
            className="font-mono text-[11px] font-bold tracking-[0.15em] uppercase text-text-light dark:text-text-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
          >
            Education<span className="text-primary-light dark:text-primary-dark"> Comes First</span>
          </Link>
          <span className="font-mono text-[9px] tracking-widest uppercase text-text-light/25 dark:text-text-dark/20">
            Order #{order.id.slice(-8).toUpperCase()}
          </span>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main id="main-content" className="max-w-2xl mx-auto px-4 xs:px-6 py-10 xs:py-16">
        {/* ── Success hero ─────────────────────────────────────────────────── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-10 xs:mb-14"
        >
          {/* Icon */}
          <div className="flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-16 border-2 border-primary-light dark:border-primary-dark bg-primary-light/8 dark:bg-primary-dark/8 flex items-center justify-center"
              aria-hidden="true"
            >
              <Check size={28} strokeWidth={2.5} className="text-primary-light dark:text-primary-dark" />
            </motion.div>
          </div>

          <p
            aria-hidden="true"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
          >
            {'// confirmed'}
          </p>
          <h1
            className="font-mono font-bold text-text-light dark:text-text-dark leading-tight mb-3"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            Thank you,{' '}
            <span className="text-primary-light dark:text-primary-dark">{order.customerName.split(' ')[0]}</span>
          </h1>
          <p className="font-mono text-[12px] xs:text-[13px] text-text-light/45 dark:text-text-dark/40 tracking-wide leading-relaxed max-w-md mx-auto">
            Your {isRecurring ? 'recurring donation has been set up' : 'donation has been received'}. A confirmation has
            been sent to <span className="text-text-light dark:text-text-dark">{order.customerEmail}</span>.
          </p>
        </motion.div>

        {/* ── Amount highlight ─────────────────────────────────────────────── */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="border border-primary-light/25 dark:border-primary-dark/25 bg-primary-light/4 dark:bg-primary-dark/4 px-6 py-6 text-center mb-6"
          role="region"
          aria-label="Donation total"
        >
          <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30 mb-2">
            {isRecurring ? `${order.recurringFrequency ?? 'Recurring'} donation` : 'Donation total'}
          </p>
          <p
            className="font-mono font-bold text-primary-light dark:text-primary-dark leading-none"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}
          >
            ${order.totalAmount.toFixed(2)}
          </p>
          {order.coverFees && (
            <p className="font-mono text-[10px] tracking-wide text-text-light/35 dark:text-text-dark/30 mt-2">
              Includes ${order.feesCovered.toFixed(2)} to cover processing fees
            </p>
          )}
        </motion.div>

        {/* ── Impact strip ─────────────────────────────────────────────────── */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-start gap-3 px-4 py-4 border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 mb-6"
        >
          {isRecurring ? (
            <RefreshCw
              size={14}
              strokeWidth={2}
              aria-hidden="true"
              className="text-secondary-light dark:text-secondary-dark shrink-0 mt-0.5"
            />
          ) : (
            <Heart
              size={14}
              strokeWidth={2}
              aria-hidden="true"
              className="text-secondary-light dark:text-secondary-dark shrink-0 mt-0.5"
            />
          )}
          <p className="font-mono text-[11px] tracking-wide text-text-light/60 dark:text-text-dark/55 leading-relaxed">
            {isRecurring
              ? `Your ${order.recurringFrequency?.toLowerCase() ?? 'recurring'} gift of $${order.totalAmount.toFixed(2)} will help fund ongoing educational programs. ${order.nextBillingDate ? `Next billing date: ${formatDate(order.nextBillingDate)}.` : ''}`
              : `Your gift of $${donationAmount.toFixed(2)} goes directly toward supporting students and educational programs at Education Comes First.`}
          </p>
        </motion.div>

        {/* ── Order details ─────────────────────────────────────────────────── */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <div className="flex items-center gap-2 mb-4">
            <Receipt
              size={13}
              strokeWidth={2}
              aria-hidden="true"
              className="text-text-light/35 dark:text-text-dark/30"
            />
            <h2 className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-light/35 dark:text-text-dark/30">
              Order details
            </h2>
          </div>

          <div className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-4 xs:px-5">
            <DetailRow
              label="Status"
              value={
                <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border border-primary-light/30 dark:border-primary-dark/30 text-primary-light dark:text-primary-dark bg-primary-light/6 dark:bg-primary-dark/6">
                  {order.status}
                </span>
              }
            />
            <DetailRow label="Type" value={formatType(order.type)} />
            <DetailRow label="Name" value={order.customerName} />
            <DetailRow label="Email" value={order.customerEmail} />
            <DetailRow label="Date" value={`${formatDate(order.paidAt)} at ${formatTime(order.paidAt)}`} />
            <DetailRow label="Donation" value={`$${donationAmount.toFixed(2)}`} />
            {order.coverFees && <DetailRow label="Fees covered" value={`$${order.feesCovered.toFixed(2)}`} />}
            <DetailRow label="Total charged" value={`$${order.totalAmount.toFixed(2)}`} />
            <DetailRow
              label="Payment"
              value={order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)}
            />
            {isRecurring && order.nextBillingDate && (
              <DetailRow label="Next billing" value={formatDate(order.nextBillingDate)} />
            )}
            <DetailRow
              label="Reference"
              value={
                <span className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 break-all">
                  {order.paymentIntentId}
                </span>
              }
            />
          </div>
        </motion.div>

        {/* ── Actions ──────────────────────────────────────────────────────── */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col xs:flex-row gap-3 mt-8"
        >
          <Link
            href="/member/portal"
            className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-[0.1em] uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
          >
            View your portal <ArrowRight size={13} aria-hidden="true" />
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-[0.1em] uppercase border border-border-subtle dark:border-border-dark text-text-light/60 dark:text-text-dark/50 hover:text-text-light dark:hover:text-text-dark hover:border-text-light/25 dark:hover:border-text-dark/25 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
          >
            Back to home
          </Link>
        </motion.div>

        {/* ── Footer note ───────────────────────────────────────────────────── */}
        <motion.p
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-mono text-[10px] tracking-wide text-text-light/25 dark:text-text-dark/20 text-center mt-8 leading-relaxed"
        >
          Education Comes First is a 501(c)(3) nonprofit. Your donation may be tax-deductible.{' '}
          <a
            href="/contact"
            className="underline hover:text-text-light/50 dark:hover:text-text-dark/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
          >
            Contact us
          </a>{' '}
          with any questions.
        </motion.p>
      </main>
    </div>
  )
}
