import React, { useRef, useState } from 'react'
import './graphSelf.css'
import { type DataGraphState } from '../../models/dataGraph/dataGraphSlice'
import pSBC from 'shade-blend-color'
import { renderToString } from 'react-dom/server'
import { ReactComponent as NodeSvg } from '../../static/images/node.svg'
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
        el.style.fill = 'transparent'
      } else {
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

  const distancesDesr = [0.15, 0.25, 0.5, 0.75, 1]
  const distances = distancesDesr.reverse()
  React.useEffect(() => {
    if (!data.length) {
      const list = document.getElementsByClassName('container');
      [].forEach.call(list, function (el: HTMLElement) {
        el.innerHTML = ''
      })
      return
    }

    const mainNode = data[0]
    // eslint-disable-next-line no-debugger
    if (!refMainNode.current?.children.length) {
      const graphData = distances.map((el, index) => {
        return data.filter((e, i) => {
          if (i === 0) {
            // eslint-disable-next-line array-callback-return
            return
          }
          return (index + 1 === distances.length) ? e.distance <= el : e.distance <= el && e.distance > distances[index + 1]
        })
      })

      // if (!refMainNode.current?.children.length) {
      // eslint-disable-next-line no-debugger
      generate([mainNode], 1, 1, 'graph')
      // eslint-disable-next-line array-callback-return
      graphData.filter(el => el.length).map((el, i) => {
        generate(el, (i + 1) * 150 + distancesDesr[i] * 150, (i + 1) * 100 + distancesDesr[i] * 100, 'graph' + i)
      })
      // }
    }
    // generate(, 150, 150, 'graph')
    // generate(5, 300, 200, 'graph2')
  }, [data])

  React.useEffect(() => {
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

  function renderContainers () {
    const arr = distances.map((el, index) => <div id={'graph' + index} className='container'></div>)
    arr.unshift(<div id='graph' ref={refMainNode} className='container'></div>)
    return arr
  }
  function filterGrade (value: number): boolean {
    // eslint-disable-next-line no-debugger
    return (grade.begin <= value && value <= grade.end)
  }

  const generate = function (n, rx, ry, id) {
    // eslint-disable-next-line no-debugger
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
        circleArray[i].style.position = 'absolute'
        circleArray[i].style.width = n[i].distance * 100 * (i + 1) + 'px'
        circleArray[i].style.height = n[i].distance * 100 * (i + 1) + 'px'
        circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px'
        circleArray[i].style.left = ((mainHeight / 2) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px'
        circleArray[i].click = (e) => {
          // eslint-disable-next-line no-debugger
          setIsModalOpen(e.current.id)
        }
        // const newSvg = renderToString(<NodeSvg fill={((filterGrade(n[i].professionalism)) ? pSBC(0.2, setNodeGradient(coloration, n[i].professionalism)) : '#3A3A3A') as string} />)
        // const newSvg = renderToString(<NodeSvg fill={(pSBC(0.2, setNodeGradient(coloration, n[i].professionalism))) as string} />)
        // circleArray[i].style.backgroundImage = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(newSvg)}")`
        const styles = {
          circle: {
            height: n[i].distance * 100 + 'px',
            width: n[i].distance * 100 + 'px',
            fill: (pSBC(0, (filterGrade(n[i].professionalism)) ? setNodeGradient(coloration, n[i].professionalism) : '#1B1B1B'))
          }
        }
        const StyledIcon = styled(NodeSvg)`
        ${styles.circle}`
        ReactDOM.render(<><span id={n[i].technology_name} className='titleNode'>{n[i].technology_name}</span><StyledIcon id={n[i].professionalism} /></>, circleArray[i])
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
    // eslint-disable-next-line no-debugger
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
  ] = useState('')

  return (
      <>
        <Draggable scale={1}>
        <div id='zoom' ref={ref}
        >
        {renderContainers()}
        </div></Draggable>
        {(isModalOpen) && <NodeModal
            nodeId={isModalOpen}
            nodeTitle={isModalOpen}
            onClose={() => {
              setIsModalOpen('')
            }}
        />}
      </>
  )
}
