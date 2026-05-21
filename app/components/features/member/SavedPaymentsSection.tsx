import { CreditCard, Loader2, Plus, Trash2 } from 'lucide-react'
import { Section } from './Section'
import { GhostButton } from '../../ui/buttons/GhostButton'
import { motion, useReducedMotion } from 'framer-motion'
import { CardBrand } from './CardBrand'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { IPaymentMethod } from '@/types/entities/payment-method'
import { PrimaryButton } from '../../ui/buttons/PrimaryButton'

export function SavedPaymentsSection({
  payments,
  setModal,
  deletingPaymentMethod,
  handleDeletePaymentMethod
}: {
  payments: IPaymentMethod[]
  setModal: any
  deletingPaymentMethod: any
  handleDeletePaymentMethod: any
}) {
  const reduceMotion = useReducedMotion()
  return (
    <Section
      label="Saved payments"
      icon={CreditCard}
      custom={4}
      action={
        <GhostButton onClick={() => setModal('add-card')} aria-label="Add a new card">
          <Plus size={12} aria-hidden="true" /> Add card
        </GhostButton>
      }
    >
      {payments.length > 0 ? (
        <div className="border border-neutral-200 dark:border-border-dark divide-y divide-neutral-200 dark:divide-border-dark">
          {payments.map((card, i) => {
            const isDeleting = deletingPaymentMethod === card.id
            return (
              <motion.div
                key={card.id}
                custom={i}
                variants={reduceMotion ? undefined : fadeUp}
                initial={reduceMotion ? false : 'hidden'}
                animate="visible"
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors duration-150"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardBrand brand={card.cardBrand} />
                    <p className="font-mono text-sm text-text-light dark:text-text-dark">•••• {card.cardLast4}</p>
                    {card.isDefault && (
                      <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 border border-secondary-light/60 dark:border-primary-dark/60 text-secondary-light dark:text-primary-dark bg-secondary-light/10 dark:bg-primary-dark/10">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[10px] text-text-light/70 dark:text-text-dark/65 mt-0.5">
                    Expires {String(card.cardExpMonth).padStart(2, '0')}/{card.cardExpYear}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeletePaymentMethod(card.id)}
                  disabled={isDeleting}
                  aria-label={`Remove ${card.cardBrand} ending in ${card.cardLast4}`}
                  aria-busy={isDeleting}
                  className="shrink-0 p-1.5 text-text-light/75 dark:text-text-dark/70 hover:text-red-700 dark:hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 dark:focus-visible:outline-red-400 disabled:opacity-50 disabled:cursor-not-allowed min-h-9 min-w-9 flex items-center justify-center"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className={`w-3 h-3 ${reduceMotion ? '' : 'animate-spin'}`} aria-hidden="true" />
                      <span className="sr-only" role="status" aria-live="polite">
                        Removing card, please wait.
                      </span>
                    </>
                  ) : (
                    <Trash2 className="w-3 h-3" aria-hidden="true" />
                  )}
                </button>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="border border-neutral-200 dark:border-border-dark px-4 py-8 text-center">
          <CreditCard
            size={28}
            strokeWidth={1.5}
            aria-hidden="true"
            className="mx-auto mb-3 text-text-light/40 dark:text-text-dark/35"
          />
          <p className="font-mono text-[11px] text-text-light/75 dark:text-text-dark/70 tracking-wide mb-4">
            No saved cards
          </p>
          <PrimaryButton
            type="button"
            loading={false}
            onClick={() => setModal('add-card')}
            leadingIcon={Plus}
            aria-label="Add a card"
          >
            Add a card
          </PrimaryButton>
        </div>
      )}
    </Section>
  )
}
