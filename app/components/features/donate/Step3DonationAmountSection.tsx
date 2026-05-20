import { MONTHLY_PLANS, ONE_TIME_PLANS, YEARLY_PLANS } from '@/app/lib/constants/donate.constants'
import { DonationTypeSelection } from './DonationTypeSelection'
import { Plan, PlansGrid } from './PlansGrid'
import { setDonateCheckoutForm as setForm } from '@/app/lib/utils/donate.utils'

const planMap: Record<'once' | 'monthly' | 'yearly', { plans: Plan[]; customId: string }> = {
  once: { plans: ONE_TIME_PLANS, customId: 'once-custom' },
  monthly: { plans: MONTHLY_PLANS, customId: 'monthly-custom' },
  yearly: { plans: YEARLY_PLANS, customId: 'yearly-custom' }
}

export function Step3DonationAmountSection({ inputs }: any) {
  const { plans, customId } = planMap[inputs?.donationType as 'once' | 'monthly' | 'yearly'] ?? planMap.once

  return (
    <div>
      <DonationTypeSelection
        donationType={inputs?.donationType}
        setDonationType={(value) => setForm({ donationType: value })}
        setSelectedPlan={(value) => setForm({ selectedPlan: value })}
      />
      <PlansGrid
        plans={plans}
        customId={customId}
        selectedPlan={inputs?.selectedPlan}
        setSelectedPlan={(value) => setForm({ selectedPlan: value })}
        amount={inputs?.amount}
        setAmount={(value) => setForm({ amount: value })}
      />
    </div>
  )
}
