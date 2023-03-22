import React, { type FC } from 'react'
import Search from '../search/Search'
import styles from './Header.module.css'
import NewUserPage from "../../pages/newUserPage/NewUserPage";
interface HeaderProps {
  title?: string
  changeData?: any
}

const Header: FC<HeaderProps> = ({ title, changeData }) => {
  function submitForm (event: any) {
    event.preventDefault()
    if (event.target.searchTerm.value.includes('python')) {
      changeData(event.target.searchTerm.value)
    }
    event.target.searchTerm.value = ''
  }

  return (
        <div className={styles.header}>
            <a href='/start' className={styles.logoHref}>
            <span className={styles.title}>JOB Roadmap</span>
            </a>
            <Search submit={submitForm} ></Search>
            <span className={styles.username}>admin</span>
            <svg width="35" height="35" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 54.5C42.6355 54.5 54.5 42.6355 54.5 28C54.5 13.3645 42.6355 1.5 28 1.5C13.3645 1.5 1.5 13.3645 1.5 28C1.5 42.6355 13.3645 54.5 28 54.5Z" fill="white" stroke="#3A3A3A" strokeWidth="3"/>
            </svg>

        </div>
  )
}

export default Header
