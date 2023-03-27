import React from 'react'
import Graph from '../../features/visGraph/Graph'
import styles from './HomePage.module.css'

interface HomePageProps {
  data: any[]
  inputData: string
}

const HomePage = ({ data, inputData }: HomePageProps): JSX.Element => {
  return (
    <div className={styles.page}><Graph data={ data } title={ inputData }/></div>
  )
}

export default HomePage
