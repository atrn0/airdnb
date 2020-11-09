import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">header</header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
