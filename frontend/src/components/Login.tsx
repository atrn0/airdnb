import { Button, Snackbar, TextField } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button/Button'
import React, { useContext, useState } from 'react'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../contexts/authContext'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledButton = styled((props: ButtonProps) => <Button {...props} />)`
  &.MuiButtonBase-root {
    margin-top: 20px;
  }
`

export const Login: React.FC = () => {
  const [userId, setUserId] = useState('')
  const { loginAsGuest, loginAsHost } = useContext(AuthContext)
  const history = useHistory()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMsg, setSnackbarMsg] = useState('')

  const onUserIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(e.target.value)
    },
    []
  )

  const handleLoginAsGuest = useCallback(async () => {
    try {
      await loginAsGuest(userId)
      history.push('/guests/rooms')
    } catch (err) {
      setSnackbarMsg('ログインできませんでした。')
      setOpenSnackbar(true)
    }
  }, [history, loginAsGuest, userId])

  const handleLoginAsHost = useCallback(() => {
    loginAsHost && loginAsHost(userId)
  }, [loginAsHost, userId])

  return (
    <StyledContainer>
      <TextField
        label="User ID"
        variant="outlined"
        value={userId}
        onChange={onUserIdChange}
      />
      <StyledButton
        variant="contained"
        disabled={!userId}
        onClick={handleLoginAsHost}
      >
        ホストとしてログイン
      </StyledButton>
      <StyledButton
        variant="contained"
        disabled={!userId}
        onClick={handleLoginAsGuest}
      >
        ゲストとしてログイン
      </StyledButton>
      <Snackbar
        message={snackbarMsg}
        open={openSnackbar}
        onClose={() => {
          setOpenSnackbar(false)
        }}
      />
    </StyledContainer>
  )
}
