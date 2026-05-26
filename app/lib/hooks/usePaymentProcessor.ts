import { PaymentMethod } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Pusher from 'pusher-js'
import { useRef } from 'react'

export function usePaymentProcessor() {
  const router = useRouter()
  const session = useSession()
  const hasProcessedOrder = useRef(false)
  const hasProcessedRecurringOrder = useRef(false)

  const getPaymentMethodId = (paymentMethod: string | PaymentMethod | undefined): string | undefined => {
    return typeof paymentMethod === 'string' ? paymentMethod : paymentMethod?.id
  }

  const setupPusherListenerOneTime = (
    processingStatus?: string,
    setError?: (msg: string) => void,
    setProcessingStatus?: (status: string) => void,
    setLoading?: (loading: boolean) => void
  ) => {
    const channelId = session?.data?.user?.id
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    })
    const channel = pusher.subscribe(`payment-${channelId}`)

    const timeout = setTimeout(() => {
      if (processingStatus === 'processing') {
        setError?.('Order processing timeout. Please check your email for confirmation.')
        setProcessingStatus?.('failed')
        setLoading?.(false)
      }
    }, 10000)

    channel.bind('order-created', (data: any) => {
      if (hasProcessedOrder.current) return
      hasProcessedOrder.current = true

      clearTimeout(timeout)
      setProcessingStatus?.('success')

      router.push(`/order-confirmation/${data.orderId}`)
      setLoading?.(false)
      channel.unbind_all()
      pusher.unsubscribe(`payment-${channelId}`)
    })

    channel.bind('order-failed', (data: any) => {
      clearTimeout(timeout)
      setProcessingStatus?.('failed')
      setError?.(data.error || 'Order processing failed')
      setLoading?.(false)
      channel.unbind('order-created')
      channel.unbind('order-failed')
    })
  }

  const setupPusherListenerRecurring = (
    subscriptionResult?: any,
    processingStatus?: string,
    setError?: any,
    setProcessingStatus?: any,
    setLoading?: any
  ) => {
    const channelId = `payment-${subscriptionResult.subscriptionId}`

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    })

    const channel = pusher.subscribe(channelId)

    const timeout = setTimeout(() => {
      if (processingStatus === 'processing') {
        setError('Order processing timeout. Please check your email for confirmation.')
        setProcessingStatus('failed')
        setLoading(false)
      }
    }, 10000)

    channel.bind('order-created', (data: any) => {
      if (hasProcessedRecurringOrder.current) return
      hasProcessedRecurringOrder.current = true

      clearTimeout(timeout)
      setProcessingStatus('success')

      router.push(`/order-confirmation/${data.orderId}`)
      channel.unbind_all()
      pusher.unsubscribe(channelId)
      setLoading(false)
    })

    channel.bind('order-failed', (data: any) => {
      clearTimeout(timeout)
      setProcessingStatus('failed')
      setLoading(false)
      setError(data.error || 'Order processing failed')
      channel.unbind_all()
      pusher.unsubscribe(channelId)
    })
  }

  return {
    getPaymentMethodId,
    setupPusherListenerOneTime,
    setupPusherListenerRecurring
  }
}
