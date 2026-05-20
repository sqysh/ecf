'use client'

import { useMemo, useState } from 'react'
import { IOrder } from '@/types/entities/order'
import {
  Search,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  HeartHandshake,
  Repeat,
  TrendingUp,
  Hash,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react'
import { StatCard } from '@/app/components/shared/StatCard'
import { fmtCurreny } from '@/app/lib/utils/currency.utils'
import { formatDate } from '@/app/lib/utils/date.utils'
import DonationDetailDrawer from '@/app/components/admin/DonationDetatailsDrawer'

type SortField = 'createdAt' | 'totalAmount' | 'customerName'
type SortDir = 'asc' | 'desc'
type TypeFilter = 'ALL' | 'ONE_TIME_DONATION' | 'RECURRING_DONATION'
type StatusFilter = 'ALL' | 'PENDING' | 'CONFIRMED' | 'FAILED' | 'REFUNDED'

const PAGE_SIZE = 25

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    CONFIRMED: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    PENDING: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    FAILED: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    REFUNDED: 'bg-neutral-100 text-neutral-600 dark:bg-border-dark dark:text-neutral-400'
  }
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 ${styles[status] ?? styles.PENDING}`}
    >
      {status}
    </span>
  )
}

function TypeBadge({ type, frequency }: { type: string; frequency?: string | null }) {
  const isRecurring = type === 'RECURRING_DONATION'
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 whitespace-nowrap ${
        isRecurring
          ? 'bg-secondary-light/10 text-secondary-light dark:bg-secondary-dark/10 dark:text-secondary-dark'
          : 'bg-neutral-100 text-neutral-600 dark:bg-border-dark dark:text-neutral-300'
      }`}
    >
      {isRecurring ? (frequency ?? 'Recurring') : 'One-Time'}
    </span>
  )
}

