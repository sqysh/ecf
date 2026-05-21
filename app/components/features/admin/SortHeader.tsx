import { SortDir, SortField } from '@/types/admin.types'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

export function SortHeader({
  field,
  label,
  currentField,
  currentDir,
  onSort,
  align = 'left'
}: {
  field: SortField
  label: string
  currentField: SortField
  currentDir: SortDir
  onSort: (f: SortField) => void
  align?: 'left' | 'right'
}) {
  const active = currentField === field
  const Icon = !active ? ArrowUpDown : currentDir === 'asc' ? ArrowUp : ArrowDown
  return (
    <button
      onClick={() => onSort(field)}
      className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
        align === 'right' ? 'justify-end w-full' : ''
      } ${
        active
          ? 'text-neutral-900 dark:text-text-dark'
          : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
      }`}
    >
      {align === 'right' && <Icon className="w-3 h-3" />}
      {label}
      {align === 'left' && <Icon className="w-3 h-3" />}
    </button>
  )
}
