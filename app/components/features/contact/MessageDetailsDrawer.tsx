'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X, Reply, Archive, MailOpen, ExternalLink } from 'lucide-react'
import { ContactSubmission, ContactReadStatus } from '@prisma/client'
import { fullName, initials } from '@/app/lib/utils/user.utils'
import Badge from '../../ui/Badge'
import { statusVariant } from '@/app/lib/utils/contact.utils'
import { fmtDateTime } from '@/app/lib/utils/date.utils'
import { Section } from '../../shared/Section'
import { Field } from '../../shared/Field'

export default function MessageDetailDrawer({
  submission,
  onClose,
  onStatusChange
}: {
  submission: ContactSubmission | null
  onClose: () => void
  onStatusChange: (status: ContactReadStatus) => void
}) {
  const open = !!submission

  const mailtoLink = submission
    ? `mailto:${submission.email}?subject=${encodeURIComponent(
        `Re: Your message to Education Comes First`
      )}&body=${encodeURIComponent(`Hi ${submission.firstName},\n\nThank you for reaching out.\n\n`)}`
    : '#'

  return (
    <AnimatePresence>
      {open && submission && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70" onClick={onClose} />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-accent-dark border-l border-neutral-200 dark:border-border-dark flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-neutral-200 dark:border-border-dark px-6 py-5 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-neutral-100 dark:bg-border-dark text-neutral-700 dark:text-neutral-300 font-semibold text-base">
                  {initials(submission.firstName, submission.lastName)}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-neutral-900 dark:text-text-dark truncate">
                    {fullName(submission.firstName, submission.lastName)}
                  </h2>

                  <a
                    href={`mailto:${submission.email}`}
                    className="text-xs text-secondary-light dark:text-secondary-dark hover:underline truncate inline-flex items-center gap-1"
                  >
                    {submission.email}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-border-dark hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status + meta strip */}
            <div className="px-6 py-3 border-b border-neutral-200 dark:border-border-dark bg-neutral-50 dark:bg-bg-dark/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant={statusVariant(submission.status)}>{submission.status}</Badge>
                <Badge variant="neutral">{submission.type}</Badge>
              </div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {fmtDateTime(submission.createdAt)}
              </span>
            </div>

            {/* Message body */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-5">
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 whitespace-pre-wrap wrap-break-word">
                  {submission.message}
                </p>
              </div>

              <Section title="Details">
                <Field label="Submission ID" mono copyable={submission.id} value={submission.id} />
                <Field label="Received" value={fmtDateTime(submission.createdAt)} />
                <Field label="Type" value={submission.type} />
                <Field label="Status" value={submission.status} />
              </Section>
            </div>

            {/* Action footer */}
            <div className="border-t border-neutral-200 dark:border-border-dark px-6 py-4 bg-neutral-50 dark:bg-bg-dark/50 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {submission.status !== 'READ' && submission.status !== 'NEW' && (
                  <button
                    onClick={() => onStatusChange('READ')}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-neutral-200 dark:border-border-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-border-dark transition-colors cursor-pointer"
                  >
                    <MailOpen className="w-3.5 h-3.5" />
                    Mark unread
                  </button>
                )}
                {submission.status !== 'ARCHIVED' && (
                  <button
                    onClick={() => {
                      onStatusChange('ARCHIVED')
                      onClose()
                    }}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-neutral-200 dark:border-border-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-border-dark transition-colors cursor-pointer"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    Archive
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={mailtoLink}
                  onClick={() => onStatusChange('READ')}
                  className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 bg-neutral-900 dark:bg-primary-dark text-white dark:text-neutral-900 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Reply className="w-4 h-4" />
                  Reply
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
