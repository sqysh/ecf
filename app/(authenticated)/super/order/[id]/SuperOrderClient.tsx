'use client'

import { IOrder } from '@/types/entities/order'
import Link from 'next/link'

type Props = {
  order: IOrder | null
}

export type BillingAddress = {
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  zipPostalCode?: string
  country?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(dollars: number) {
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
}

function fmtDatetime(d: string | Date | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40 block mb-1">{children}</span>
}

function Value({ children, mono = false }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <p className={`text-sm ${mono ? 'font-mono' : ''} ${!children ? 'opacity-30 italic' : ''}`}>{children ?? '—'}</p>
  )
}

function Field({
  label,
  children,
  mono = false,
  span = 1
}: {
  label: string
  children: React.ReactNode
  mono?: boolean
  span?: 1 | 2
}) {
  return (
    <div className={span === 2 ? 'col-span-2' : ''}>
      <Label>{label}</Label>
      {typeof children === 'string' || children === null || children === undefined ? (
        <Value mono={mono}>{children}</Value>
      ) : (
        children
      )}
    </div>
  )
}

function Section({ title, children, columns = 2 }: { title: string; children: React.ReactNode; columns?: 2 | 3 | 4 }) {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  }[columns]

  return (
    <div className="border border-border-light dark:border-border-dark">
      <div className="px-5 py-3 border-b border-border-light dark:border-border-dark bg-border-subtle dark:bg-[#1f1f1f]">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold">{title}</span>
      </div>
      <div className={`grid ${colClass} gap-x-8 gap-y-5 p-5`}>{children}</div>
    </div>
  )
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
  return <span className={`font-mono text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 ${cls}`}>{children}</span>
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SuperOrderClient({ order }: Props) {
  if (!order) return

  const statusVariant =
    order.status === 'CONFIRMED'
      ? 'accent'
      : order.status === 'FAILED'
        ? 'error'
        : order.status === 'REFUNDED'
          ? 'info'
          : 'default'

  const billing = order.billingAddress as BillingAddress | null

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      {/* ── Header ── */}
      <div className="border-b border-border-light dark:border-border-dark px-8 py-4 flex items-center justify-between sticky top-0 bg-bg-light dark:bg-bg-dark z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/super"
            className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity"
          >
            ← Super
          </Link>
          <div className="w-px h-4 bg-border-light dark:bg-border-dark" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold">Order</span>
          <span className="font-mono text-[10px] opacity-30">{order.id}</span>
        </div>
        <div className="flex items-center gap-3">
          <Tag variant={statusVariant}>{order.status}</Tag>
          {order.isRecurring && <Tag variant="info">Recurring</Tag>}
          <Tag variant="default">{order.type}</Tag>
        </div>
      </div>

      <div className="px-8 py-8 space-y-6 max-w-337.5 mx-auto">
        {/* ── Hero amount ── */}
        <div className="flex items-end justify-between gap-6 pb-6 border-b border-border-light dark:border-border-dark">
          <div>
            <Label>Total Amount</Label>
            <p className="text-5xl font-bold tracking-tight leading-none">{fmt(order.totalAmount)}</p>
            {order.coverFees && order.feesCovered > 0 && (
              <p className="font-mono text-xs opacity-40 mt-1">incl. {fmt(order.feesCovered)} in covered fees</p>
            )}
          </div>
          <div className="text-right">
            <Label>Created</Label>
            <p className="font-mono text-sm opacity-60">{fmtDatetime(order.createdAt)}</p>
            {order.updatedAt && (
              <>
                <Label>Last Updated</Label>
                <p className="font-mono text-sm opacity-40">{fmtDatetime(order.updatedAt)}</p>
              </>
            )}
          </div>
        </div>

        {/* ── Customer ── */}
        <Section title="Customer" columns={4}>
          <Field label="Name">{order.customerName}</Field>
          <Field label="Email" mono>
            {order.customerEmail}
          </Field>
          <Field label="Phone" mono>
            {order.customerPhone ?? null}
          </Field>
          <Field label="User ID" mono>
            {order.userId ?? null}
          </Field>
        </Section>

        {/* ── Payment ── */}
        <Section title="Payment" columns={4}>
          <Field label="Status">
            <Tag variant={statusVariant}>{order.status}</Tag>
          </Field>
          <Field label="Method" mono>
            {order.paymentMethod ?? null}
          </Field>
          <Field label="Paid At" mono>
            {order.paidAt ? fmtDatetime(order.paidAt) : null}
          </Field>
          <Field label="Payment Intent ID" mono>
            {order.paymentIntentId ?? null}
          </Field>
          <Field label="Payment Method ID" mono>
            {order.paymentMethodId ?? null}
          </Field>
          <Field label="Cover Fees">
            <Tag variant={order.coverFees ? 'accent' : 'default'}>{order.coverFees ? 'Yes' : 'No'}</Tag>
          </Field>
          <Field label="Fees Covered" mono>
            {order.feesCovered > 0 ? fmt(order.feesCovered) : null}
          </Field>
          <Field label="Type">
            <Tag variant="default">{order.type}</Tag>
          </Field>
        </Section>

        {/* ── Recurring ── */}
        {order.isRecurring && (
          <Section title="Recurring" columns={4}>
            <Field label="Frequency" mono>
              {order.recurringFrequency ?? null}
            </Field>
            <Field label="Subscription ID" mono>
              {order.stripeSubscriptionId ?? null}
            </Field>
            <Field label="Next Billing Date" mono>
              {order.nextBillingDate ? fmtDatetime(order.nextBillingDate) : null}
            </Field>
          </Section>
        )}

        {/* ── Failure ── */}
        {(order.failureReason || order.failureCode) && (
          <Section title="Failure" columns={2}>
            <Field label="Reason">
              <p className="text-sm text-red-500">{order.failureReason ?? '—'}</p>
            </Field>
            <Field label="Code" mono>
              <p className="text-sm font-mono text-red-400">{order.failureCode ?? '—'}</p>
            </Field>
          </Section>
        )}

        {/* ── Billing Address ── */}
        <Section title="Billing Address" columns={3}>
          <Field label="Line 1">{billing?.addressLine1 ?? null}</Field>
          <Field label="Line 2">{billing?.addressLine2 ?? null}</Field>
          <Field label="City">{billing?.city ?? null}</Field>
          <Field label="State">{billing?.state ?? null}</Field>
          <Field label="Postal Code" mono>
            {billing?.zipPostalCode ?? null}
          </Field>
          <Field label="Country" mono>
            {billing?.country ?? null}
          </Field>
        </Section>

        {/* ── Notes ── */}
        {order.notes && (
          <Section title="Notes" columns={2}>
            <Field label="Notes" span={2}>
              <p className="text-sm leading-relaxed opacity-70 whitespace-pre-wrap">{order.notes}</p>
            </Field>
          </Section>
        )}

        {/* ── Raw IDs ── */}
        <Section title="Identifiers" columns={2}>
          <Field label="Order ID" mono>
            {order.id}
          </Field>
          <Field label="User ID" mono>
            {order.userId ?? null}
          </Field>
          <Field label="Payment Intent ID" mono>
            {order.paymentIntentId ?? null}
          </Field>
          <Field label="Stripe Subscription ID" mono>
            {order.stripeSubscriptionId ?? null}
          </Field>
          <Field label="Payment Method ID" mono>
            {order.paymentMethodId ?? null}
          </Field>
        </Section>
      </div>
    </div>
  )
}
