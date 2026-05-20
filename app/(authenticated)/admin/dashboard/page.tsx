import { getContactSubmissions } from '@/app/lib/actions/contact-submission/getContactSubmissions'
import { getDonations } from '@/app/lib/actions/getDonations'
import { getUsers } from '@/app/lib/actions/getUsers'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const [contactSubmissions, donations, users] = await Promise.all([
    getContactSubmissions(),
    getDonations(),
    getUsers()
  ])
  return <DashboardClient contactSubmissions={contactSubmissions} donations={donations} users={users} />
}
