'use client'

import { useMemo, useState, useTransition } from 'react'
import {
  Search,
  Inbox,
  Mail,
  MailOpen,
  Reply,
  Archive,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square
} from 'lucide-react'
import { ContactSubmission, ContactReadStatus } from '@prisma/client'
import { store } from '@/app/lib/store/store'
import { showToast } from '@/app/lib/store/slices/toastSlice'
import { fullName, initials } from '@/app/lib/utils/user.utils'
import { updateSubmissionStatus } from '@/app/lib/actions/contact-submission/updateSubmissionStatus'
import { bulkUpdateStatus } from '@/app/lib/actions/contact-submission/bulkUpdateStatus'
import { StatCard } from '@/app/components/shared/StatCard'
import Badge from '@/app/components/ui/feedback/Badge'
import { statusVariant } from '@/app/lib/utils/contact.utils'
import { StatusFilter, TypeFilter } from '@/types/entities/contact-submission'
import MessageDetailDrawer from '@/app/components/features/contact/MessageDetailsDrawer'

const PAGE_SIZE = 25

function fmtDate(d: string | Date | null | undefined) {
  if (!d) return '—'
  const date = new Date(d)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  const diffDays = diffHours / 24

  if (diffHours < 1) {
    const mins = Math.floor(diffMs / (1000 * 60))
    return mins <= 1 ? 'Just now' : `${mins}m ago`
  }
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`
  if (diffDays < 7) return `${Math.floor(diffDays)}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function MessagesClient({ submissions }: { submissions: ContactSubmission[] }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<ContactSubmission | null>(null)
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())
  const [isPending, startTransition] = useTransition()

  // Filter
  const filtered = useMemo(() => {
    let result = submissions

    if (statusFilter !== 'ALL') {
      result = result.filter((s) => s.status === statusFilter)
    }

    if (typeFilter !== 'ALL') {
      result = result.filter((s) => s.type === typeFilter)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (s) =>
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.message.toLowerCase().includes(q) ||
          fullName(s.firstName, s.lastName).toLowerCase().includes(q)
      )
    }

    return result
  }, [submissions, statusFilter, typeFilter, search])

  // Paginate
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  // Stats
  const stats = useMemo(
    () => ({
      total: submissions.length,
      new: submissions.filter((s) => s.status === 'NEW').length,
      replied: submissions.filter((s) => s.status === 'READ').length,
      archived: submissions.filter((s) => s.status === 'ARCHIVED').length
    }),
    [submissions]
  )

  const hasActiveFilters = search.trim() !== '' || statusFilter !== 'ALL' || typeFilter !== 'ALL'

  // Selection helpers
  const allChecked = paginated.length > 0 && paginated.every((s) => checkedIds.has(s.id))
  const someChecked = paginated.some((s) => checkedIds.has(s.id))

  const toggleAll = () => {
    if (allChecked) {
      const next = new Set(checkedIds)
      paginated.forEach((s) => next.delete(s.id))
      setCheckedIds(next)
    } else {
      const next = new Set(checkedIds)
      paginated.forEach((s) => next.add(s.id))
      setCheckedIds(next)
    }
  }

  const toggleOne = (id: string) => {
    const next = new Set(checkedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setCheckedIds(next)
  }

  // Open message → auto-mark as read
  const handleOpen = (submission: ContactSubmission) => {
    setSelected(submission)
    if (submission.status === 'NEW') {
      startTransition(async () => {
        await updateSubmissionStatus(submission.id, 'READ')
      })
    }
  }

  // Bulk actions
  const handleBulk = (newStatus: ContactReadStatus, label: string) => {
    if (checkedIds.size === 0) return
    const ids = Array.from(checkedIds)
    startTransition(async () => {
      const result = await bulkUpdateStatus(ids, newStatus)
      if (result.success) {
        store.dispatch(
          showToast({
            type: 'success',
            message: `${ids.length} message${ids.length !== 1 ? 's' : ''} ${label}`
          })
        )
        setCheckedIds(new Set())
      } else {
        store.dispatch(
          showToast({
            type: 'error',
            message: 'Failed to update messages',
            description: result.error
          })
        )
      }
    })
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-accent-dark border-b border-neutral-200 dark:border-border-dark px-8 h-[63px] flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-base font-semibold text-neutral-900 dark:text-text-dark leading-tight">Messages</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">
            {stats.new > 0 ? (
              <>
                <span className="text-secondary-light dark:text-secondary-dark font-semibold">{stats.new} unread</span>
                {' · '}
              </>
            ) : null}
            {submissions.length} total · {filtered.length} matching
          </p>
        </div>
      </header>

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            label="Unread"
            value={stats.new}
            sub={stats.new > 0 ? 'needs attention' : 'all caught up'}
            icon={Mail}
            accent={stats.new > 0}
          />
          <StatCard label="Total" value={stats.total} sub="all time" icon={Inbox} />
          <StatCard
            label="Replied"
            value={stats.replied}
            sub={`${Math.round((stats.replied / Math.max(1, stats.total)) * 100)}% response rate`}
            icon={Reply}
          />
          <StatCard label="Archived" value={stats.archived} sub="resolved" icon={Archive} />
        </div>

        {/* Filters + bulk actions */}
        <div className="bg-white dark:bg-accent-dark border border-neutral-200 dark:border-border-dark p-4 flex flex-col lg:flex-row lg:items-center gap-3">
          {checkedIds.size > 0 ? (
            <>
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-text-dark">
                <CheckSquare className="w-4 h-4" />
                {checkedIds.size} selected
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleBulk('READ', 'marked as read')}
                  disabled={isPending}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-neutral-200 dark:border-border-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark transition-colors cursor-pointer disabled:opacity-50"
                >
                  <MailOpen className="w-3.5 h-3.5" />
                  Mark read
                </button>
                <button
                  onClick={() => handleBulk('READ', 'marked as replied')}
                  disabled={isPending}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-neutral-200 dark:border-border-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Reply className="w-3.5 h-3.5" />
                  Mark replied
                </button>
                <button
                  onClick={() => handleBulk('ARCHIVED', 'archived')}
                  disabled={isPending}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-neutral-200 dark:border-border-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Archive className="w-3.5 h-3.5" />
                  Archive
                </button>
              </div>
              <button
                onClick={() => setCheckedIds(new Set())}
                className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer lg:ml-auto"
              >
                Clear selection
              </button>
            </>
          ) : (
            <>
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
                  placeholder="Search name, email, or message..."
                  className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-bg-dark border border-neutral-200 dark:border-border-dark text-sm text-neutral-900 dark:text-text-dark placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors"
                />
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
                <option value="NEW">New</option>
                <option value="READ">Read</option>
                <option value="REPLIED">Replied</option>
                <option value="ARCHIVED">Archived</option>
              </select>

              {/* Type filter */}
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value as TypeFilter)
                  setPage(1)
                }}
                className="text-sm px-3 py-2 bg-neutral-50 dark:bg-bg-dark border border-neutral-200 dark:border-border-dark text-neutral-900 dark:text-text-dark focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 cursor-pointer"
              >
                <option value="ALL">All Types</option>
                <option value="GENERAL">General</option>
                <option value="DONATION">Donation</option>
                <option value="VOLUNTEER">Volunteer</option>
                <option value="PARTNERSHIP">Partnership</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearch('')
                    setStatusFilter('ALL')
                    setTypeFilter('ALL')
                    setPage(1)
                  }}
                  className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer whitespace-nowrap"
                >
                  Clear filters
                </button>
              )}
            </>
          )}
        </div>

        {/* Message list */}
        <div className="bg-white dark:bg-accent-dark border border-neutral-200 dark:border-border-dark overflow-hidden">
          {/* List header with select-all */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-neutral-200 dark:border-border-dark bg-neutral-50 dark:bg-bg-dark/30">
            <button
              onClick={toggleAll}
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer"
              aria-label={allChecked ? 'Deselect all' : 'Select all'}
            >
              {allChecked ? (
                <CheckSquare className="w-4 h-4" />
              ) : someChecked ? (
                <CheckSquare className="w-4 h-4 opacity-50" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {paginated.length} {paginated.length === 1 ? 'message' : 'messages'}
            </span>
          </div>

          {/* Rows */}
          {paginated.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <Inbox className="w-8 h-8 mx-auto mb-3 text-neutral-300 dark:text-neutral-600" />
              <p className="text-sm font-medium text-neutral-900 dark:text-text-dark mb-1">No messages found</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {hasActiveFilters ? 'Try adjusting your filters' : 'Contact submissions will appear here'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200 dark:divide-border-dark">
              {paginated.map((s) => {
                const isChecked = checkedIds.has(s.id)
                const isUnread = s.status === 'NEW'
                return (
                  <div
                    key={s.id}
                    className={`flex items-start gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-border-dark/30 transition-colors ${
                      isChecked ? 'bg-neutral-50 dark:bg-border-dark/30' : ''
                    } ${isUnread ? 'border-l-2 border-secondary-light dark:border-secondary-dark' : ''}`}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleOne(s.id)}
                      className="pt-1 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer shrink-0"
                      aria-label={isChecked ? 'Deselect' : 'Select'}
                    >
                      {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>

                    {/* Avatar */}
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-neutral-100 dark:bg-border-dark text-neutral-700 dark:text-neutral-300 font-semibold text-xs">
                      {initials(s.firstName, s.lastName)}
                    </div>

                    {/* Content (click to open) */}
                    <button onClick={() => handleOpen(s)} className="flex-1 min-w-0 text-left cursor-pointer">
                      <div className="flex items-center justify-between gap-3 mb-0.5">
                        <p
                          className={`text-sm truncate ${
                            isUnread
                              ? 'font-semibold text-neutral-900 dark:text-text-dark'
                              : 'font-medium text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {fullName(s.firstName, s.lastName)}
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant={statusVariant(s.status)} size="xs">
                            {s.status}
                          </Badge>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                            {fmtDate(s.createdAt)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mb-1">
                        <span className="font-medium">{s.type}</span> · {s.email}
                      </p>
                      <p
                        className={`text-sm line-clamp-2 leading-relaxed ${
                          isUnread ? 'text-neutral-700 dark:text-neutral-200' : 'text-neutral-500 dark:text-neutral-400'
                        }`}
                      >
                        {s.message}
                      </p>
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-neutral-200 dark:border-border-dark bg-neutral-50 dark:bg-bg-dark/30">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of{' '}
                {filtered.length}
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

      <MessageDetailDrawer
        submission={selected}
        onClose={() => setSelected(null)}
        onStatusChange={(status) => {
          if (selected) {
            startTransition(async () => {
              await updateSubmissionStatus(selected.id, status)
            })
          }
        }}
      />
    </>
  )
}
