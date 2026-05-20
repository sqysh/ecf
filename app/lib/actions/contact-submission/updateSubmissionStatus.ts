'use server'

import { ContactReadStatus } from '@prisma/client'
import { auth } from '../../auth'
import prisma from '@/prisma/client'

export async function updateSubmissionStatus(
  id: string,
  status: ContactReadStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERUSER')) {
      return { success: false, error: 'Unauthorized' }
    }

    await prisma.contactSubmission.update({
      where: { id },
      data: { status }
    })

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
