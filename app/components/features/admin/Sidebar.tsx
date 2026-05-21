'use client'

import { LayoutDashboard, HeartHandshake, Users, Mail, Shield, UserCircle, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export function Sidebar({ role, newMessages }: { role: string; newMessages: number }) {
  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, active: true },
    { label: 'Donations', href: '/admin/donations', icon: HeartHandshake },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Messages', href: '/admin/messages', icon: Mail, badge: newMessages > 0 ? newMessages : undefined }
  ]

  return (
    <aside className="w-60 shrink-0 border-r border-neutral-200 dark:border-border-dark bg-white dark:bg-accent-dark flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <Link
        href="/"
        className="h-15.75 px-5 border-b border-neutral-200 dark:border-border-dark flex items-center gap-3"
      >
        <div className="w-8 h-8 bg-primary-dark flex items-center justify-center">
          <span className="font-bold text-sm text-neutral-900">E</span>
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-neutral-900 dark:text-text-dark">Education Comes First</p>
          <p className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Admin Panel</p>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        <p className="text-[10px] uppercase tracking-wider font-medium text-neutral-400 dark:text-neutral-500 px-3 mb-2">
          Workspace
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                item.active
                  ? 'bg-neutral-100 dark:bg-border-dark text-neutral-900 dark:text-text-dark font-medium'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark/50'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && (
                <span className="bg-secondary-light dark:bg-secondary-dark text-white dark:text-neutral-900 text-[10px] font-semibold px-1.5 py-0.5 min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        {role === 'SUPERUSER' && (
          <>
            <p className="text-[10px] uppercase tracking-wider font-medium text-neutral-400 dark:text-neutral-500 px-3 mb-2 mt-6">
              Admin
            </p>
            <Link
              href="/super"
              className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark/50 transition-colors"
            >
              <Shield className="w-4 h-4 shrink-0" />
              <span>Super Admin</span>
            </Link>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-200 dark:border-border-dark p-3 space-y-0.5">
        <Link
          href="/member/portal"
          className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark/50 transition-colors"
        >
          <UserCircle className="w-4 h-4 shrink-0" />
          <span>My Portal</span>
        </Link>
        <button
          onClick={() => signOut({ redirectTo: '/login' })}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-border-dark/50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
