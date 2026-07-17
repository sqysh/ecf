import { ContactReadStatus, ContactSubmissionType } from '@prisma/client'

export interface IContactSubmission {
  id?: string
  firstName: string
  lastName: string
  email: string
  message: string
  type: 'SUPPORT' | 'PARTNER' | 'SPONSOR' | 'OTHER'
  status: 'NEW' | 'READ' | 'ARCHIVED'

  website?: string

  createdAt?: Date
}

export type StatusFilter = 'ALL' | ContactReadStatus
export type TypeFilter = 'ALL' | ContactSubmissionType
