import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const useAuth = () => {
  const [hostId, setHostId] = useState('')
  const [guestId, setGuestId] = useState('')

  useEffect(() => {
    setHostId(Cookies.get('host_id') || '')
    setGuestId(Cookies.get('guest_id') || '')
  }, [])

  const loginAsHost = (hostId: string) => {
    Cookies.set('host_id', hostId)
    setHostId(Cookies.get('host_id') || '')
  }

  const loginAsGuest = (guestId: string) => {
    Cookies.set('guest_id', guestId)
    setGuestId(Cookies.get('guest_id') || '')
  }

  return { loginAsHost, loginAsGuest, hostId, guestId }
}