function SortHeader({
  field,
  label,
  currentField,
  currentDir,
  onSort,
  align = 'left'
}: {
  field: SortField
  label: string
  currentField: SortField
  currentDir: SortDir
  onSort: (f: SortField) => void
  align?: 'left' | 'right'
}) {
  const active = currentField === field
  const Icon = !active ? ArrowUpDown : currentDir === 'asc' ? ArrowUp : ArrowDown
  return (
    <button
      onClick={() => onSort(field)}
      className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
        align === 'right' ? 'justify-end w-full' : ''
      } ${
        active
          ? 'text-neutral-900 dark:text-text-dark'
          : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
      }`}
    >
      {align === 'right' && <Icon className="w-3 h-3" />}
      {label}
      {align === 'left' && <Icon className="w-3 h-3" />}
    </button>
  )
}

export default function DonationsClient({ donations }: { donations: IOrder[] }) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(1)
  const [selectedDonation, setSelectedDonation] = useState<IOrder | null>(null)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir(field === 'totalAmount' || field === 'createdAt' ? 'desc' : 'asc')
    }
    setPage(1)
  }

  // Filter
  const filtered = useMemo(() => {
    let result = donations

    if (typeFilter !== 'ALL') {
      result = result.filter((d) => d.type === typeFilter)
    }

    if (statusFilter !== 'ALL') {
      result = result.filter((d) => d.status === statusFilter)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (d) =>
          d.customerName.toLowerCase().includes(q) ||
          d.customerEmail.toLowerCase().includes(q) ||
          d.paymentIntentId?.toLowerCase().includes(q) ||
          d.stripeSubscriptionId?.toLowerCase().includes(q)
      )
    }

    return result
  }, [donations, typeFilter, statusFilter, search])

  // Sort
  const sorted = useMemo(() => {
    const sorted = [...filtered]
    sorted.sort((a, b) => {
      let cmp = 0
      if (sortField === 'createdAt') {
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortField === 'totalAmount') {
        cmp = a.totalAmount - b.totalAmount
      } else if (sortField === 'customerName') {
        cmp = a.customerName.localeCompare(b.customerName)
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return sorted
  }, [filtered, sortField, sortDir])

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  // Stats (based on filtered set)
  const stats = useMemo(() => {
    const confirmed = filtered.filter((d) => d.status === 'CONFIRMED')
    const recurring = confirmed.filter((d) => d.type === 'RECURRING_DONATION')
    const oneTime = confirmed.filter((d) => d.type === 'ONE_TIME_DONATION')
    return {
      total: confirmed.reduce((s, d) => s + d.totalAmount, 0),
      count: filtered.length,
      recurringTotal: recurring.reduce((s, d) => s + d.totalAmount, 0),
      recurringCount: recurring.length,
      oneTimeTotal: oneTime.reduce((s, d) => s + d.totalAmount, 0),
      oneTimeCount: oneTime.length
    }
  }, [filtered])

  const hasActiveFilters = search.trim() !== '' || typeFilter !== 'ALL' || statusFilter !== 'ALL'

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-accent-dark border-b border-neutral-200 dark:border-border-dark px-8 h-15.75 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-base font-semibold text-neutral-900 dark:text-text-dark leading-tight">Donations</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">
            {donations.length} total · {sorted.length} matching filters
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 border border-neutral-200 dark:border-border-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark transition-colors cursor-pointer">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </header>

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total"
            value={fmtCurreny(stats.total)}
            sub={`${stats.count} ${stats.count === 1 ? 'donation' : 'donations'}`}
            icon={HeartHandshake}
            accent
          />
          <StatCard
            label="Recurring"
            value={fmtCurreny(stats.recurringTotal)}
            sub={`${stats.recurringCount} active`}
            icon={Repeat}
          />
          <StatCard
            label="One-Time"
            value={fmtCurreny(stats.oneTimeTotal)}
            sub={`${stats.oneTimeCount} orders`}
            icon={TrendingUp}
          />
          <StatCard
            label="Avg Donation"
            value={
              stats.count > 0
                ? fmtCurreny(stats.total / Math.max(1, filtered.filter((d) => d.status === 'CONFIRMED').length))
                : '$0.00'
            }
            sub="confirmed only"
            icon={Hash}
          />
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-accent-dark border border-neutral-200 dark:border-border-dark p-4 flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Search name, email, or payment ID..."
              className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-bg-dark border border-neutral-200 dark:border-border-dark text-sm text-neutral-900 dark:text-text-dark placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors"
            />
          </div>

          {/* Type filter */}
          <div className="flex border border-neutral-200 dark:border-border-dark">
            {(['ALL', 'ONE_TIME_DONATION', 'RECURRING_DONATION'] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setTypeFilter(f)
                  setPage(1)
                }}
                className={`text-xs font-medium px-3 py-2 transition-colors cursor-pointer whitespace-nowrap ${
                  typeFilter === f
                    ? 'bg-neutral-900 dark:bg-primary-dark text-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark'
                }`}
              >
                {f === 'ALL' ? 'All Types' : f === 'ONE_TIME_DONATION' ? 'One-Time' : 'Recurring'}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as StatusFilter)
              setPage(1)
            }}
            className="text-sm px-3 py-2 bg-neutral-50 dark:bg-bg-dark border border-neutral-200 dark:border-border-dark text-neutral-900 dark:text-text-dark focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearch('')
                setTypeFilter('ALL')
                setStatusFilter('ALL')
                setPage(1)
              }}
              className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-accent-dark border border-neutral-200 dark:border-border-dark overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_auto_auto] gap-4 px-5 py-3 border-b border-neutral-200 dark:border-border-dark bg-neutral-50 dark:bg-bg-dark/30">
            <SortHeader
              field="customerName"
              label="Donor"
              currentField={sortField}
              currentDir={sortDir}
              onSort={handleSort}
            />
            <div className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Type
            </div>
            <SortHeader
              field="createdAt"
              label="Date"
              currentField={sortField}
              currentDir={sortDir}
              onSort={handleSort}
            />
            <div className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Status
            </div>
            <SortHeader
              field="totalAmount"
              label="Amount"
              currentField={sortField}
              currentDir={sortDir}
              onSort={handleSort}
              align="right"
            />
          </div>

          {/* Rows */}
          {paginated.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <Filter className="w-8 h-8 mx-auto mb-3 text-neutral-300 dark:text-neutral-600" />
              <p className="text-sm font-medium text-neutral-900 dark:text-text-dark mb-1">No donations found</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {hasActiveFilters ? 'Try adjusting your filters' : 'Donations will appear here once received'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200 dark:divide-border-dark">
              {paginated.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDonation(d)}
                  className="w-full grid grid-cols-[1.5fr_1fr_1fr_auto_auto] gap-4 px-5 py-3 items-center hover:bg-neutral-50 dark:hover:bg-border-dark/30 transition-colors text-left cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-text-dark truncate">
                      {d.customerName}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{d.customerEmail}</p>
                  </div>
                  <TypeBadge type={d.type} frequency={d.recurringFrequency} />
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                    {formatDate(d.createdAt)}
                  </p>
                  <StatusBadge status={d.status} />
                  <p className="text-sm font-semibold text-neutral-900 dark:text-text-dark tabular-nums whitespace-nowrap text-right">
                    {fmtCurreny(d.totalAmount)}
                  </p>
                </button>
              ))}
            </div>
          )}

          {/* Pagination */}
          {sorted.length > PAGE_SIZE && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-neutral-200 dark:border-border-dark bg-neutral-50 dark:bg-bg-dark/30">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, sorted.length)} of{' '}
                {sorted.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-border-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 px-3 tabular-nums">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-border-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DonationDetailDrawer donation={selectedDonation} onClose={() => setSelectedDonation(null)} />
    </>
  )
}
