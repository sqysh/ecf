import { UserWithStats } from '@/app/(authenticated)/admin/users/page'
import { initials } from '@/app/lib/utils/user.utils'

export function Avatar({ user, size = 'sm' }: { user: UserWithStats; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-12 h-12 text-base'
  return (
    <div
      className={`${dim} shrink-0 flex items-center justify-center bg-neutral-100 dark:bg-border-dark text-neutral-700 dark:text-neutral-300 font-semibold`}
    >
      {initials(user.firstName, user.lastName, user.email)}
    </div>
  )
}
