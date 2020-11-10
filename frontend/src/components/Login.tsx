import { Button, TextField } from '@material-ui/core'
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

const StyledButton = styled(({ ...others }) => <Button {...others} />)`
  &.MuiButtonBase-root {
    margin-top: 20px;
  }
`

export const Login: React.FC = () => {
  const [userId, setUserId] = useState('')
  const { loginAsGuest } = useContext(AuthContext)
  const history = useHistory()

  const onUserIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(e.target.value)
    },
    []
  )

  const handleLoginAsGuest = useCallback(() => {
    loginAsGuest && loginAsGuest(userId)
    history.push('/guests/rooms')
  }, [history, loginAsGuest, userId])

  return (
    <StyledContainer>
      <TextField
        label="User ID"
        variant="outlined"
        value={userId}
        onChange={onUserIdChange}
      />
      <StyledButton variant="contained" to="/hosts/rooms" disabled={!userId}>
        ホストとしてログイン
      </StyledButton>
      <StyledButton
        variant="contained"
        disabled={!userId}
        onClick={handleLoginAsGuest}
      >
        ゲストとしてログイン
      </StyledButton>
    </StyledContainer>
  )
}
