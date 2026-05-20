import Badge from '../ui/Badge'

const map = {
  SUPERUSER: 'accent',
  ADMIN: 'info',
  SUPPORTER: 'neutral'
} as const

export default function RoleBadge({ role }: { role: keyof typeof map }) {
  return <Badge variant={map[role]}>{role}</Badge>
}
