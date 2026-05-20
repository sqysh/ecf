import { NextResponse } from 'next/server'
import { auth } from './app/lib/auth'

const URL_REDIRECTS: Record<string, string> = {
  '/about-education-comes-first': '/about'
}

type TProxy = {
  nextUrl: { pathname: any }
  url: string | URL | undefined
  cookies: { get: (arg0: string) => { (): any; new (): any; value: any } }
}

export async function proxy(request: TProxy) {
  const { pathname } = request.nextUrl
  const session = await auth()
  const role = session?.user?.role

  // Handle URL redirects
  if (URL_REDIRECTS[pathname]) {
    return NextResponse.redirect(new URL(URL_REDIRECTS[pathname], request.url), { status: 301 })
  }

  if (pathname === '/login' && role) {
    const redirect = request.cookies.get('ecf_redirect')?.value

    if (role === 'ADMIN' || role === 'SUPERUSER') return NextResponse.redirect(new URL('/admin/dashboard', request.url))

    const response = NextResponse.redirect(new URL(redirect || '/member/portal', request.url))
    response.cookies.delete('ecf_redirect')
    return response
  }

  // Protected routes
  const isProtected = ['/member/', '/admin/'].some((r) => pathname.startsWith(r))
  if (!isProtected) return NextResponse.next()

  // Unauthenticated — send to login
  if (!role) return NextResponse.redirect(new URL('/login', request.url))

  // Admin routes
  if (pathname.startsWith('/admin/')) {
    if (role !== 'ADMIN' && role !== 'SUPERUSER') return NextResponse.redirect(new URL('/member/portal', request.url))
    return NextResponse.next()
  }

  // Supporter routes — redirect admins away from entry point
  if (pathname.startsWith('/member/')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/member/:path*',
    '/admin/:path*',
    '/login',

    // Add old URL paths to the matcher so middleware checks them
    '/about-education-comes-first'
  ]
}
