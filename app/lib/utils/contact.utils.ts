import { ContactReadStatus } from '@prisma/client'

export function statusVariant(status: ContactReadStatus) {
  switch (status) {
    case 'NEW':
      return 'info' as const
    case 'READ':
      return 'neutral' as const
    case 'ARCHIVED':
      return 'neutral' as const
    default:
      return 'neutral' as const
  }
}
