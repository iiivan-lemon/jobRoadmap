import React, { type FC } from 'react'
import styles from './NewUserPage.module.css'
import stylesTag from '../../components/Tag/Tag.module.css'
import './../../App.css'
import GradientGrade from '../../components/gradientGrade/GradientGrade'
import NodeFav from '../../components/nodeFav/nodeFav'
import { useNavigate } from 'react-router-dom'
// import styled from 'styled-components'
import { ReactComponent as NodeSvg } from '../../static/images/svg-hex.svg'
import pSBC from 'shade-blend-color'
import stylesOps from '../../components/headerOptions/HeaderOptions.module.css'
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

  const focusHeaderTitle = (e) => {
    e.stopPropagation()
    const header = document.getElementById('mainHeader')
    const title = document.getElementById(e.currentTarget.id.split('_')[1] + 'Title')
    if (title && header) {
      title.classList.add(styles.widjetHeaderTitle)
      // header.classList.add(styles.headerFocus)
    }
  }
  const unFocusHeaderTitle = (e) => {
    // eslint-disable-next-line no-debugger
    e.stopPropagation()
    const header = document.getElementById('mainHeader')
    const title = document.getElementById(e.currentTarget.id.split('_')[1] + 'Title')
    if (title && header) {
      // header.classList.remove(styles.headerFocus)
      title.classList.remove(styles.widjetHeaderTitle)
    }
  }

  return (
      <React.Fragment>
        <div className={styles.noiseWidgetBack}></div>
        <div className={styles.arrow}></div>
        <div className={styles.startBlock}>
          <div className={styles.description} onClick={() => { console.log(1) } }>
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
                <div id='widget_skills' onClick={openHeader} className={`${styles.widjet} ${styles.widjetSkill} ${styles.widjetNew}`}><span className={styles.widjetText}>{'Поиск по навыкам\n и профессиям'}</span></div>
                <div id='widget_jobLetter' onClick={ (e) => {
                  unFocusHeaderTitle(e)
                  history('/jobLetter')
                }} onMouseOver={(e) => {
                  focusHeaderTitle(e)
                }} onMouseOut={(e) => {
                  // eslint-disable-next-line no-debugger
                  unFocusHeaderTitle(e)
                }} className={`${styles.widjet} ${styles.widjetLetter} ${styles.widjetNew}`}><span className={styles.widjetText}>Генерация сопроводительного письма</span></div>
                <div id='widget_resumeFix'
                     onClick={ (e) => {
                       unFocusHeaderTitle(e)
                       history('/resumeFix')
                     }}
                     onMouseOver={(e) => {
                       focusHeaderTitle(e)
                     }} onMouseOut={(e) => {
                       // eslint-disable-next-line no-debugger
                       unFocusHeaderTitle(e)
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
