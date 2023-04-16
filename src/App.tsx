import React, { useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/homePage/HomePage'

/*
 * Import NewUserPage from './pages/newUserPage/NewUserPage'
 * import axios from 'axios'
 */
import Header from './components/header/Header'
// Import ProfilePage from '../src/pages/profilePage/ProfilePage'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { getDataGraph } from './models/dataGraph/dataGraphSlice'
import { type GradeState, selectGrade, setFilter } from
  './models/gradeFilter/gradeSlice'

/*
 * Import RegPage from './pages/regPage/RegPage'
 * import LoginPage from './pages/loginPage/LoginPage'
 */
import { PrivateRoute } from './authApp/_components'
import NewUserPage from './pages/newUserPage/NewUserPage'

/*
 * Import RegPage from './pages/regPage/RegPage'
 * import ProfilePage from './pages/profilePage/ProfilePage'
 */
import { Login } from './authApp/login'
import ProfilePage from './pages/profilePage/ProfilePage'
import { Reg } from './authApp/register'
import { JobsPage } from './pages/jobsPage/JobsPage'
import { getJobs } from './models/dataJobs/dataJobsSlice'
import { ResumeFixPage } from './pages/resumeFixPage/ResumeFixPage'
import { JobLetterPage } from './pages/jobLetterPage/jobLetterPage'

/*
 * Import { PrivateRoute } from './components/privateRoute/PrivateRoute'
 * import { history } from './authApp/_helpers'
 */

function App (): JSX.Element {
  const headerGrade = useAppSelector(selectGrade)
  const dispatch = useAppDispatch()
  const history = useNavigate()
  const [
    inputData,
    changeInputData
  ] = useState('')

  // History.navigate = useNavigate()
  // // @ts-expect-error errors
  // History.location = useLocation()
  // Const coursesPage = (): void => {
  //   If (window.location.href !== '/search') {
  //     History.ts.push('/search')
  //   } else {
  //     Change(inputData)
  //   }
  // }

  function change (inputData: { value: string, isTechSearch: boolean }): void {
    // If (inputData.includes('python')) {
    // CoursesPage()
    // // @ts-expect-error errors
    if (inputData.isTechSearch) {
      changeInputData(inputData.value)
      history('/search')
    } else {
      changeInputData(inputData.value)
      history('/searchjob')
    }

    /*
     * FetchUser(inputData)
     * }
     */
  }

  function setGrade (grade: GradeState): void {
    dispatch(setFilter(grade))
  }

  const routes = (
      <React.Fragment>
          <Header
              changeData={change}
              setGrade={setGrade}
          />
          <Routes>
              {/* Private */}
              <Route
                  element={
                      <PrivateRoute>
                          <ProfilePage />
                      </PrivateRoute>
                        }
                  path="/favorites"
              />
              {/* Public */}
              <Route
                  element={<NewUserPage />}
                  path="/"
              />
              <Route
                  element={<HomePage
                      headerGrade={headerGrade}
                      inputData={inputData}
                           />}
                  path="/search"
              />
            <Route
              element={<JobsPage
                inputData={inputData}
              />}
              path="/searchJob"
            />
            <Route
              element={<JobLetterPage
              />}
              path="/jobLetter"
            />
            <Route
              element={<ResumeFixPage
              />}
              path="/resumeFix"
            />
              <Route
                  element={<Login />}
                  path="/login"
              />
              <Route
                  element={<Reg />}
                  path="/signup"
              />
          </Routes>
      </React.Fragment>
  )

  /*
   * React.useEffect(() => {
   *     changeData(dataGraph)
   * }, [dataGraph])
   * const routes = (
   *     <React.Fragment>
   *         <Header changeData={change} setGrade={setGrade}/>
   *         <Switch>
   *             <Route path="/search" render={() => <HomePage data={data} inputData={inputData} headerGrade={headerGrade}/>}/>
   *             <Route path="/profile" component={ProfilePage}/>
   *             <Route path="/" component={NewUserPage}/>
   *         </Switch>
   *     </React.Fragment>
   * )
   */
  return (
      <React.Fragment>
          {routes}
      </React.Fragment>
  )
}

export default App
