import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router'
import HomePage from './pages/homePage/HomePage'
import NewUserPage from './pages/newUserPage/NewUserPage'
function App (): JSX.Element {
  const routes = (
      <div>
        <Switch>
            <Route path="/start" component={NewUserPage} />
          <Route path="/" component={HomePage} />
        </Switch>

      </div>
  )

  return (
      <React.Fragment>
          {routes}
      </React.Fragment>

  )
}

export default App
