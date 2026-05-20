'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowLeft,
  RefreshCw,
  Receipt,
  CreditCard,
  AlertTriangle,
  X,
  ExternalLink,
  Calendar,
  CheckCircle
} from 'lucide-react'
import { backdropVariants, fadeUp, panelVariants } from '@/app/lib/constants/motion.constants'
import { cancelStripeSubscription } from '@/app/lib/actions/cancelStripeSubscription'
import { useRouter } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ISubscriptionDetail {
  subscription: {
    id: string
    status: string
    cancel_at_period_end: boolean
    canceled_at: string | null | undefined
    current_period_start: string
    current_period_end: string
    created: string | null
    billing_cycle_anchor: string | null
    days_until_due: number | null
    collection_method: string
    cancellation_details: {
      comment: string | null
      feedback: string | null
      reason: string | null
    } | null
    items: any[]
    default_payment_method: {
      id: string
      type: string
      card: {
        brand: string
        last4: string
        exp_month: number
        exp_year: number
      } | null
    } | null
    latest_invoice: {
      id: string
      amount_due: number
      amount_paid: number
      status: string
      created: string
      hosted_invoice_url: string
      invoice_pdf: string
    } | null
    trial_start: string | null
    trial_end: string | null
    metadata: {
      coverFees?: string
      email?: string
      feesCovered?: string
      frequency?: string
      name?: string
      orderType?: string
      userId?: string
    }
  }
  order: {
    id: string
    type: string
    status: string
    totalAmount: number
    customerName: string
    customerEmail: string
    customerPhone: string | null
    recurringFrequency: string | null
    paymentMethod: string | null
    isRecurring: boolean
    stripeSubscriptionId: string | null
    paymentIntentId: string | null
    nextBillingDate: string | null
    paidAt: string | null
    createdAt: string
    updatedAt: string
  } | null
  isCancelled: boolean
  willCancelAtPeriodEnd: boolean
  currentPeriodEnd: string | null
  isActive: boolean
  isPastDue: boolean
  isUnpaid: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (d: string | null | undefined) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const cents = (n: number) => `$${(n / 100).toFixed(2)}`

// ─── Detail row ───────────────────────────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border-subtle dark:border-border-dark last:border-0">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/40 dark:text-text-dark/35 shrink-0 mt-0.5">
        {label}
      </p>
      <div className="font-mono text-[12px] text-text-light dark:text-text-dark text-right">{value}</div>
    </div>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const active = status === 'active' || status === 'paid' || status === 'CONFIRMED'
  return (
    <span
      className={`font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border ${
        active
          ? 'border-primary-light/30 dark:border-primary-dark/30 text-primary-light dark:text-primary-dark bg-primary-light/6 dark:bg-primary-dark/6'
          : 'border-red-400/30 text-red-400 bg-red-400/6'
      }`}
    >
      {status}
    </span>
  )
}

