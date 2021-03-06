import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './components/Login'
import { GuestsRooms } from './components/guests/rooms/Index'
import { AuthProvider } from './contexts/authContext'
import { GuestsRoomDetail } from './components/guests/rooms/Room'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'
import { Header } from './components/molecules/Header'
import { GuestsReservations } from './components/guests/reservations/Index'
import { HostsRooms } from './components/hosts/rooms/Index'
import { GuestsWrapper } from './components/guests/Wrapper'
import { HostsWrapper } from './components/hosts/Wrapper'
import { HostsReservations } from './components/hosts/reservations/Index'

const App: React.FC = () => {
  return (
    <div>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/guests/rooms">
                <GuestsWrapper>
                  <GuestsRooms />
                </GuestsWrapper>
              </Route>
              <Route exaxt path="/guests/rooms/:roomId">
                <GuestsWrapper>
                  <GuestsRoomDetail />
                </GuestsWrapper>
              </Route>
              <Route exact path="/guests/reservations">
                <GuestsWrapper>
                  <GuestsReservations />
                </GuestsWrapper>
              </Route>
              <Route exact path="/hosts/rooms">
                <HostsWrapper>
                  <HostsRooms />
                </HostsWrapper>
              </Route>
              <Route exact path="/hosts/reservations">
                <HostsWrapper>
                  <HostsReservations />
                </HostsWrapper>
              </Route>
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default App
