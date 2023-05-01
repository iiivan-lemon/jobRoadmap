import { useAppDispatch } from '../../app/hooks'
import { getJobs } from '../../models/dataJobs/dataJobsSlice'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PushSpinner } from 'react-spinners-kit'
import styles from './JobsPage.module.css'
import './../../components/bubbleChart/bubble.css'
import { loadState } from '../../utils/utils'
import { generateChart } from '../../components/bubbleChart/bubbleChart'
import Draggable from 'react-draggable'
import { ErrorModal } from '../../components/errorModal/errorModal'
export const JobsPage = ({ inputData, sendJob }) => {
  const [data, setData] = useState([])
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const [errMessage, setErrMessage] = React.useState('что-то пошло не так')

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.getElementById('header')?.classList.remove('headerFix')
  }, [])
  React.useEffect(() => {
    setLoad(loadState.load)
    void dispatch(getJobs(inputData)).then(
      dataJob => {
        if (dataJob.payload.errMessage) {
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
    if (data.length) {
      return data.map(el => <div className={styles.job}><span>{el.job_name} </span><span> {el.percent}%</span></div>)
    }
  }

  React.useEffect(() => {
    if (loading === loadState.res) {
      if (data.length) {
        renderBubbles(data)
      } else { setErrMessage('по вашим навыкам профессии не найдены') }
    }
  }, [loading])

  const renderBubbles = (data) => {
    if (data.length) {
      generateChart(data.slice(0, 7), sendJob)
    }
  }

  const [zoom, setZoom] = React.useState(1)
  const zoomOptions = {
    min: 0.1,
    max: 1.5,
    step: 0.05
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
      { (loading === loadState.error) && <ErrorModal message={errMessage}/>}
      <>
      {((loading === loadState.res)) &&
      <>{null && renderJobs(data)}
          <div onWheel={ (event) => {
            // // eslint-disable-next-line no-debugger
            if ((event.target as HTMLElement).classList.contains('profList')) {
              return
            }
            // event.preventDefault()
            if (event.deltaY < 0) {
              setZoom(zoom >= zoomOptions.max ? zoomOptions.max : zoom + zoomOptions.step)
            } else if (event.deltaY > 0) {
              setZoom(zoom <= zoomOptions.min ? zoomOptions.min : zoom - zoomOptions.step)
            }
            if (event.currentTarget.children[0] as HTMLElement) { (event.currentTarget.children[0] as HTMLElement).style.scale = `${zoom} ` }
          }}><Draggable >
              <svg id="bubble-chart"/>
          </Draggable></div>
          <div className='tooltip'>
              <img alt=""/>
              <div>
                  <a></a>
                  <span></span>
              </div>
          </div>
        {!data.length && <ErrorModal message={errMessage}/>}
      </>
      }
      </>
    </div>
  )
}
