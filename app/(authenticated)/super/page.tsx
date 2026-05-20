import prisma from '@/prisma/client'
import SuperDashboardClient from './SuperDashboardClient'

export default async function SuperDashboardPage() {
  const [orders, users, contactSubmissions, logs, paymentMethods] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.log.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.paymentMethod.findMany({ orderBy: { createdAt: 'desc' } })
  ])
  return (
    <SuperDashboardClient
      contactSubmissions={contactSubmissions}
      logs={logs}
      orders={orders}
      paymentMethods={paymentMethods}
      users={users}
    />
  )
}
