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
const NewUserPage: FC = () => {
  React.useEffect(() => {
    document.body.style.overflow = 'auto'
    document.getElementById('header')?.classList.add('headerFix')
  }, [])
  const history = useNavigate()

  const openHeader = () => { (document.getElementById('search') as HTMLInputElement)?.focus(); (document.getElementById('searchJob') as HTMLInputElement)?.focus() }

  return (
      <React.Fragment>
          <div className={styles.startBlock}>
              <div className={styles.description}>
                  <span className={styles.title}>
                      Job Roadmap
                  </span>
                  <div className={styles.wrapper}>
                  <span
                      className={styles.titleDescr}
                  >
                      Cервис, который поможет вам узнать и изучить необходимые навыки для подготовки к собеседованиям по выбранной Вами профессии
                  </span>
                  </div>
                  <button type='button' className={styles.tag + ' ' + styles.newPageBtn} onClick={openHeader}>начать поиск!</button>
              </div>
              <div className={styles.description}>
                <div className={styles.widjet}><span className={styles.widjetText}>{'Поиск по навыкам\n и профессиям'}</span></div>
                <div className={styles.widjet} style={{
                  bottom: '26%',
                  position: 'absolute',
                  right: '7%'
                }}><span className={styles.widjetText}>Генерация сопроводительного письма</span></div>
                <div className={styles.widjet} style={{
                  position: 'absolute',
                  right: '32%',
                  top: '63%'
                }}><span className={styles.widjetText}>Анализ резюме</span></div>
                  <span className={styles.widjetTitle}>
                      Анализ актуальных открытых вакансий по Вашей специальности
                  </span>
              </div>
          </div>
      </React.Fragment>
  )
}

export default NewUserPage
