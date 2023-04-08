import React from 'react'
import Graph from '../../features/visGraph/Graph'
import styles from './HomePage.module.css'
import './../../App.css'
import { PushSpinner } from 'react-spinners-kit'
import { selectDataGraph } from '../../models/dataGraph/dataGraphSlice'
import { useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { GraphSelf } from '../../features/graphSelf/graphSelf'
import Draggable from 'react-draggable'
import GradientGrade from '../../features/gradientGrade/GradientGrade'

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
  ] = React.useState({ begin: 0, end: 3 })
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

  const [zoom, setZoom] = React.useState(1)
  const zoomOptions = {
    min: 0.5,
    max: 1.5,
    step: 0.05
  }
  return (

      <div id='page' className={styles.page}
           onWheel={ (event) => {
             // event.preventDefault()
             if (event.deltaY < 0) {
               setZoom(zoom >= zoomOptions.max ? zoomOptions.max : zoom + zoomOptions.step)
             } else if (event.deltaY > 0) {
               setZoom(zoom <= zoomOptions.min ? zoomOptions.min : zoom - zoomOptions.step)
             }
             // const xPerc = (offset.x * 100) / window.screen.width
             // const yPerc = (offset.y * 100) / window.outerHeight
             // if (ref.current) { (ref.current as HTMLElement).style.transformOrigin = xPerc + '%' + ' ' + yPerc + '%' }
             // eslint-disable-next-line no-debugger
             // debugger
             (event.currentTarget.children[2] as HTMLElement).style.scale = `${zoom} `
           }
             // } onMouseMove={(e) => {
             //   x = e.clientX - (e.currentTarget as HTMLElement).offsetLeft
             //   y = e.clientY - (e.currentTarget as HTMLElement).offsetTop
             // }
           }
      >
            <div className={styles.preloader}>
              <PushSpinner
                  color="#686769"
                  id="preloader"
                  loading={loading}
                  size={30}
              />
            </div>
            {(!loading) && <>
                <div className={styles.btnOptions}>
              <span className={styles.gradeTitle}>
                  опыт работы
              </span>
                    <GradientGrade width={'14rem'}/>
                </div><GraphSelf data={data} grade={grade} ></GraphSelf>
                                            </>}
      </div>

  )
}

export default HomePage
