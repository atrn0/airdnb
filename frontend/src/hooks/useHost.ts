import { useCallback, useState } from 'react'
import Cookies from 'js-cookie'
import { HostsUsersApi } from '../gen/openapi'
import { config } from '../config'

const api = (token?: string) =>
  new HostsUsersApi({ basePath: config.apiBasePath, accessToken: token })

export const useHost = () => {
  const getHostId = useCallback(() => {
    return Cookies.get('host_id') || ''
  }, [])

  const [loggedInAsHost, setLoggedInAsHost] = useState(getHostId() !== '')

  const loginAsHost = useCallback(async (hostId: string) => {
    try {
      await api(hostId).hostsGetMe()
    } catch (err) {
      throw new Error('ログインできませんでした。')
    }
    Cookies.set('host_id', hostId)
    setLoggedInAsHost(true)
  }, [])

  const logoutHost = useCallback(() => {
    setLoggedInAsHost(false)
    return Cookies.set('host_id', '')
  }, [])

  return { getHostId, loginAsHost, loggedInAsHost, logoutHost }
}
