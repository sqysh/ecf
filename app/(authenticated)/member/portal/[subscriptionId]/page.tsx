import MemberPortalSubscriptionDetailsClient from '@/app/(authenticated)/member/portal/[subscriptionId]/MemberPortalSubscriptionDetailsClient'
import { getSubscriptionDetails } from '@/app/lib/actions/getSubscriptionDetails'

export default async function MemberPortalSubscriptionDetailsPage({
  params
}: {
  params: Promise<{ subscriptionId: string }>
}) {
  const { subscriptionId } = await params
  const result = await getSubscriptionDetails(subscriptionId)
  return (
    <MemberPortalSubscriptionDetailsClient
      currentPeriodEnd={result.currentPeriodEnd}
      isActive={result.isActive}
      isCancelled={result.isCancelled}
      isPastDue={result.isPastDue}
      isUnpaid={result.isUnpaid}
      order={result.order}
      subscription={result.subscription}
      willCancelAtPeriodEnd={result.willCancelAtPeriodEnd}
    />
  )
}
