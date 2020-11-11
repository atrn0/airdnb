import { Button } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/authContext'
import { useGuestsRooms } from '../../../hooks/useGuestsRooms'
import { useGuestsReservations } from '../../../hooks/useGuestsReservations'
import { useCallback } from 'react'

export const GuestsRoomDetail: React.FC = () => {
  const { loggedInAsGuest } = useContext(AuthContext)
  const { roomId } = useParams<{ roomId: string }>()
  const { room, fetchRoom } = useGuestsRooms()
  const history = useHistory()
  const [checkIn, setCheckIn] = useState(dayjs())
  const [checkOut, setCheckOut] = useState(dayjs())
  const { createReservation } = useGuestsReservations()

  const handleReservation = useCallback(() => {
    createReservation({
      check_in: checkIn.toISOString(),
      check_out: checkOut.toISOString(),
      room_id: roomId,
    })
  }, [checkIn, checkOut, createReservation, roomId])

  useEffect(() => {
    if (loggedInAsGuest) {
      fetchRoom(roomId)
    }
  }, [fetchRoom, history, loggedInAsGuest, roomId])

  if (!room) {
    return <p>loading...</p>
  }
  return (
    <>
      <h1>{room.name}</h1>
      <p>¥{room.price}/泊</p>

      <DatePicker
        variant="inline"
        label="チェックイン"
        value={checkIn}
        onChange={setCheckIn}
      />
      <DatePicker
        variant="inline"
        label="チェックアウト"
        value={checkOut}
        onChange={setCheckOut}
      />
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={handleReservation}
      >
        予約する
      </Button>
    </>
  )
}
