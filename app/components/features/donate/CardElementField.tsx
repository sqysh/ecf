import { FormName, setInputs } from '@/app/lib/store/slices/formSlice'
import { store, useUiSelector } from '@/app/lib/store/store'
import { CardElement } from '@stripe/react-stripe-js'
import { inputClass } from '../../ui/forms/FormField'

export function CardElementField({ formName }: { formName: FormName }) {
  const { isDark } = useUiSelector()

  return (
    <div role="group" aria-labelledby="card-label" className={inputClass}>
      <CardElement
        onChange={(e) =>
          store.dispatch(
            setInputs({
              formName,
              data: { cardComplete: e.complete, error: e.error?.message ?? null }
            })
          )
        }
        options={{
          style: {
            base: {
              color: isDark ? '#ffffff' : '#171717',
              backgroundColor: 'transparent',
              fontSize: '14px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              '::placeholder': { color: isDark ? '#525252' : '#a3a3a3' }
            },
            invalid: { color: '#ef4444' }
          }
        }}
      />
    </div>
  )
}
