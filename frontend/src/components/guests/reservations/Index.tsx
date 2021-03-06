import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../contexts/authContext'
import { useGuestsReservations } from '../../../hooks/useGuestsReservations'

export const GuestsReservations: React.FC = () => {
  const { loggedInAsGuest } = useContext(AuthContext)
  const { reservations, fetchReservations } = useGuestsReservations()

  useEffect(() => {
    if (loggedInAsGuest) {
      fetchReservations()
    }
  }, [fetchReservations, loggedInAsGuest])

  return (
    <>
      <Typography variant="h5">予約一覧</Typography>
      <List>
        {reservations
          .filter((r) => {
            return dayjs(r.check_out).isAfter(dayjs())
          })
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
