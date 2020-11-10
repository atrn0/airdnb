import { useCallback } from 'react'
import Cookies from 'js-cookie'

export const useHost = () => {
  const loginAsHost = (hostId: string) => {
    Cookies.set('host_id', hostId)
  }

  const loggedInAsHost = useCallback(() => {
    return !!Cookies.get('host_id')
  }, [])

  const getHostId = useCallback(() => {
    return Cookies.get('host_id') || ''
  }, [])

  const logoutHost = useCallback(() => {
    return Cookies.set('host_id', '')
  }, [])

  return { getHostId, loginAsHost, loggedInAsHost, logoutHost }
}
