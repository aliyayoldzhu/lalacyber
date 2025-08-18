import { useState } from 'react'
import { useAuth } from './useAuth'
import { AuthModal } from '@/components/AuthModal'

export function useAuthGuard() {
  const { user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [redirectTo, setRedirectTo] = useState<string>()

  const requireAuth = (action: () => void, redirect?: string) => {
    if (user) {
      action()
    } else {
      setRedirectTo(redirect || window.location.pathname)
      setShowAuthModal(true)
    }
  }

  const AuthGuard = () => (
    <AuthModal 
      open={showAuthModal} 
      onClose={() => setShowAuthModal(false)}
      redirectTo={redirectTo}
    />
  )

  return {
    requireAuth,
    AuthGuard
  }
}