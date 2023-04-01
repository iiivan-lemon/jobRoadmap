import React from 'react'
import Graph from '../../features/visGraph/Graph'
import styles from './HomePage.module.css'
import './../../App.css'
import { PushSpinner } from 'react-spinners-kit'
// import { selectGrade } from '../../models/gradeFilter/gradeSlice'
// import { useAppSelector } from '../../app/hooks'
// import { selectDataGraph } from '../../models/dataGraph/dataGraphSlice'
// import { useHistory } from 'react-router'
// interface HomePageProps {
//   data: any[]
//   inputData: string
// }

const HomePage = ({ data, inputData, headerGrade }): JSX.Element => {
  const [loading, setLoad] = React.useState(true)

  const [grade, setGrade] = React.useState({ begin: 0, end: 0 })
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.getElementById('header')?.classList.remove('headerFix')
  }, [])
  React.useEffect(() => {
    if (data.length > 0) {
      setTimeout(() => { setLoad(false) }, 5000)
    } else { setLoad(true) }
  }, [data])
  React.useEffect(() => {
    setGrade(headerGrade)
  }, [headerGrade])

  return (
      <div className={styles.page}>{<div className={styles.preloader}><PushSpinner id = 'preloader' size={30} color="#686769" loading={loading} /></div>}{(data.length > 0 && !loading) && <Graph data={ data } title={ inputData } grade={grade}/>}</div>
  )
}

export default HomePage
