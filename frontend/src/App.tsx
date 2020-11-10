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
                <GuestsRooms />
              </Route>
              <Route exaxt path="/guests/rooms/:roomId">
                <GuestsRoomDetail />
              </Route>
              <Route exact path="/guests/reservations">
                <GuestsReservations />
              </Route>
              <Route exact path="/hosts/rooms">
                <HostsRooms />
              </Route>
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default App
