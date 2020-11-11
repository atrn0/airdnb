import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../contexts/authContext'
import {
  HostsPostRoomsReq,
  HostsPutRoomsReq,
  HostsRoom,
  HostsRoomsApi,
} from '../gen/openapi/api'
import { config } from '../config'

const api = (token: string) =>
  new HostsRoomsApi({ basePath: config.apiBasePath, accessToken: token })

export const useHostsRooms = () => {
  const [rooms, setRooms] = useState<HostsRoom[]>([])
  const { getHostId } = useContext(AuthContext)

  const fetchRooms = useCallback(async () => {
    const res = await api(getHostId()).hostsGetRooms()
    setRooms(res.data.rooms)
  }, [getHostId])

  const createRoom = useCallback(
    async (req: HostsPostRoomsReq) => {
      await api(getHostId()).hostsPostRooms(req)
    },
    [getHostId]
  )

  const updateRoom = useCallback(
    async (roomId: string, req: HostsPutRoomsReq) => {
      await api(getHostId()).hostsPutRooms(roomId, req)
    },
    [getHostId]
  )

  const deleteRoom = useCallback(
    async (roomId: string) => {
      await api(getHostId()).hostsDeleteRooms(roomId)
    },
    [getHostId]
  )

  return { rooms, fetchRooms, createRoom, updateRoom, deleteRoom }
}
