import React, { type FC } from 'react'
import styles from './NewUserPage.module.css'

const NewUserPage: FC = () => {
  return (
        <React.Fragment>
            <div className={styles.startBlock}>
                <div className={styles.description}><span className={styles.title}>Job Roadmap</span><span
                    className={styles.titleDescr}>Сервис который поможет вам изучить навыки, необходимые для подготовки по выбранной специальности</span>
                </div>
            </div>
        </React.Fragment>
  )
}

export default NewUserPage
