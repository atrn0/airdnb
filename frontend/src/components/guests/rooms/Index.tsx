import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../../contexts/authContext'
import { useGuestsRoooms } from '../../../hooks/useGuestsRooms'

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

  return (
    <>
      <h1>Rooms</h1>
      <ul>
        {rooms.map((room) => {
          return (
            <li key={room.id}>
              <Link to={`/guests/rooms/${room.id}`}>{room.name}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
