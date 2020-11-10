import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../contexts/authContext'
import { GuestsRoom, GuestsRoomsApi } from '../gen/openapi/api'
import { config } from '../config'

const api = (token: string) =>
  new GuestsRoomsApi({ basePath: config.apiBasePath, accessToken: token })

export const useGuestsRooms = () => {
  const [rooms, setRooms] = useState<GuestsRoom[]>([])
  const [room, setRoom] = useState<GuestsRoom | null>()
  const { getGuestId } = useContext(AuthContext)

  const fetchRooms = useCallback(async () => {
    const res = await api(getGuestId()).guestsGetRooms()
    setRooms(res.data.rooms)
  }, [getGuestId])

  const fetchRoom = useCallback(
    async (roomId: string) => {
      const res = await api(getGuestId()).guestsGetRoom(roomId)
      setRoom(res.data)
    },
    [getGuestId]
  )

  return { rooms, fetchRooms, room, fetchRoom }
}
