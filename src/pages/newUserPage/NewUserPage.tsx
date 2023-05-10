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

  const openHeader = () => { (document.getElementById('search') as HTMLInputElement)?.focus(); (document.getElementById('searchJob') as HTMLInputElement)?.focus() }

  return (
      <React.Fragment>
        <div style={{ width: '100vw', bottom: '0', position: 'absolute', left: '0' }}>
          <svg style={{ width: '100%', height: 'fit-content', display: 'block' }} id="visual" viewBox="0 0 900 450" width="900" height="450" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M0 336L21.5 331.5C43 327 86 318 128.8 313C171.7 308 214.3 307 257.2 312.8C300 318.7 343 331.3 385.8 339.3C428.7 347.3 471.3 350.7 514.2 348.8C557 347 600 340 642.8 333.8C685.7 327.7 728.3 322.3 771.2 323C814 323.7 857 330.3 878.5 333.7L900 337L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill="#2c264e"></path><path d="M0 342L21.5 344.3C43 346.7 86 351.3 128.8 356C171.7 360.7 214.3 365.3 257.2 368.8C300 372.3 343 374.7 385.8 369.3C428.7 364 471.3 351 514.2 348C557 345 600 352 642.8 357.8C685.7 363.7 728.3 368.3 771.2 364.2C814 360 857 347 878.5 340.5L900 334L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill="#292441"></path><path d="M0 366L21.5 367.3C43 368.7 86 371.3 128.8 370.2C171.7 369 214.3 364 257.2 365C300 366 343 373 385.8 374.2C428.7 375.3 471.3 370.7 514.2 371C557 371.3 600 376.7 642.8 374.7C685.7 372.7 728.3 363.3 771.2 358.8C814 354.3 857 354.7 878.5 354.8L900 355L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill="#252134"></path><path d="M0 415L21.5 411.7C43 408.3 86 401.7 128.8 397.5C171.7 393.3 214.3 391.7 257.2 395C300 398.3 343 406.7 385.8 405.5C428.7 404.3 471.3 393.7 514.2 388.8C557 384 600 385 642.8 386.5C685.7 388 728.3 390 771.2 392.3C814 394.7 857 397.3 878.5 398.7L900 400L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill="#201e27"></path><path d="M0 407L21.5 407.3C43 407.7 86 408.3 128.8 411.2C171.7 414 214.3 419 257.2 421.5C300 424 343 424 385.8 424.2C428.7 424.3 471.3 424.7 514.2 421.7C557 418.7 600 412.3 642.8 409.7C685.7 407 728.3 408 771.2 412.3C814 416.7 857 424.3 878.5 428.2L900 432L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill="#1b1b1b"></path></svg>
        </div>
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
                      Cервис, который поможет вам узнать и изучить необходимые навыки для подготовки к собеседованиям по выбранной IT профессии
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
