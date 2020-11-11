import Cookies from 'js-cookie'
import { useCallback, useState } from 'react'
import { config } from '../config'
import { GuestsUsersApi } from '../gen/openapi'

const api = (token?: string) =>
  new GuestsUsersApi({ basePath: config.apiBasePath, accessToken: token })

export const useGuest = () => {
  const [loggedInAsGuest, setLoggedInAsGuest] = useState(false)

  const getGuestId = useCallback(() => {
    return Cookies.get('guest_id') || ''
  }, [])

  const loginAsGuest = useCallback(async (guestId: string) => {
    try {
      await api(guestId).guestsGetMe()
    } catch (err) {
      throw new Error('ログインできませんでした。')
    }
    Cookies.set('guest_id', guestId)
    setLoggedInAsGuest(true)
  }, [])

  const logoutGuest = useCallback(() => {
    setLoggedInAsGuest(false)
    return Cookies.set('guest_id', '')
  }, [])

  return {
    getGuestId,
    loginAsGuest,
    loggedInAsGuest,
    logoutGuest,
  }
}
