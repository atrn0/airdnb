import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FabProps,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core'
import { useHostsRooms } from '../../../hooks/useHostsRooms'
import { useEffect, useContext, useState, useCallback } from 'react'
import { AuthContext } from '../../../contexts/authContext'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { Add, Delete, Edit } from '@material-ui/icons'
import styled from 'styled-components'
import { HostsRoom } from '../../../gen/openapi'

const FloatingFab = styled((props: FabProps) => <Fab {...props} />)`
  position: absolute;
  right: 50px;
  bottom: 50px;
`

export const HostsRooms: React.FC = () => {
  const {
    rooms,
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
  } = useHostsRooms()
  const { getHostId } = useContext(AuthContext)
  const history = useHistory()
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [editingRoomId, setEditingRoomId] = useState('')
  const [newRoomName, setNewRoomName] = useState('')
  const [newRoomPrice, setNewRoomPrice] = useState(0)

  useEffect(() => {
    if (getHostId()) {
      fetchRooms()
    }
  }, [fetchRooms, getHostId, history])

  const handleDeleteRoom = useCallback(
    async (roomId: string) => {
      await deleteRoom(roomId)
      fetchRooms()
    },
    [deleteRoom, fetchRooms]
  )

  const handleOpenEditDialog = useCallback(async (room: HostsRoom) => {
    setEditingRoomId(room.id)
    setNewRoomName(room.name)
    setNewRoomPrice(room.price)
    setOpenEditDialog(true)
  }, [])

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4">Rooms</Typography>
        <List>
          {rooms
            ?.sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((room) => {
              return (
                <ListItem key={room.id}>
                  <ListItemText
                    primary={room.name}
                    secondary={`¥${room.price}/泊`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleOpenEditDialog(room)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteRoom(room.id)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
        </List>
        <FloatingFab
          color="primary"
          aria-label="add"
          variant="extended"
          size="medium"
          onClick={() => setOpenAddDialog(true)}
        >
          <Add />
          部屋を追加
        </FloatingFab>
      </Container>
      <Dialog
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false)
          setNewRoomName('')
          setNewRoomPrice(0)
        }}
      >
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
      <Dialog
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false)
          setNewRoomName('')
          setNewRoomPrice(0)
        }}
      >
        <DialogTitle>部屋を変更</DialogTitle>
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
              await updateRoom(editingRoomId, {
                name: newRoomName,
                price: newRoomPrice,
              })
              setEditingRoomId('')
              setOpenEditDialog(false)
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
