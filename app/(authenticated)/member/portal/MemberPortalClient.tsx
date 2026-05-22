'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { IPaymentMethod } from '@/types/entities/payment-method'
import { ModalShell, ModalType } from '../../../components/ui/overlays/ModalShell'
import { deletePaymentMethod } from '@/app/lib/actions/deletePaymentMethod'
import { store } from '@/app/lib/store/store'
import { showToast } from '@/app/lib/store/slices/toastSlice'
import { useRouter } from 'next/navigation'
import { updateUserName } from '@/app/lib/actions/updateUserName'
import { AddCardForm } from '../../../components/features/member/AddCardForm'
import { MemberPortalHeader } from '@/app/components/features/member/MemberPortalHeader'
import { ProfileSection } from '@/app/components/features/member/ProfileSection'
import { OneTimeDonationsSection } from '@/app/components/features/member/OneTimeDonationsSection'
import { RecurringDonationsSection } from '@/app/components/features/member/RecurringDonationsSection'
import { SavedPaymentsSection } from '@/app/components/features/member/SavedPaymentsSection'

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

const Divider = () => <div aria-hidden="true" className="h-px bg-neutral-200 dark:bg-border-dark my-8 xs:my-10" />

export default function MemberPortalClient({ name, data, savedCards }: ISupporterOverviewClient) {
  const router = useRouter()
  const [modal, setModal] = useState<ModalType>(null)
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState(name?.firstName ?? '')
  const [lastName, setLastName] = useState(name?.lastName ?? '')
  const [saving, setSaving] = useState(false)
  const [deletingPaymentMethod, setDeletingPaymentMethod] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-light dark:focus:bg-primary-dark focus:text-accent-dark focus:font-mono focus:text-sm focus:font-bold"
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
      <div className="max-w-7xl sm:h-[calc(100vh-119px)] min-h-245 mx-auto px-4 xs:px-6">
        {/* ── Hero strip ───────────────────────────────────────────────────── */}
        <motion.div
          custom={0}
          variants={reduceMotion ? undefined : fadeUp}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="py-10 xs:py-16 border-b border-neutral-200 dark:border-border-dark"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-secondary-light dark:text-secondary-dark mb-3">
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
              <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65 mb-0.5">
                Total given
              </p>
              <p className="font-mono text-2xl font-bold text-secondary-light dark:text-secondary-dark">
                ${totalGiven.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65 mb-0.5">
                Member since
              </p>
              <p className="font-mono text-2xl font-bold text-text-light dark:text-text-dark">
                {data?.supporter?.memberSince ?? '—'}
              </p>
            </div>
            {data?.supporter?.nextRecurring && (
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65 mb-0.5">
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
            <OneTimeDonationsSection oneTime={oneTime} />

            <Divider />

            {/* Recurring donations */}
            <RecurringDonationsSection recurring={recurring} />
          </div>

          {/* ── Right column (sidebar) ────────────────────────────────────── */}
          <aside aria-label="Account details" className="space-y-0">
            {/* Profile */}
            <ProfileSection
              data={data}
              editing={editing}
              firstName={firstName}
              handleCancel={handleCancel}
              handleSave={handleSave}
              lastName={lastName}
              saving={saving}
              setEditing={setEditing}
              setFirstName={setFirstName}
              setLastName={setLastName}
              totalGiven={totalGiven}
            />

            <div className="h-8 xs:h-10" />

            {/* Saved payments */}
            <SavedPaymentsSection
              deletingPaymentMethod={deletingPaymentMethod}
              handleDeletePaymentMethod={handleDeletePaymentMethod}
              payments={payments}
              setModal={setModal}
            />
          </aside>
        </main>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-neutral-200 dark:border-border-dark bg-bg-light dark:bg-bg-dark transition-colors duration-300">
        <div className="max-w-container mx-auto px-4 xs:px-6 py-6 flex flex-col xs:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-wide text-text-light/70 dark:text-text-dark/65">
            © 2026 Education Comes First. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="font-mono text-[10px] tracking-wide font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="font-mono text-[10px] tracking-wide font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
