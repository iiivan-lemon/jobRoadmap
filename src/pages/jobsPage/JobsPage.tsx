import { useAppDispatch } from '../../app/hooks'
import { getJobs } from '../../models/dataJobs/dataJobsSlice'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PushSpinner } from 'react-spinners-kit'
import styles from './JobsPage.module.css'
import { loadState } from '../../utils/utils'

export const JobsPage = ({ inputData }) => {
  const [data, setData] = useState([])
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  React.useEffect(() => {
    setLoad(loadState.load)
    void dispatch(getJobs(inputData)).then(
      dataJob => {
        if (!dataJob.payload) {
          setLoad(loadState.error)
        } else {
          setLoad(loadState.res)
          setData(dataJob.payload)
        }
      }
    ).catch(() => { setLoad(loadState.error) })
  }, [inputData])

  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  //
  // React.useEffect(() => {
  //   // eslint-disable-next-line no-debugger
  //   if (!data) {
  //     nav('/')
  //   } else if (data.length > 0) {
  //     setLoad(false)
  //   } else { setLoad(true) }
  // }, [data])

  const renderJobs = (data): any => {
    return data.map(el => <div className={styles.job}><span>{el.job_name} </span><span> {el.percent}%</span></div>)
  }
  return (
    <div className={styles.page}>
      <div className='preloader'>
        <PushSpinner
          color="#686769"
          id="preloader"
          loading={loading === loadState.load}
          size={30}
        />
      </div>
      <>
      {((loading === loadState.res)) &&
      <>{renderJobs(data)}</>
      }
      </>
    </div>
  )
}
