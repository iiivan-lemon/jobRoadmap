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
    document.body.style.overflow = 'auto'
    document.getElementById('header')?.classList.add('headerFix')
  }, [])
  const history = useNavigate()

  const openHeader = () => { (document.getElementById('search') as HTMLInputElement)?.focus(); (document.getElementById('searchJob') as HTMLInputElement)?.focus() }

  return (
      <React.Fragment>
          <div className={styles.startBlock}>
            <div className={styles.backCircle}></div>
            <div style={{ top: '29%', left: '64%' }} className={styles.backCircle}></div>
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

                <div className={`${styles.widjet} ${styles.widjetSkill}`}><span className={styles.widjetText}>{'Поиск по навыкам\n и профессиям'}</span></div>
                <div className={`${styles.widjet} ${styles.widjetLetter}`}><span className={styles.widjetText}>Генерация сопроводительного письма</span></div>
                <div className={`${styles.widjet} ${styles.widjetResume}`}><span className={styles.widjetText}>Анализ резюме</span></div>
                <svg
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: '14%'
                  }}
                  className={stylesOps.spaceLine}
                  fill="none"
                  height="1"
                  viewBox="0 0 1418 1"
                  width="1418"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    fill="url(#paint0_linear_120_572)"
                    height="1"
                    transform="rotate(-180 1418 1)"
                    width="1418"
                    x="1418"
                    y="1"
                  />
                  <defs>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="paint0_linear_120_572"
                      x1="3027.87"
                      x2="1647.1"
                      y1="3.01352"
                      y2="1.40684"
                    >
                      <stop stopColor="#D9D9D9" />
                      <stop
                        offset="1"
                        stopColor="#1B1B1B"
                      />
                    </linearGradient>
                  </defs>
                </svg>
                  <span className={styles.widjetTitle}>
                      Анализ актуальных открытых вакансий по Вашей специальности
                  </span>
              </div>
          </div>
      </React.Fragment>
  )
}

export default NewUserPage
