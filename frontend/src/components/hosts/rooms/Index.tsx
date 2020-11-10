import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core'
import { useHostsRooms } from '../../../hooks/useHostsRooms'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/authContext'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { Add } from '@material-ui/icons'

export const HostsRooms: React.FC = () => {
  const { rooms, fetchRooms, createRoom } = useHostsRooms()
  const { getHostId } = useContext(AuthContext)
  const history = useHistory()
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [newRoomPrice, setNewRoomPrice] = useState(0)

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
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        size="medium"
        onClick={() => setOpenAddDialog(true)}
      >
        <Add />
        部屋を追加
      </Fab>
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>部屋を登録</DialogTitle>
        <DialogContent>
          <TextField
            label="name"
            value={newRoomName}
            onChange={(e) => {
              setNewRoomName(e.target.value)
            }}
          />
          <TextField
            label="price"
            value={newRoomPrice}
            onChange={(e) => {
              setNewRoomPrice(parseInt(e.target.value) || 0)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disabled={newRoomName === '' || newRoomPrice <= 0}
            onClick={async () => {
              await createRoom({ name: newRoomName, price: newRoomPrice })
              setNewRoomName('')
              setNewRoomPrice(0)
              setOpenAddDialog(false)
              fetchRooms()
            }}
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
