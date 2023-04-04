import React, { useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './pages/homePage/HomePage'
// import NewUserPage from './pages/newUserPage/NewUserPage'
// import axios from 'axios'
import Header from '../src/features/header/Header'
// import ProfilePage from '../src/pages/profilePage/ProfilePage'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { getDataGraph } from './models/dataGraph/dataGraphSlice'
import { type GradeState, selectGrade, setFilter } from
  './models/gradeFilter/gradeSlice'
// import RegPage from './pages/regPage/RegPage'
// import LoginPage from './pages/loginPage/LoginPage'
import { PrivateRoute } from './authApp/_components'
import NewUserPage from './pages/newUserPage/NewUserPage'
// import RegPage from './pages/regPage/RegPage'
// import ProfilePage from './pages/profilePage/ProfilePage'
import { Login } from './authApp/login'
import ProfilePage from './pages/profilePage/ProfilePage'
import { Reg } from './authApp/register'
// import { PrivateRoute } from './features/privateRoute/PrivateRoute'
// import { history } from './authApp/_helpers'

function App (): JSX.Element {
  const headerGrade = useAppSelector(selectGrade)
  const dispatch = useAppDispatch()
  const history = useNavigate()
  const [inputData, changeInputData] = useState('')

  // history.navigate = useNavigate()
  // // @ts-expect-error errors
  // history.location = useLocation()
  // const coursesPage = (): void => {
  //   if (window.location.href !== '/search') {
  //     history.ts.push('/search')
  //   } else {
  //     change(inputData)
  //   }
  // }

  function change (inputData: string): void {
    // if (inputData.includes('python')) {
    // coursesPage()
    // // @ts-expect-error errors
    history('/search')
    void dispatch(getDataGraph(inputData))
    changeInputData(inputData)
    // fetchUser(inputData)
    // }
  }

  function setGrade (grade: GradeState): void {
    dispatch(setFilter(grade))
  }

  const routes = (
        <React.Fragment>
            <Header changeData={change} setGrade={setGrade}/>
                <Routes>
                    {/* private */}
                    <Route
                        path="/favorites"
                        element={
                            <PrivateRoute>
                             <ProfilePage/>
                            </PrivateRoute>
                        }
                    />
                    {/* public */}
                    <Route path="/" element={<NewUserPage/>}/>
                    <Route path="/search" element={<HomePage headerGrade={headerGrade} inputData={inputData}/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Reg />} />
                </Routes>
        </React.Fragment>
  )

  // React.useEffect(() => {
  //     changeData(dataGraph)
  // }, [dataGraph])
  // const routes = (
  //     <React.Fragment>
  //         <Header changeData={change} setGrade={setGrade}/>
  //         <Switch>
  //             <Route path="/search" render={() => <HomePage data={data} inputData={inputData} headerGrade={headerGrade}/>}/>
  //             <Route path="/profile" component={ProfilePage}/>
  //             <Route path="/" component={NewUserPage}/>
  //         </Switch>
  //     </React.Fragment>
  // )
  return (
          <React.Fragment>
              {routes}
          </React.Fragment>
  )
}

export default App
