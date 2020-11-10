import { List, ListItem, Typography } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
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
        {reservations.map((r, i) => {
          return (
            <ListItem key={i}>
              <ListItemText primary={r.guest_name} />
              <ListItemText primary="hoge" />
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
