import React, { useState } from 'react'
import './App.css'
import { Route, Switch, useHistory } from 'react-router'
import HomePage from './pages/homePage/HomePage'
import NewUserPage from './pages/newUserPage/NewUserPage'
import axios from 'axios'
import Header from '../src/features/header/Header'
import ProfilePage from '../src/pages/profilePage/ProfilePage'

function App (): JSX.Element {
  // const [data, changeData] = useState([{ name: 'python', distance: 1, professionalism: 0 }, {
  //   name: 'sqlite',
  //   distance: 1,
  //   professionalism: 0.5
  // }, { name: 'django', distance: 0.6, professionalism: 0.4 }, {
  //   name: 'selenium',
  //   distance: 0.8,
  //   professionalism: 0.5
  // }, { name: 'docker', distance: 0.2, professionalism: 0.8 }, { name: 'c++', distance: 0.1, professionalism: 1 }])
  const [data, changeData] = useState([])
  const [inputData, changeInputData] = useState('')

  const history = useHistory()

  const coursesPage = (): void => {
    if (window.location.href !== '/search') {
      history.push('/search')
    }
  }

  function checkStatus (status: number): string {
    switch (Math.round(status / 100)) {
      case 1: {
        return 'Information'
      }
      case 2: {
        return 'Success'
      }
      case 3: {
        return 'Redirect'
      }
      case 4: {
        return 'Client Error'
      }
      case 5: {
        return 'Server Error'
      }
      default: {
        return ''
      }
    }
  }

  function fetchUser (inputData: string): void {
    axios.get('api/v1/technologies?search_text=' + inputData)
      .then((response) => {
        const statusInfo = checkStatus(response.status)
        if (
          statusInfo === 'Client Error' ||
          statusInfo === 'Server Error' ||
          statusInfo === 'Undefined'
        ) {
          console.error(statusInfo)
        } else {
          coursesPage()
          changeData(response?.data?.technologies)
          changeInputData(inputData)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function change (inputData: string): void {
    if (inputData.includes('python')) {
      fetchUser(inputData)
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
    // changeData(arr)
  }

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
