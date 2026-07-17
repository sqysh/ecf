'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { createFormActions } from '@/app/lib/store/slices/formSlice'
import { resetForm } from '@/app/lib/store/slices/formSlice'
import { store, useFormSelector } from '@/app/lib/store/store'
import { setOpenContactSubmissionSuccessModal } from '@/app/lib/store/slices/uiSlice'
import { validateContactSubmissionForm } from '@/app/lib/utils/form.utils'
import { showToast } from '@/app/lib/store/slices/toastSlice'
import { TextField } from '../../ui/forms/TextField'
import { RadioGroup, SelectableCard } from '../../ui/forms/RadioGroup'
import { SUBJECTS } from '@/app/lib/constants/form.constants'
import { TextArea } from '../../ui/forms/TextArea'
import { PrimaryButton } from '../../ui/buttons/PrimaryButton'
import { createContactSubmission } from '@/app/lib/actions/public/contact-submission/createContactSubmission'

const ContactForm = () => {
  const { handleInput, setErrors } = createFormActions('contactSubmissionForm', store.dispatch)
  const { forms } = useFormSelector()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const inputs = forms.contactSubmissionForm.inputs
  const errors = forms.contactSubmissionForm.errors

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateContactSubmissionForm(inputs, setErrors)) return

    try {
      setStatus('loading')

      await createContactSubmission({
        firstName: inputs?.firstName?.trim(),
        lastName: inputs?.lastName?.trim(),
        email: inputs?.email?.trim(),
        message: inputs?.message?.trim(),
        type: inputs.type,
        website: inputs.website
      })

      store.dispatch(showToast({ message: 'Successfully sent message' }))
      store.dispatch(setOpenContactSubmissionSuccessModal())
      store.dispatch(resetForm('contactSubmissionForm'))
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error: unknown) {
      store.dispatch(
        showToast({
          message: 'Failed to send message.',
          description: error instanceof Error ? error.message : 'An error occurred',
          type: 'error'
        })
      )
      setStatus('error')
    }
  }

  // Adapter so handleInput (which expects ChangeEvent<HTMLInputElement>) accepts
  // the radio group's plain-string onChange.
  const handleTypeChange = (newType: string) => {
    handleInput({
      target: { name: 'type', value: newType }
    } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-bg-light dark:bg-bg-dark">
      <h3 className="font-mono text-xl xs:text-2xl font-bold tracking-tight text-text-light dark:text-text-dark mb-6">
        Leave a Message
      </h3>

      <div className="space-y-5">
        {/* Name row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <input
            type="text"
            name="website" // tempting name for bots
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0
            }}
            value={inputs.website || ''}
            onChange={handleInput}
          />
          <TextField
            id="contact-firstName"
            name="firstName"
            label="First name"
            value={inputs.firstName ?? ''}
            onChange={handleInput}
            placeholder="Maria"
            autoComplete="given-name"
            required
            error={errors.firstName}
            disabled={status === 'loading' || status === 'success'}
          />
          <TextField
            id="contact-lastName"
            name="lastName"
            label="Last name"
            value={inputs.lastName ?? ''}
            onChange={handleInput}
            placeholder="Santos"
            autoComplete="family-name"
            required
            error={errors.lastName}
            disabled={status === 'loading' || status === 'success'}
          />
        </div>

        {/* Email */}
        <TextField
          id="contact-email"
          name="email"
          label="Email address"
          type="email"
          value={inputs.email ?? ''}
          onChange={handleInput}
          placeholder="you@example.com"
          autoComplete="email"
          required
          error={errors.email}
          disabled={status === 'loading' || status === 'success'}
        />

        {/* Subject — radio group */}
        <div>
          <p className="block font-mono text-[10px] tracking-[0.14em] uppercase font-bold mb-1.5 text-text-light/80 dark:text-text-dark/80">
            What&apos;s this about?
            <span aria-hidden="true" className="ml-0.5">
              *
            </span>
          </p>
          <RadioGroup
            label="What's this about?"
            values={SUBJECTS}
            selectedValue={inputs.type ?? ''}
            onChange={handleTypeChange}
            orientation="vertical"
            className="space-y-2"
          >
            {SUBJECTS.map((type) => (
              <SelectableCard key={type} id={type} ariaLabel={type} className="px-3.5 py-3">
                <span className="font-mono text-sm text-text-light dark:text-text-dark">{type}</span>
              </SelectableCard>
            ))}
          </RadioGroup>
          {errors.type && (
            <p
              id="contact-type-error"
              role="alert"
              className="font-mono text-[11px] mt-1.5 tracking-wide font-bold text-red-700 dark:text-red-400"
            >
              {errors.type}
            </p>
          )}
        </div>

        {/* Message */}
        <TextArea
          id="contact-message"
          name="message"
          label="Message"
          value={inputs.message ?? ''}
          onChange={handleInput}
          placeholder="Tell us how we can help..."
          required
          rows={7}
          error={errors.message}
          disabled={status === 'loading' || status === 'success'}
        />

        {/* Submit */}
        <div>
          <PrimaryButton
            type="submit"
            loading={status === 'loading'}
            disabled={status === 'success'}
            loadingLabel="Sending..."
            trailingIcon={status === 'success' ? CheckCircle2 : ArrowRight}
            aria-label="Send your message"
          >
            {status === 'success' ? 'Message Sent' : 'Send Message'}
          </PrimaryButton>

          {status === 'success' && (
            <motion.p
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 font-mono text-[11px] text-secondary-light dark:text-secondary-dark tracking-wide font-bold"
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
