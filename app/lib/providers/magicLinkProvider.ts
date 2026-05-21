import type { EmailConfig } from 'next-auth/providers/email'
import { createLog } from '../actions/createLog'
import { resend } from '../resend'
import magicLinkTemplate from '../email-templates/magic-link'

const magicLinkProvider: EmailConfig = {
  id: 'email',
  name: 'Email',
  type: 'email',
  maxAge: 15 * 60, // 15 mins
  from: process.env.RESEND_FROM_EMAIL!,
  sendVerificationRequest: async ({ identifier: email, url, provider }) => {
    try {
      const result = await resend.emails.send({
        from: `Education Comes First <${provider.from!}>`,
        to: email,
        subject: 'Sign in to Education Comes First',
        html: magicLinkTemplate(url)
      })

      if (result.error) {
        await createLog('error', 'Resend returned error', {
          location: ['magicLinkProvider.ts'],
          email,
          error: result.error.message
        })
        throw new Error(result.error.message)
      }

      await createLog('info', 'Magic link sent successfully', {
        location: ['magicLinkProvider.ts'],
        email,
        messageId: result.data?.id
      })
    } catch (error) {
      await createLog('error', 'Failed to send magic link email', {
        location: ['magicLinkProvider.ts'],
        email,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      throw error
    }
  }
}

export default magicLinkProvider
