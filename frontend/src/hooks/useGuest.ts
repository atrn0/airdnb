import Cookies from 'js-cookie'
import { useCallback } from 'react'

export const useGuest = () => {
  const loginAsGuest = useCallback((guestId: string) => {
    Cookies.set('guest_id', guestId)
  }, [])

  const loggedInAsGuest = useCallback(() => {
    return !!Cookies.get('guest_id')
  }, [])

  const getGuestId = useCallback(() => {
    return Cookies.get('guest_id') || ''
  }, [])

  return { getGuestId, loginAsGuest, loggedInAsGuest }
}
