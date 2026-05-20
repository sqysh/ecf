import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { store, useUiSelector } from '@/app/lib/store/store'
import { setIsLoading, setIsNotLoading } from '@/app/lib/store/slices/uiSlice'
import { showToast } from '@/app/lib/store/slices/toastSlice'

const LogoutButton = () => {
  const { isLoading } = useUiSelector()

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      store.dispatch(setIsLoading())
      await signOut({ redirectTo: '/login' })
    } catch (error: unknown) {
      store.dispatch(
        showToast({
          type: 'error',
          message: 'Logout Fail',
          description: error instanceof Error ? error.message : 'An error occurred'
        })
      )
    } finally {
      store.dispatch(setIsNotLoading())
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="relative p-2 bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark hover:border-secondary-light dark:hover:border-secondary-dark transition-colors group"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-secondary-light dark:border-secondary-dark border-t-transparent animate-spin" />
      ) : (
        <LogOut className="w-5 h-5 text-text-light/60 dark:text-text-dark/60 group-hover:text-secondary-light dark:group-hover:text-secondary-dark transition-colors" />
      )}
    </button>
  )
}

export default LogoutButton
