import { OrderStatus } from '@prisma/client'
import Badge from '../../ui/feedback/Badge'

const map: Record<OrderStatus, 'success' | 'warning' | 'danger' | 'neutral' | 'info'> = {
  CONFIRMED: 'success',
  PROCESSING: 'info',
  PENDING: 'warning',
  FAILED: 'danger',
  REFUNDED: 'neutral',
  // Add any other OrderStatus values your enum has here
  CANCELLED: 'info'
}

export default function OrderStatusBadge({ status, size = 'sm' }: { status: OrderStatus; size?: 'xs' | 'sm' }) {
  return (
    <Badge variant={map[status]} size={size}>
      {status}
    </Badge>
  )
}
