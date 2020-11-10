import { List, ListItem, Typography } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import dayjs from 'dayjs'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../contexts/authContext'
import { useHostsReservations } from '../../../hooks/useHostsReservations'

export const HostsReservations: React.FC = () => {
  const { reservations, fetchReservations } = useHostsReservations()
  const { loggedInAsHost } = useContext(AuthContext)

  useEffect(() => {
    if (loggedInAsHost()) {
      fetchReservations()
    }
  }, [fetchReservations, loggedInAsHost])

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
                <div>
                  <ListItemText primary={r.guest_name} />
                  <Typography variant="body2">{`room: ${r.room_name}`}</Typography>
                  <Typography variant="body2">{term}</Typography>
                </div>
              </ListItem>
            )
          })}
      </List>
    </>
  )
}
