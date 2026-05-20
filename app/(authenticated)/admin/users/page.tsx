import { redirect } from 'next/navigation'
import { TUser } from '@/types/entities/user'
import { IOrder } from '@/types/entities/order'
import prisma from '@/prisma/client'
import { auth } from '@/app/lib/auth'
import UsersClient from './UsersClient'

export type UserWithStats = TUser & {
  orderCount: number
  totalGiven: number
  hasRecurring: boolean
  lastDonationAt: Date | null
  orders: IOrder[]
}

async function getUsersWithStats(): Promise<UserWithStats[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      orders: {
        where: {
          type: { in: ['ONE_TIME_DONATION', 'RECURRING_DONATION'] }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  return users.map((u) => {
    const confirmed = u.orders.filter((o) => o.status === 'CONFIRMED')
    return {
      ...u,
      orderCount: u.orders.length,
      totalGiven: confirmed.reduce((s, o) => s + o.totalAmount, 0),
      hasRecurring: u.orders.some((o) => o.type === 'RECURRING_DONATION' && o.status === 'CONFIRMED'),
      lastDonationAt: confirmed[0]?.createdAt ?? null
    } as unknown as UserWithStats
  })
}

export default async function UsersPage() {
  const session = await auth()
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERUSER')) {
    redirect('/login')
  }

  const users = await getUsersWithStats()

  return <UsersClient users={users} />
}
