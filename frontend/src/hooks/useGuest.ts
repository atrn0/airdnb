import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'

export const useGuest = () => {
  const [guestId, setGuestId] = useState('')

  useEffect(() => {
    setGuestId(Cookies.get('guest_id') || '')
  }, [])

  const loginAsGuest = useCallback((guestId: string) => {
    Cookies.set('guest_id', guestId)
    setGuestId(Cookies.get('guest_id') || '')
  }, [])

  const loggedInAsGuest = useCallback(() => {
    return !!Cookies.get('guest_id')
  }, [])

  return { guestId, loginAsGuest, loggedInAsGuest }
}
