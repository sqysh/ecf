export const initialContactSubmissionFormState = {
  firstName: '',
  lastName: '',
  email: '',
  type: 'Support',
  message: ''
}

export const initialCreateAdminFormState = {
  email: '',
  firstName: '',
  lastName: '',
  role: 'SUPPORTER'
}

export const initialPaymentMethodFormState = {
  stripePaymentId: '',

  cardholderName: '',

  cardBrand: '',

  cardLast4: '',

  cardExpMonth: 0,
  cardExpYear: 0,

  isDefault: false,

  userId: ''
}
