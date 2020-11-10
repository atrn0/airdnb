import React from 'react'
import { useGuest } from '../hooks/useGuest'
import { useHost } from '../hooks/useHost'

type AuthHooks = {
  guestId: string
  loginAsGuest: (guestId: string) => void
  hostId: string
  loginAsHost: (hostId: string) => void
}

export const AuthContext = React.createContext<AuthHooks | null>(null)

export const AuthProvider: React.FC = (props) => {
  const { guestId, loginAsGuest } = useGuest()
  const { hostId, loginAsHost } = useHost()

  return (
    <AuthContext.Provider
      value={{
        guestId,
        loginAsGuest,
        hostId,
        loginAsHost,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
