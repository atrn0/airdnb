import { Button } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/authContext'
import { useGuestsRooms } from '../../../hooks/useGuestsRooms'

export const GuestsRoom: React.FC = () => {
  const { loggedInAsGuest } = useContext(AuthContext)
  const { roomId } = useParams<{ roomId: string }>()
  const { room, fetchRoom } = useGuestsRooms()
  const history = useHistory()

  useEffect(() => {
    if (!loggedInAsGuest()) {
      history.replace('/')
      return
    }
    fetchRoom(roomId)
  }, [fetchRoom, history, loggedInAsGuest, roomId])

  if (!room) {
    return <p>loading...</p>
  }
  return (
    <>
      <h1>{room.name}</h1>
      <p>¥{room.price}/泊</p>
      <Button variant="contained" color="primary" disableElevation>予約する</Button>
    </>
  )
}
