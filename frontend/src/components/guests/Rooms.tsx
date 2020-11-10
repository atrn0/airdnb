import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'

export const GuestRooms: React.FC = () => {
  const { guestId } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (guestId === '') {
      history.replace('/')
    }
  }, [guestId, history])

  return <></>
}
