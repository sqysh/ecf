import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import MessagesClient from './MessagesClient'
import { getContactSubmissions } from '@/app/lib/actions/contact-submission/getContactSubmissions'

export default async function MessagesPage() {
  const session = await auth()
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERUSER')) {
    redirect('/login')
  }

  const submissions = await getContactSubmissions()

  return <MessagesClient submissions={submissions} />
}
