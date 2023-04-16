import React from 'react'
import './HomePage.css'
import './../../App.css'
import { PushSpinner } from 'react-spinners-kit'
import { getDataGraph } from '../../models/dataGraph/dataGraphSlice'
import { useAppDispatch } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { GraphSelf } from '../../components/graphSelf/graphSelf'
import GradientGrade from '../../components/gradientGrade/GradientGrade'
// import 'react-double-range-slider/dist/cjs/index.css'
import { RangeSlider } from 'react-double-range-slider'
import { loadState } from '../../utils/utils'
import { getFinished }
  from '../../models/check/checkNodeSlice'

const HomePage = ({ inputData, headerGrade }): JSX.Element => {
  const nav = useNavigate()
  const [data, setData] = React.useState([])
  const [finishedNodes, setFinished] = React.useState(new Set([]))
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    // setData([])
    // eslint-disable-next-line no-debugger
    setLoad(loadState.load)
    void dispatch(getDataGraph(inputData)).then(
      dataJob => {
        // eslint-disable-next-line no-debugger
        if (!dataJob.payload) {
          setLoad(loadState.error)
        } else {
          setLoad(loadState.res)
          setData(dataJob.payload)
        }
      }
    )
      .catch(() => {
        setLoad(loadState.error)
      })
    void dispatch(getFinished(inputData)).then(data => {
      if (!data.payload || !Array.isArray(data.payload)) {
        setFinished(new Set([]))
      } else {
        // @ts-expect-error dawd
        setFinished(new Set(data.payload))
      }
    })
  }, [inputData])
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  const [
    grade,
    setGrade
  ] = React.useState({ begin: 0, end: 3 })
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.getElementById('header')?.classList.remove('headerFix')
  }, [])
  // React.useEffect(() => {
  //   // eslint-disable-next-line no-debugger
  //   debugger
  //   if (!data) {
  //     setLoad(loadState.error)
  //     nav('/')
  //   } else if (data.length > 0) {
  //     setLoad(loadState.res)
  //   }
  // }, [data])
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
                  loading={loading === loadState.load}
                  size={30}
              />
            </div>
            {(loading === loadState.res) && <>
                <div className='btnOptions'>
              <span className='gradeTitle'>
                  опыт работы
              </span>
                    <RangeSlider from={grade.begin} to={grade.end} onChange={(e) => {
                      setGrade({ begin: e.minIndex, end: +e.maxIndex })
                    }} value={[0, 1, 2, 3]}></RangeSlider>
                    <GradientGrade width={'14rem'}/>
                </div>
                <GraphSelf data={data} grade={grade} finishedNodes={finishedNodes} ></GraphSelf>
                                            </>}
      </div>

  )
}

export default HomePage
