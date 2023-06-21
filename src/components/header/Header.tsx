import React, { type FC, useEffect, useState } from 'react'
import Search from '../search/Search'
import styles from './Header.module.sass'
// Import { useHistory } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
// import { authActions } from
import { loginOrLogout } from '../../models/auth/authActions'
import { getTops } from '../../models/tops/topsSlice'
import { getFavs } from '../../models/favs/favsSlice'
import { loadState } from '../../utils/utils'
import { Avatar } from '@mui/material'
import { loadingProfile } from '../../models/user/userActions'
import { useSelector } from 'react-redux'
import { clearRecommendsTech } from '../../models/recommendTech/recommendTechSlice'
import { clearRecommends } from '../../models/recommend/recommendSlice'
import stylesOps from '../headerOptions/HeaderOptions.module.sass'
import stylesNewPage from '../../pages/newUserPage/NewUserPage.module.sass'
import { Button } from 'antd'

/*
 * Import HeaderOptions from '../headerOptions/HeaderOptions'
 * import { Button } from 'antd'
 */
interface HeaderProps {
  title?: string
  changeData?: any
  setGrade?: any
  isMainSearch?: any
  takeInput?: any
}

const Header: FC<HeaderProps> = ({ title, changeData, setGrade, isMainSearch, takeInput }) => {
  const { isAuth } = useAppSelector(x => x?.auth)
  const [favs, setFavs] = useState([])
  const { user } = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    void dispatch(getTops())
    void dispatch(loadingProfile())
      .then((res) => {
        if (res === true) { /* empty */ }
        if (res === 500) { /* empty */ }
      })
  }, [])
  /*
   * Function submitForm (event: any): void {
   *   event?.preventDefault()
   *   if (changeData != null) changeData(event.target.searchTerm.value)
   *   event.target.searchTerm.value = ''
   * }
   */

  const nav = useNavigate()
  const logout = async () => {
    const res = await dispatch(loginOrLogout(false))
  }

  function goTo (path: string): void {
    history(path)
  }
  const location = useLocation()
  const history = useNavigate()

  React.useEffect(() => {

  }, [takeInput])
  React.useEffect(() => {
    if (location.pathname !== ('/search') && location.pathname !== '/searchjob') {
      if ((document.getElementById('search') as HTMLInputElement)) {
        void dispatch(clearRecommends());
        (document.getElementById('search') as HTMLInputElement).value = ''
      }
      if ((document.getElementById('tagSearch') as HTMLInputElement)) {
        void dispatch(clearRecommendsTech());
        (document.getElementById('tagSearch') as HTMLInputElement).value = ''
      }
    }
    resumeRef.current?.classList.remove(styles.chooseTitle)
    letterRef.current?.classList.remove(styles.chooseTitle)
    switch (location.pathname) {
      case '/resumeFix':
        resumeRef.current?.classList.add(styles.chooseTitle)
        break
      case '/jobLetter':
        letterRef.current?.classList.add(styles.chooseTitle)
        break
    }
  }, [history])

  const resumeRef = React.useRef<HTMLElement>(null)
  const letterRef = React.useRef<HTMLElement>(null)

  return (
      <React.Fragment>

          <div
              className={styles.header}
              id="header"
          >

              <div id='mainHeader' className={styles.mainHeader}>
                  <span
                      className={styles.logoHref + ' ' + stylesNewPage.touchTitle}
                      onClick={(e) => {
                        e.preventDefault()
                        goTo('/')
                      }}
                      // onTouchStart={() => { goTo('/') }}
                  >
                      <span className={styles.title}>
                          JOB Roadmap
                      </span>
                  </span>
                {window.innerWidth > 1000 && <>
                  <Search
                    title = {takeInput}
                      isMainSearch={isMainSearch}
                      changeData={changeData}
                      setGrade={setGrade}
                  />
                  </>}
                <div className={styles.titles}>
                <span
                  id='resumeFixTitle'
                  ref={resumeRef}
                  className={styles.favorite + ' ' + styles.baseTitle + ' ' + stylesNewPage.touchTitle }
                  onClick={(e) => {
                    e.preventDefault()
                    goTo('/resumeFix')
                  }}
                  // onTouchStart={(e) => {
                  //   goTo('/resumeFix')
                  // }}
                >
                      Резюме
                  </span>
                <span
                  id='jobLetterTitle'
                  ref={letterRef}
                  className={styles.favorite + ' ' + styles.baseTitle + ' ' + stylesNewPage.touchTitle }
                  onClick={(e) => {
                    e.preventDefault()
                    goTo('/jobLetter')
                  }}
                  // onTouchStart={() => { goTo('/jobLetter') }}
                >
                      Письмо
                  </span>
                  {window.innerWidth > 1000 && <>
                  <span
                      className={styles.favorite + ' ' + styles.baseTitle }
                      onClick={() => { goTo('/favorites') }}
                  >
                      Избранное
                  </span>
                  {/* eslint-disable-next-line multiline-ternary */}
                  {(isAuth) ? (<>
                    <div onClick={() => {
                      history('/profile')
                    }
                    } className={styles.avatar}>
                    <Avatar alt="Cindy Baker" src={user.avatar} />
                    </div>
                  <svg
                      className={styles.logout}
                      fill="none"
                      height="23"
                      onClick={logout}
                      viewBox="0 0 23 23"
                      width="23"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                      <g clipPath="url(#clip0_120_598)">
                          <path
                              d="M14.375 23H0.958333C0.383333 23 0 22.6167 0 22.0417V0.958333C0 0.383333 0.383333 0 0.958333 0H14.375C14.95 0 15.3333 0.383333 15.3333 0.958333V7.66667C15.3333 8.24167 14.95 8.625 14.375 8.625C13.8 8.625 13.4167 8.24167 13.4167 7.66667V1.91667H1.91667V21.0833H13.4167V15.3333C13.4167 14.7583 13.8 14.375 14.375 14.375C14.95 14.375 15.3333 14.7583 15.3333 15.3333V22.0417C15.3333 22.6167 14.95 23 14.375 23Z"
                              fill="white"
                              stroke="white"
                          />
                          <path
                              d="M22.0418 12.4582H7.66683C7.09183 12.4582 6.7085 12.0748 6.7085 11.4998C6.7085 10.9248 7.09183 10.5415 7.66683 10.5415H22.0418C22.6168 10.5415 23.0002 10.9248 23.0002 11.4998C23.0002 12.0748 22.6168 12.4582 22.0418 12.4582Z"
                              fill="white"
                              stroke="white"
                          />
                          <path
                              d="M22.0417 12.4585C21.7542 12.4585 21.5625 12.3627 21.3708 12.171L17.5375 8.33766C17.1542 7.95433 17.1542 7.37933 17.5375 6.996C17.9208 6.61266 18.4958 6.61266 18.8792 6.996L22.7125 10.8293C23.0958 11.2127 23.0958 11.7877 22.7125 12.171C22.5208 12.3627 22.3292 12.4585 22.0417 12.4585Z"
                              fill="white"
                              stroke="white"
                          />
                          <path
                              d="M18.2083 16.2915C17.9208 16.2915 17.7292 16.1957 17.5375 16.004C17.1542 15.6207 17.1542 15.0457 17.5375 14.6623L21.3708 10.829C21.7542 10.4457 22.3292 10.4457 22.7125 10.829C23.0958 11.2123 23.0958 11.7873 22.7125 12.1707L18.8792 16.004C18.6875 16.1957 18.4958 16.2915 18.2083 16.2915Z"
                              fill="white"
                              stroke="white"
                          />
                      </g>
                      <defs>
                          <clipPath id="clip0_120_598">
                              <rect
                                  fill="white"
                                  height="23"
                                  width="23"
                              />
                          </clipPath>
                      </defs>
                  </svg></>)
                  //   <span
                  //   style={{ margin: 0 }}
                  //   className={stylesNewPage.newPageColorBtn + ' ' + stylesNewPage.newPageBtn}
                  //     onClick={() => { goTo('/login') }}
                  // >
                    : <Button className={stylesNewPage.newPageColorBtn + ' ' + stylesNewPage.newPageBtn} style={{ margin: 0 }} onClick={() => { goTo('/login') }}>войти</Button>

                  // </span>
                  }
                  </>}
                </div>

              </div>

              <div id="header-options" />
          </div>

      </React.Fragment>
  )
}

export default Header
