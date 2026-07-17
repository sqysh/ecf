'use server'

import { contactSubmissionAdminNotificationTemplate } from '@/app/lib/email-templates/contact-submission-notification.template'
import { resend } from '@/app/lib/resend'
import prisma from '@/prisma/client'
import { IContactSubmission } from '@/types/entities/contact-submission'
import { ContactReadStatus, ContactSubmissionType } from '@prisma/client'
import { createLog } from '../../createLog'

export const createContactSubmission = async (data: Omit<IContactSubmission, 'id' | 'createdAt' | 'status'>) => {
  // Honeypot: real users can't see or fill this. Bots do.
  if (data.website && data.website.trim() !== '') {
    // Silently succeed so the bot thinks it worked and moves on
    return { success: true }
  }
  // Validate required fields
  if (!data.firstName?.trim() || !data.lastName?.trim() || !data.email?.trim() || !data.message) {
    return {
      success: false,
      error: 'Missing required fields',
      data: null
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return {
      success: false,
      error: 'Invalid email format',
      data: null
    }
  }

  try {
    const submissionData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      type: data.type.toUpperCase() as ContactSubmissionType,
      message: data.message.trim(),
      status: 'NEW' as ContactReadStatus
    }

    // Create submission and capture the row so we have id + createdAt for the email
    const submission = await prisma.contactSubmission.create({
      data: submissionData
    })

    // Send admin notification — non-blocking, logged if it fails
    try {
      await resend.emails.send({
        from: 'Education Comes First <contact@educationcomesfirst.org>',
        to: process.env.ADMIN_NOTIFICATION_EMAIL || 'info@educationcomesfirst.org',
        subject: `New contact submission from ${submission.firstName} ${submission.lastName}`,
        replyTo: submission.email,
        html: contactSubmissionAdminNotificationTemplate({
          id: submission.id,
          firstName: submission.firstName,
          lastName: submission.lastName,
          email: submission.email,
          message: submission.message,
          type: submission.type,
          createdAt: submission.createdAt
        })
      })
    } catch (emailError) {
      // Log email failure but don't fail the submission — the row is saved
      await createLog('error', 'Failed to send admin notification', {
        submissionId: submission.id,
        type: submission.type,
        email: submission.email,
        error: emailError instanceof Error ? emailError.message : 'Unknown error'
      })
    }

    return {
      success: true
    }
  } catch (error) {
    await createLog('error', 'Failed to create contact submission', {
      error: error instanceof Error ? error.message : 'Unknown error',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    })

    return {
      success: false,
      error: 'Failed to create contact submission. Please try again.'
    }
  }
}
