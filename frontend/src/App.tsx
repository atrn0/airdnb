import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './components/Login'
import { GuestRooms } from './components/guests/rooms/Index'
import { AuthProvider } from './contexts/authContext'
import { GuestsRoom } from './components/guests/rooms/Room';

const App: React.FC = () => {
  return (
    <div>
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
              <GuestsRoom/>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
