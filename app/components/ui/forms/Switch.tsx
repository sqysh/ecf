'use client'

import { motion } from 'framer-motion'
import { BookOpen, Eye, GraduationCap, Sparkles } from 'lucide-react'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
}

export default function Switch({ checked, onChange, label, description }: SwitchProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onChange(!checked)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-[5px] border-2 transition-all ${
        checked
          ? 'dark:bg-primary-dark/10 dark:border-primary-dark/50 bg-primary-light/20 border-primary-light'
          : 'dark:bg-border-dark/50 dark:border-border-dark dark:hover:border-border-dark/70 bg-accent border-border-light hover:border-border-light/70'
      }`}
    >
      {/* Left Content */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 text-left min-w-0">
        {label === 'Grade Level' ? (
          <GraduationCap
            className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
              checked ? 'dark:text-primary-dark text-primary-light' : 'dark:text-text-dark/50 text-text-light/40'
            }`}
          />
        ) : label === 'Active Program' ? (
          <Sparkles
            className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
              checked ? 'dark:text-secondary-dark text-secondary-light' : 'dark:text-text-dark/50 text-text-light/40'
            }`}
          />
        ) : label === 'Public Listing' ? (
          <Eye
            className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
              checked ? 'dark:text-primary-dark text-primary-light' : 'dark:text-text-dark/50 text-text-light/40'
            }`}
          />
        ) : (
          <BookOpen
            className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
              checked ? 'dark:text-secondary-dark text-secondary-light' : 'dark:text-text-dark/50 text-text-light/40'
            }`}
          />
        )}

        <div className="min-w-0 flex-1">
          <p
            className={`text-xs sm:text-sm font-medium truncate ${checked ? 'dark:text-text-dark text-text-light' : 'dark:text-text-dark/70 text-text-light/70'}`}
          >
            {label}
          </p>
          {description && (
            <p className="text-[10px] sm:text-xs dark:text-text-dark/50 text-text-light/50 truncate">{description}</p>
          )}
        </div>
      </div>

      {/* Switch Toggle */}
      <div
        className={`w-10 h-6 sm:w-12 sm:h-7 rounded-full relative shrink-0 border transition-colors ${
          checked
            ? 'dark:bg-primary-dark dark:border-primary-dark bg-primary-light border-primary-light'
            : 'dark:bg-border-dark dark:border-border-dark bg-border-light border-border-light'
        }`}
      >
        <div
          className={`w-4 h-4 sm:w-5 sm:h-5 -mt-px rounded-full absolute top-1 transition-all ${
            checked ? 'dark:bg-bg-dark bg-bg-light left-5 sm:left-6' : 'dark:bg-text-dark/40 bg-text-light/20 left-1'
          }`}
        />
      </div>
    </motion.button>
  )
}
