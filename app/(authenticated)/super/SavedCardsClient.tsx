'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CreditCard, Trash2, Plus, ArrowLeft, AlertTriangle, Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Picture from '../ui/media/Picture'
import { useRouter } from 'next/navigation'
import { store } from '@/app/lib/store/store'
import { showToast } from '@/app/lib/store/slices/toastSlice'
import { IPaymentMethod } from '@/types/entities/payment-method'
import { deletePaymentMethod } from '@/app/lib/actions/deletePaymentMethod'
import { setDefaultPaymentMethod } from '@/app/lib/actions/setDefaultPaymentMethod'
import extractErrorMessage from '@/app/lib/utils/extractErrorMessage'
import LogoutButton from '../ui/buttons/LogoutButton'
import { setOpenPaymentMethodDrawer } from '@/app/lib/store/slices/uiSlice'
import LogoHorizontalDark from '@/public/svg/LogoHorizontalDark'

const brandColors = {
  visa: 'from-blue-600 to-blue-700',
  mastercard: 'from-red-600 to-orange-600',
  amex: 'from-purple-600 to-purple-700',
  discover: 'from-orange-600 to-yellow-600',
  default: 'from-neutral-600 to-neutral-700'
}

const getBrandColor = (brand: string) => {
  return brandColors[brand.toLowerCase() as keyof typeof brandColors] || brandColors.default
}

