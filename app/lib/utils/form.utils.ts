export type TUserName = {
  firstName: string
  lastName: string
}

export function validateNameForm(inputs: TUserName, setErrors: (arg0: Partial<TUserName>) => void): boolean {
  const newErrors: Partial<TUserName> = {}
  if (!inputs?.firstName?.trim()) newErrors.firstName = 'First name is required'
  if (!inputs?.lastName?.trim()) newErrors.lastName = 'Last name is required'
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
