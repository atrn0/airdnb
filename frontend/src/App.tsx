import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './components/Login'
import { GuestRooms } from './components/guests/Rooms'
import { AuthProvider } from './contexts/authContext'

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
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
