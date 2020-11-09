import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './components/Login'
import { GuestRooms } from './components/guests/Rooms'

const App: React.FC = () => {
  return (
    <div>
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
    </div>
  )
}

export default App
