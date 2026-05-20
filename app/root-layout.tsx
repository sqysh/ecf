'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { HIDDEN_PATHS } from './lib/constants/navigation.constants'
import { Provider } from 'react-redux'
import { store } from './lib/store/store'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Toast from './components/ui/overlays/Toast'
import ContactSubmissionSuccessModal from './components/features/contact/ContactSubmissionSuccessModal'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import VideoLightbox from './components/ui/overlays/VideoLightbox'
import ContactDrawer from './components/features/contact/ContactDrawer'

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function RootLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const show = !HIDDEN_PATHS.some((path: string) => pathname.startsWith(path))

  return (
    <Provider store={store}>
      <Elements stripe={stripe}>
        <VideoLightbox />
        <ContactDrawer />
        <ContactSubmissionSuccessModal />
        <Toast />
        {show && <Header />}
        {children}
        {show && <Footer />}
      </Elements>
    </Provider>
  )
}
