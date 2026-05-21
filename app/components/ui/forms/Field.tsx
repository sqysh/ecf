import { Copy } from 'lucide-react'
import { useState } from 'react'

export function Field({
  label,
  value,
  mono,
  copyable
}: {
  label: string
  value: React.ReactNode
  mono?: boolean
  copyable?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!copyable) return
    navigator.clipboard.writeText(copyable)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="py-3 border-b border-neutral-200 dark:border-border-dark last:border-0">
      <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
        {label}
      </p>
      <div className="flex items-center justify-between gap-2">
        <div
          className={`text-sm text-neutral-900 dark:text-text-dark min-w-0 flex-1 ${
            mono ? 'font-mono text-xs break-all' : ''
          }`}
        >
          {value || <span className="text-neutral-400 dark:text-neutral-500">—</span>}
        </div>
        {copyable && (
          <button
            onClick={handleCopy}
            className="p-1 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer shrink-0"
            title="Copy"
          >
            {copied ? (
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Copied</span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
