import React from 'react'
import Graph from '../../features/visGraph/Graph'
import styles from './HomePage.module.css'
import './../../App.css'
import { PushSpinner } from 'react-spinners-kit'
import { selectDataGraph } from '../../models/dataGraph/dataGraphSlice'
import { useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { GraphSelf } from '../../features/graphSelf/graphSelf'

const HomePage = ({ inputData, headerGrade }): JSX.Element => {
  const nav = useNavigate()
  const data = useAppSelector(selectDataGraph)
  const [
    loading,
    setLoad
  ] = React.useState(true)
  const [
    grade,
    setGrade
  ] = React.useState({ begin: 0, end: 1 })
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.getElementById('header')?.classList.remove('headerFix')
  }, [])
  React.useEffect(() => {
    // eslint-disable-next-line no-debugger

    if (!data) {
      nav('/')
    } else if (data.length > 0) {
      setLoad(false)
    } else { setLoad(true) }
  }, [data])
  React.useEffect(() => {
    setGrade(headerGrade)
  }, [headerGrade])

  return (
      <div id='container' className={styles.page}>
            <div className={styles.preloader}>
              <PushSpinner
                  color="#686769"
                  id="preloader"
                  loading={loading}
                  size={30}
              />
            </div>
            {(!loading) && <GraphSelf data={data} grade={grade}></GraphSelf>
                                            }
      </div>
  )
}

export default HomePage
