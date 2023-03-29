import React, { type FC } from 'react'
import styles from './NewUserPage.module.css'
import './../../App.css'
const NewUserPage: FC = () => {
  React.useEffect(() => {
    document.body.style.overflow = 'auto'
    document.getElementById('header')?.classList.add('headerFix')
  }, [])

  return (
        <React.Fragment>
            <div className={styles.startBlock}>
                <div className={styles.description}><span className={styles.title}>Job Roadmap</span><span
                    className={styles.titleDescr}>Сервис который поможет вам изучить навыки, необходимые для подготовки по выбранной специальности</span>
                </div>
            </div>
            <div className={styles.startBlock}>
                <div className={styles.description}><span className={styles.title}>Job Roadmap</span><span
                    className={styles.titleDescr}>разделение скиллов по опыту и упоминаемости в вакансиях</span>
                </div>
            </div>
            <div className={styles.startBlock}>
                <div className={styles.description}><span className={styles.title}>---зарегистрироваться---</span>
                </div>
            </div>
        </React.Fragment>
  )
}

export default NewUserPage
