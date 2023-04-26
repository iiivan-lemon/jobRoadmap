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
import { getFavs } from './models/favs/favsSlice'
import { loadState } from './utils/utils'
import ValidatedLoginForm from './authApp/login/Formik'
import ValidatedRegForm from './authApp/register/FormikReg'
import { ProfileUser } from './authApp/profile/profileUser'

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

  const [isMainSearch, setIsMainSearch] = React.useState(true)
  const [takeInput, setTakeInput] = React.useState('')
  function change (inputData: { value: string, isTechSearch: boolean }): void {
    // If (inputData.includes('python')) {
    // CoursesPage()
    // // @ts-expect-error errors

    if (inputData.isTechSearch) {
      setTakeInput(inputData.value)
      setIsMainSearch(true)
      changeInputData(inputData.value)
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      history('/search')
    } else {
      setIsMainSearch(false)
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
              takeInput={takeInput}
              isMainSearch={isMainSearch}
              changeData={change}
              setGrade={setGrade}
          />
          <Routes>
              {/* Private */}
              <Route
                  element={
                <PrivateRoute>
                          <ProfilePage chooseRoadmap={change}/>
                  </PrivateRoute>
                  }
                  path="/favorites"
              />
            <Route
              element={
                <PrivateRoute>
                  <ProfileUser />
                </PrivateRoute>
              }
              path="/profile"
            />
              {/* Public */}
              <Route
                  element={<NewUserPage />}
                  path="/"
              />
              <Route
                  element={<HomePage
                      sendJob={change}
                      headerGrade={headerGrade}
                      inputData={inputData}
                           />}
                  path={'/search'}
              />
            <Route
              element={<JobsPage
                inputData={inputData}
                sendJob={change}
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
                  element={<ValidatedLoginForm />}
                  path="/login"
              />
              <Route
                  element={<ValidatedRegForm />}
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