// ─── Cancel modal ─────────────────────────────────────────────────────────────
function CancelModal({
  open,
  onClose,
  onConfirm,
  cancelling,
  periodEnd
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  cancelling: boolean
  periodEnd: string
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-end xs:items-center justify-center px-4 pb-4 xs:pb-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-modal-title"
            aria-describedby="cancel-modal-description"
            className="w-full max-w-md bg-bg-light dark:bg-bg-dark border border-border-subtle dark:border-border-dark"
            onClick={(e) => e.stopPropagation()}
            aria-hidden="false"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-5 xs:px-6 py-5 border-b border-border-subtle dark:border-border-dark">
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} strokeWidth={2} aria-hidden="true" className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h2
                    id="cancel-modal-title"
                    className="font-mono text-sm font-bold text-text-light dark:text-text-dark"
                  >
                    Cancel subscription
                  </h2>
                  <p
                    id="cancel-modal-description"
                    className="font-mono text-[11px] text-text-light/40 dark:text-text-dark/35 mt-1 tracking-wide"
                  >
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 text-text-light/35 dark:text-text-dark/30 hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-9 min-w-9 flex items-center justify-center -mt-0.5 -mr-0.5"
              >
                <X size={15} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 xs:px-6 py-6 space-y-4">
              <p className="font-mono text-[12px] text-text-light/60 dark:text-text-dark/55 leading-relaxed tracking-wide">
                Your subscription will remain active until the end of the current billing period on{' '}
                <span className="text-text-light dark:text-text-dark font-bold">{periodEnd}</span>. After that, no
                further charges will be made.
              </p>

              <div className="flex gap-3">
                <motion.button
                  onClick={onConfirm}
                  disabled={cancelling}
                  aria-busy={cancelling}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-red-400/50 bg-red-400/8 text-red-400 hover:bg-red-400/15 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 min-h-11"
                  whileHover={!cancelling ? { y: -1 } : {}}
                  whileTap={!cancelling ? { y: 0 } : {}}
                  transition={{ duration: 0.15 }}
                >
                  {cancelling ? 'Cancelling...' : 'Yes, cancel'}
                </motion.button>
                <motion.button
                  onClick={onClose}
                  disabled={cancelling}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border border-border-subtle dark:border-border-dark text-text-light/60 dark:text-text-dark/50 hover:text-text-light dark:hover:text-text-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  Keep it
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUBSCRIPTION DETAIL PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function MemberPortalSubscriptionDetailsClient({
  subscription,
  order,
  isCancelled,
  willCancelAtPeriodEnd,
  isActive,
  isPastDue,
  isUnpaid
}: ISubscriptionDetail) {
  const router = useRouter()
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [cancelled, setCancelled] = useState(isCancelled || willCancelAtPeriodEnd)

  if (!order)
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30 mb-2">
            {'// not found'}
          </p>
          <p className="font-mono text-sm text-text-light/50 dark:text-text-dark/40">
            Order details could not be found.
          </p>
          <Link
            href="/member/portal"
            className="inline-flex items-center gap-2 mt-4 font-mono text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light"
          >
            <ArrowLeft size={12} aria-hidden="true" /> Back to portal
          </Link>
        </div>
      </div>
    )

  const card = subscription.default_payment_method?.card
  const invoice = subscription.latest_invoice
  const freq = order.recurringFrequency ?? subscription.metadata.frequency ?? 'monthly'
  const periodEnd = fmt(subscription.current_period_end)

  const handleCancel = async () => {
    setCancelling(true)
    await cancelStripeSubscription(subscription.id)
    router.refresh()
    setCancelling(false)
    setCancelOpen(false)
    setCancelled(true)
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-light dark:focus:bg-primary-dark focus:text-accent-dark focus:font-mono focus:text-sm"
      >
        Skip to main content
      </a>

      {/* Cancel modal */}
      <CancelModal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        onConfirm={handleCancel}
        cancelling={cancelling}
        periodEnd={periodEnd}
      />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-10 border-b border-border-subtle dark:border-border-dark bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 xs:px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/member/portal"
            className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-text-light/50 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
            aria-label="Back to supporter portal"
          >
            <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
            <span className="hidden xs:inline">Portal</span>
          </Link>
          <span className="font-mono text-[9px] tracking-widest uppercase text-text-light/25 dark:text-text-dark/20">
            {subscription.id.slice(-12)}
          </span>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main id="main-content" className="max-w-2xl mx-auto px-4 xs:px-6 py-10 xs:py-14 space-y-6">
        {/* Page title */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <p
            aria-hidden="true"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2"
          >
            {'// subscription details'}
          </p>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-mono text-2xl xs:text-3xl font-bold text-text-light dark:text-text-dark leading-tight">
                {freq.charAt(0).toUpperCase() + freq.slice(1)} Donation
              </h1>
              <p className="font-mono text-[11px] mt-1.5 tracking-wide text-text-light/40 dark:text-text-dark/35">
                {order.customerName} · {order.customerEmail}
              </p>
            </div>
            <StatusBadge status={subscription.status} />
          </div>
        </motion.div>

        {/* Cancelled banner */}
        <AnimatePresence>
          {cancelled && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              aria-live="polite"
              className="flex items-start gap-2.5 px-4 py-3 border border-primary-light/30 dark:border-primary-dark/30 bg-primary-light/6 dark:bg-primary-dark/6 text-primary-light dark:text-primary-dark font-mono text-[11px] tracking-wide"
            >
              <CheckCircle size={13} strokeWidth={2.5} aria-hidden="true" className="shrink-0 mt-0.5" />
              Subscription cancelled. Access continues until {periodEnd}.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Past due / unpaid banners */}
        {(isPastDue || isUnpaid) && (
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            role="alert"
            className="flex items-start gap-2.5 px-4 py-3 border border-red-400/30 bg-red-400/6 text-red-400 font-mono text-[11px] tracking-wide"
          >
            <AlertTriangle size={13} strokeWidth={2.5} aria-hidden="true" className="shrink-0 mt-0.5" />
            {isPastDue
              ? 'Payment past due — please update your payment method.'
              : 'Payment unpaid — your subscription may be paused.'}
          </motion.div>
        )}

        {/* ── Amount + billing ─────────────────────────────────────────────── */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div className="grid grid-cols-1 xs:grid-cols-3 border border-border-subtle dark:border-border-dark divide-y xs:divide-y-0 xs:divide-x divide-border-subtle dark:divide-border-dark">
            <div className="px-4 xs:px-5 py-4">
              <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30 mb-1">
                Amount
              </p>
              <p className="font-mono text-2xl font-bold text-primary-light dark:text-primary-dark">
                ${order.totalAmount.toFixed(2)}
              </p>
              <p className="font-mono text-[10px] text-text-light/35 dark:text-text-dark/30 mt-0.5">/ {freq}</p>
            </div>
            <div className="px-4 xs:px-5 py-4">
              <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30 mb-1">
                <Calendar size={10} className="inline mr-1 -mt-0.5" aria-hidden="true" />
                Current period
              </p>
              <p className="font-mono text-sm text-text-light dark:text-text-dark">
                {fmt(subscription.current_period_start)}
              </p>
              <p className="font-mono text-[10px] text-text-light/35 dark:text-text-dark/30 mt-0.5">
                → {fmt(subscription.current_period_end)}
              </p>
            </div>
            <div className="px-4 xs:px-5 py-4">
              <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30 mb-1">
                Next billing
              </p>
              <p className="font-mono text-sm text-text-light dark:text-text-dark">
                {cancelled ? '—' : fmt(order.nextBillingDate ?? subscription.current_period_end)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Latest invoice ───────────────────────────────────────────────── */}
        {invoice && (
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <div className="flex items-center gap-2 mb-4">
              <Receipt
                size={13}
                strokeWidth={2}
                aria-hidden="true"
                className="text-text-light/35 dark:text-text-dark/30"
              />
              <h2 className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-light/35 dark:text-text-dark/30">
                Latest invoice
              </h2>
            </div>

            <div className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-4 xs:px-5">
              <DetailRow
                label="Invoice ID"
                value={
                  <span className="text-[10px] text-text-light/40 dark:text-text-dark/35 break-all">{invoice.id}</span>
                }
              />
              <DetailRow label="Amount due" value={cents(invoice.amount_due)} />
              <DetailRow label="Amount paid" value={cents(invoice.amount_paid)} />
              <DetailRow label="Status" value={<StatusBadge status={invoice.status} />} />
              <DetailRow label="Date" value={fmt(invoice.created)} />
              <DetailRow
                label="Invoice"
                value={
                  <div className="flex items-center gap-3 flex-wrap justify-end">
                    <a
                      href={invoice.hosted_invoice_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                      aria-label="View invoice online (opens in new tab)"
                    >
                      View <ExternalLink size={10} aria-hidden="true" />
                    </a>
                    <a
                      href={invoice.invoice_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                      aria-label="Download invoice PDF (opens in new tab)"
                    >
                      PDF <ExternalLink size={10} aria-hidden="true" />
                    </a>
                  </div>
                }
              />
            </div>
          </motion.div>
        )}

        {/* ── Payment method ───────────────────────────────────────────────── */}
        {card && (
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard
                size={13}
                strokeWidth={2}
                aria-hidden="true"
                className="text-text-light/35 dark:text-text-dark/30"
              />
              <h2 className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-light/35 dark:text-text-dark/30">
                Payment method
              </h2>
            </div>
            <div className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-4 xs:px-5">
              <DetailRow
                label="Card"
                value={
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-text-light/50 dark:text-text-dark/40">
                      {card.brand.toUpperCase()}
                    </span>
                    •••• {card.last4}
                  </span>
                }
              />
              <DetailRow label="Expires" value={`${String(card.exp_month).padStart(2, '0')}/${card.exp_year}`} />
            </div>
          </motion.div>
        )}

        {/* ── Subscription info ─────────────────────────────────────────────── */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw
              size={13}
              strokeWidth={2}
              aria-hidden="true"
              className="text-text-light/35 dark:text-text-dark/30"
            />
            <h2 className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-light/35 dark:text-text-dark/30">
              Subscription info
            </h2>
          </div>
          <div className="border border-border-subtle dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 px-4 xs:px-5">
            <DetailRow
              label="Subscription ID"
              value={
                <span className="text-[10px] text-text-light/40 dark:text-text-dark/35 break-all">
                  {subscription.id}
                </span>
              }
            />
            <DetailRow label="Started" value={fmt(subscription.created)} />
            <DetailRow label="Frequency" value={freq.charAt(0).toUpperCase() + freq.slice(1)} />
            <DetailRow label="Billing" value={subscription.collection_method.replace(/_/g, ' ')} />
            {subscription.metadata.coverFees === 'true' && (
              <DetailRow
                label="Fees covered"
                value={`$${parseFloat(subscription.metadata.feesCovered ?? '0').toFixed(2)}`}
              />
            )}
          </div>
        </motion.div>

        {/* ── Cancel ───────────────────────────────────────────────────────── */}
        {isActive && !cancelled && (
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
            <div className="border border-red-400/20 bg-red-400/4 px-4 xs:px-5 py-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-mono text-[11px] font-bold text-text-light/60 dark:text-text-dark/50 mb-1">
                    Cancel subscription
                  </p>
                  <p className="font-mono text-[10px] tracking-wide text-text-light/35 dark:text-text-dark/30 leading-relaxed max-w-xs">
                    You&apos;ll keep access until {periodEnd}. No further charges after cancellation.
                  </p>
                </div>
                <motion.button
                  onClick={() => setCancelOpen(true)}
                  aria-label="Cancel this subscription"
                  className="flex items-center gap-2 px-4 py-2.5 font-mono text-[10px] font-bold tracking-widest uppercase border border-red-400/40 text-red-400 hover:bg-red-400/8 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 min-h-10 shrink-0"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={12} strokeWidth={2.5} aria-hidden="true" />
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
