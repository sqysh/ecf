'use client'

import { useState, useMemo } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { IOrder } from '@/types/entities/order'
import { TUser } from '@/types/entities/user'
import { IContactSubmission } from '@/types/entities/contact-submission'
import { TLog } from '@/types/entities/log'
import { IPaymentMethod } from '@/types/entities/payment-method'

type Props = {
  orders: IOrder[]
  users: TUser[]
  contactSubmissions: IContactSubmission[]
  logs: TLog[]
  paymentMethods: IPaymentMethod[]
}

// ─── Credentials config ───────────────────────────────────────────────────────

const CREDENTIALS = [
  {
    service: 'Stripe',
    fields: [
      { label: 'Publishable Key', env: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY' },
      { label: 'Secret Key', env: 'STRIPE_SECRET_KEY' },
      { label: 'Webhook Secret', env: 'STRIPE_WEBHOOK_SECRET' }
    ]
  },
  {
    service: 'Resend',
    fields: [
      { label: 'API Key', env: 'RESEND_API_KEY' },
      { label: 'From Address', env: 'RESEND_FROM_ADDRESS' }
    ]
  },
  {
    service: 'Firebase',
    fields: [
      { label: 'Project ID', env: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID' },
      { label: 'Storage Bucket', env: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET' },
      { label: 'API Key', env: 'NEXT_PUBLIC_FIREBASE_API_KEY' }
    ]
  },
  {
    service: 'Vercel',
    fields: [
      { label: 'Project URL', env: 'VERCEL_URL' },
      { label: 'Environment', env: 'VERCEL_ENV' }
    ]
  },
  {
    service: 'Railway',
    fields: [
      { label: 'Database URL', env: 'DATABASE_URL' },
      { label: 'Environment', env: 'RAILWAY_ENVIRONMENT' }
    ]
  }
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(dollars: number) {
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

function fmtDate(d: string | Date | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtDatetime(d: string | Date | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

function fullName(first?: string | null, last?: string | null, fallback = '') {
  return `${first ?? ''} ${last ?? ''}`.trim() || fallback
}

function mask(val: string) {
  if (val.length <= 8) return '••••••••'
  return val.slice(0, 4) + '••••••••' + val.slice(-4)
}

// ─── Small components ─────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">{children}</span>
}

function Tag({
  children,
  variant = 'default'
}: {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'error' | 'info' | 'warn'
}) {
  const cls = {
    default: 'border border-border-light dark:border-border-dark opacity-60',
    accent: 'bg-primary-light dark:bg-primary-dark text-black',
    error: 'bg-red-500 text-white',
    info: 'border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark',
    warn: 'bg-yellow-400 text-black'
  }[variant]
  return (
    <span className={`font-mono text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 whitespace-nowrap ${cls}`}>
      {children}
    </span>
  )
}

function SectionTitle({
  children,
  count,
  right
}: {
  children: React.ReactNode
  count?: number
  right?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold">{children}</span>
      {count !== undefined && <span className="font-mono text-[10px] opacity-30">{count}</span>}
      <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
      {right}
    </div>
  )
}

function ScrollCard({
  children,
  height = 'h-96',
  header
}: {
  children: React.ReactNode
  height?: string
  header?: React.ReactNode
}) {
  return (
    <div className="border border-border-light dark:border-border-dark flex flex-col">
      {header && (
        <div className="shrink-0 px-4 py-2.5 bg-border-subtle dark:bg-[#1f1f1f] border-b border-border-light dark:border-border-dark">
          {header}
        </div>
      )}
      <div className={`${height} overflow-y-auto divide-y divide-border-light dark:divide-border-dark`}>{children}</div>
    </div>
  )
}

function Row({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`px-4 py-3 border-b border-border-light dark:border-border-dark last:border-b-0 hover:bg-[#fafafa] dark:hover:bg-[#1f1f1f] transition-colors ${className}`}
    >
      {children}
    </div>
  )
}

function FilterBar<T extends string>({
  options,
  value,
  onChange
}: {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex gap-px border border-border-light dark:border-border-dark w-fit mb-4">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 transition-colors cursor-pointer ${
            value === o
              ? 'bg-primary-light dark:bg-primary-dark text-black'
              : 'hover:bg-border-light dark:hover:bg-border-dark'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

function StatTile({
  label,
  value,
  sub,
  accent
}: {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
}) {
  return (
    <div
      className={`p-5 flex flex-col gap-1.5 border border-border-light dark:border-border-dark ${accent ? 'bg-primary-light dark:bg-primary-dark' : ''}`}
    >
      <Label>{label}</Label>
      <p className={`text-3xl font-bold leading-none tracking-tight ${accent ? 'text-black' : ''}`}>{value}</p>
      {sub && <p className={`text-xs ${accent ? 'text-black/50' : 'opacity-35'}`}>{sub}</p>}
    </div>
  )
}

// ─── Credential row with reveal toggle ───────────────────────────────────────

function CredentialRow({ label, value }: { label: string; value: string }) {
  const [revealed, setRevealed] = useState(false)
  const isSet = !!value
  const display = isSet ? (revealed ? value : mask(value)) : 'not set'

  return (
    <Row>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <Label>{label}</Label>
          <p className={`font-mono text-xs mt-0.5 truncate ${!isSet ? 'opacity-30 italic' : ''}`}>{display}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isSet ? <Tag variant="accent">Set</Tag> : <Tag variant="error">Missing</Tag>}
          {isSet && (
            <button
              onClick={() => setRevealed((r) => !r)}
              className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1 border border-border-light dark:border-border-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors cursor-pointer"
            >
              {revealed ? 'Hide' : 'Show'}
            </button>
          )}
        </div>
      </div>
    </Row>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SuperDashboardClient({ orders, users, contactSubmissions, logs, paymentMethods }: Props) {
  const [orderFilter, setOrderFilter] = useState<'ALL' | 'CONFIRMED' | 'FAILED' | 'PENDING' | 'RECURRING'>('ALL')
  const [contactFilter, setContactFilter] = useState<'ALL' | 'NEW' | 'READ' | 'ARCHIVED'>('ALL')
  const [logSearch, setLogSearch] = useState('')
  const [expandedLog, setExpandedLog] = useState<string | null>(null)

  // ── Derived stats ──
  const paidOrders = useMemo(() => orders.filter((o) => o.status === 'CONFIRMED'), [orders])
  const totalRevenue = paidOrders.reduce((s, o) => s + o.totalAmount, 0)
  const recurringOrders = orders.filter((o) => o.isRecurring)
  const mrr = recurringOrders.filter((o) => o.status === 'CONFIRMED').reduce((s, o) => s + o.totalAmount, 0)
  const newMessages = contactSubmissions.filter((c) => c.status === 'NEW').length

  const logsByLevel = useMemo(
    () => ({
      ERROR: logs.filter((l) => l.level.toUpperCase() === 'ERROR'),
      INFO: logs.filter((l) => l.level.toUpperCase() === 'INFO'),
      OTHER: logs.filter((l) => !['ERROR', 'INFO'].includes(l.level.toUpperCase()))
    }),
    [logs]
  )

  const filteredOrders = useMemo(() => {
    if (orderFilter === 'ALL') return orders
    if (orderFilter === 'RECURRING') return orders.filter((o) => o.isRecurring)
    return orders.filter((o) => o.status === orderFilter)
  }, [orders, orderFilter])

  const filteredContacts = useMemo(() => {
    if (contactFilter === 'ALL') return contactSubmissions
    return contactSubmissions.filter((c) => c.status === contactFilter)
  }, [contactSubmissions, contactFilter])

  const searchedLogs = useMemo(() => {
    if (!logSearch.trim()) return logs
    const q = logSearch.toLowerCase()
    return logs.filter(
      (l) =>
        l.message.toLowerCase().includes(q) ||
        l.userId?.toLowerCase().includes(q) ||
        JSON.stringify(l.metadata ?? {})
          .toLowerCase()
          .includes(q)
    )
  }, [logs, logSearch])

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      {/* ── Header ── */}
      <div className="border-b border-border-light dark:border-border-dark px-8 py-4 flex items-center justify-between sticky top-0 bg-bg-light dark:bg-bg-dark z-10">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold">ECF Super</span>
        </Link>
        <div className="flex items-center gap-1">
          <Label>
            {new Date().toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit'
            })}
          </Label>
          <div className="w-px h-4 bg-border-light dark:bg-border-dark mx-3" />
          <Link
            href="/member/portal"
            className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-2 hover:bg-border-light dark:hover:bg-border-dark transition-colors"
          >
            Portal
          </Link>
          <Link
            href="/admin/dashboard"
            className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-2 hover:bg-border-light dark:hover:bg-border-dark transition-colors"
          >
            Admin
          </Link>
          <button
            onClick={() => signOut({ redirectTo: '/login' })}
            className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-2 hover:bg-border-light dark:hover:bg-border-dark transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="px-8 py-8 space-y-12 max-w-338 mx-auto">
        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <StatTile label="Revenue" value={fmt(totalRevenue)} sub={`${paidOrders.length} paid orders`} accent />
          <StatTile label="MRR" value={fmt(mrr)} sub={`${recurringOrders.length} recurring`} />
          <StatTile
            label="All Orders"
            value={orders.length}
            sub={`${orders.filter((o) => o.status === 'PENDING').length} pending`}
          />
          <StatTile label="Failed" value={orders.filter((o) => o.status === 'FAILED').length} sub="orders" />
          <StatTile
            label="Users"
            value={users.length}
            sub={`${users.filter((u) => u.role === 'ADMIN').length} admins`}
          />
          <StatTile label="Messages" value={contactSubmissions.length} sub={`${newMessages} new`} />
          <StatTile
            label="Saved Cards"
            value={paymentMethods.length}
            sub={`${paymentMethods.filter((p) => p.isDefault).length} default`}
          />
        </div>

        {/* ── Orders + Users + Credentials ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_280px] gap-8 items-start">
          <div className="flex flex-col space-y-6">
            {/* Orders */}
            <div>
              <SectionTitle count={filteredOrders.length}>Orders</SectionTitle>
              <FilterBar
                options={['ALL', 'CONFIRMED', 'FAILED', 'PENDING', 'RECURRING'] as const}
                value={orderFilter}
                onChange={setOrderFilter}
              />
              <ScrollCard
                height="h-[520px]"
                header={
                  <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4">
                    <Label>Customer</Label>
                    <Label>Status</Label>
                    <Label>Type</Label>
                    <Label>Amount</Label>
                  </div>
                }
              >
                {filteredOrders.length === 0 && (
                  <Row>
                    <p className="text-center opacity-20 text-sm">No orders</p>
                  </Row>
                )}
                {filteredOrders.slice(0, 30).map((o) => (
                  <Link
                    key={o.id}
                    href={`/super/order/${o.id}`}
                    className="px-4 py-3 border-b border-border-light dark:border-border-dark last:border-b-0 hover:bg-[#fafafa] dark:hover:bg-[#1f1f1f] transition-colors block"
                  >
                    <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{o.customerName}</p>
                        <p className="text-xs opacity-40 truncate">{o.customerEmail}</p>
                        {o.failureReason && (
                          <p className="font-mono text-[9px] text-red-400 truncate mt-0.5">{o.failureReason}</p>
                        )}
                        <p className="font-mono text-[9px] opacity-25 mt-0.5">{fmtDatetime(o.createdAt)}</p>
                      </div>
                      <Tag variant={o.status === 'CONFIRMED' ? 'accent' : o.status === 'FAILED' ? 'error' : 'default'}>
                        {o.status}
                      </Tag>
                      <Tag variant={o.isRecurring ? 'info' : 'default'}>
                        {o.isRecurring ? (o.recurringFrequency ?? 'Recur') : 'Once'}
                      </Tag>
                      <span className="font-mono text-sm font-semibold">{fmt(o.totalAmount)}</span>
                    </div>
                  </Link>
                ))}
                {filteredOrders.length > 30 && (
                  <Row>
                    <p className="text-center">
                      <Label>+{filteredOrders.length - 30} more</Label>
                    </p>
                  </Row>
                )}
              </ScrollCard>
            </div>

            {/* Contacts */}
            <div>
              <SectionTitle count={filteredContacts.length}>
                Contact Submissions{newMessages > 0 && ` · ${newMessages} new`}
              </SectionTitle>
              <FilterBar
                options={['ALL', 'NEW', 'READ', 'ARCHIVED'] as const}
                value={contactFilter}
                onChange={setContactFilter}
              />
              <ScrollCard height="h-[480px]">
                {filteredContacts.length === 0 && (
                  <Row>
                    <p className="text-center opacity-20 text-sm">No submissions</p>
                  </Row>
                )}
                {filteredContacts.slice(0, 25).map((c) => (
                  <Row
                    key={c.id}
                    className={c.status === 'NEW' ? 'border-l-2 border-secondary-light dark:border-secondary-dark' : ''}
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <p className="text-sm font-medium">{fullName(c.firstName, c.lastName)}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        <Tag variant="default">{c.type}</Tag>
                        <Tag variant={c.status === 'NEW' ? 'info' : 'default'}>{c.status}</Tag>
                      </div>
                    </div>
                    <p className="text-xs opacity-40 mb-1">{c.email}</p>
                    <p className="text-xs opacity-60 line-clamp-2 leading-relaxed">{c.message}</p>
                    <p className="font-mono text-[9px] opacity-25 mt-1.5">{fmtDatetime(c.createdAt)}</p>
                  </Row>
                ))}
                {filteredContacts.length > 25 && (
                  <Row>
                    <p className="text-center">
                      <Label>+{filteredContacts.length - 25} more</Label>
                    </p>
                  </Row>
                )}
              </ScrollCard>
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            {/* Users */}
            <div>
              <SectionTitle count={users.length}>Users</SectionTitle>
              <ScrollCard
                height="h-[520px]"
                header={
                  <div className="grid grid-cols-[1fr_auto_auto] gap-4">
                    <Label>User</Label>
                    <Label>Role</Label>
                    <Label>Joined</Label>
                  </div>
                }
              >
                {users.length === 0 && (
                  <Row>
                    <p className="text-center opacity-20 text-sm">No users</p>
                  </Row>
                )}
                {users.map((u) => (
                  <Row key={u.id}>
                    <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{fullName(u.firstName, u.lastName, u.email)}</p>
                        <p className="text-xs opacity-40 truncate">{u.email}</p>
                        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                          {u.lastLoginAt && (
                            <p className="font-mono text-[9px] opacity-30">↩ {fmtDatetime(u.lastLoginAt)}</p>
                          )}
                          {u.stripeCustomerId && (
                            <p className="font-mono text-[9px] opacity-25 truncate">{u.stripeCustomerId}</p>
                          )}
                        </div>
                      </div>
                      <Tag variant={u.role === 'ADMIN' ? 'accent' : 'default'}>{u.role}</Tag>
                      <p className="font-mono text-[10px] opacity-35 whitespace-nowrap">{fmtDate(u.createdAt)}</p>
                    </div>
                  </Row>
                ))}
              </ScrollCard>
            </div>

            {/* Payment Methods */}
            <div>
              <SectionTitle count={paymentMethods.length}>Saved Payment Methods</SectionTitle>
              <ScrollCard
                height="h-[480px]"
                header={
                  <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4">
                    <Label>Card</Label>
                    <Label>Holder</Label>
                    <Label>Expires</Label>
                    <Label>Added</Label>
                  </div>
                }
              >
                {paymentMethods.length === 0 && (
                  <Row>
                    <p className="text-center opacity-20 text-sm">No payment methods</p>
                  </Row>
                )}
                {paymentMethods.map((p) => (
                  <Row key={p.id}>
                    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] uppercase font-semibold w-14">{p.cardBrand}</span>
                        <span className="font-mono text-sm">····{p.cardLast4}</span>
                        {p.isDefault && <Tag variant="accent">default</Tag>}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm truncate">{p.cardholderName ?? '—'}</p>
                        <p className="font-mono text-[9px] opacity-25 truncate">{p.stripePaymentId}</p>
                      </div>
                      <span className="font-mono text-xs opacity-40">
                        {p.cardExpMonth.toString().padStart(2, '0')}/{p.cardExpYear.toString().slice(-2)}
                      </span>
                      <p className="font-mono text-[10px] opacity-35 whitespace-nowrap">{fmtDate(p.createdAt)}</p>
                    </div>
                  </Row>
                ))}
              </ScrollCard>
            </div>
          </div>

          {/* Credentials — vertical stack */}
          <div>
            <SectionTitle>Credentials</SectionTitle>
            <div className="space-y-4">
              {CREDENTIALS.map((cred) => (
                <div key={cred.service}>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold mb-2 opacity-60">
                    {cred.service}
                  </p>
                  <div className="border border-border-light dark:border-border-dark overflow-hidden">
                    {cred.fields.map((f) => (
                      <CredentialRow key={f.label} label={f.label} value={f.env} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Contacts + Payment Methods ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_280px] gap-8 items-start"></div>

        {/* ── Logs ── */}
        <div>
          <SectionTitle
            count={logs.length}
            right={
              <input
                type="text"
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                placeholder="Search logs..."
                className="border border-border-light dark:border-border-dark bg-transparent px-3 py-1.5 text-xs font-mono outline-none focus:border-primary-light dark:focus:border-primary-dark transition-colors placeholder:opacity-30 w-52"
              />
            }
          >
            Logs
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['ERROR', 'INFO'] as const).map((level) => {
              const base = logsByLevel[level]
              const filtered = logSearch.trim()
                ? searchedLogs.filter((l) => {
                    const up = l.level.toUpperCase()

                    return up === level
                  })
                : base

              return (
                <div key={level}>
                  <div className="flex items-center justify-between mb-2">
                    <Tag variant={level === 'ERROR' ? 'error' : level === 'INFO' ? 'info' : 'default'}>{level}</Tag>
                    <Label>{filtered.length} entries</Label>
                  </div>
                  <ScrollCard height="h-[500px]">
                    {filtered.length === 0 && (
                      <Row>
                        <p className="text-center opacity-20 text-sm">None</p>
                      </Row>
                    )}
                    {filtered.slice(0, 40).map((l) => (
                      <div key={l.id}>
                        <Row className="cursor-pointer">
                          <div onClick={() => setExpandedLog(expandedLog === l.id ? null : l.id)}>
                            <p className="text-xs">{l.message}</p>
                            <div className="flex items-center justify-between mt-0.5 gap-2">
                              {l.userId ? (
                                <p className="font-mono text-[9px] opacity-30 truncate">uid: {l.userId}</p>
                              ) : (
                                <span />
                              )}
                              <p className="font-mono text-[9px] opacity-25 whitespace-nowrap shrink-0">
                                {fmtDatetime(l.createdAt)}
                              </p>
                            </div>
                          </div>
                        </Row>
                        {expandedLog === l.id && l.metadata && (
                          <div className="px-4 py-3 bg-border-subtle dark:bg-[#1f1f1f] border-b border-border-light dark:border-border-dark">
                            <pre className="font-mono text-[10px] opacity-60 whitespace-pre-wrap break-all leading-relaxed">
                              {JSON.stringify(l.metadata, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                    {filtered.length > 40 && (
                      <Row>
                        <p className="text-center">
                          <Label>+{filtered.length - 40} more</Label>
                        </p>
                      </Row>
                    )}
                  </ScrollCard>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
