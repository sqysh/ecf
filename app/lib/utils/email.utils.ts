import { resend } from '@/app/lib/resend'
import { oneTimedonationConfirmationTemplate } from '../email-templates/one-time-donation'
import { recurringDonationConfirmationTemplate } from '../email-templates/recurring-donation'

export default async function sendConfirmationEmail(
  order: any,
  orderType: 'ONE_TIME_DONATION' | 'RECURRING_DONATION',
  amount: number
) {
  try {
    let emailHtml: string
    let subject: string

    if (orderType === 'ONE_TIME_DONATION') {
      emailHtml = oneTimedonationConfirmationTemplate(order.customerName, amount, order.id)
      subject = 'Your One Time Donation is Confirmed'
    } else {
      const frequency = order.recurringFrequency || 'monthly'
      emailHtml = recurringDonationConfirmationTemplate(order.customerName, amount, frequency, order.id)
      subject = `Your ${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Donation is Confirmed`
    }

    await resend.emails.send({
      from: `Education Comes First <${process.env.RESEND_FROM_EMAIL}>`,
      to: order.customerEmail,
      subject,
      html: emailHtml
    })
  } catch (emailError) {
    console.error('Error sending confirmation email:', emailError)
  }
}
