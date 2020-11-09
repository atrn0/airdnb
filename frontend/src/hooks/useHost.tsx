import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const useHost = () => {
  const [hostId, setHostId] = useState('')

  useEffect(() => {
    setHostId(Cookies.get('host_id') || '')
  }, [])

  const loginAsHost = (hostId: string) => {
    Cookies.set('host_id', hostId)
    setHostId(Cookies.get('host_id') || '')
  }

  return { hostId, loginAsHost }
}
