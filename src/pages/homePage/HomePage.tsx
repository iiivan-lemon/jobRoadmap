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
    if (document.getElementById('graph-chart')) { (document.getElementById('graph-chart') as HTMLElement).innerHTML = '' }
    if (changeSkills(data, isHard).length) {
      (isHard)
        ? generateGraph(changeSkills(data, isHard).slice(0, 20), clickNode, grade)
        : generateGraph(changeSkills(data, isHard).slice(0, 20), clickNode, { begin: 0, end: 3 })
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

  const refGraph: React.RefObject<SVGSVGElement> | null = React.useRef(null)

  React.useEffect(() => {
    if (refGraph?.current) {
      const list = refGraph.current?.getElementsByTagName('image')
      const text = refGraph.current?.getElementsByTagName('text')
      if (list && text && isHard) {
        [].forEach.call(list, function (el: HTMLElement) {
          if (+el.id < grade.begin || +el.id > grade.end) { el.style.filter = 'brightness(0.3)' } else {
            el.style.filter = 'none'
          }
        });
        [].forEach.call(text, function (el: HTMLElement) {
          if (+el.id < grade.begin || +el.id > grade.end) { el.style.filter = 'brightness(0.3)' } else {
            el.style.filter = 'none'
            el.style.filter = 'drop-shadow(1px 1px 1px black)'
          }
        })
      }
    }
  }, [grade])

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
    max: 1.5,
    step: 0.05
  }
  const isFinished = (tech_name: string) => {
    return !!~finished.findIndex(el => el === tech_name)
  }
  const isCheckNode = (tech_name: string) => {
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

  const renderTitle = () => {
    const titles: JSX.Element[] = []
    if (refGraph?.current) {
      const gs = refGraph.current?.getElementsByTagName('g')

      // if (gs) {
      //   [].forEach.call(gs, function (el: HTMLElement) {
      //     el.getBoundingClientRect()
      //     titles.push(
      //       <div className='tooltip'
      //            // style={{ top: el.getBoundingClientRect().top, left: el.getBoundingClientRect().left }}
      //       >
      //         <img alt=""/>
      //         <div>
      //           <a></a>
      //           <span></span>
      //         </div>
      //       </div>)
      //   })
      // }
    }
    return titles
  }

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
                  { ((!!changeSkills(data, !isHard).length || (!!changeSkills(data, isHard).length)) && <button className={styles.tag + ' skillBtn'} onClick={() => { setIsHard(!isHard) }}> показать { (!isHard) ? 'hard ' : 'soft ' } скиллы</button>)}
                </div>
                <div className='jobOptions'><span className='gradeTitleLeg'>найдено: {jobBack}</span><span className='gradeTitleLeg'>всего навыков: {skillCount}</span></div>
                <div
                    style={{ width: '100%', height: '100%' }}
                onWheel={ (event) => {
                  event.stopPropagation()
                  const texts = event.currentTarget.getElementsByTagName('text')
                  if (texts) {
                    [].forEach.call(texts, function (el: HTMLElement) {
                      el.style.fontSize = '0.8rem'
                    })
                  }
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
                  if (event.currentTarget.children[0] as HTMLElement) {
                    // eslint-disable-next-line @typescript-eslint/func-call-spacing
                    (event.currentTarget.children[0] as HTMLElement).style.scale = `${zoom} `
                    const gs = (event.currentTarget.children[0] as HTMLElement).getElementsByTagName('g')
                    if (gs) {
                      [].forEach.call(gs, function (el: HTMLElement) {
                        // el.style.scale = `${1 / zoom}`
                      })
                    }
                    const texts = event.currentTarget.getElementsByTagName('text')
                    if (texts) {
                      [].forEach.call(texts, function (el: HTMLElement) {
                        el.style.fontSize = '0.8rem'
                      })
                    }
                  }
                }}
                >
                <Draggable scale={1} onStart={(event) => {
                  const e = event.currentTarget as HTMLElement
                  if (e) {
                    const texts = e.getElementsByTagName('text')
                    if (texts) {
                      [].forEach.call(texts, function (el: HTMLElement) {
                        el.style.fontSize = '0.8rem'
                      })
                    }
                  }
                }
                } >
                    <div style={{ position: 'relative', zIndex: '10' }}>
                 <svg ref={refGraph} id="graph-chart"
                      xmlns="http://www.w3.org/2000/svg"
                      // xlink = "http://www.w3.org/2000/xlink"
                      width="100%"
                      height="100%"
                      viewBox={'0 0 ' + window.innerWidth + ' ' + window.innerHeight}
                        />
                    </div>
                 </Draggable>
                  {null && renderTitle()}
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
        {/* <div className={styles.backCircleHome}></div> */}
      </div>

  )
}

export default HomePage
