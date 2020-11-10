import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../contexts/authContext'
import { HostsRoom, HostsRoomsApi } from '../gen/openapi/api'
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

  return { rooms, fetchRooms }
}
