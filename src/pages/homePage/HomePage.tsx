import React from 'react'
import Graph from '../../features/visGraph/Graph'
import styles from './HomePage.module.css'
import './../../App.css'
import { PushSpinner } from 'react-spinners-kit'
import { selectDataGraph } from '../../models/dataGraph/dataGraphSlice'
import { useAppSelector } from '../../app/hooks'

const HomePage = ({ inputData, headerGrade }): JSX.Element => {
  const data = useAppSelector(selectDataGraph)
  const [
    loading,
    setLoad
  ] = React.useState(true)
  const [
    grade,
    setGrade
  ] = React.useState({ begin: 0, end: 0 })
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
      <div className={styles.page}>
          <div className={styles.preloader}>
              <PushSpinner
                  color="#686769"
                  id="preloader"
                  loading={loading}
                  size={30}
              />
          </div>
          {(data.length > 0 && !loading) && <Graph
              data={data}
              grade={grade}
              title={inputData}
                                            />}
      </div>
  )
}

export default HomePage
