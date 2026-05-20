'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, ChevronDown, ChevronUp } from 'lucide-react'
import { IContactSubmission } from '@/types/entities/contact-submission'
import { formatDate } from '@/app/lib/utils/date.utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField = 'createdAt' | 'firstName' | 'type'
type SortDir = 'asc' | 'desc'
type TabType = 'ALL' | 'SUPPORT' | 'PARTNER' | 'SPONSOR' | 'OTHER'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusClass: Record<string, string> = {
  NEW: 'text-secondary-light dark:text-secondary-dark',
  READ: 'text-text-light/40 dark:text-text-dark/35',
  ARCHIVED: 'text-text-light/25 dark:text-text-dark/20'
}

const typeClass: Record<string, string> = {
  SUPPORT: 'text-yellow-700 dark:text-yellow-400',
  PARTNER: 'text-green-700 dark:text-green-400',
  SPONSOR: 'text-primary-light dark:text-primary-dark',
  OTHER: 'text-text-light/50 dark:text-text-dark/40'
}

const TABS: TabType[] = ['ALL', 'SUPPORT', 'PARTNER', 'SPONSOR', 'OTHER']

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="bg-bg-light dark:bg-bg-dark border border-border-subtle dark:border-border-dark p-5">
    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-light/35 dark:text-text-dark/30 mb-2">
      {label}
    </p>
    <p className="font-mono text-xl font-bold text-text-light dark:text-text-dark">{value}</p>
    {sub && <p className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 mt-1">{sub}</p>}
  </div>
)

// ─── Expanded Row ─────────────────────────────────────────────────────────────

