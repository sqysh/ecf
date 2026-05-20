import { redirect } from 'next/navigation'
import { IOrder } from '@/types/entities/order'
import prisma from '@/prisma/client'
import { auth } from '@/app/lib/auth'
import DonationsClient from './DonationsClient'

async function getDonations(): Promise<IOrder[]> {
  const orders = await prisma.order.findMany({
    where: {
      type: { in: ['ONE_TIME_DONATION', 'RECURRING_DONATION'] }
    },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, firstName: true, lastName: true, email: true }
      }
    }
  })

  // Prisma Float is already a number, but normalize any Decimal-like fields
  return orders as unknown as IOrder[]
}

export default async function DonationsPage() {
  const session = await auth()
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERUSER')) {
    redirect('/login')
  }

  const donations = await getDonations()

  return <DonationsClient donations={donations} />
}
