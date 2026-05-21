'use client'

import { IPaymentMethod } from '@/types/entities/payment-method'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Plus } from 'lucide-react'
import { RadioGroup, SelectableCard } from '../../ui/forms/RadioGroup'

type Props = {
  savedCards: IPaymentMethod[]
  selectedCardId: string | null
  useNewCard: boolean
  onSelectCard: (stripePaymentId: string) => void
  onUseNewCard: () => void
  onUseSavedCard: () => void
}

export function SavedCardSelector({
  savedCards,
  selectedCardId,
  useNewCard,
  onSelectCard,
  onUseNewCard,
  onUseSavedCard
}: Props) {
  const reduceMotion = useReducedMotion()

  if (!savedCards?.length) return null

  const values = savedCards.map((c) => c.stripePaymentId)

  return (
    <div>
      <p
        id="saved-card-label"
        className="block font-mono text-[10px] tracking-[0.14em] uppercase font-bold mb-3 text-text-light/80 dark:text-text-dark/80"
      >
        Payment Method
      </p>

      {!useNewCard ? (
        <div className="space-y-2">
          <RadioGroup
            label="Saved payment methods"
            values={values}
            selectedValue={selectedCardId ?? ''}
            onChange={onSelectCard}
            orientation="vertical"
            className="space-y-2"
          >
            {savedCards.map((card) => {
              const isSelected = selectedCardId === card.stripePaymentId

              return (
                <SelectableCard
                  key={card.stripePaymentId}
                  id={card.stripePaymentId}
                  ariaLabel={`${card.cardBrand} ending in ${card.cardLast4}, ${card.cardholderName}, expires ${String(card.cardExpMonth).padStart(2, '0')}/${card.cardExpYear}${card.isDefault ? ', default card' : ''}`}
                  className="py-3 px-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Selection indicator — decorative; aria-checked on the
                          parent SelectableCard carries the semantic. */}
                      <div
                        aria-hidden="true"
                        className={`w-4 h-4 shrink-0 border flex items-center justify-center transition-colors duration-150 ${
                          isSelected
                            ? 'border-secondary-light dark:border-primary-dark'
                            : 'border-neutral-300 dark:border-border-dark'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={reduceMotion ? false : { scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-secondary-light dark:bg-primary-dark"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-mono text-sm font-bold text-text-light dark:text-text-dark capitalize truncate">
                          {card.cardBrand} •••• {card.cardLast4}
                        </p>
                        <p className="font-mono text-[10px] tracking-wide text-text-light/70 dark:text-text-dark/65 mt-0.5">
                          {card.cardholderName} · Expires {String(card.cardExpMonth).padStart(2, '0')}/
                          {card.cardExpYear}
                        </p>
                      </div>
                    </div>

                    {card.isDefault && (
                      <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border border-secondary-light/60 dark:border-secondary-dark/60 text-secondary-light dark:text-secondary-dark bg-secondary-light/10 dark:bg-secondary-dark/10 shrink-0">
                        Default
                      </span>
                    )}
                  </div>
                </SelectableCard>
              )
            })}
          </RadioGroup>

          <button
            type="button"
            onClick={onUseNewCard}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 font-mono text-[10px] tracking-widest uppercase font-bold border border-dashed border-neutral-300 dark:border-border-dark text-text-light/75 dark:text-text-dark/70 hover:text-text-light dark:hover:text-text-dark hover:border-text-light/40 dark:hover:border-text-dark/40 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark min-h-11"
          >
            <Plus size={13} strokeWidth={2} aria-hidden="true" />
            Use a different card
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onUseSavedCard}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase font-bold text-secondary-light dark:text-secondary-dark underline underline-offset-2 hover:no-underline transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
        >
          <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
          Use a saved card
        </button>
      )}
    </div>
  )
}
