import React, { useRef, useState } from 'react'
import './graphSelf.css'
import { type DataGraphState } from '../../models/dataGraph/dataGraphSlice'
import pSBC from 'shade-blend-color'
import { ReactComponent as NodeSvg } from '../../static/images/svg-hex.svg'
// import { ScrollZoom } from './zoom/Zoom'
import Draggable from 'react-draggable'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import NodeModal from '../nodeModal/NodeModal'

export const GraphSelf = ({ data, grade }) => {
  React.useEffect(() => {
    const svgs = ref.current?.getElementsByTagName('svg');
    [].forEach.call(svgs, function (el: SVGSVGElement) {
      // const styles = {
      //   grade: {
      //     fill: (pSBC(0, (filterGrade(+el.id)) ? setNodeGradient(coloration, +el.id) : 'black'))
      //   }
      // }
      if (!(filterGrade(+el.id))) {
        (el.parentElement as HTMLElement).style.filter = 'brightness(0.2) grayscale(1)'
      } else {
        (el.parentElement as HTMLElement).style.filter = ''
        el.style.fill = pSBC(0, setNodeGradient(coloration, +el.id)) as string
      }
      // styled(el)`
      //   ${styles.grade}`
    })
  }, [grade])
  const addColorMap = (data: any[]): string[] => {
    data = [...new Set(data.map((el) => el.professionalism))]
      .sort((a, b) => a - b)
    const colors = [
      '#7bf36a',
      '#c5fa59',
      '#faf754',
      '#ef7e5b'
    ]
    const res = new Map()
    data.forEach((el, i) => res.set(el, colors[i]))
    // Return res;
    return colors
  }
  const coloration = addColorMap([...data].sort((a: DataGraphState, b: DataGraphState) => b.distance - a.distance))
  const setNodeGradient = (coloration: string[], prof: number): string => {
    let resColor: string | null

    // eslint-disable-next-line prefer-const
    resColor = coloration[prof]

    return resColor ?? 'grey'
  }

  const [containersRender, setContainersRender] = useState(false)

  const distancesDesr = [0.15, 0.25, 0.5, 0.75, 1]
  const distances = distancesDesr.reverse()
  React.useEffect(() => {
    if (!data.length) {
      setContainersRender(false)
      const list = document.getElementsByClassName('container');
      [].forEach.call(list, function (el: HTMLElement) {
        el.innerHTML = ''
      })
      return
    }
    // const mainNode = data[0]

    if (!refMainNode.current?.children.length) {
      const dataCircles = []
      let t = 0
      for (let i = 1; i < data.length; i += 2) {
        const subArr = []

        // eslint-disable-next-line no-unmodified-loop-condition
        for (let j = t; j < (i + t); ++j) {
          if (j < data.length) {
            // @ts-expect-error sef
            subArr.push(data[j])
          }
        }
        t = i + t
        // @ts-expect-error sef
        dataCircles.push(subArr)
      }

      const graphData = distances.map((el, index) => {
        return data.filter((e, i) => {
          if (i === 0) {
            // eslint-disable-next-line array-callback-return
            return
          }
          return (index + 1 === distances.length) ? e.distance <= el : e.distance <= el && e.distance > distances[index + 1]
        })
      })

      // @ts-expect-error sef
      dataCircles.filter(el => el.length).forEach((el, i) => {
        if (!i) {
          generate(el, 0, 0, 'graph' + i)
          return
        }
        generate(el, (i - 1) * 500 + 700, (i - 1) * 500 + 700, 'graph' + i)
      })
      // if (!refMainNode.current?.children.length) {

      // generate([mainNode], 1, 1, 'graph')
      // // eslint-disable-next-line array-callback-return
      // graphData.filter(el => el.length).map((el, i) => {
      //   generate(el, (i + 1) * 150 + distancesDesr[i] * 150, (i + 1) * 100 + distancesDesr[i] * 100, 'graph' + i)
      // })
      // }
    }
    // generate(, 150, 150, 'graph')
    // generate(5, 300, 200, 'graph2')
  }, [data])

  React.useEffect(() => {
    setContainersRender(true)
    // const script = document.createElement('script')
    //
    // script.src = 'https://draggable-html-elements.glitch.me/script.js'
    // script.async = true
    //
    // document.body.appendChild(script)
    //
    // return () => {
    //   document.body.removeChild(script)
    // }
  }, [])

  function renderContainers (data) {
    if (!data.length) {
      return (<div></div>)
    }
    const arr: JSX.Element[] = []
    for (let i = 0; i <= Math.round(Math.sqrt(data.length)); ++i) {
      if (!i) {
        arr.push(<div ref={refMainNode} id={'graph' + i} className='container'></div>)
      } else { arr.push(<div id={'graph' + i} className='container'></div>) }
    }
    return arr
  }
  function filterGrade (value: number): boolean {
    return (grade.begin <= value && value <= grade.end)
  }

  const generate = function (n, rx, ry, id) {
    const theta = []
    const setup = function (n, rx, ry, id) {
      const main = document.getElementById(id) as HTMLElement
      const mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2))
      const circleArray: any[] = []
      for (let i = 0; i < n.length; i++) {
        // const c = <div></div>
        const circle = document.createElement('div')
        circle.className = 'svgTitle circle number' + i
        circle.before('')
        circleArray.push(circle)

        circleArray[i].posx = Math.round(rx * (Math.cos(theta[i]))) + 'px'
        circleArray[i].posy = Math.round(ry * (Math.sin(theta[i]))) + 'px'
        circleArray[i].style.filter = !(filterGrade(n[i].professionalism)) ? 'brightness(0.2) grayscale(1) ' : ''
        circleArray[i].style.position = 'absolute'
        circleArray[i].style.width = n[i].distance * 500 * (i + 1) + 'px'
        // circleArray[i].style.height = n[i].distance * 100 * (i + 1) + 'px'
        if (n.length === 1) {
          circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px'
          circleArray[i].style.left = ((mainHeight / 2) - parseInt(circleArray[i].posx.slice(0, -2))) + 'px'
        } else {
          circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px'
          circleArray[i].style.left = ((mainHeight / 2) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px'
        }
        // const newSvg = renderToString(<NodeSvg fill={((filterGrade(n[i].professionalism)) ? pSBC(0.2, setNodeGradient(coloration, n[i].professionalism)) : '#3A3A3A') as string} />)
        // const newSvg = renderToString(<NodeSvg fill={(pSBC(0.2, setNodeGradient(coloration, n[i].professionalism))) as string} />)
        // circleArray[i].style.backgroundImage = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(newSvg)}")`
        const styles = {
          circle: {
            height: n[i].distance * 500 + 'px',
            width: n[i].distance * 500 + 'px',
            fill: (pSBC(0, setNodeGradient(coloration, n[i].professionalism)))
          }
        }
        const StyledIcon = styled(NodeSvg)`
        ${styles.circle}`
        ReactDOM.render(<><span onClick = {(e) => {
          setIsModalOpen(n[i])
        }}
          id={n[i].technology_name} className='titleNode'>{n[i].technology_name}</span><StyledIcon
          onClick = {(e) => {
            setIsModalOpen(n[i])
          }}
          id={n[i].professionalism} /></>, circleArray[i])
        // svgsArray.push(
        //     <div className={'svgTitle'}>
        //   <ResSvg>
        //     </ResSvg>
        //     </div>
        // )

        main.appendChild(circleArray[i])
      }
      // ReactDOM.render(svgsArray, main)
    }

    const frags = 360 / n.length
    for (let i = 0; i <= n.length; i++) {
      // @ts-expect-error dffge
      theta.push((frags / 180) * i * Math.PI)
    }
    setup(n, rx, ry, id)
  }

  const refSvg = useRef(null)
  const ref = useRef<HTMLDivElement | null>(null)
  const refMainNode = useRef<HTMLDivElement | null>(null)
  // let x = 0
  // let y = 0
  // React.useEffect(() => {
  //
  // }, [offset])

  // const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [
    isModalOpen,
    setIsModalOpen
  ] = useState(null)

  return (
      <>
        <Draggable scale={1}>
        <div id='zoom' ref={ref}
        >
        {renderContainers(data)}
        </div></Draggable>
        {(isModalOpen) && <NodeModal
            node={isModalOpen}
            onClose={() => {
              setIsModalOpen(null)
            }}
        />}
      </>
  )
}
