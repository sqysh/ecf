import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

interface DropdownItem {
  label: string
  linkKey: string
  isActive?: boolean
}

interface DropdownProps {
  trigger: string
  items: DropdownItem[]
  isActive?: boolean
}

export default function Dropdown({ trigger, items, isActive }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isActive || isOpen ? 'text-secondary-light dark:text-secondary-dark' : 'text-text-light dark:text-text-dark'} flex items-center gap-1 font-mono uppercase text-xs sm:text-sm hover:text-secondary-light dark:hover:text-secondary-dark transition-colors duration-200`}
      >
        {trigger}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <ChevronDown size={14} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 min-w-48 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark overflow-hidden z-50"
          >
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.linkKey}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 font-mono text-xs transition-colors duration-150 border-b border-border-light dark:border-border-dark last:border-b-0 ${
                  item.isActive
                    ? 'bg-primary-light dark:bg-primary-dark text-black'
                    : 'text-text-light dark:text-text-dark hover:bg-accent dark:hover:bg-accent-dark'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
