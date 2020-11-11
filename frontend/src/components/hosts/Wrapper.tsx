import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'

export const HostsWrapper: React.FC = (props) => {
  const { loggedInAsGuest, loggedInAsHost, logoutGuest } = useContext(
    AuthContext
  )
  const history = useHistory()

  useEffect(() => {
    if (!loggedInAsHost) {
      history.replace('/')
      return
    }
    if (loggedInAsGuest) {
      logoutGuest()
    }
  }, [history, loggedInAsGuest, loggedInAsHost, logoutGuest])
  return <>{props.children}</>
}
