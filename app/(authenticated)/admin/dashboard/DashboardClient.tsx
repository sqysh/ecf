'use client'

import { setOpenCreateAdminModal } from '@/app/lib/store/slices/uiSlice'
import { store } from '@/app/lib/store/store'
import { IContactSubmission } from '@/types/entities/contact-submission'
import { IOrder } from '@/types/entities/order'
import { TUser } from '@/types/entities/user'
import { useMemo, useState } from 'react'
import CreateAdminModal from '../../../components/admin/CreateAdminModal'
import Link from 'next/link'
import { Users, TrendingUp, Repeat, DollarSign, Plus, Search, Mail } from 'lucide-react'
import { SectionCard } from '../../../components/shared/SectionCard'
import { StatCard } from '../../../components/shared/StatCard'
import { fullName } from '@/app/lib/utils/user.utils'
import { formatDate } from '@/app/lib/utils/date.utils'
import { fmtCurreny } from '@/app/lib/utils/currency.utils'

type Props = {
  donations: IOrder[]
  users: TUser[]
  contactSubmissions: IContactSubmission[]
}

export default function DashboardClient({ donations, users, contactSubmissions }: Props) {
  const [donationFilter, setDonationFilter] = useState<'ALL' | 'RECURRING' | 'ONE_TIME'>('ALL')

  const paidDonations = useMemo(() => donations.filter((d) => d.status === 'CONFIRMED'), [donations])
  const totalRevenue = useMemo(() => paidDonations.reduce((s, d) => s + d.totalAmount, 0), [paidDonations])

  const recurringDonations = donations.filter((d) => d.isRecurring)
  const oneTimeDonations = donations.filter((d) => !d.isRecurring)

  const mrr = recurringDonations.filter((d) => d.status === 'CONFIRMED').reduce((s, d) => s + d.totalAmount, 0)
  const oneTimeTotal = oneTimeDonations.filter((d) => d.status === 'CONFIRMED').reduce((s, d) => s + d.totalAmount, 0)

  const newMessages = contactSubmissions.filter((c) => c.status === 'NEW').length

  const filteredDonations =
    donationFilter === 'ALL' ? donations : donationFilter === 'RECURRING' ? recurringDonations : oneTimeDonations

  const todayStart = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const todayDonations = useMemo(
    () => paidDonations.filter((d) => new Date(d.createdAt) >= todayStart),
    [paidDonations, todayStart]
  )

  const todayRevenue = useMemo(() => todayDonations.reduce((s, d) => s + d.totalAmount, 0), [todayDonations])
  console.log(filteredDonations)
  const todayDonationCount = todayDonations.length

  return (
    <>
      <CreateAdminModal />
      <div className="min-h-screen bg-neutral-50 dark:bg-bg-dark text-neutral-900 dark:text-text-dark flex">
        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <header className="bg-white dark:bg-accent-dark border-b border-neutral-200 dark:border-border-dark px-8 py-3 flex items-center justify-between gap-6 sticky top-0 z-10">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search donors, users, messages..."
                className="w-full pl-9 pr-12 py-2 bg-neutral-50 dark:bg-bg-dark border border-neutral-200 dark:border-border-dark text-sm text-neutral-900 dark:text-text-dark placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-neutral-400 dark:text-neutral-500 bg-white dark:bg-accent-dark border border-neutral-200 dark:border-border-dark px-1.5 py-0.5">
                ⌘K
              </kbd>
            </div>

            {/* Today's pulse */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <div className="leading-tight">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                    Today
                  </p>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-text-dark tabular-nums">
                    {fmtCurreny(todayRevenue)}{' '}
                    <span className="text-neutral-400 dark:text-neutral-500 font-normal">
                      · {todayDonationCount} donations
                    </span>
                  </p>
                </div>
              </div>

              {newMessages > 0 && (
                <Link
                  href="/admin/contact"
                  className="flex items-center gap-2 px-3 py-1.5 bg-secondary-light/10 dark:bg-secondary-dark/10 text-secondary-light dark:text-secondary-dark hover:bg-secondary-light/15 dark:hover:bg-secondary-dark/15 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">
                    {newMessages} new message{newMessages !== 1 ? 's' : ''}
                  </span>
                </Link>
              )}
            </div>
          </header>

          <div className="p-8 space-y-6 max-w-7xl">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total Revenue"
                value={fmtCurreny(totalRevenue)}
                sub={`${paidDonations.length} paid orders`}
                icon={DollarSign}
                accent
              />
              <StatCard
                label="MRR"
                value={fmtCurreny(mrr)}
                sub={`${recurringDonations.length} recurring`}
                icon={Repeat}
              />
              <StatCard
                label="One-Time"
                value={fmtCurreny(oneTimeTotal)}
                sub={`${oneTimeDonations.length} orders`}
                icon={TrendingUp}
              />
              <StatCard
                label="Users"
                value={users.length}
                sub={`${newMessages} new message${newMessages !== 1 ? 's' : ''}`}
                icon={Users}
              />
            </div>

            {/* Two-column content */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Donations */}
              <SectionCard
                title="Recent Donations"
                count={filteredDonations.length}
                action={
                  <div className="flex gap-1">
                    {(['ALL', 'ONE_TIME', 'RECURRING'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setDonationFilter(f)}
                        className={`text-xs font-medium px-2.5 py-1 transition-colors cursor-pointer ${
                          donationFilter === f
                            ? 'bg-neutral-900 dark:bg-primary-dark text-white dark:text-neutral-900'
                            : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-border-dark'
                        }`}
                      >
                        {f === 'ONE_TIME' ? 'One-Time' : f === 'RECURRING' ? 'Recurring' : 'All'}
                      </button>
                    ))}
                  </div>
                }
              >
                <div className="divide-y divide-neutral-200 dark:divide-border-dark">
                  {filteredDonations.length === 0 && (
                    <div className="px-5 py-10 text-center text-sm text-neutral-400 dark:text-neutral-500">
                      No donations yet
                    </div>
                  )}

                  {filteredDonations.slice(0, 8).map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-border-dark/30 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-900 dark:text-text-dark truncate">
                          {d.customerName}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{d.customerEmail}</p>
                      </div>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 whitespace-nowrap ${
                          d.isRecurring
                            ? 'bg-secondary-light/15 text-secondary-light dark:bg-secondary-dark/15 dark:text-secondary-dark'
                            : 'bg-neutral-100 text-neutral-600 dark:bg-border-dark dark:text-neutral-300'
                        }`}
                      >
                        {d.isRecurring ? (d.recurringFrequency ?? 'Recur') : 'Once'}
                      </span>
                      <span className="text-sm font-semibold text-neutral-900 dark:text-text-dark tabular-nums w-20 text-right">
                        ${d.totalAmount}
                      </span>
                    </div>
                  ))}

                  {filteredDonations.length > 8 && (
                    <Link
                      href="/admin/donations"
                      className="block px-5 py-3 text-center text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark/30 transition-colors"
                    >
                      View all {filteredDonations.length} donations →
                    </Link>
                  )}
                </div>
              </SectionCard>

              {/* Users */}
              <SectionCard
                title="Recent Users"
                count={users.length}
                action={
                  <button
                    onClick={() => store.dispatch(setOpenCreateAdminModal())}
                    className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-neutral-900 dark:bg-primary-dark text-white dark:text-neutral-900 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    Add Admin
                  </button>
                }
              >
                <div className="divide-y divide-neutral-200 dark:divide-border-dark">
                  {users.length === 0 && (
                    <div className="px-5 py-10 text-center text-sm text-neutral-400 dark:text-neutral-500">
                      No users yet
                    </div>
                  )}

                  {users.slice(0, 8).map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-border-dark/30 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-neutral-900 dark:text-text-dark truncate">
                            {fullName(u.firstName, u.lastName, u.email)}
                          </p>
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 shrink-0">
                            {u.role}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{u.email}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                          {formatDate(u.createdAt)}
                        </p>
                        {u.lastLoginAt && (
                          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                            Last seen {formatDate(u.lastLoginAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {users.length > 8 && (
                    <Link
                      href="/admin/users"
                      className="block px-5 py-3 text-center text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark/30 transition-colors"
                    >
                      View all {users.length} users →
                    </Link>
                  )}
                </div>
              </SectionCard>
            </div>

            {/* Contact submissions - full width */}
            <SectionCard
              title="Contact Submissions"
              count={contactSubmissions.length}
              action={
                newMessages > 0 && (
                  <span className="text-xs font-semibold text-secondary-light dark:text-secondary-dark bg-secondary-light/10 dark:bg-secondary-dark/10 px-2 py-0.5">
                    {newMessages} new
                  </span>
                )
              }
            >
              <div className="divide-y divide-neutral-200 dark:divide-border-dark">
                {contactSubmissions.length === 0 && (
                  <div className="px-5 py-10 text-center text-sm text-neutral-400 dark:text-neutral-500">
                    No submissions yet
                  </div>
                )}

                {contactSubmissions.slice(0, 6).map((c) => (
                  <div
                    key={c.id}
                    className={`px-5 py-4 hover:bg-neutral-50 dark:hover:bg-border-dark/30 transition-colors ${
                      c.status === 'NEW' ? 'border-l-2 border-secondary-light dark:border-secondary-dark' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 dark:text-text-dark truncate">
                          {fullName(c.firstName, c.lastName)}
                        </p>
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 shrink-0">
                          {c.type}
                        </span>
                        {c.status === 'NEW' && (
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-secondary-light dark:text-secondary-dark shrink-0">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap shrink-0">
                        {formatDate(c.createdAt ?? '')}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mb-1.5">{c.email}</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                      {c.message}
                    </p>
                  </div>
                ))}

                {contactSubmissions.length > 6 && (
                  <Link
                    href="/admin/contact"
                    className="block px-5 py-3 text-center text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark/30 transition-colors"
                  >
                    View all {contactSubmissions.length} submissions →
                  </Link>
                )}
              </div>
            </SectionCard>
          </div>
        </main>
      </div>
    </>
  )
}
