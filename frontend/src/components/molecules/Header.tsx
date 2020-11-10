import React, { useContext, useState } from 'react'
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListProps,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'

const StyledSpacer = styled.div`
  flex-grow: 1;
`

const StyledList = styled((props: ListProps) => <List {...props} />)`
  min-width: 200px;
`

export const Header: React.FC = () => {
  const [isOpenDrawer, setOpenDrawer] = useState(false)
  const { logoutGuest } = useContext(AuthContext)
  const history = useHistory()

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Airdnb</Typography>
          <StyledSpacer></StyledSpacer>
          <IconButton color="inherit" onClick={() => setOpenDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isOpenDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <StyledList>
          <ListItem button component={Link} to="/guests/reservations">
            <ListItemText primary="予約一覧" />
          </ListItem>
          <ListItem
            button
            component={Button}
            onClick={() => {
              logoutGuest()
              history.push('/')
            }}
          >
            <ListItemText primary="ログアウト" />
          </ListItem>
        </StyledList>
      </Drawer>
    </>
  )
}
