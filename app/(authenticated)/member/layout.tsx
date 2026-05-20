'use client'

import PaymentMethodDrawer from '@/app/components/member/PaymentMethodDrawer'
import { ReactNode } from 'react'

export default function SupporterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PaymentMethodDrawer />
      {children}
    </>
  )
}
