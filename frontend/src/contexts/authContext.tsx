import React from 'react'
import { useGuest } from '../hooks/useGuest'
import { useHost } from '../hooks/useHost'

type AuthInfo = {
  getGuestId?: () => string
  loginAsGuest?: (guestId: string) => void
  loggedInAsGuest?: () => boolean
  logoutGuest?: () => void
  hostId?: string
  loginAsHost?: (hostId: string) => void
  loggedInAsHost?: () => boolean
}

export const AuthContext = React.createContext<AuthInfo>({})

export const AuthProvider: React.FC = (props) => {
  const { getGuestId, loginAsGuest, loggedInAsGuest, logoutGuest } = useGuest()
  const { hostId, loginAsHost } = useHost()

  return (
    <AuthContext.Provider
      value={{
        getGuestId,
        loginAsGuest,
        loggedInAsGuest,
        logoutGuest,
        hostId,
        loginAsHost,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
