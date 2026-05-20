export const ONE_TIME_PLANS = [
  {
    id: 'once_friend',
    name: 'Friend',
    amount: 25,
    description: 'Support a student',
    features: ['Thank you email', 'Tax receipt']
  },
  {
    id: 'once_supporter',
    name: 'Supporter',
    amount: 75,
    description: 'Fund educational materials',
    features: ['Thank you email', 'Tax receipt', 'Donor recognition (optional)']
  },
  {
    id: 'once_champion',
    name: 'Champion',
    amount: 150,
    description: 'Sponsor a workshop',
    features: ['Thank you email', 'Tax receipt', 'Donor recognition', 'Student success story'],
    highlighted: true
  },
  {
    id: 'once_hero',
    name: 'Hero',
    amount: 300,
    description: 'Provide tutoring for a semester',
    features: [
      'Thank you email',
      'Tax receipt',
      'Donor recognition',
      'Student success story',
      'Personal thank you call'
    ]
  },
  {
    id: 'once_benefactor',
    name: 'Benefactor',
    amount: 500,
    description: 'Transform a classroom',
    features: [
      'Thank you email',
      'Tax receipt',
      'Donor recognition',
      'Student success story',
      'Personal thank you call',
      'Special recognition on website'
    ]
  },
  {
    id: 'once-custom',
    name: 'Custom Amount',
    amount: 0,
    description: 'Choose your own amount'
  }
]

export const MONTHLY_PLANS = [
  {
    id: 'monthly_supporter',
    name: 'Supporter',
    amount: 25,
    description: 'Fund school supplies monthly',
    features: ['Monthly student updates', 'Donor recognition (optional)']
  },
  {
    id: 'monthly_champion',
    name: 'Champion',
    amount: 50,
    description: 'Support ongoing programs',
    features: ['Monthly student updates', 'Donor recognition', 'Exclusive program insights'],
    highlighted: true
  },
  {
    id: 'monthly_leader',
    name: 'Leader',
    amount: 100,
    description: 'Sponsor student mentorship',
    features: [
      'Monthly student updates',
      'Donor recognition',
      'Exclusive program insights',
      'Annual appreciation event'
    ]
  },
  {
    id: 'monthly_founder',
    name: 'Founder',
    amount: 250,
    description: 'Build educational futures',
    features: [
      'Monthly student updates',
      'Donor recognition',
      'Exclusive program insights',
      'Annual appreciation event',
      'Board meeting invitations',
      'Program naming opportunity'
    ]
  },
  { id: 'monthly-custom', name: 'Custom Amount', amount: 0, description: 'Choose your own amount' }
]

export const YEARLY_PLANS = [
  { id: 'yearly-300', name: 'Supporter', description: 'Annual support for educational programs', amount: 300 },
  { id: 'yearly-600', name: 'Champion', description: 'Sustained commitment to student success', amount: 600 },
  { id: 'yearly-1200', name: 'Hero', description: 'Major investment in education', amount: 1200 },
  { id: 'yearly-custom', name: 'Custom Amount', amount: 0, description: 'Choose your own amount' }
]
