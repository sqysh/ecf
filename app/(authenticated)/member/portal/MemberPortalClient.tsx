'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  CreditCard,
  Heart,
  Zap,
  CalendarClock,
  User,
  Pencil,
  Check,
  Trash2,
  Plus,
  Loader2,
  ArrowRight
} from 'lucide-react'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { IPaymentMethod } from '@/types/entities/payment-method'
import { ModalShell, ModalType } from '../../../components/ui/overlays/ModalShell'
import { GhostButton } from '../../../components/ui/buttons/GhostButton'
import { PrimaryButtonStyles, PrimaryLink } from '../../../components/ui/buttons/PrimaryLink'
import { deletePaymentMethod } from '@/app/lib/actions/deletePaymentMethod'
import { store } from '@/app/lib/store/store'
import { showToast } from '@/app/lib/store/slices/toastSlice'
import { useRouter } from 'next/navigation'
import { GhostLink } from '../../../components/ui/buttons/GhostLink'
import { formatDate } from '@/app/lib/utils/date.utils'
import { updateUserName } from '@/app/lib/actions/updateUserName'
import { MemberPortalHeader } from '../../../components/member/MemberPortalHeader'
import { AddCardForm } from '../../../components/features/donate/AddCardForm'

// ─── Interface ────────────────────────────────────────────────────────────────
export interface ISupporterOverviewClient {
  name:
    | {
        firstName: string | null
        lastName: string | null
      }
    | undefined
  data: {
    supporter?: {
      name: string
      memberSince: string
      totalGiven: number
      nextRecurring: string | null
    }
    oneTimeDonations?: {
      id: string
      date: string
      amount: number
      status: string
    }[]
    recurringDonations?: {
      id: string
      amount: number
      frequency: string
      startDate: string
      status: string
      nextDate: string | any
      stripeSubscriptionId: string
    }[]
    savedPayments?: {
      id: string
      brand: string
      last4: string
      expMonth: number
      expYear: number
      isDefault: boolean
    }[]
    stats?: {
      label: string
      value: string
      subtext: string
      icon: string
      color: string
      bg: string
      border: string
    }[]
  }
  savedCards: IPaymentMethod[]
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  label,
  icon: Icon,
  action,
  children,
  custom = 0
}: {
  label: string
  icon: React.ElementType
  action?: React.ReactNode
  children: React.ReactNode
  custom?: number
}) {
  const id = `section-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <motion.section custom={custom} variants={fadeUp} initial="hidden" animate="visible" aria-labelledby={id}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon size={13} strokeWidth={2} aria-hidden="true" className="text-text-light/35 dark:text-text-dark/30" />
          <h2
            id={id}
            className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-light/35 dark:text-text-dark/30"
          >
            {label}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </motion.section>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────
const Divider = () => <div aria-hidden="true" className="h-px bg-border-subtle dark:bg-border-dark my-8 xs:my-10" />

// ─── Card brand ───────────────────────────────────────────────────────────────
function CardBrand({ brand }: { brand: string }) {
  const upper = brand.toUpperCase()
  const colors: Record<string, string> = {
    VISA: 'text-blue-500',
    MASTERCARD: 'text-orange-500',
    AMEX: 'text-sky-500',
    DISCOVER: 'text-yellow-500'
  }
  return (
    <span
      className={`font-mono text-[9px] font-bold tracking-widest ${colors[upper] ?? 'text-text-light/40 dark:text-text-dark/35'}`}
    >
      {upper}
    </span>
  )
}

function StatusPill({ status }: { status: string }) {
  const active = status === 'active' || status === 'succeeded'

  return (
    <span
      className={`font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border ${
        active
          ? 'border-primary-light/30 dark:border-primary-dark/30 text-secondary-light dark:text-secondary-dark bg-primary-light/6 dark:bg-primary-dark/6'
          : 'border-border-subtle dark:border-border-dark text-text-light/35 dark:text-text-dark/30'
      }`}
    >
      {status}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUPPORTER DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
export default function MemberPortalClient({ name, data, savedCards }: ISupporterOverviewClient) {
  const router = useRouter()
  const [modal, setModal] = useState<ModalType>(null)
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState(name?.firstName ?? '')
  const [lastName, setLastName] = useState(name?.lastName ?? '')
  const [saving, setSaving] = useState(false)
  const [deletingPaymentMethod, setDeletingPaymentMethod] = useState<string | null>(null)

  const displayName = [name?.firstName, name?.lastName].filter(Boolean).join(' ') || 'Supporter'
  const totalGiven = data?.supporter?.totalGiven ?? 0
  const oneTime = data?.oneTimeDonations ?? []
  const recurring = data?.recurringDonations ?? []
  const payments = savedCards ?? []

  const handleSave = async () => {
    setSaving(true)
    await updateUserName({ firstName, lastName })
    router.refresh()
    setSaving(false)
    setEditing(false)
  }

  const handleCancel = () => {
    setFirstName(name?.firstName ?? '')
    setLastName(name?.lastName ?? '')
    setEditing(false)
  }

  async function handleDeletePaymentMethod(stripePaymentId: string) {
    setDeletingPaymentMethod(stripePaymentId)
    try {
      const res = await deletePaymentMethod(stripePaymentId)
      store.dispatch(
        showToast(
          res.error
            ? { type: 'error', message: 'Failed to Remove Card', description: res.error }
            : { type: 'success', message: 'Card Removed', description: 'Your saved card has been permanently removed.' }
        )
      )
      router.refresh()
    } catch {
      store.dispatch(
        showToast({
          type: 'error',
          message: 'Failed to Remove Card',
          description: 'Something went wrong. Please try again.'
        })
      )
    } finally {
      setDeletingPaymentMethod(null)
    }
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

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      <ModalShell
        open={modal === 'add-card'}
        onClose={() => setModal(null)}
        title="Add a new card"
        description="Your card details are encrypted and stored securely."
      >
        <AddCardForm onClose={() => setModal(null)} />
      </ModalShell>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <MemberPortalHeader />

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="max-w-container mx-auto px-4 xs:px-6">
        {/* ── Hero strip ───────────────────────────────────────────────────── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="py-10 xs:py-16 border-b border-border-subtle dark:border-border-dark"
        >
          <p
            aria-hidden="true"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
          >
            {'// member portal'}
          </p>

          {/* Name — huge */}
          <h1
            className="font-mono font-bold leading-none text-text-light dark:text-text-dark mb-6"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)' }}
          >
            {displayName}
          </h1>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-x-8 gap-y-3" role="region" aria-label="Supporter summary">
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30 mb-0.5">
                Total given
              </p>
              <p className="font-mono text-2xl font-bold text-secondary-light dark:text-secondary-dark">
                ${totalGiven.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30 mb-0.5">
                Member since
              </p>
              <p className="font-mono text-2xl font-bold text-text-light dark:text-text-dark">
                {data?.supporter?.memberSince ?? '—'}
              </p>
            </div>
            {data?.supporter?.nextRecurring && (
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30 mb-0.5">
                  Next gift
                </p>
                <p className="font-mono text-2xl font-bold text-text-light dark:text-text-dark">
                  {data.supporter.nextRecurring}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Main grid ────────────────────────────────────────────────────── */}
        <main
          id="main-content"
          className="py-10 xs:py-14 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start"
        >
          {/* ── Left column ──────────────────────────────────────────────── */}
          <div>
            {/* One-time donations */}
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
                <div className="border border-border-subtle dark:border-border-dark divide-y divide-border-subtle dark:divide-border-dark">
                  {oneTime.map((d, i) => (
                    <motion.div key={d.id} custom={i} variants={fadeUp} initial="hidden" animate="visible">
                      <Link
                        href={`/order-confirmation/${d.id}`}
                        className="flex items-center justify-between gap-4 px-4 xs:px-5 py-3.5 hover:bg-black/2 dark:hover:bg-white/2 transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark group"
                        aria-label={`View confirmation for donation of $${d.amount.toFixed(2)} on ${d.date}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <p className="font-mono text-[11px] text-text-light/45 dark:text-text-dark/40 shrink-0">
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
                            className="text-text-light/20 dark:text-text-dark/15 group-hover:text-text-light/40 dark:group-hover:text-text-dark/35 transition-colors duration-150"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="border border-border-subtle dark:border-border-dark px-5 py-10 text-center">
                  <Heart
                    size={28}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mx-auto mb-3 text-text-light/15 dark:text-text-dark/15"
                  />
                  <p className="font-mono text-[11px] text-text-light/35 dark:text-text-dark/30 tracking-wide mb-4">
                    No one-time donations yet
                  </p>
                  <PrimaryLink href="/donate">
                    <Plus size={12} aria-hidden="true" /> Make a donation
                  </PrimaryLink>
                </div>
              )}
            </Section>

            <Divider />

            {/* Recurring donations */}
            <Section
              label="Recurring donations"
              icon={CalendarClock}
              custom={2}
              action={
                <GhostLink href="/donate" aria-label="Make a one-time donation">
                  <Plus size={12} aria-hidden="true" /> Subscribe
                </GhostLink>
              }
            >
              {recurring.length > 0 ? (
                <div className="space-y-0 border border-border-subtle dark:border-border-dark divide-y divide-border-subtle dark:divide-border-dark">
                  {recurring.map((d, i) => (
                    <motion.div
                      key={d.id}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="px-4 xs:px-5 py-4 bg-white/40 dark:bg-accent-dark/30 transition-colors duration-150"
                    >
                      <div className="flex items-start xs:items-center justify-between gap-3 flex-wrap mb-3">
                        <div>
                          <p className="font-mono font-bold text-text-light dark:text-text-dark">
                            ${d.amount.toFixed(2)}{' '}
                            <span className="font-normal text-[11px] text-text-light/45 dark:text-text-dark/40">
                              / {d.frequency}
                            </span>
                          </p>
                          <p className="font-mono text-[10px] tracking-wide text-text-light/35 dark:text-text-dark/30 mt-0.5">
                            Next: {formatDate(d.nextDate)}
                          </p>
                        </div>
                        <StatusPill status={d.status} />
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/order-confirmation/${d.id}`}
                          className="font-mono text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
                        >
                          Confirmation
                        </Link>
                        <span aria-hidden="true" className="text-text-light/20 dark:text-text-dark/15 text-xs">
                          ·
                        </span>
                        <Link
                          href={`/member/portal/${d.stripeSubscriptionId}`}
                          className={`font-mono text-[10px] tracking-widest uppercase transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 ${
                            d.status === 'cancelled'
                              ? 'text-text-light/25 dark:text-text-dark/20 hover:text-text-light/45 dark:hover:text-text-dark/35'
                              : 'text-text-light/40 dark:text-text-dark/35 hover:text-red-400 dark:hover:text-red-400'
                          }`}
                        >
                          {d.status === 'cancelled' ? 'View details' : 'Manage / Cancel'}
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="border border-border-subtle dark:border-border-dark px-5 py-10 text-center">
                  <Zap
                    size={28}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mx-auto mb-3 text-text-light/15 dark:text-text-dark/15"
                  />
                  <p className="font-mono text-[11px] text-text-light/35 dark:text-text-dark/30 tracking-wide">
                    No recurring donations yet
                  </p>
                  <PrimaryLink href="/donate">
                    <Plus size={12} aria-hidden="true" /> Set up recurring
                  </PrimaryLink>
                </div>
              )}
            </Section>
          </div>

          {/* ── Right column (sidebar) ────────────────────────────────────── */}
          <aside aria-label="Account details" className="space-y-0">
            {/* Profile */}
            <Section label="Profile" icon={User} custom={3}>
              <div className="border border-border-subtle dark:border-border-dark">
                {/* Edit toggle */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle dark:border-border-dark bg-black/2 dark:bg-white/2">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-text-light/30 dark:text-text-dark/25">
                    Personal info
                  </p>
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      aria-label="Edit profile"
                      className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-text-light/40 dark:text-text-dark/35 hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
                    >
                      <Pencil size={10} aria-hidden="true" /> Edit
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCancel}
                        disabled={saving}
                        aria-label="Cancel"
                        className="font-mono text-[10px] tracking-widest uppercase text-text-light/35 dark:text-text-dark/30 hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:opacity-40"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        aria-label="Save changes"
                        aria-busy={saving}
                        className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark disabled:opacity-40"
                      >
                        <Check size={10} aria-hidden="true" />
                        {saving ? 'Saving…' : 'Save'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Fields */}
                {[
                  {
                    label: 'First name',
                    id: 'first-name',
                    value: firstName,
                    setter: setFirstName,
                    auto: 'given-name',
                    name: 'firstName'
                  },
                  {
                    label: 'Last name',
                    id: 'last-name',
                    value: lastName,
                    setter: setLastName,
                    auto: 'family-name',
                    name: 'lastName'
                  }
                ].map(({ label, id, value, setter, auto, name }) => (
                  <div
                    key={id}
                    className="px-4 py-3 border-b border-border-subtle dark:border-border-dark last:border-0"
                  >
                    <label
                      htmlFor={id}
                      className="block font-mono text-[9px] tracking-widest uppercase text-text-light/30 dark:text-text-dark/25 mb-1"
                    >
                      {label}
                    </label>
                    {editing ? (
                      <input
                        id={id}
                        name={name}
                        type="text"
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        autoComplete={auto}
                        className="w-full px-2.5 py-1.5 font-mono text-sm outline-none bg-white dark:bg-accent-dark text-text-light dark:text-text-dark border border-border-subtle dark:border-border-dark focus:border-primary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(201,243,31,0.08)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
                      />
                    ) : (
                      <p id={id} className="font-mono text-sm text-text-light dark:text-text-dark">
                        {value || (
                          <span className="text-text-light/25 dark:text-text-dark/20 italic text-xs">Not set</span>
                        )}
                      </p>
                    )}
                  </div>
                ))}

                {/* Read-only rows */}
                {[
                  { label: 'Member since', value: data?.supporter?.memberSince ?? '—' },
                  {
                    label: 'Total given',
                    value: `$${totalGiven.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                  }
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="px-4 py-3 border-b border-border-subtle dark:border-border-dark last:border-0"
                  >
                    <p className="font-mono text-[9px] tracking-widest uppercase text-text-light/30 dark:text-text-dark/25 mb-1">
                      {label}
                    </p>
                    <p className="font-mono text-sm text-text-light dark:text-text-dark">{value}</p>
                  </div>
                ))}
              </div>
            </Section>

            <div className="h-8 xs:h-10" />

            {/* Saved payments */}
            <Section
              label="Saved payments"
              icon={CreditCard}
              custom={4}
              action={
                <GhostButton onClick={() => setModal('add-card')} aria-label="Add a new card">
                  <Plus size={12} aria-hidden="true" /> Add card
                </GhostButton>
              }
            >
              {payments.length > 0 ? (
                <div className="border border-border-subtle dark:border-border-dark divide-y divide-border-subtle dark:divide-border-dark">
                  {payments.map((card, i) => (
                    <motion.div
                      key={card.id}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-black/2 dark:hover:bg-white/2 transition-colors duration-150"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardBrand brand={card.cardBrand} />
                          <p className="font-mono text-sm text-text-light dark:text-text-dark">•••• {card.cardLast4}</p>
                          {card.isDefault && (
                            <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 border border-primary-light/30 dark:border-primary-dark/30 text-primary-light dark:text-primary-dark">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-[10px] text-text-light/35 dark:text-text-dark/30 mt-0.5">
                          {String(card.cardExpMonth).padStart(2, '0')}/{card.cardExpYear}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeletePaymentMethod(card.id)}
                        aria-label={`Remove ${card.cardBrand} ending in ${card.cardLast4}`}
                        className="shrink-0 p-1.5 text-text-light/20 dark:text-text-dark/15 hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 min-h-9 min-w-9 flex items-center justify-center"
                      >
                        {deletingPaymentMethod === card.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
                        ) : (
                          <Trash2 className="w-3 h-3" aria-hidden="true" />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="border border-border-subtle dark:border-border-dark px-4 py-8 text-center">
                  <CreditCard
                    size={28}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mx-auto mb-3 text-text-light/15 dark:text-text-dark/15"
                  />
                  <p className="font-mono text-[11px] text-text-light/35 dark:text-text-dark/30 tracking-wide mb-4">
                    No saved cards
                  </p>
                  <button className={PrimaryButtonStyles} onClick={() => setModal('add-card')}>
                    <Plus size={12} aria-hidden="true" /> Add a card
                  </button>
                </div>
              )}
            </Section>
          </aside>
        </main>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border-subtle dark:border-border-dark bg-bg-light dark:bg-bg-dark transition-colors duration-300">
        <div className="max-w-container mx-auto px-4 xs:px-6 py-6 flex flex-col xs:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-wide text-text-light/25 dark:text-text-dark/20">
            © 2026 Education Comes First. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="font-mono text-[10px] tracking-wide text-text-light/25 dark:text-text-dark/20 hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="font-mono text-[10px] tracking-wide text-text-light/25 dark:text-text-dark/20 hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
