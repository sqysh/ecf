import prisma from '@/prisma/client'
import { cache } from 'react'

export const getContactSubmissions = cache(async () => {
  return prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' }
  })
})
