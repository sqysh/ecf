import { MONTHLY_PLANS, ONE_TIME_PLANS, YEARLY_PLANS } from '../constants/donate.constants'
import { setInputs } from '../store/slices/formSlice'
import { store } from '../store/store'

export type TGetDonateCheckoutAmount = {
  selectedPlan: string | string[]
  donationType: string
  amount: { toString: () => string }
}

export const getDonateCheckoutAmount = (inputs: TGetDonateCheckoutAmount) => {
  // If a preset plan is selected, get its amount
  if (inputs?.selectedPlan && !inputs?.selectedPlan.includes('custom')) {
    const plans =
      inputs?.donationType === 'monthly'
        ? MONTHLY_PLANS
        : inputs?.donationType === 'once'
          ? ONE_TIME_PLANS
          : YEARLY_PLANS
    return plans.find((p) => p.id === inputs?.selectedPlan)?.amount || 0
  }

  // Otherwise use the amount input (for one-time or custom recurring)
  return parseFloat(inputs?.amount?.toString()) || 0
}

export const setDonateCheckoutForm = (data: Record<string, any>) =>
  store.dispatch(setInputs({ formName: 'donateCheckoutForm', data }))
