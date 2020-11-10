import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../../contexts/authContext'
import { useGuestsReservations } from '../../../hooks/useGuestsReservations'

export const GuestsReservations: React.FC = () => {
  const { getGuestId, loggedInAsGuest } = useContext(AuthContext)
  const { reservations, fetchReservations } = useGuestsReservations()
  const history = useHistory()

  useEffect(() => {
    if (!loggedInAsGuest()) {
      history.replace('/')
      return
    }
    if (getGuestId()) {
      fetchReservations()
    }
  }, [fetchReservations, getGuestId, history, loggedInAsGuest])

  return (
    <>
      <Typography variant="h5">予約一覧</Typography>
      <List>
        {reservations
          .sort((a, b) => (a.check_in > b.check_in ? 1 : -1))
          .map((r, i) => {
            const term = `${dayjs(r.check_in).format('YYYY/MM/DD')} - ${dayjs(
              r.check_out
            ).format('YYYY/MM/DD')}`

            return (
              <ListItem key={i}>
                <ListItemText primary={r.room_name} secondary={term} />
              </ListItem>
            )
          })}
      </List>
    </>
  )
}
