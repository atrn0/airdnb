import { Button, TextField } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button/Button'
import React, { useContext, useState } from 'react'
import { useCallback } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../contexts/authContext'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledButton = styled((props: LinkProps & ButtonProps) => (
  <Button component={Link} {...props} />
))`
  &.MuiButtonBase-root {
    margin-top: 20px;
  }
`

export const Login: React.FC = () => {
  const [userId, setUserId] = useState('')
  const { loginAsGuest, loginAsHost } = useContext(AuthContext)

  const onUserIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(e.target.value)
    },
    []
  )

  const handleLoginAsGuest = useCallback(() => {
    loginAsGuest && loginAsGuest(userId)
  }, [loginAsGuest, userId])

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
        to="/hosts/rooms"
        disabled={!userId}
        onClick={handleLoginAsHost}
      >
        ホストとしてログイン
      </StyledButton>
      <StyledButton
        to="guests/rooms"
        variant="contained"
        disabled={!userId}
        onClick={handleLoginAsGuest}
      >
        ゲストとしてログイン
      </StyledButton>
    </StyledContainer>
  )
}
