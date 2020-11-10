import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { useHostsRooms } from '../../../hooks/useHostsRooms'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../../../contexts/authContext'
import { useHistory } from 'react-router-dom'
import React from 'react'

export const HostsRooms: React.FC = () => {
  const { rooms, fetchRooms } = useHostsRooms()
  const { getHostId } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (getHostId()) {
      fetchRooms()
    }
  }, [fetchRooms, getHostId, history])

  return (
    <>
      <Typography variant="h4">Rooms</Typography>
      <List>
        {rooms?.map((room) => {
          return (
            <ListItem key={room.id}>
              <ListItemText
                primary={room.name}
                secondary={`¥${room.price}/泊`}
              />
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