export default function SavedCardsClient({ cards }: { cards: { data: IPaymentMethod[] } }) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [settingDefault, setSettingDefault] = useState<string | null>(null)
  const session = useSession()
  const router = useRouter()

  const handleDelete = async (cardId: string) => {
    setDeleting(true)
    try {
      const res = await deletePaymentMethod(cardId)
      if (res.error) {
        store.dispatch(showToast({ message: res.error, type: 'error' }))
      } else {
        store.dispatch(showToast({ message: 'Payment method successfully deleted!' }))
        setDeleteId(null)
        router.refresh()
      }
    } catch (error) {
      store.dispatch(showToast({ message: 'Failed to delete payment method', type: 'error' }))
    } finally {
      setDeleting(false)
    }
  }

  const handleSetDefault = async (cardId: string) => {
    setSettingDefault(cardId)
    try {
      const result = await setDefaultPaymentMethod(cardId)

      if (result.success) {
        store.dispatch(
          showToast({
            type: 'success',
            message: 'Default payment method updated',
            description: 'Your default card has been changed successfully.'
          })
        )
        router.refresh()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      store.dispatch(
        showToast({
          type: 'error',
          message: 'Failed to update default',
          description: extractErrorMessage(error)
        })
      )
    } finally {
      setSettingDefault(null)
    }
  }

  return (
    <div className="min-h-screen bg-bg-accent dark:bg-bg-dark">
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-4 pt-6 md:pt-8 border-b border-border-light dark:border-border-dark">
        <div className="max-w-container mx-auto flex items-center justify-between gap-3">
          <Link
            href="/member/portal"
            className="inline-flex items-center space-x-1 text-secondary-light dark:text-secondary-dark hover:opacity-80 transition-opacity text-sm font-semibold shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Overview</span>
          </Link>
          <Link href="/">
            <div className="w-24 sm:w-32">
              <Picture
                src="/svg/logo-horizontal-light.svg"
                alt="Education Comes First"
                className="dark:hidden block w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                priority={true}
              />
              <LogoHorizontalDark />
            </div>
          </Link>
          {session.data?.user?.id && <LogoutButton />}
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-container mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-text-light dark:text-text-dark truncate">
                  Payment Methods
                </h1>
                <p className="text-text-light/60 dark:text-text-dark/60 mt-1 sm:mt-2 text-sm sm:text-lg">
                  Manage your saved cards securely
                </p>
              </div>
              <motion.button
                onClick={() => store.dispatch(setOpenPaymentMethodDrawer())}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-light dark:bg-primary-dark hover:opacity-90 text-text-light px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 shadow-sm"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Add Card</span>
                <span className="xs:hidden">Add</span>
              </motion.button>
            </div>
          </motion.div>

          {cards && cards?.data?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cards?.data?.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <div className="h-full bg-bg-light dark:bg-accent-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden hover:border-secondary-light/40 dark:hover:border-secondary-dark/40 transition-all shadow-sm hover:shadow-lg flex flex-col">
                    {/* Card Visual */}
                    <div
                      className={`bg-linear-to-br ${getBrandColor(card.cardBrand)} p-6 sm:p-8 text-white relative overflow-hidden flex-1 flex flex-col justify-between`}
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-10 sm:mb-16">
                          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                            {card.cardBrand}
                          </span>
                        </div>

                        <div className="mb-8 sm:mb-12">
                          <p className="text-xs opacity-70 mb-1.5 uppercase tracking-wide font-semibold">Card Number</p>
                          <p className="text-lg sm:text-2xl font-mono tracking-widest font-bold">
                            •••• •••• •••• {card.cardLast4}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs opacity-70 uppercase tracking-wide font-semibold mb-1">Expires</p>
                            <p className="text-base sm:text-lg font-semibold">
                              {String(card.cardExpMonth).padStart(2, '0')}/{card.cardExpYear}
                            </p>
                          </div>
                          {card.isDefault && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1.5 bg-white/25 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                            >
                              <Star className="w-3.5 h-3.5 fill-white" />
                              Default
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Info & Actions */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5 bg-accent dark:bg-accent-dark border-t border-border-light dark:border-border-dark flex flex-col gap-4">
                      <div>
                        <p className="text-xs font-semibold text-text-light/60 dark:text-text-dark/60 uppercase tracking-wide">
                          Cardholder Name
                        </p>
                        <p className="text-sm font-semibold text-text-light dark:text-text-dark mt-1">
                          {card.cardholderName || 'Not provided'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 relative">
                        {card.isDefault ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="flex items-center gap-1.5 bg-primary-light dark:bg-primary-dark text-text-light px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                            Default
                          </motion.div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSetDefault(card.id)}
                            disabled={settingDefault === card.id}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-border-light dark:border-border-dark hover:border-secondary-light dark:hover:border-secondary-dark text-text-light/60 dark:text-text-dark/60 hover:text-secondary-light dark:hover:text-secondary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1 min-w-0"
                          >
                            <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center shrink-0">
                              {settingDefault === card.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2 h-2 rounded-full bg-current"
                                />
                              )}
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wide truncate">
                              {settingDefault === card.id ? 'Setting...' : 'Make Default'}
                            </span>
                          </motion.button>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDeleteId(card.id)}
                          className="p-2.5 text-text-light/40 dark:text-text-dark/40 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 sm:py-24 px-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-text-light/40 dark:text-text-dark/40" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-text-light dark:text-text-dark mb-3">
                No Payment Methods
              </h3>
              <p className="text-text-light/60 dark:text-text-dark/60 mb-8 max-w-md mx-auto text-base sm:text-lg">
                Add a payment method to make donations faster and easier
              </p>
              <motion.button
                onClick={() => store.dispatch(setOpenPaymentMethodDrawer())}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-primary-light dark:bg-primary-dark hover:opacity-90 text-text-light font-bold rounded-lg transition-all shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Add Your First Card
              </motion.button>
            </motion.div>
          )}

          {/* Security Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 sm:mt-16 bg-secondary-light/5 dark:bg-secondary-dark/5 border border-secondary-light/20 dark:border-secondary-dark/20 rounded-2xl p-5 sm:p-8"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-secondary-light/10 dark:bg-secondary-dark/10 rounded-lg shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-light dark:text-secondary-dark"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-text-light dark:text-text-dark mb-1.5 sm:mb-2">
                  Your cards are secure
                </h3>
                <p className="text-xs sm:text-sm text-text-light/70 dark:text-text-dark/70 leading-relaxed">
                  We use industry-standard encryption and PCI compliance to protect your payment information. Your full
                  card number and security code are never stored on our servers. All transactions are securely processed
                  by Stripe.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-bg-light dark:bg-accent-dark rounded-2xl p-6 sm:p-8 w-full max-w-sm border border-border-light dark:border-border-dark shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-text-light dark:text-text-dark mb-3 text-center">
                Delete Payment Method?
              </h3>
              <p className="text-xs sm:text-sm text-text-light/60 dark:text-text-dark/60 mb-6 sm:mb-8 text-center leading-relaxed">
                This card will be permanently removed from your saved payment methods. You can add it again anytime.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-border-light dark:border-border-dark rounded-lg font-semibold text-text-light dark:text-text-dark hover:bg-accent dark:hover:bg-bg-dark transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteId && handleDelete(deleteId)}
                  disabled={deleting}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed text-sm"
                >
                  {deleting ? 'Deleting...' : 'Delete Card'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
