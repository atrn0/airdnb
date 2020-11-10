import { useCallback, useContext, useState } from 'react'
import { config } from '../config'
import { AuthContext } from '../contexts/authContext'
import {
  HostsReservation,
  HostsReservationsApi,
  PostReservationsReq,
} from '../gen/openapi/api'

const api = (token: string) =>
  new HostsReservationsApi({
    basePath: config.apiBasePath,
    accessToken: token,
  })

export const useHostsReservations = () => {
  const [reservations, setReservations] = useState<HostsReservation[]>([])
  const { getHostId } = useContext(AuthContext)

  const fetchReservations = useCallback(async () => {
    const res = await api(getHostId()).hostsGetReservations()
    console.log(res.data.reservations)
    setReservations(res.data.reservations)
  }, [getHostId])

  return {
    reservations,
    fetchReservations,
  }
}
