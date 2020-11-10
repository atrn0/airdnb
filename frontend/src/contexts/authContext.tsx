import React from 'react'
import { useGuest } from '../hooks/useGuest'
import { useHost } from '../hooks/useHost'

type AuthInfo = {
  guestId?: string
  loginAsGuest?: (guestId: string) => void
  loggedInAsGuest?: () => boolean
  hostId?: string
  loginAsHost?: (hostId: string) => void
  loggedInAsHost?: () => boolean
}

export const AuthContext = React.createContext<AuthInfo>({})

export const AuthProvider: React.FC = (props) => {
  const { guestId, loginAsGuest, loggedInAsGuest } = useGuest()
  const { hostId, loginAsHost } = useHost()

  return (
    <AuthContext.Provider
      value={{
        guestId,
        loginAsGuest,
        hostId,
        loginAsHost,
        loggedInAsGuest
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
