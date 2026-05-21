import { Sidebar } from '@/app/components/features/admin/Sidebar'
import { getContactSubmissions } from '@/app/lib/actions/contact-submission/getContactSubmissions'
import { auth } from '@/app/lib/auth'
import { ReactNode } from 'react'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  const contactSubmissions = await getContactSubmissions()
  const newMessages = contactSubmissions.filter((c) => c.status === 'NEW').length

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-bg-dark text-neutral-900 dark:text-text-dark">
      <Sidebar role={session?.user.role ?? ''} newMessages={newMessages} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
