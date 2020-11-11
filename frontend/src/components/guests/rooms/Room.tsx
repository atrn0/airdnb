import { Button, Container, Snackbar, Typography } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/authContext'
import { useGuestsRooms } from '../../../hooks/useGuestsRooms'
import { useGuestsReservations } from '../../../hooks/useGuestsReservations'
import { useCallback } from 'react'
import styled from 'styled-components'

const MarginButton = styled(Button)`
  margin-top: 20px;
`

const MarginDatePicker = styled(DatePicker)`
  margin-right: 20px;
`

const StyledImg = styled.img`
  display: block;
  width: 400px;
  height: 200px;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

export const GuestsRoomDetail: React.FC = () => {
  const { loggedInAsGuest } = useContext(AuthContext)
  const { roomId } = useParams<{ roomId: string }>()
  const { room, fetchRoom } = useGuestsRooms()
  const history = useHistory()
  const [checkIn, setCheckIn] = useState(dayjs())
  const [checkOut, setCheckOut] = useState(dayjs().add(1, 'day'))
  const { createReservation } = useGuestsReservations()

  const [snackbarMsg, setSnackbarMsg] = useState('')

  const handleReservation = useCallback(async () => {
    try {
      const res = await createReservation({
        check_in: checkIn.toISOString(),
        check_out: checkOut.toISOString(),
        room_id: roomId,
      })
      setSnackbarMsg(
        `${res.room_name}を${dayjs(res.check_in).format('MM/DD')} - ${dayjs(
          res.check_out
        ).format('MM/DD')}で予約しました。`
      )
    } catch (err) {
      setSnackbarMsg('予約できませんでした。')
    }
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
      <Container maxWidth="xs">
        <StyledImg
          src={`https://picsum.photos/seed/${room.id}/400/200?blur`}
          alt=""
        />
        <Typography variant="h4">{room.name}</Typography>
        <Typography variant="body1">
          ¥{room.price}/泊 (合計¥{checkOut.diff(checkIn, 'day') * room.price})
        </Typography>
        <div>
          <MarginDatePicker
            disablePast
            maxDate={checkOut.subtract(1, 'day')}
            variant="inline"
            label="チェックイン"
            value={checkIn}
            onChange={setCheckIn}
          />
          <MarginDatePicker
            disablePast
            minDate={checkIn.add(1, 'day')}
            variant="inline"
            label="チェックアウト"
            value={checkOut}
            onChange={setCheckOut}
          />
        </div>
        <MarginButton
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleReservation}
        >
          予約する
        </MarginButton>
      </Container>
      <Snackbar
        open={snackbarMsg !== ''}
        autoHideDuration={3000}
        message={snackbarMsg}
        onClose={() => setSnackbarMsg('')}
      />
    </>
  )
}
