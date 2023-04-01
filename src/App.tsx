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
import { selectGrade, setFilter } from
  './models/gradeFilter/gradeSlice'

function App (): JSX.Element {
  const dataGraph = useAppSelector(selectDataGraph)
  const headerGrade = useAppSelector(selectGrade)
  const dispatch = useAppDispatch()

  const [data, changeData] = useState(dataGraph)
  const [inputData, changeInputData] = useState('')

  const history = useHistory()

  // const coursesPage = (): void => {
  //   if (window.location.href !== '/search') {
  //     history.push('/search')
  //   } else {
  //     change(inputData)
  //   }
  // }

  function change (inputData: string): void {
    // if (inputData.includes('python')) {
    // coursesPage()
    history.push('/search')
    void dispatch(getDataGraph(inputData))
    changeInputData(inputData)
    // fetchUser(inputData)
    // }
  }

  function setGrade (grade): void {
    dispatch(setFilter({ begin: grade, end: grade }))
  }

  React.useEffect(() => {
    changeData(dataGraph)
  }, [dataGraph])
  const routes = (
        <React.Fragment>
            <Header changeData={change} setGrade={setGrade}/>
            <Switch>
                <Route path="/search" render={() => <HomePage data={data} inputData={inputData} headerGrade={headerGrade}/>}/>
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
