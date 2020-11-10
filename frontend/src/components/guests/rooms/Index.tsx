import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../../contexts/authContext'
import { useGuestsRooms } from '../../../hooks/useGuestsRooms'

export const GuestsRooms: React.FC = () => {
  const { getGuestId } = useContext(AuthContext)
  const history = useHistory()

  const { rooms, fetchRooms } = useGuestsRooms()

  useEffect(() => {
    if (getGuestId()) {
      fetchRooms()
    }
  }, [fetchRooms, getGuestId, history])

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
