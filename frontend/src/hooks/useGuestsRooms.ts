import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../contexts/authContext'
import { GuestsRoom, GuestsRoomsApi } from '../gen/openapi/api'

const api = (token: string) =>
  new GuestsRoomsApi({ basePath: 'http://localhost:8080', accessToken: token })

export const useGuestsRoooms = () => {
  const [rooms, setRooms] = useState<GuestsRoom[]>([])
  const { guestId } = useContext(AuthContext)

  const fetchRooms = useCallback(async () => {
    const res = await api(guestId).guestsGetRooms()
    setRooms(res.data.rooms)
  }, [guestId])

  return { rooms, fetchRooms }
}
