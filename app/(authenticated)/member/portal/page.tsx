import MemberPortalClient from '@/app/(authenticated)/member/portal/MemberPortalClient'
import { getMemberPortal } from '@/app/lib/actions/getMemberPortal'
import { getSavedPaymentMethods } from '@/app/lib/actions/getSavedPaymentMethods'
import { getUserName } from '@/app/lib/actions/getUserName'

export const dynamic = 'force-dynamic'

export default async function MemberPortalPage() {
  const [data, nameResult, savedPayments] = await Promise.all([
    getMemberPortal(),
    getUserName(),
    getSavedPaymentMethods()
  ])

  return <MemberPortalClient data={data} name={nameResult?.data} savedCards={savedPayments?.data} />
}
