import { Check, Loader2, Pencil, User } from 'lucide-react'
import { Section } from './Section'
import { useReducedMotion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'

interface ProfileSectionProps {
  /** Whether the form is in edit mode. */
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>

  /** Cancel button handler — resets local fields to props and exits edit mode. */
  handleCancel: () => void

  /** True while the save request is in flight. */
  saving: boolean
  /** Save button handler — calls the server action and refreshes. */
  handleSave: () => Promise<void>

  /** First name local state + setter. */
  firstName: string
  setFirstName: Dispatch<SetStateAction<string>>

  /** Last name local state + setter. */
  lastName: string
  setLastName: Dispatch<SetStateAction<string>>

  /** Supporter overview payload (member-since, etc). */
  data: any

  /** Pre-formatted total dollars given. */
  totalGiven: number
}

export function ProfileSection({
  editing,
  setEditing,
  handleCancel,
  saving,
  handleSave,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  data,
  totalGiven
}: ProfileSectionProps) {
  const reduceMotion = useReducedMotion()
  return (
    <Section label="Profile" icon={User} custom={3}>
      <div className="border border-neutral-200 dark:border-border-dark">
        {/* Edit toggle */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-border-dark bg-black/3 dark:bg-white/3">
          <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65">
            Personal info
          </p>
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              aria-label="Edit profile"
              className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
            >
              <Pencil size={10} aria-hidden="true" /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                aria-label="Cancel editing"
                className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/85 dark:text-text-dark/80 underline underline-offset-2 hover:no-underline hover:text-red-700 dark:hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 dark:focus-visible:outline-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                aria-label="Save profile changes"
                aria-busy={saving}
                className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase font-bold text-secondary-light dark:text-primary-dark underline underline-offset-2 hover:no-underline transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 size={10} className={reduceMotion ? '' : 'animate-spin'} aria-hidden="true" />
                    Saving&hellip;
                    <span className="sr-only" role="status" aria-live="polite">
                      Saving profile changes, please wait.
                    </span>
                  </>
                ) : (
                  <>
                    <Check size={10} aria-hidden="true" /> Save
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Fields */}
        {[
          {
            label: 'First name',
            id: 'first-name',
            value: firstName,
            setter: setFirstName,
            auto: 'given-name',
            name: 'firstName'
          },
          {
            label: 'Last name',
            id: 'last-name',
            value: lastName,
            setter: setLastName,
            auto: 'family-name',
            name: 'lastName'
          }
        ].map(({ label, id, value, setter, auto, name }) => (
          <div key={id} className="px-4 py-3 border-b border-neutral-200 dark:border-border-dark last:border-0">
            <label
              htmlFor={id}
              className="block font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65 mb-1"
            >
              {label}
            </label>
            {editing ? (
              <input
                id={id}
                name={name}
                type="text"
                value={value}
                onChange={(e) => setter(e.target.value)}
                autoComplete={auto}
                disabled={saving}
                className="w-full px-2.5 py-1.5 font-mono text-sm outline-none bg-white dark:bg-accent-dark text-text-light dark:text-text-dark border border-neutral-300 dark:border-border-dark focus:border-secondary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(0,162,209,0.12)] transition-all duration-200 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark"
              />
            ) : (
              <p id={id} className="font-mono text-sm text-text-light dark:text-text-dark">
                {value || <span className="text-text-light/70 dark:text-text-dark/65 italic text-xs">Not set</span>}
              </p>
            )}
          </div>
        ))}

        {/* Read-only rows */}
        {[
          { label: 'Member since', value: data?.supporter?.memberSince ?? '—' },
          {
            label: 'Total given',
            value: `$${totalGiven.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
          }
        ].map(({ label, value }) => (
          <div key={label} className="px-4 py-3 border-b border-neutral-200 dark:border-border-dark last:border-0">
            <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65 mb-1">
              {label}
            </p>
            <p className="font-mono text-sm text-text-light dark:text-text-dark">{value}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
