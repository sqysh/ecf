import { GitCommit, LucideIcon, Logs, User, LayoutDashboard, Gift, Mail, Users } from 'lucide-react'

export const HIDDEN_PATHS = [
  '/member/',
  '/donate',
  '/admin',
  '/auth',
  '/login',
  '/terms',
  '/privacy',
  '/order-confirmation',
  '/super'
]

const isStringInPath = (path: string, str: string) => path.includes(str)

interface IAdminNavLink {
  title: string
  items: { icon: LucideIcon; label: string; path: string; description: string; active: boolean; isDrawer?: boolean }[]
}

export const adminNavigationLinkData = (path: string, isSuperUser: boolean): IAdminNavLink[] => {
  const userGroup = [
    {
      icon: User,
      label: 'Member Portal',
      path: '/member/portal',
      description: 'View your profile & donations',
      active: isStringInPath(path, 'member/portal')
    }
  ]

  const dashboardGroup = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/admin/dashboard',
      description: 'Dashboard',
      active: isStringInPath(path, 'dashboard')
    }
  ]

  const operationsGroup = [
    {
      icon: Gift,
      label: 'Donations',
      path: '/admin/donations',
      description: 'Manage stripe transactions',
      active: isStringInPath(path, 'donations')
    },
    {
      icon: Mail, // or MessageSquare
      label: 'Contact Submissions',
      path: '/admin/contact-submissions',
      description: 'View contact form submissions',
      active: isStringInPath(path, 'contact-submissions')
    }
  ]

  const managementGroup = [
    {
      icon: Users,
      label: 'Users',
      path: '/admin/users',
      description: 'Manage user accounts',
      active: isStringInPath(path, 'users')
    }
  ]

  const systemGroup = [
    {
      icon: GitCommit,
      label: 'Changelog',
      path: '/admin/changelog',
      description: 'Version History & Updates',
      active: isStringInPath(path, 'changelog')
    },
    ...(isSuperUser
      ? [
          {
            icon: Logs,
            label: 'Logs',
            path: '/admin/logs',
            description: 'System details',
            active: isStringInPath(path, 'logs')
          }
        ]
      : [])
  ]

  return [
    { title: 'Dashboard', items: dashboardGroup },
    { title: 'User', items: userGroup },
    { title: 'Operations', items: operationsGroup },
    { title: 'Management', items: managementGroup },
    { title: 'System', items: systemGroup }
  ]
}
