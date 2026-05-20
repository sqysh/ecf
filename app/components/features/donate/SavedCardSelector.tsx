import { IPaymentMethod } from '@/types/entities/payment-method'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus } from 'lucide-react'

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
  if (!savedCards?.length) return null

  return (
    <div>
      <label className="block font-mono text-[10px] tracking-[0.14em] uppercase mb-3 text-text-light/45 dark:text-text-dark/40">
        Payment Method
      </label>

      {!useNewCard ? (
        <div className="space-y-2">
          {savedCards.map((card) => {
            const isSelected = selectedCardId === card.stripePaymentId

            return (
              <motion.button
                key={card.stripePaymentId}
                type="button"
                onClick={() => onSelectCard(card.stripePaymentId)}
                aria-pressed={isSelected}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.15 }}
                className={`w-full py-3 px-4 border text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark ${
                  isSelected
                    ? 'border-primary-light dark:border-primary-dark bg-primary-light/6 dark:bg-primary-dark/6'
                    : 'border-border-subtle dark:border-border-dark bg-transparent hover:border-text-light/20 dark:hover:border-text-dark/20'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Selection indicator */}
                    <div
                      aria-hidden="true"
                      className={`w-4 h-4 shrink-0 border flex items-center justify-center transition-colors duration-150 ${
                        isSelected
                          ? 'border-primary-light dark:border-primary-dark'
                          : 'border-border-subtle dark:border-border-dark'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-primary-light dark:bg-primary-dark"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-mono text-sm font-bold text-text-light dark:text-text-dark capitalize truncate">
                        {card.cardBrand} •••• {card.cardLast4}
                      </p>
                      <p className="font-mono text-[10px] tracking-wide text-text-light/40 dark:text-text-dark/35 mt-0.5">
                        {card.cardholderName} · Expires {String(card.cardExpMonth).padStart(2, '0')}/{card.cardExpYear}
                      </p>
                    </div>
                  </div>

                  {card.isDefault && (
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border border-primary-light/30 dark:border-primary-dark/30 text-primary-light dark:text-primary-dark bg-primary-light/6 dark:bg-primary-dark/6 shrink-0">
                      Default
                    </span>
                  )}
                </div>
              </motion.button>
            )
          })}

          <button
            type="button"
            onClick={onUseNewCard}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 font-mono text-[10px] tracking-widest uppercase border border-dashed border-border-subtle dark:border-border-dark text-text-light/40 dark:text-text-dark/35 hover:text-text-light dark:hover:text-text-dark hover:border-text-light/25 dark:hover:border-text-dark/25 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-11"
          >
            <Plus size={13} strokeWidth={2} aria-hidden="true" />
            Use a different card
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onUseSavedCard}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-text-light/40 dark:text-text-dark/35 hover:text-text-light dark:hover:text-text-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
        >
          <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
          Use a saved card
        </button>
      )}
    </div>
  )
}
