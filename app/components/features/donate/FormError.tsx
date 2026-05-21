'use client'

import { FormName } from '@/app/lib/store/slices/formSlice'
import { useFormSelector } from '@/app/lib/store/store'
import { AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { InlineMessage } from '../../ui/feedback/InlineMessage'

type Props = {
  formName: FormName
}

export function FormError({ formName }: Props) {
  const { forms } = useFormSelector()
  const inputs = forms?.[formName]?.inputs
  const error = inputs?.error as string | undefined

  return (
    <AnimatePresence>{error && <InlineMessage key="error" type="error" message={error} icon={X} />}</AnimatePresence>
  )
}
