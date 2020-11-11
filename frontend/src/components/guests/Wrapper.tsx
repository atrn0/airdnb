import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'

export const GuestsWrapper: React.FC = (props) => {
  const { loggedInAsGuest, loggedInAsHost, logoutHost } = useContext(
    AuthContext
  )
  const history = useHistory()

  useEffect(() => {
    if (!loggedInAsGuest) {
      history.replace('/')
      return
    }
    if (loggedInAsHost) {
      logoutHost()
    }
  }, [history, loggedInAsGuest, loggedInAsHost, logoutHost])

  return <>{props.children}</>
}
