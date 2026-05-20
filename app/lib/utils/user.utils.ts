import { setInputs } from '../store/slices/formSlice'
import { store } from '../store/store'

export function fullName(first?: string | null, last?: string | null, fallback = '') {
  const n = `${first ?? ''} ${last ?? ''}`.trim()
  return n || fallback
}

export function initials(first?: string | null, last?: string | null, email?: string) {
  const f = first?.[0]?.toUpperCase() ?? ''
  const l = last?.[0]?.toUpperCase() ?? ''
  if (f || l) return `${f}${l}`
  return email?.[0]?.toUpperCase() ?? '?'
}

export const setCreateAdminForm = (data: Record<string, any>) =>
  store.dispatch(setInputs({ formName: 'createAdminForm', data }))
