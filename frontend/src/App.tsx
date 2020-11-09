import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './components/Login'

const App: React.FC = () => {
  return (
    <div>
      <header>header</header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
