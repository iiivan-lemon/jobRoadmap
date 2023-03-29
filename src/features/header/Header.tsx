import React, { type FC } from 'react'
import Search from '../search/Search'
import styles from './Header.module.css'
// import HeaderOptions from '../headerOptions/HeaderOptions'
// import { Button } from 'antd'
interface HeaderProps {
  title?: string
  changeData?: (params: string) => void
}

const Header: FC<HeaderProps> = ({ title, changeData }) => {
  // function submitForm (event: any): void {
  //   event?.preventDefault()
  //   if (changeData != null) changeData(event.target.searchTerm.value)
  //   event.target.searchTerm.value = ''
  // }

  return (
      <React.Fragment>
        <div id='header' className={styles.header}>
            <div className={styles.mainHeader}>
                <a href='/' className={styles.logoHref}>
                    <span className={styles.title}>JOB Roadmap</span>
                </a>
                <Search changeData={changeData}></Search>
                <a href='/profile' className={styles.username}>admin</a>
                <svg width="35" height="35" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M28 54.5C42.6355 54.5 54.5 42.6355 54.5 28C54.5 13.3645 42.6355 1.5 28 1.5C13.3645 1.5 1.5 13.3645 1.5 28C1.5 42.6355 13.3645 54.5 28 54.5Z"
                        fill="white" stroke="#3A3A3A" strokeWidth="3"/>
                </svg>
            </div>
            <div id='header-options'></div>
        </div>

      </React.Fragment>
  )
}

export default Header
