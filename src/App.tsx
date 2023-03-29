import React, { useState } from 'react'
import './App.css'
import { Route, Switch, useHistory } from 'react-router'
import HomePage from './pages/homePage/HomePage'
import NewUserPage from './pages/newUserPage/NewUserPage'
// import axios from 'axios'
import Header from '../src/features/header/Header'
import ProfilePage from '../src/pages/profilePage/ProfilePage'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { getDataGraph, selectDataGraph } from './models/dataGraph/dataGraphSlice'

function App (): JSX.Element {
  const dataGraph = useAppSelector(selectDataGraph)
  const dispatch = useAppDispatch()

  const [data, changeData] = useState(dataGraph)
  const [inputData, changeInputData] = useState('')

  const history = useHistory()

  const coursesPage = (): void => {
    if (window.location.href !== '/search') {
      history.push('/search')
    } else {
      change(inputData)
    }
  }

  function change (inputData: string): void {
    if (inputData.includes('python')) {
      coursesPage()
      void dispatch(getDataGraph(inputData))
      changeInputData(inputData)
      // fetchUser(inputData)
    }

    // changeData([
    //     {skill: 'python', value: 10},
    //     {skill: 'sql', value: 7},
    //     {skill: 'linux', value: 7},
    //     {skill: 'postgresql', value: 7},
    //     {skill: 'it', value: 4},
    //     {skill: 'git', value: 4},
    //     {skill: 'cicd', value: 4},
    //     {skill: 'data', value: 2},
    //     {skill: 'ml', value: 2},
    //     {skill: 'docker', value: 1}
    // ])
    // const arr = [{ name: 'python', distance: 1, professionalism: 0 }, {
    //   name: 'sqlite',
    //   distance: 1,
    //   professionalism: 0.5
    // }, { name: 'django', distance: 0.6, professionalism: 0.4 }, {
    //   name: 'selenium',
    //   distance: 0.8,
    //   professionalism: 0.5
    // }, { name: 'docker', distance: 0.2, professionalism: 0.8 }, { name: 'c++', distance: 0.1, professionalism: 1 }]
    //
    // // @ts-expect-error awd
    // changeData(arr)
  }

  React.useEffect(() => {
    changeData(dataGraph)
  }, [dataGraph])
  const routes = (
        <React.Fragment>
            <Header changeData={change}/>
            <Switch>
                <Route path="/search" render={() => <HomePage data={data} inputData={inputData}/>}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/" component={NewUserPage}/>
            </Switch>
        </React.Fragment>
  )

  return (
        <React.Fragment>
            {routes}
        </React.Fragment>
  )
}

export default App
