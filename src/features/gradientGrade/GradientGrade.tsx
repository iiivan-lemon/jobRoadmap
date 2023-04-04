import styles from './gradientGrade.module.css'
import React from 'react'

const GradientGrade = ({ width }) => {
  return (<div className={styles.colorsLevel} style={{ width }}>
                  <span>
                      нет опыта
                  </span>
        <span>
                      более 6 лет
                  </span>
    </div>)
}

export default GradientGrade
