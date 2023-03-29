import React from 'react'
import Graph from '../../features/visGraph/Graph'
import styles from './HomePage.module.css'
import './../../App.css'
// import { useHistory } from 'react-router'
interface HomePageProps {
  data: any[]
  inputData: string
}

const HomePage = ({ data, inputData }: HomePageProps): JSX.Element => {
  // const history = useHistory()
  React.useEffect(() => {
    document.body.style.overflow = 'auto'
    document.getElementById('header')?.classList.remove('headerFix')
  }, [])

  return (
    <div className={styles.page}><Graph data={ data } title={ inputData }/></div>
  )
}

export default HomePage
