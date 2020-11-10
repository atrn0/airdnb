import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './components/Login'
import { GuestRooms } from './components/guests/rooms/Index'
import { AuthProvider } from './contexts/authContext'
import { GuestsRoomDetail } from './components/guests/rooms/Room';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'

const App: React.FC = () => {
  return (
    <div>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
      <AuthProvider>
        <header>header</header>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/guests/rooms">
              <GuestRooms />
            </Route>
            <Route exaxt path="/guests/rooms/:roomId">
              <GuestsRoomDetail/>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
        </MuiPickersUtilsProvider>
    </div>
  )
}

export default App
