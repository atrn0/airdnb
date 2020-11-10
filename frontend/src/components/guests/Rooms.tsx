import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import { useGuestsRoooms } from '../../hooks/useGuestsRooms'

export const GuestRooms: React.FC = () => {
  const { guestId, loggedInAsGuest } = useContext(AuthContext)
  const history = useHistory()

  const { rooms, fetchRooms } = useGuestsRoooms()

  useEffect(() => {
    if (!loggedInAsGuest()) {
      history.replace('/')
      return
    }
    if (guestId) {
      fetchRooms()
    }
  }, [fetchRooms, guestId, history, loggedInAsGuest])

  return <>
    {rooms.map((room) => {
      return (<p key={room.id}>{room.name}</p>)
    })}
  </>
}
