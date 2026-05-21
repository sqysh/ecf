import { JsonValue } from '@prisma/client/runtime/library'

export interface IOrder {
  id: string
  createdAt: Date
  updatedAt: Date

  // Order details
  type: OrderType
  status: OrderStatus

  // Payment
  totalAmount: number
  paymentMethod: string
  paymentIntentId: string | null
  paidAt: Date | null

  // Customer info
  customerEmail: string
  customerName: string
  customerPhone: string | null

  // Billing info
  billingAddress: JsonValue | null
  coverFees: boolean
  feesCovered: number
  notes: string | null

  // User info
  userId: string | null

  // Payment method
  paymentMethodId: string | null

  // Recurring donation fields
  stripeSubscriptionId: string | null
  isRecurring: boolean
  recurringFrequency: string | null
  nextBillingDate: Date | null

  failureReason: string | null
  failureCode: string | null
}

// Change from enum to type
export type OrderType = 'ONE_TIME_DONATION' | 'RECURRING_DONATION'

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED' | 'FAILED'

export type RecurringFrequency = 'monthly' | 'yearly'
