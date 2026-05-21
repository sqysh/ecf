import { planMap } from '@/app/lib/constants/donate.constants'
import { DonationTypeSelection } from './DonationTypeSelection'
import { PlansGrid } from './PlansGrid'
import { setDonateCheckoutForm as setForm } from '@/app/lib/utils/donate.utils'

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
