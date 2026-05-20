'use client'

import { useMemo, useState } from 'react'
import {
  Search,
  Download,
  Users as UsersIcon,
  Heart,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Repeat
} from 'lucide-react'
import { store } from '@/app/lib/store/store'
import { setOpenCreateAdminModal } from '@/app/lib/store/slices/uiSlice'
import { UserWithStats } from './page'
import { ActivityFilter, RoleFilter, SortDir, SortField } from '@/types/admin.types'
import { fullName } from '@/app/lib/utils/user.utils'
import CreateAdminModal from '@/app/components/admin/CreateAdminModal'
import { StatCard } from '@/app/components/shared/StatCard'
import { SortHeader } from '@/app/components/admin/SortHeader'
import { RoleBadge } from '@/app/components/admin/RoleBadge'
import { formatDate } from '@/app/lib/utils/date.utils'
import { fmtCurreny } from '@/app/lib/utils/currency.utils'
import { Avatar } from '@/app/components/admin/Avatar'
import UserDetailDrawer from '@/app/components/admin/UserDetailDrawer'

const PAGE_SIZE = 25

export default function UsersClient({ users }: { users: UserWithStats[] }) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL')
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('ALL')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<UserWithStats | null>(null)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir(field === 'totalGiven' || field === 'createdAt' || field === 'lastLoginAt' ? 'desc' : 'asc')
    }
    setPage(1)
  }

  // Filter
  const filtered = useMemo(() => {
    let result = users

    if (roleFilter !== 'ALL') {
      result = result.filter((u) => u.role === roleFilter)
    }

    if (activityFilter === 'DONORS') {
      result = result.filter((u) => u.orderCount > 0)
    } else if (activityFilter === 'RECURRING') {
      result = result.filter((u) => u.hasRecurring)
    } else if (activityFilter === 'NEVER_LOGGED_IN') {
      result = result.filter((u) => !u.lastLoginAt)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (u) =>
          u.email.toLowerCase().includes(q) ||
          u.firstName?.toLowerCase().includes(q) ||
          u.lastName?.toLowerCase().includes(q) ||
          fullName(u.firstName, u.lastName).toLowerCase().includes(q) ||
          u.phone?.toLowerCase().includes(q)
      )
    }

    return result
  }, [users, roleFilter, activityFilter, search])

  // Sort
  const sorted = useMemo(() => {
    const sorted = [...filtered]
    sorted.sort((a, b) => {
      let cmp = 0
      if (sortField === 'createdAt') {
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortField === 'totalGiven') {
        cmp = a.totalGiven - b.totalGiven
      } else if (sortField === 'name') {
        const an = fullName(a.firstName, a.lastName, a.email)
        const bn = fullName(b.firstName, b.lastName, b.email)
        cmp = an.localeCompare(bn)
      } else if (sortField === 'lastLoginAt') {
        const at = a.lastLoginAt ? new Date(a.lastLoginAt).getTime() : 0
        const bt = b.lastLoginAt ? new Date(b.lastLoginAt).getTime() : 0
        cmp = at - bt
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
    const donors = filtered.filter((u) => u.orderCount > 0)
    const recurring = filtered.filter((u) => u.hasRecurring)
    const admins = filtered.filter((u) => u.role === 'ADMIN' || u.role === 'SUPERUSER')
    return {
      total: filtered.length,
      donors: donors.length,
      recurring: recurring.length,
      admins: admins.length,
      totalGiven: donors.reduce((s, u) => s + u.totalGiven, 0)
    }
  }, [filtered])

  const hasActiveFilters = search.trim() !== '' || roleFilter !== 'ALL' || activityFilter !== 'ALL'

  return (
    <>
      <CreateAdminModal />

      {/* Header */}
      <header className="bg-white dark:bg-accent-dark border-b border-neutral-200 dark:border-border-dark px-8 h-15.75 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-base font-semibold text-neutral-900 dark:text-text-dark leading-tight">Users</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">
            {users.length} total · {sorted.length} matching filters
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 border border-neutral-200 dark:border-border-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark transition-colors cursor-pointer">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => store.dispatch(setOpenCreateAdminModal())}
            className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 bg-neutral-900 dark:bg-primary-dark text-white dark:text-neutral-900 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Admin
          </button>
        </div>
      </header>

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Users"
            value={stats.total}
            sub={`${stats.admins} admin${stats.admins !== 1 ? 's' : ''}`}
            icon={UsersIcon}
            accent
          />
          <StatCard
            label="Donors"
            value={stats.donors}
            sub={`${Math.round((stats.donors / Math.max(1, stats.total)) * 100)}% of users`}
            icon={Heart}
          />
          <StatCard label="Recurring" value={stats.recurring} sub="active subscriptions" icon={Repeat} />
          <StatCard
            label="Lifetime Given"
            value={fmtCurreny(stats.totalGiven)}
            sub="from filtered users"
            icon={UserCheck}
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
              placeholder="Search name, email, or phone..."
              className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-bg-dark border border-neutral-200 dark:border-border-dark text-sm text-neutral-900 dark:text-text-dark placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors"
            />
          </div>

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value as RoleFilter)
              setPage(1)
            }}
            className="text-sm px-3 py-2 bg-neutral-50 dark:bg-bg-dark border border-neutral-200 dark:border-border-dark text-neutral-900 dark:text-text-dark focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 cursor-pointer"
          >
            <option value="ALL">All Roles</option>
            <option value="SUPERUSER">Superuser</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPPORTER">Supporter</option>
          </select>

          {/* Activity filter */}
          <select
            value={activityFilter}
            onChange={(e) => {
              setActivityFilter(e.target.value as ActivityFilter)
              setPage(1)
            }}
            className="text-sm px-3 py-2 bg-neutral-50 dark:bg-bg-dark border border-neutral-200 dark:border-border-dark text-neutral-900 dark:text-text-dark focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 cursor-pointer"
          >
            <option value="ALL">All Activity</option>
            <option value="DONORS">Donors only</option>
            <option value="RECURRING">Recurring donors</option>
            <option value="NEVER_LOGGED_IN">Never logged in</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearch('')
                setRoleFilter('ALL')
                setActivityFilter('ALL')
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
          <div className="grid grid-cols-[2fr_auto_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-neutral-200 dark:border-border-dark bg-neutral-50 dark:bg-bg-dark/30">
            <SortHeader field="name" label="User" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
            <div className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Role
            </div>
            <SortHeader
              field="createdAt"
              label="Joined"
              currentField={sortField}
              currentDir={sortDir}
              onSort={handleSort}
            />
            <SortHeader
              field="lastLoginAt"
              label="Last Active"
              currentField={sortField}
              currentDir={sortDir}
              onSort={handleSort}
            />
            <SortHeader
              field="totalGiven"
              label="Given"
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
              <p className="text-sm font-medium text-neutral-900 dark:text-text-dark mb-1">No users found</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {hasActiveFilters ? 'Try adjusting your filters' : 'Users will appear here once they sign up'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200 dark:divide-border-dark">
              {paginated.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className="w-full grid grid-cols-[2fr_auto_1fr_1fr_auto] gap-4 px-5 py-3 items-center hover:bg-neutral-50 dark:hover:bg-border-dark/30 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar user={u} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-neutral-900 dark:text-text-dark truncate">
                          {fullName(u.firstName, u.lastName, u.email)}
                        </p>
                        {u.hasRecurring && (
                          <Repeat
                            className="w-3 h-3 text-secondary-light dark:text-secondary-dark shrink-0"
                            aria-label="Recurring donor"
                          />
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{u.email}</p>
                    </div>
                  </div>
                  <RoleBadge role={u.role} />
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                    {formatDate(u.createdAt)}
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                    {u.lastLoginAt ? (
                      formatDate(u.lastLoginAt)
                    ) : (
                      <span className="text-neutral-400 dark:text-neutral-500 italic">Never</span>
                    )}
                  </p>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-text-dark tabular-nums whitespace-nowrap text-right">
                    {u.totalGiven > 0 ? (
                      fmtCurreny(u.totalGiven)
                    ) : (
                      <span className="text-neutral-400 dark:text-neutral-500 font-normal">—</span>
                    )}
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

      <UserDetailDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  )
}
