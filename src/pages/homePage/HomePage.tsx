import React from 'react'
import Graph from '../../features/visGraph/Graph'
import './HomePage.css'
import './../../App.css'
import { PushSpinner } from 'react-spinners-kit'
import { getDataGraph, selectDataGraph } from '../../models/dataGraph/dataGraphSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { GraphSelf } from '../../features/graphSelf/graphSelf'
import Draggable from 'react-draggable'
import GradientGrade from '../../features/gradientGrade/GradientGrade'
// import 'react-double-range-slider/dist/cjs/index.css'
import { RangeSlider } from 'react-double-range-slider'
import { getJobs } from '../../models/dataJobs/dataJobsSlice'
const HomePage = ({ inputData, headerGrade }): JSX.Element => {
  const nav = useNavigate()
  const [data, setData] = React.useState([])
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    // setData([])
    void dispatch(getDataGraph(inputData)).then(
      dataJob => {
        setLoad(false)
        setData(dataJob.payload)
      }
    )
      .catch(() => { setLoad(true); setData([]) })
  }, [inputData])
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
    debugger
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
    min: 0.1,
    max: 1.5,
    step: 0.05
  }

  return (

      <div id='page' className='page'
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

             //
             if (event.currentTarget.children[2] as HTMLElement) { (event.currentTarget.children[2] as HTMLElement).style.scale = `${zoom} ` }
           }
             // } onMouseMove={(e) => {
             //   x = e.clientX - (e.currentTarget as HTMLElement).offsetLeft
             //   y = e.clientY - (e.currentTarget as HTMLElement).offsetTop
             // }
           }
      >
            <div className='preloader'>
              <PushSpinner
                  color="#686769"
                  id="preloader"
                  loading={loading}
                  size={30}
              />
            </div>
            {(!loading) && <>
                <div className='btnOptions'>
              <span className='gradeTitle'>
                  опыт работы
              </span>
                    <RangeSlider from={grade.begin} to={grade.end} onChange={(e) => {
                      setGrade({ begin: e.minIndex, end: +e.maxIndex })
                    }} value={[0, 1, 2, 3]}></RangeSlider>
                    <GradientGrade width={'14rem'}/>
                </div>
                <GraphSelf data={data} grade={grade} ></GraphSelf>
                                            </>}
      </div>

  )
}

export default HomePage
