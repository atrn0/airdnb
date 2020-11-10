import { useGuest } from '../../hooks/useGuest'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const GuestRooms: React.FC = () => {
  const { guestId } = useGuest()
  const history = useHistory()

  useEffect(() => {
    if (guestId === '') {
      history.replace('/')
    }
  }, [guestId, history])

  return <></>
}
