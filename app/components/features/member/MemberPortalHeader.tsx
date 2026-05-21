import { LayoutDashboard, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export function MemberPortalHeader() {
  const session = useSession()
  const role = session.data?.user.role

  return (
    <header className="sticky top-0 z-10 border-b border-border-subtle dark:border-border-dark bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-container mx-auto px-4 xs:px-6 h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Education Comes First — home"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
        >
          <span className="font-mono text-[11px] font-bold tracking-[0.15em] uppercase text-text-light dark:text-text-dark">
            Education<span className="text-secondary-light dark:text-secondary-dark"> Comes First</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {(role === 'ADMIN' || role === 'SUPERUSER') && (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase bg-primary-light dark:bg-primary-dark text-black hover:opacity-85 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-9"
            >
              <LayoutDashboard size={13} aria-hidden="true" />
              <span className="hidden xs:inline">Dashboard</span>
            </Link>
          )}

          <button
            onClick={() => signOut({ redirectTo: '/login' })}
            aria-label="Sign out"
            className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase border border-border-subtle dark:border-border-dark text-text-light/50 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-9"
          >
            <LogOut size={13} aria-hidden="true" />
            <span className="hidden xs:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
