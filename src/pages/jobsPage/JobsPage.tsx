import { useAppSelector } from '../../app/hooks'
import { selectDataGraph } from '../../models/dataGraph/dataGraphSlice'
import { selectDataJobs } from '../../models/dataJobs/dataJobsSlice'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PushSpinner } from 'react-spinners-kit'
import styles from './JobsPage.module.css'
export const JobsPage = () => {
  const data = useAppSelector(selectDataJobs)
  const nav = useNavigate()

  const [
    loading,
    setLoad
  ] = React.useState(true)

  React.useEffect(() => {
    if (!data) {
      nav('/')
    } else if (data.length > 0) {
      setLoad(false)
    } else { setLoad(true) }
  }, [data])

  const renderJobs = (data): any => {
    return data.map(el => <div className={styles.job}><span>{el.job_name} </span><span> {el.percent}%</span></div>)
  }
  return (
    <div className={styles.page}>
      <div className='preloader'>
        <PushSpinner
          color="#686769"
          id="preloader"
          loading={loading}
          size={30}
        />
      </div>
      {(!loading) &&
      <>{renderJobs(data)}</>
      }
    </div>
  )
}
