import DonateCheckoutClient from '@/app/(public)/donate/DonateCheckoutClient'
import { getSavedPaymentMethods } from '@/app/lib/actions/getSavedPaymentMethods'
import { getUserName } from '@/app/lib/actions/getUserName'

export const dynamic = 'force-dynamic'

export default async function DonateCheckoutPage() {
  const [nameResult, savedPayments] = await Promise.all([getUserName(), getSavedPaymentMethods()])

  return <DonateCheckoutClient name={nameResult?.data} savedCards={savedPayments?.data} />
}
