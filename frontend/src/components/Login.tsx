import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGuest } from '../hooks/useGuest'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledButton = styled(({ ...others }) => (
  <Button component={Link} {...others} />
))`
  &.MuiButtonBase-root {
    margin-top: 20px;
  }
`

export const Login: React.FC = () => {
  const [userId, setUserId] = useState('')
  const { loginAsGuest } = useGuest()

  const onUserIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(e.target.value)
    },
    []
  )

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
        to="/guests/rooms"
        disabled={!userId}
        onClick={() => loginAsGuest(userId)}
      >
        ゲストとしてログイン
      </StyledButton>
    </StyledContainer>
  )
}
