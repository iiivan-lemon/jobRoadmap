import React, { useState, lazy, Suspense } from 'react'
import './App.sass'
import { Route, Routes, useNavigate } from 'react-router-dom'

/*
 * Import NewUserPage from './pages/newUserPage/NewUserPage'
 * import axios from 'axios'
 */
import Header from './components/header/Header'
// Import ProfilePage from '../src/pages/profilePage/ProfilePage'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { type GradeState, selectGrade, setFilter } from './models/gradeFilter/gradeSlice'

/*
 * Import RegPage from './pages/regPage/RegPage'
 * import LoginPage from './pages/loginPage/LoginPage'
 */
import { PrivateRoute } from './authApp/_components'
import NewUserPage from './pages/newUserPage/NewUserPage'

import { ResumeFixPage } from './pages/resumeFixPage/ResumeFixPage'
import { JobLetterPage } from './pages/jobLetterPage/jobLetterPage'
import { loadState } from './utils/utils'
import ValidatedLoginForm from './authApp/login/Formik'
import ValidatedRegForm from './authApp/register/FormikReg'
import { ReactComponent as NodeSvg } from '../src/static/images/svg-hex.svg'
import { PushSpinner } from 'react-spinners-kit'
import { SvgNoiseBack } from './components/svgNoiseBack/svgNoiseBack'
import { Preloader } from './components/preloader/Preloader'

const HomePage = lazy(async () => await import('./pages/homePage/HomePage'))

const ProfilePage = lazy(async () => await import('./pages/profilePage/ProfilePage'))
const JobsPage = lazy(async () => await import('./pages/jobsPage/JobsPage'))
const ProfileUser = lazy(async () => await import('./authApp/profile/profileUser'))

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
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  React.useEffect(() => {
    // const script = document.createElement('script')
    //
    // script.src = 'https://d3js.org/d3.v6.js'
    // script.async = true
    // script.type = 'text/javascript'
    // document.body.appendChild(script)
    //
    // return () => {
    //   document.body.removeChild(script)
    // }
  }, [])

  const [isMainSearch, setIsMainSearch] = React.useState(true)
  const [takeInput, setTakeInput] = React.useState('')

  function change (inputData: { value: string, isTechSearch: boolean }): void {
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
  }

  function setGrade (grade: GradeState): void {
    dispatch(setFilter(grade))
  }

  React.useEffect(() => {
    setLoad(loadState.res)
  }, [])

  const routes = (
    <React.Fragment>
      <div className='preloader'>
        <PushSpinner
          color="#686769"
          id="preloader"
          loading={loading === loadState.load}
          size={30}
        />
      </div>
      <SvgNoiseBack/>
      <Header
        takeInput={takeInput}
        isMainSearch={isMainSearch}
        changeData={change}
        setGrade={setGrade}
      />
      {window.innerWidth > 1000 && <>
        <Routes>
          {/* Private */}
          <Route
            element={
              <PrivateRoute>
                <Suspense
                  fallback={<><Preloader tips={['загрузка...']} className={'appPreloader'} loading={loadState.load}/>
                  </>}>
                  <ProfilePage chooseRoadmap={change}/>
                </Suspense>
              </PrivateRoute>
            }
            path="/favorites"
          />
          <Route
            element={
              <PrivateRoute>
                <Suspense
                  fallback={<><Preloader tips={['загрузка...']} className={'appPreloader'} loading={loadState.load}/>
                  </>}>
                  <ProfileUser/>
                </Suspense>
              </PrivateRoute>
            }
            path="/profile"
          />
          {/* Public */}
          <Route
            element={<NewUserPage/>}
            path="/"
          />
          <Route
            element={
              <Suspense fallback={<><Preloader
                tips={['карта навыков почти готова', 'по клику на навык узнайте информацию о нём', 'цвет навыка обозначает опыт работы', 'загрузка...']}
                className={'appPreloader'} loading={loadState.load}/>
              </>}>
                <HomePage
                  sendJob={change}
                  headerGrade={headerGrade}
                  inputData={inputData}
                />
              </Suspense>
            }
            path={'/search'}
          />
          <Route
            element={
              <Suspense fallback={<><Preloader
                tips={['карта специальностей почти готова', 'по клику на специальность перейдите на карту навыков', 'для каждой специальности рассчитан процент упоминаемости', 'загрузка...']}
                className={'appPreloader'} loading={loadState.load}/>
              </>}>
                <JobsPage
                  inputData={inputData}
                  sendJob={change}
                />
              </Suspense>
            }
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
            element={
              <ValidatedLoginForm/>
            }
            path="/login"
          />
          <Route
            element={<ValidatedRegForm/>}
            path="/signup"
          />
        </Routes></>}
      {window.innerWidth <= 1000 && <>
        <Routes>
          <Route
            element={<NewUserPage/>}
            path="/"
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
        </Routes></>}
    </React.Fragment>
  )
  return (
    <React.Fragment>
      <>{routes}</>
    </React.Fragment>
  )
}

export default App
