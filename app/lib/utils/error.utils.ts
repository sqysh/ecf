import { Shield, Clock, Mail, AlertTriangle, Lock, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type AuthErrorInfo = {
  icon: LucideIcon
  title: string
  message: string
}

export const getAuthErrorMessage = (error: string): AuthErrorInfo => {
  switch (error) {
    case 'AccessDenied':
      return {
        icon: Shield,
        title: 'Access denied',
        message: "Your account isn't authorised to access this portal. Contact us if you think this is a mistake."
      }

    case 'Verification':
      return {
        icon: Clock,
        title: 'Link expired',
        message: 'This magic link has expired or has already been used. Request a new one below.'
      }

    case 'EmailSignin':
      return {
        icon: Mail,
        title: 'Email could not be sent',
        message: "We weren't able to send a sign-in link to that address. Double-check it and try again."
      }

    case 'OAuthSignin':
    case 'OAuthCallback':
      return {
        icon: AlertTriangle,
        title: 'Google sign-in failed',
        message: 'There was a problem connecting with Google. Please try again or use a magic link instead.'
      }

    case 'SessionRequired':
      return {
        icon: Lock,
        title: 'Sign in required',
        message: 'You need to be signed in to access this page. Please sign in to continue.'
      }

    case 'Configuration':
      return {
        icon: Settings,
        title: 'Configuration error',
        message: 'Something is misconfigured on our end. Our team has been notified — please try again later.'
      }

    default:
      return {
        icon: AlertTriangle,
        title: 'Something went wrong',
        message: 'An unexpected error occurred. Please try again or contact us if the problem persists.'
      }
  }
}

export function extractErrorMessage(error: unknown): string {
  try {
    if (
      error &&
      typeof error === 'object' &&
      'data' in error &&
      error.data &&
      typeof error.data === 'object' &&
      'message' in error.data
    ) {
      return String(error.data.message)
    }
  } catch {
    // fall through to default message
  }

  return 'Unable to process request.'
}
