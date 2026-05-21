import Badge from '../ui/feedback/Badge'

export default function OrderTypeBadge({
  type,
  frequency
}: {
  type: 'ONE_TIME_DONATION' | 'RECURRING_DONATION'
  frequency?: string | null
}) {
  const isRecurring = type === 'RECURRING_DONATION'
  return (
    <Badge variant={isRecurring ? 'info' : 'neutral'}>{isRecurring ? (frequency ?? 'Recurring') : 'One-Time'}</Badge>
  )
}
