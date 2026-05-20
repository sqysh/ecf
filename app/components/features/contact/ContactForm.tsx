'use client'

import RightArrow from '@/public/svg/RightArrow'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createFormActions, Errors, Inputs, resetForm } from '@/app/lib/store/slices/formSlice'
import { store, useFormSelector } from '@/app/lib/store/store'
import { useState } from 'react'
import { showToast } from '@/app/lib/store/slices/toastSlice'
import { setOpenContactSubmissionSuccessModal } from '@/app/lib/store/slices/uiSlice'
import { EMAIL_REGEX } from '@/app/lib/regex'
import { createContactSubmission } from '@/app/lib/actions/contact-submission/createContactSubmission'

const subjects = ['Support', 'Partner', 'Sponsor', 'Other']

const validateContactSubmissionForm = (inputs: Inputs, setErrors: (errors: Errors) => void) => {
  const newErrors: Record<string, string> = {}

  if (!inputs.firstName.trim()) newErrors.firstName = 'First name is required'
  if (!inputs.lastName.trim()) newErrors.lastName = 'Last name is required'
  if (!inputs.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!EMAIL_REGEX.test(inputs.email)) {
    newErrors.email = 'Invalid email address'
  }
  if (!inputs.message.trim()) newErrors.message = 'Message is required'

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const ContactForm = () => {
  const { handleInput, setErrors } = createFormActions('contactSubmissionForm', store.dispatch)
  const { forms } = useFormSelector()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const inputs = forms.contactSubmissionForm.inputs
  const errors = forms.contactSubmissionForm.errors
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateContactSubmissionForm(inputs, setErrors)) return

    try {
      setStatus('loading')

      await createContactSubmission({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        message: inputs.message,
        type: inputs.type,
        status: 'NEW'
      })

      router.refresh()
      store.dispatch(showToast({ message: 'Successfully sent message' }))
      store.dispatch(setOpenContactSubmissionSuccessModal())
      store.dispatch(resetForm('contactSubmissionForm'))
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error: unknown) {
      store.dispatch(
        showToast({
          message: 'Failed message.',
          description: error instanceof Error ? error.message : 'An error occurred',
          type: 'error'
        })
      )
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-bg-light dark:bg-bg-dark p-0">
      <h3 className="font-mono text-[22px] font-medium tracking-tight text-text-light dark:text-text-dark mb-6">
        Leave a Message
      </h3>

      <div className="space-y-3">
        {/* Name row */}
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex flex-col w-full">
            <input
              type="text"
              name="firstName"
              value={inputs.firstName || ''}
              onChange={handleInput}
              className={`w-full px-3.5 py-3 bg-accent dark:bg-accent-dark border ${
                errors.firstName ? 'border-red-500' : 'border-transparent'
              } rounded-none font-mono text-sm text-text-light dark:text-text-dark placeholder-text-light/30 dark:placeholder-text-dark/30 focus:outline-none focus:border-secondary-light dark:focus:border-secondary-dark transition-colors duration-150`}
              placeholder="First name*"
            />
            {errors.firstName && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-mono"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.firstName}
              </motion.p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              name="lastName"
              value={inputs.lastName}
              onChange={handleInput}
              className={`w-full px-3.5 py-3 bg-accent dark:bg-accent-dark border ${
                errors.lastName ? 'border-red-500' : 'border-transparent'
              } rounded-none font-mono text-sm text-text-light dark:text-text-dark placeholder-text-light/30 dark:placeholder-text-dark/30 focus:outline-none focus:border-secondary-light dark:focus:border-secondary-dark transition-colors duration-150`}
              placeholder="Last name*"
            />
            {errors.lastName && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-mono"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.lastName}
              </motion.p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInput}
            className={`w-full px-3.5 py-3 bg-accent dark:bg-accent-dark border ${
              errors.email ? 'border-red-500' : 'border-transparent'
            } rounded-none font-mono text-sm text-text-light dark:text-text-dark placeholder-text-light/30 dark:placeholder-text-dark/30 focus:outline-none focus:border-secondary-light dark:focus:border-secondary-dark transition-colors duration-150`}
            placeholder="Email*"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-mono"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Subject radios */}
        <div>
          <div className="space-y-1.5">
            {subjects.map((type) => (
              <label
                key={type}
                className={`flex items-center gap-3 px-3.5 py-3 bg-accent dark:bg-accent-dark border cursor-pointer transition-colors duration-150 group ${
                  inputs.type === type
                    ? 'border-secondary-light dark:border-secondary-dark'
                    : 'border-transparent hover:border-secondary-light/50 dark:hover:border-secondary-dark/50'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={inputs.type === type}
                  onChange={handleInput}
                  className="sr-only"
                />
                <div className="relative shrink-0">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      inputs.type === type
                        ? 'border-secondary-light dark:border-secondary-dark'
                        : 'border-text-light/20 dark:border-text-dark/20 group-hover:border-secondary-light/60 dark:group-hover:border-secondary-dark/60'
                    }`}
                  />
                  {inputs.type === type && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 m-1 rounded-full bg-secondary-light dark:bg-secondary-dark"
                    />
                  )}
                </div>
                <span className="font-mono text-sm text-text-light dark:text-text-dark">{type}</span>
              </label>
            ))}
          </div>
          {errors.type && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-mono"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.type}
            </motion.p>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            name="message"
            value={inputs.message}
            onChange={handleInput}
            rows={7}
            className={`w-full px-3.5 py-3 bg-accent dark:bg-accent-dark border ${
              errors.message ? 'border-red-500' : 'border-transparent'
            } rounded-none font-mono text-sm text-text-light dark:text-text-dark placeholder-text-light/30 dark:placeholder-text-dark/30 focus:outline-none focus:border-secondary-light dark:focus:border-secondary-dark transition-colors duration-150 resize-none`}
            placeholder="Tell us how we can help..."
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-mono"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.message}
            </motion.p>
          )}
        </div>

        {/* Submit */}
        <div>
          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-medium transition-opacity duration-150 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer rounded-none ${
              status === 'success'
                ? 'bg-green-700 text-green-100'
                : 'bg-primary-light dark:bg-primary-dark text-text-light hover:opacity-85'
            }`}
          >
            {status === 'loading' && (
              <>
                <div className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Sending...
              </>
            )}
            {status === 'success' && (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Message Sent
              </>
            )}
            {status === 'idle' && (
              <>
                Send Message
                <RightArrow />
              </>
            )}
          </motion.button>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 font-mono text-xs text-green-600 dark:text-green-400 tracking-wide"
            >
              {"// thank you — we'll get back to you soon."}
            </motion.p>
          )}
        </div>
      </div>
    </form>
  )
}

export default ContactForm
