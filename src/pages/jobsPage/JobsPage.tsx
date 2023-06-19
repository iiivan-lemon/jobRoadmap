import { useAppDispatch } from '../../app/hooks'
import { getJobs } from '../../models/dataJobs/dataJobsSlice'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PushSpinner } from 'react-spinners-kit'
import styles from './JobsPage.module.sass'
import stylesNew from '../newUserPage/NewUserPage.module.sass'
import '../../components/bubbleChart/bubble.sass'
import { loadState } from '../../utils/utils'
import { generateChart } from '../../components/bubbleChart/bubbleChart'
import Draggable from 'react-draggable'
import { ErrorModal } from '../../components/errorModal/errorModal'
import { Preloader } from '../../components/preloader/Preloader'

const JobsPage = ({ inputData, sendJob }) => {
  const [data, setData] = useState([])
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const [errMessage, setErrMessage] = React.useState('что-то пошло не так')
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  try {
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

    const renderJobs = (data): any => {
      if (data.length) {
        return data.map(el => <div className={styles.job}><span>{el.job_name} </span><span> {el.percent}%</span></div>)
      }
    }

    React.useEffect(() => {
      if (loading === loadState.res) {
        if (data.length) {
          renderBubbles(data)
        } else {
          setLoad(loadState.error)
          setErrMessage('по вашим навыкам профессии не найдены')
        }
      }
    }, [loading])

    const renderBubbles = (data) => {
      if (data.length && data.filter(el => el.percent >= 10).length) {
        generateChart(data.filter(el => el.percent >= 10), sendJob)
      } else {
        setLoad(loadState.error)
        setErrMessage('по вашим навыкам не найдены подходящие профессии')
      }
    }
  } catch (e) {
    setLoad(loadState.error)
  }

  //
  // React.useEffect(() => {
  //   // eslint-disable-next-line no-debugger
  //   if (!data) {
  //     nav('/')
  //   } else if (data.length > 0) {
  //     setLoad(false)
  //   } else { setLoad(true) }
  // }, [data])

  const [zoom, setZoom] = React.useState(1)
  const zoomOptions = {
    min: 0.1,
    max: 1.5,
    step: 0.05
  }

  return (
    <div className={styles.page}>
      <Preloader style={{
        zIndex: 1000,
        left: 'auto'
      }} loading={loading}/>
      { (loading === loadState.error) && <ErrorModal message={errMessage}/>}
      <>
      {((loading === loadState.res)) &&
      <>{/* @ts-expect-error awdawd */}
        {!!data.filter(el => el.percent >= 10).length && <div style={{ width: 'fit-content', padding: '1rem', zIndex: '15', position: 'absolute', left: '0' }} className={'btnOptions ' + stylesNew.widjet}>
              <span className='gradeTitleLeg'>самая подходящая специальность: <span className='jobBackTitle'>{(data[0] as any).job_name}</span></span>
          </div>}
          <div className={styles.jobs} style={{ width: '100%', height: '100%' }}
              onWheel={ (event) => {
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
              <svg id="bubble-chart" className={styles.bubbleChart}
                   xmlns="http://www.w3.org/2000/svg"
                // xlink = "http://www.w3.org/2000/xlink"
                   width="100%"
                   height="100%"
                   viewBox={'0 0 ' + window.innerWidth + ' ' + window.innerHeight}
              />
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

export default JobsPage
