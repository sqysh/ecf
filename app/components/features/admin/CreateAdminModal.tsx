'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, User } from 'lucide-react'
import { store, useFormSelector, useUiSelector } from '@/app/lib/store/store'
import { createFormActions, Inputs, resetForm } from '@/app/lib/store/slices/formSlice'
import { EMAIL_REGEX } from '@/app/lib/regex'
import { createAdmin, CreateAdminInputs } from '@/app/lib/actions/createAdmin'
import { showToast } from '@/app/lib/store/slices/toastSlice'
import { setCloseCreateAdminModal } from '@/app/lib/store/slices/uiSlice'
import { useRouter } from 'next/navigation'
import { updateAdmin, UpdateAdminInputs } from '@/app/lib/actions/updateAdmin'
import { Role } from '@prisma/client'
import { setCreateAdminForm as setForm } from '@/app/lib/utils/user.utils'

interface Errors {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
}

const validateCreateAdminForm = (inputs: Inputs, setErrors: any): boolean => {
  const e: Errors = {}
  if (!inputs.firstName.trim()) e.firstName = 'Required'
  if (!inputs.lastName.trim()) e.lastName = 'Required'
  if (!inputs.email.trim()) e.email = 'Required'
  else if (!EMAIL_REGEX.test(inputs.email)) e.email = 'Invalid email'
  setErrors(e)
  return Object.keys(e).length === 0
}

export default function CreateAdminModal() {
  const { forms } = useFormSelector()
  const router = useRouter()
  const { createAdminModal, item } = useUiSelector()
  const { handleInput, setErrors } = createFormActions('createAdminForm', store.dispatch)
  const [loading, setLoading] = useState(false)

  const inputs = forms.createAdminForm?.inputs
  const errors = forms.createAdminForm?.errors

  const onClose = () => store.dispatch(setCloseCreateAdminModal())

  const handleSubmit = async () => {
    if (!validateCreateAdminForm(inputs, setErrors)) return
    setLoading(true)
    try {
      if (item) {
        await updateAdmin(inputs as UpdateAdminInputs)
      } else {
        await createAdmin(inputs as CreateAdminInputs)
      }
      router.refresh()
      store.dispatch(
        showToast({
          type: 'success',
          message: item ? 'Admin updated' : 'Admin created',
          description: item
            ? `${inputs?.firstName} ${inputs?.lastName}'s account has been updated successfully.`
            : `${inputs?.firstName} ${inputs?.lastName} has been added as ${inputs?.role === 'ADMIN' ? 'an Admin' : 'a Supporter'}.`
        })
      )
      onClose()
      store.dispatch(resetForm('createAdminForm'))
    } catch (error) {
      store.dispatch(
        showToast({
          type: 'error',
          message: 'Failed to create admin',
          description: error instanceof Error ? error.message : 'Unknown error'
        })
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (item) {
      setForm(item)
    }
  }, [item])

  const inputClass = (err?: string) =>
    `w-full px-3 py-2 bg-white dark:bg-bg-dark border ${
      err
        ? 'border-red-500 dark:border-red-500'
        : 'border-neutral-200 dark:border-border-dark focus:border-neutral-900 dark:focus:border-primary-dark'
    } text-sm text-neutral-900 dark:text-text-dark placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none transition-colors`

  const labelClass = 'text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 block'

  return (
    <AnimatePresence>
      {createAdminModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-white dark:bg-accent-dark border border-neutral-200 dark:border-border-dark overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-neutral-200 dark:border-border-dark">
              <div>
                <h2 className="text-base font-semibold text-neutral-900 dark:text-text-dark">
                  {item ? 'Update Admin' : 'Create Admin'}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {item ? 'Edit account details and role' : 'Add a new admin or supporter to the workspace'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-border-dark hover:text-neutral-900 dark:hover:text-text-dark transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              {/* Role toggle */}
              <div>
                <p className={labelClass}>Role</p>
                <div className="grid grid-cols-2 gap-2">
                  {(['ADMIN', 'SUPPORTER'] as Role[]).map((r) => {
                    const active = inputs?.role === r
                    const Icon = r === 'ADMIN' ? Shield : User
                    return (
                      <button
                        key={r}
                        onClick={() => setForm({ role: r })}
                        className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium border transition-colors cursor-pointer ${
                          active
                            ? 'bg-neutral-900 dark:bg-primary-dark text-white dark:text-neutral-900 border-neutral-900 dark:border-primary-dark'
                            : 'bg-white dark:bg-bg-dark text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-border-dark hover:border-neutral-400 dark:hover:border-neutral-500'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {r === 'ADMIN' ? 'Admin' : 'Supporter'}
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  {inputs?.role === 'ADMIN'
                    ? 'Full access to the admin panel and all data.'
                    : 'Access to the supporter portal only.'}
                </p>
              </div>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input
                    name="firstName"
                    value={inputs?.firstName}
                    onChange={handleInput}
                    placeholder="Jane"
                    className={inputClass(errors.firstName)}
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input
                    name="lastName"
                    value={inputs?.lastName}
                    onChange={handleInput}
                    placeholder="Doe"
                    className={inputClass(errors.lastName)}
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={inputs?.email}
                  onChange={handleInput}
                  placeholder="jane@example.com"
                  className={inputClass(errors.email)}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-neutral-200 dark:border-border-dark bg-neutral-50 dark:bg-bg-dark/50">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-border-dark hover:bg-neutral-100 dark:hover:bg-border-dark transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium bg-neutral-900 dark:bg-primary-dark text-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {loading && (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 dark:border-neutral-900/30 border-t-white dark:border-t-neutral-900 rounded-full animate-spin" />
                )}
                {loading ? (item ? 'Updating...' : 'Creating...') : item ? 'Update Admin' : 'Create Admin'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
