import React, { useState } from 'react'
import './HomePage.css'
import './../../App.css'
import Draggable from 'react-draggable'
import { PushSpinner } from 'react-spinners-kit'
import { getDataGraph } from '../../models/dataGraph/dataGraphSlice'
import { useAppDispatch } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { GraphSelf } from '../../components/graphSelf/graphSelf'
import GradientGrade from '../../components/gradientGrade/GradientGrade'
import styles from '../newUserPage/NewUserPage.module.css'
import { RangeSlider } from 'react-double-range-slider'
import { loadState } from '../../utils/utils'
import { getFinished }
  from '../../models/check/checkNodeSlice'
import { ErrorModal } from '../../components/errorModal/errorModal'
import { generateGraph } from '../../components/bubbleChart/graphChart'
import NodeModal from '../../components/nodeModal/NodeModal'

const HomePage = ({ inputData, headerGrade, sendJob }): JSX.Element => {
  const nav = useNavigate()
  const [data, setData] = React.useState([])
  const [errMessage, setErrMessage] = React.useState('что-то пошло не так')
  const [finished, setFinished] = React.useState([])
  const [isHard, setIsHard] = React.useState(true)
  const [isInBase, setInBase] = React.useState(1)
  const [jobBack, setJobBack] = React.useState('')
  const [skillCount, setSkillCount] = React.useState(0)
  const changeSkills = (data, isHard) => {
    if (!data.length) {
      return []
    }
    // return data
    return (data.filter((el:
    { technology_name: string, distance: number, professionalism: number, hard_skill: boolean }) => el.hard_skill === isHard))
  }

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    if (inputData === '') {
      nav('/')
    }

    setLoad(loadState.load)

    void dispatch(getDataGraph(inputData)).then(
      (dataJob) => {
        if ((dataJob.payload as { errMessage: string, position_data: any, in_base: number }).errMessage) {
          setErrMessage((dataJob.payload as { errMessage: string, position_data: any, in_base: number }).errMessage)
          setLoad(loadState.error)
        } else {
          setLoad(loadState.res)
          setData((dataJob.payload as { errMessage: string, position_data: any, in_base: number }).position_data.additional)
          setInBase((dataJob.payload as { errMessage: string, position_data: any, in_base: number }).in_base)
          setJobBack((dataJob.payload as { errMessage: string, position_data: any, in_base: number }).position_data.job_name)
          setSkillCount((dataJob.payload as { errMessage: string, position_data: any, in_base: number }).position_data.technology_number)
        }
      }
    )
      .catch(() => {
        setLoad(loadState.error)
      })
    void dispatch(getFinished(inputData)).then(data => {
      if (!data.payload || !Array.isArray(data.payload)) {
        setFinished([])
      } else {
        // @ts-expect-error dawd
        setFinished(data.payload)
      }
    })
  }, [inputData])

  React.useEffect(() => {
    if (data.length) {
      generateGraph(changeSkills(data, isHard).slice(0, 20), clickNode)
    }
  }, [data, isHard])

  React.useEffect(() => {
    void dispatch(getFinished(inputData)).then(data => {
      if (!data.payload || !Array.isArray(data.payload)) {
        setFinished([])
      } else {
        // @ts-expect-error dawd
        setFinished(data.payload)
      }
    })
    if (!isHard) {
      setGrade({ begin: 0, end: 3 })
    }
  }, [isHard])
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

  React.useEffect(() => {
    setGrade(headerGrade)
  }, [headerGrade])

  const renderRangeSlider = () => {
    return <RangeSlider onChange={(e) => {
      setGrade({ begin: e.minIndex, end: e.maxIndex })
    }} value={[0, 1, 2, 3]}></RangeSlider>
  }

  React.useEffect(() => {
    const fav = document.getElementById('favSvg') as HTMLElement
    if (fav) {
      fav.style.visibility = isInBase ? 'visible' : 'hidden'
    }
  }, [isInBase])

  const [zoom, setZoom] = React.useState(1)
  const zoomOptions = {
    min: 1,
    max: 2,
    step: 0.05
  }
  const isFinished = (tech_name: string) => {
    return !!~finished.findIndex(el => el === tech_name)
  }
  const isCheckNode = (tech_name: string) => {
    // eslint-disable-next-line no-debugger

    isFinished(tech_name)
      ? setFinished(finished.filter(el => el !== tech_name))
      // @ts-expect-error awdawd
      : setFinished([...new Set(...finished, tech_name)]);
    ((document.getElementById(tech_name) as HTMLElement).parentElement as HTMLElement).classList.toggle('checkNode')
  }

  const clickNode = (el) => {
    setIsModalOpen({ ...el, isChecked: isFinished(el.technology_name) })
  }

  const [
    isModalOpen,
    setIsModalOpen
  ] = useState(null)

  return (

      <div id='page' className='page'
           // onWheel={ (event) => {
           //   // // eslint-disable-next-line no-debugger
           //   if ((event.target as HTMLElement).classList.contains('profList')) {
           //     return
           //   }
           //   // event.preventDefault()
           //   if (event.deltaY < 0) {
           //     setZoom(zoom >= zoomOptions.max ? zoomOptions.max : zoom + zoomOptions.step)
           //   } else if (event.deltaY > 0) {
           //     setZoom(zoom <= zoomOptions.min ? zoomOptions.min : zoom - zoomOptions.step)
           //   }
           //   // const xPerc = (offset.x * 100) / window.screen.width
           //   // const yPerc = (offset.y * 100) / window.outerHeight
           //   // if (ref.current) { (ref.current as HTMLElement).style.transformOrigin = xPerc + '%' + ' ' + yPerc + '%' }
           //
           //   //
           //   if (event.currentTarget.children[3] as HTMLElement) { (event.currentTarget.children[3] as HTMLElement).style.scale = `${zoom} ` }
           // }
           //   // } onMouseMove={(e) => {
           //   //   x = e.clientX - (e.currentTarget as HTMLElement).offsetLeft
           //   //   y = e.clientY - (e.currentTarget as HTMLElement).offsetTop
           //   // }
           // }
      >
            <div className='preloader'>
              <PushSpinner
                  color="#686769"
                  id="preloader"
                  loading={loading === loadState.load}
                  size={30}
              />
            </div>
        { (loading === loadState.error) && <ErrorModal message={errMessage}/>}
            {(loading === loadState.res) && <>
                <div className='btnOptions'>
                  { isHard && <><span className='gradeTitleLeg'>
                  опыт работы
              </span>
                  {renderRangeSlider()}
                    <GradientGrade width={'14rem'}/></> }
                  { !!changeSkills(data, false).length && <button className={styles.tag + ' skillBtn'} onClick={() => { setIsHard(!isHard) }}> показать { (!isHard) ? 'hard ' : 'soft ' } скиллы</button>}
                </div>
                <div className='jobOptions'><span className='gradeTitleLeg'>найдено: {jobBack}</span><span className='gradeTitleLeg'>всего навыков: {skillCount}</span></div>
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
                }}>
                <Draggable scale={1} >
                 <svg id="graph-chart"/>
                 </Draggable>
                 <div className='tooltip'>
                    <img alt=""/>
                    <div>
                        <a></a>
                        <span></span>
                    </div>
                 </div>
                </div>
                {/*  <GraphSelf sendJob={sendJob} isHard={isHard} data={changeSkills(data, isHard)} grade={grade} finishedNodes={finishedNodes} ></GraphSelf> */}
                                            </>}
        {(isModalOpen) && <NodeModal
            sendJob={sendJob}
            isChecked={isCheckNode}
            node={isModalOpen}
            onClose={() => {
              setIsModalOpen(null)
            }}
        />}
      </div>

  )
}

export default HomePage
