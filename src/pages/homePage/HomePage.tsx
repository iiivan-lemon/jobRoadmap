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
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  const [
    grade,
    setGrade
  ] = React.useState({ begin: 0, end: 3 })
  const [
    isModalOpen,
    setIsModalOpen
  ] = useState(null)
  const changeSkills = (data, isHard) => {
    if (!data.length) {
      return []
    }

    return (data.filter((el:
    { technology_name: string, distance: number, professionalism: number, hard_skill: boolean }) => el.hard_skill === isHard))
  }

  const isCheckNode = (tech_name: string) => {
    if (isFinished(tech_name)) {
      setFinished(finished.filter(el => el !== tech_name))
    } else {
      // @ts-expect-error w3qrfre
      setFinished([...new Set(...finished, tech_name)])
    }
    if ((document.getElementsByClassName(tech_name)[0] as HTMLElement)) {
      (document.getElementsByClassName(tech_name)[0] as HTMLElement).classList.toggle('checkNode')
    }
  }

  const isFinished = (tech_name: string) => {
    return !!~finished.findIndex(el => el === tech_name)
  }

  const refGraph: React.RefObject<SVGSVGElement> | null = React.useRef(null)

  try {
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
            const rawData = (dataJob.payload as { errMessage: string, position_data: any, in_base: number }).position_data.additional
            if (rawData.length && changeSkills(rawData, isHard).filter(el => el.distance >= 0.1)?.length) {
              setData(rawData.filter(el => el.distance >= 0.1))
              setSkillCount(rawData.filter(el => el.distance >= 0.1).length)
            }
            setInBase((dataJob.payload as { errMessage: string, position_data: any, in_base: number }).in_base)
            setJobBack((dataJob.payload as { errMessage: string, position_data: any, in_base: number }).position_data.job_name)
          // setSkillCount((dataJob.payload as { errMessage: string, position_data: any, in_base: number }).position_data.technology_number)
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
      setGrade(headerGrade)
    }, [inputData])

    React.useEffect(() => {
      if (document.getElementById('graph-chart')) { (document.getElementById('graph-chart') as HTMLElement).innerHTML = '' }
      if (data.length && changeSkills(data, isHard).length) {
        if (isHard) {
          generateGraph(changeSkills(data, isHard), clickNode, grade, finished)
        } else {
          if (changeSkills(data, isHard).length > 2) {
            generateGraph(changeSkills(data, isHard), clickNode, { begin: 0, end: 3 }, finished)
          }
        }
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

    React.useEffect(() => {
      document.body.style.overflow = 'hidden'
      document.getElementById('header')?.classList.remove('headerFix')
    }, [])

    React.useEffect(() => {

    }, [headerGrade])

    React.useEffect(() => {
      if (refGraph?.current) {
        const list = refGraph.current?.getElementsByTagName('image')
        const text = refGraph.current?.getElementsByTagName('text')
        if (list && text && isHard) {
          [].forEach.call(list, function (el: HTMLElement) {
            if (+el.id < grade.begin || +el.id > grade.end) { el.style.filter = 'brightness(0.3)' } else {
              el.style.filter = ''
            }
          });
          [].forEach.call(text, function (el: HTMLElement) {
            if (+el.id < grade.begin || +el.id > grade.end) { el.style.filter = 'brightness(0.3)' } else {
              el.style.filter = ''
              el.style.filter = 'drop-shadow(1px 1px 1px black)'
            }
          })
        }
      }
    }, [grade])

    // const renderRangeSlider = () => {
    //   // eslint-disable-next-line no-debugger

    //   return
    // }

    React.useEffect(() => {
      const fav = document.getElementById('favSvg') as HTMLElement
      if (fav) {
        fav.style.visibility = isInBase ? 'visible' : 'hidden'
      }
    }, [isInBase])

    const clickNode = (el) => {
      setIsModalOpen({ ...el, isChecked: isFinished(el.technology_name) })
    }

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
  } catch (e) {
    setLoad(loadState.error)
  }
  const [zoom, setZoom] = React.useState(1)
  const zoomOptions = {
    min: 1,
    max: 1.2,
    step: 0.05
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
                <div style={{ width: 'fit-content', padding: '1rem', zIndex: '15' }} className={'btnOptions ' + styles.widjet}>
                  { isHard && <><span className='gradeTitleLeg'>
                  опыт работы
              </span>
                      <RangeSlider from={grade.begin} to={grade.end} onChange={(e) => {
                        setGrade({ begin: e.minIndex, end: e.maxIndex })
                      }} value={[0, 1, 2, 3]}></RangeSlider>
                    <GradientGrade width={'14rem'}/></> }
                  { (((changeSkills(data, false).length > 2)) &&
                      <button className={styles.tag + ' skillBtn'} onClick={() => {
                        setIsHard(!isHard)
                      }}> показать {(!isHard) ? 'hard ' : 'soft '} скиллы</button>)}
                </div>
                <div style={{ width: 'fit-content', padding: '1rem', zIndex: '15' }} className={'jobOptions ' + styles.widjet}><span className='gradeTitleLeg'>найдено: <span className='jobBackTitle'>{jobBack}</span></span><span className='gradeTitleLeg'>всего навыков: <span className='countTitle'>{skillCount}</span></span></div>
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
                  {null}
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
