import React, { useState } from 'react'
import './App.css'
import Header from './features/header/Header'
import GraphRoadMap from './features/graph/Graph'
import {Route, Switch} from 'react-router';
import HomePage from "./pages/homePage/HomePage";
import NewUserPage from "./pages/newUserPage/NewUserPage";
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
