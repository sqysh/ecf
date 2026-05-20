import { getOrderById } from '@/app/lib/actions/getOrderById'
import SuperOrderClient from './SuperOrderClient'

export default async function SuperOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getOrderById(id)
  return <SuperOrderClient order={result} />
}