const SubmissionRow = ({ submission }: { submission: IContactSubmission }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-b border-border-subtle dark:border-border-dark hover:bg-accent dark:hover:bg-accent-dark transition-colors duration-100 cursor-pointer group"
        onClick={() => setExpanded((v) => !v)}
      >
        <td className="px-4 py-3">
          <p className="font-mono text-xs text-text-light dark:text-text-dark">
            {submission.firstName} {submission.lastName}
          </p>
          <p className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">{submission.email}</p>
        </td>
        <td className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider">
          <span className={typeClass[submission.type] ?? 'text-text-light/50'}>{submission.type.toLowerCase()}</span>
        </td>
        <td className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider">
          <span className={statusClass[submission.status] ?? 'text-text-light/50'}>
            {submission.status.toLowerCase()}
          </span>
        </td>
        <td className="px-4 py-3 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 max-w-xs truncate">
          {submission.message}
        </td>
        <td className="px-4 py-3 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">
          {formatDate(submission.createdAt ?? '')}
        </td>
        <td className="px-4 py-3">
          <div className="text-text-light/30 dark:text-text-dark/25 group-hover:text-text-light dark:group-hover:text-text-dark transition-colors">
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </td>
      </motion.tr>

      {/* Expanded message */}
      {expanded && (
        <tr className="border-b border-border-subtle dark:border-border-dark bg-accent dark:bg-accent-dark">
          <td colSpan={6} className="px-4 py-4">
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-text-light/30 dark:text-text-dark/25 mb-2">
              {`// message`}
            </p>
            <p className="font-mono text-xs text-text-light/70 dark:text-text-dark/60 leading-relaxed max-w-2xl">
              {submission.message}
            </p>

            <a
              href={`mailto:${submission.email}`}
              className="inline-flex items-center gap-1.5 mt-4 font-mono text-[10px] text-secondary-light dark:text-secondary-dark hover:opacity-75 transition-opacity"
            >
              <Mail className="w-3 h-3" />
              Reply to {submission.email}
            </a>
          </td>
        </tr>
      )}
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminContactSubmissionsPage({ submissions }: { submissions: IContactSubmission[] }) {
  const [tab, setTab] = useState<TabType>('ALL')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortField>('createdAt')
  const [dir, setDir] = useState<SortDir>('desc')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return submissions
      .filter((s) => tab === 'ALL' || s.type === tab)
      .filter(
        (s) =>
          !q ||
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.message.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        let av: number | string = a[sort] as number | string
        let bv: number | string = b[sort] as number | string
        if (sort === 'createdAt') {
          av = new Date(av).getTime()
          bv = new Date(bv).getTime()
        }
        return dir === 'asc' ? (av > bv ? 1 : -1) : av < bv ? 1 : -1
      })
  }, [submissions, tab, search, sort, dir])

  const toggleSort = (f: SortField) => {
    if (sort === f) setDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSort(f)
      setDir('desc')
    }
  }

  // Stats
  const total = submissions.length
  const unread = submissions.filter((s) => s.status === 'NEW').length
  const partners = submissions.filter((s) => s.type === 'PARTNER').length
  const sponsors = submissions.filter((s) => s.type === 'SPONSOR').length

  const thClass =
    'px-4 py-3 font-mono text-[9px] tracking-[0.15em] uppercase text-text-light/35 dark:text-text-dark/30 text-left select-none'
  const thSortClass = (f: SortField) =>
    `${thClass} cursor-pointer hover:text-text-light dark:hover:text-text-dark transition-colors ${sort === f ? 'text-text-light dark:text-text-dark' : ''}`
  const sortIndicator = (f: SortField) => (sort === f ? (dir === 'asc' ? ' ↑' : ' ↓') : '')

  return (
    <div className="p-6 xs:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-border-subtle dark:border-border-dark pb-6">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2">
          {`// contact`}
        </p>
        <h1 className="font-mono text-2xl font-bold text-text-light dark:text-text-dark">Submissions</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle dark:bg-border-dark">
        <StatCard label="Total" value={String(total)} sub="all time" />
        <StatCard label="Unread" value={String(unread)} sub="need attention" />
        <StatCard label="Partners" value={String(partners)} sub="partnership inquiries" />
        <StatCard label="Sponsors" value={String(sponsors)} sub="sponsorship inquiries" />
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
        <div className="flex border border-border-subtle dark:border-border-dark overflow-x-auto">
          {TABS.map((t) => {
            const count = t === 'ALL' ? submissions.length : submissions.filter((s) => s.type === t).length
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap transition-colors duration-150 ${
                  tab === t
                    ? 'bg-primary-light dark:bg-primary-dark text-black'
                    : 'text-text-light/50 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark'
                }`}
              >
                {t.toLowerCase()} <span className="ml-1 opacity-60">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2 border border-border-subtle dark:border-border-dark px-3 py-2 w-full xs:w-64">
          <Search className="w-3.5 h-3.5 text-text-light/30 dark:text-text-dark/30 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, message..."
            className="bg-transparent font-mono text-xs text-text-light dark:text-text-dark placeholder-text-light/25 dark:placeholder-text-dark/25 outline-none w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-border-subtle dark:border-border-dark overflow-x-auto">
        <table className="w-full min-w-180">
          <thead className="border-b border-border-subtle dark:border-border-dark bg-accent dark:bg-accent-dark">
            <tr>
              <th className={thSortClass('firstName')} onClick={() => toggleSort('firstName')}>
                {`Sender${sortIndicator('firstName')}`}
              </th>
              <th className={thSortClass('type')} onClick={() => toggleSort('type')}>
                {`Type${sortIndicator('type')}`}
              </th>
              <th className={thClass}>Status</th>
              <th className={thClass}>Message</th>
              <th className={thSortClass('createdAt')} onClick={() => toggleSort('createdAt')}>
                {`Date${sortIndicator('createdAt')}`}
              </th>
              <th className={thClass} />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center font-mono text-xs text-text-light/30 dark:text-text-dark/25"
                >
                  {`// no submissions found`}
                </td>
              </tr>
            ) : (
              filtered.map((s) => <SubmissionRow key={s.id} submission={s} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="font-mono text-[10px] text-text-light/30 dark:text-text-dark/25">
        {`// showing ${filtered.length} of ${submissions.length} submissions`}
      </p>
    </div>
  )
}
