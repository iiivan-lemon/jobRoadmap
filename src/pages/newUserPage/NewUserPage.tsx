import React, { type FC } from 'react'
import styles from './NewUserPage.module.sass'
import stylesTag from '../../components/Tag/Tag.module.sass'
import '../../App.sass'
import GradientGrade from '../../components/gradientGrade/GradientGrade'
import { useNavigate } from 'react-router-dom'
// import styled from 'styled-components'
import { ReactComponent as NodeSvg } from '../../static/images/svg-hex.svg'
import pSBC from 'shade-blend-color'
import stylesOps from '../../components/headerOptions/HeaderOptions.module.sass'
const NewUserPage: FC = () => {
  React.useEffect(() => {
    // document.body.style.overflow = 'auto'
    // document.getElementById('header')?.classList.add('headerFix')
  }, [])
  const history = useNavigate()

  const openHeader = () => {
    (document.getElementById('search') as HTMLInputElement)?.focus();

    (document.getElementById('tagSearch') as HTMLInputElement)?.focus()
  }

  const toggleHeaderTitle = (e) => {
    e.stopPropagation()
    const header = document.getElementById('mainHeader')
    const title = document.getElementById(e.currentTarget.id.split('_')[1] + 'Title')
    if (title) {
      title.classList.toggle(styles.widjetHeaderTitle)
    }
    if (header) {
      header.classList.toggle(styles.headerFocus)
    }
  }
  const unFocusHeaderTitle = (e) => {
    // eslint-disable-next-line no-debugger
    e.stopPropagation()
    const header = document.getElementById('mainHeader')
    const title = document.getElementById(e.currentTarget.id.split('_')[1] + 'Title')
    if (title) {
      title.classList.remove(styles.widjetHeaderTitle)
    }
    if (header) {
      header.classList.remove(styles.headerFocus)
    }
  }

  return (
      <React.Fragment>
        <div className={styles.noiseWidgetBack}></div>
        <div className={styles.arrow}></div>
        <div className={styles.startBlock}>
          <div className={styles.description}>
                  <span className={styles.title}>
                      Job Roadmap
                  </span>
                  <div className={styles.wrapper}>
                  <span
                      className={styles.titleDescr}
                  >
                      Cервис, который поможет вам узнать и изучить необходимые навыки для подготовки к собеседованиям по выбранной IT профессии
                  </span>
                  </div>
                  <button type='button' className={styles.newPageColorBtn + ' ' + styles.newPageBtn} onClick={openHeader}>начать поиск!</button>
              </div>
              <div className={styles.widgetsDescr}>
                <div id='widget_skills' onClick={ (e) => {
                  openHeader()
                }} onMouseOver={(e) => {
                  toggleHeaderTitle(e)
                }} onMouseOut={(e) => {
                  // eslint-disable-next-line no-debugger
                  toggleHeaderTitle(e)
                }} className={`${styles.widjet} ${styles.widjetSkill} ${styles.widjetNew}`}><span className={styles.widjetText}>{'Поиск по навыкам\n и профессиям'}</span></div>
                <div id='widget_jobLetter' onClick={ (e) => {
                  toggleHeaderTitle(e)
                  history('/jobLetter')
                }} onMouseOver={(e) => {
                  toggleHeaderTitle(e)
                }} onMouseOut={(e) => {
                  // eslint-disable-next-line no-debugger
                  toggleHeaderTitle(e)
                }} className={`${styles.widjet} ${styles.widjetLetter} ${styles.widjetNew}`}><span className={styles.widjetText}>Генерация сопроводительного письма</span></div>
                <div id='widget_resumeFix'
                     onClick={ (e) => {
                       toggleHeaderTitle(e)
                       history('/resumeFix')
                     }}
                     onMouseOver={(e) => {
                       toggleHeaderTitle(e)
                     }} onMouseOut={(e) => {
                       // eslint-disable-next-line no-debugger
                       toggleHeaderTitle(e)
                     }} className={`${styles.widjet} ${styles.widjetResume} ${styles.widjetNew}`}><span className={styles.widjetText}>Анализ резюме</span></div>
                  <span className={styles.widjetTitle} >
                      Анализ актуальных открытых вакансий по Вашей специальности
                  </span>
              </div>
          </div>
      </React.Fragment>
  )
}

export default NewUserPage
