import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useCallback } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
    margin-top: 20px;
  }
`

export const Login: React.FC = () => {
  const [userId, setUserId] = useState('')

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
      <StyledButton variant="contained">ホストとしてログイン</StyledButton>
      <StyledButton variant="contained">ゲストとしてログイン</StyledButton>
    </StyledContainer>
  )
}
