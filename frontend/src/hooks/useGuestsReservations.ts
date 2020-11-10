import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../contexts/authContext'
import {
  GuestsReservation,
  GuestsReservationsApi,
  PostReservationsReq,
} from '../gen/openapi/api'
import { config } from '../config'

const api = (token: string) =>
  new GuestsReservationsApi({
    basePath: config.apiBasePath,
    accessToken: token,
  })

export const useGuestsReservations = () => {
  const [reservations, setReservations] = useState<GuestsReservation[]>([])
  const { getGuestId } = useContext(AuthContext)

  const fetchReservations = useCallback(async () => {
    const res = await api(getGuestId()).guestsGetReservations()
    setReservations(res.data.reservations)
  }, [getGuestId])

  const createReservation = useCallback(
    async (req: PostReservationsReq) => {
      const res = await api(getGuestId()).postReservations(req)
      return res.data
    },
    [getGuestId]
  )

  return {
    reservations,
    fetchReservations,
    createReservation,
  }
}
