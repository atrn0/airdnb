import React from 'react'
import { useGuest } from '../hooks/useGuest'
import { useHost } from '../hooks/useHost'

type AuthInfo = {
  getGuestId?: () => string
  loginAsGuest?: (guestId: string) => void
  loggedInAsGuest?: () => boolean
  logoutGuest?: () => void
  getHostId?: () => string
  loginAsHost?: (hostId: string) => void
  loggedInAsHost?: () => boolean
  logoutHost?: () => void
}

export const AuthContext = React.createContext<AuthInfo>({})

export const AuthProvider: React.FC = (props) => {
  const { getGuestId, loginAsGuest, loggedInAsGuest, logoutGuest } = useGuest()
  const { getHostId, loginAsHost, loggedInAsHost, logoutHost } = useHost()

  return (
    <AuthContext.Provider
      value={{
        getGuestId,
        loginAsGuest,
        loggedInAsGuest,
        logoutGuest,
        getHostId,
        loginAsHost,
        loggedInAsHost,
        logoutHost,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
