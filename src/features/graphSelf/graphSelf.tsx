import React from 'react'
import './graphSelf.css'
import { type DataGraphState } from '../../models/dataGraph/dataGraphSlice'
import pSBC from 'shade-blend-color'
import { renderToString } from 'react-dom/server'
import { ReactComponent as NodeSvg } from '../../static/images/node.svg'

export const GraphSelf = ({ data, grade }) => {
  const addColorMap = (data: any[]): string[] => {
    data = [...new Set(data.map((el) => el.professionalism))]
      .sort((a, b) => a - b)
    const colors = [
      '#21c705',
      '#cbe520',
      '#e54e20'
    ]
    const res = new Map()
    data.forEach((el, i) => res.set(el, colors[i]))
    // Return res;
    return colors
  }
  const coloration = addColorMap([...data].sort((a: DataGraphState, b: DataGraphState) => b.distance - a.distance))
  const setNodeGradient = (coloration: string[], prof: number): string => {
    let resColor: string | null
    const fixProf = Number(prof.toFixed(2))
    if (fixProf < 0.5 && fixProf > 0) {
      resColor = pSBC(fixProf * 2, coloration[0], coloration[1])
    } else if (fixProf > 0.5 && fixProf < 1) {
      resColor = pSBC((fixProf - 0.5) * 2, coloration[1], coloration[2])
    } else {
      resColor = coloration[fixProf * 2]
    }
    return resColor ?? 'grey'
  }

  const distancesDesr = [0.25, 0.35, 0.5, 0.75, 1]
  const distances = distancesDesr.reverse()
  React.useEffect(() => {
    if (!data.length) {
      const list = document.getElementsByClassName('container');
      [].forEach.call(list, function (el: HTMLElement) {
        el.innerHTML = ''
      })
      return
    }

    const graphData = distances.map((el, index) => {
      return data.filter(e => {
        return (index + 1 === distances.length) ? e.distance <= el : e.distance <= el && e.distance > distances[index + 1]
      })
    })
    // eslint-disable-next-line array-callback-return
    graphData.filter(el => el.length).map((el, i) => {
      generate(el, i * 150 + distancesDesr[i] * 100, i * 150 + distancesDesr[i] * 100, 'graph' + i)
    })
    // generate(, 150, 150, 'graph')
    // generate(5, 300, 200, 'graph2')
  }, [data])

  React.useEffect(() => {

  }, [])

  function renderContainers () {
    return distances.map((el, index) => <div id={'graph' + index} className='container'></div>)
  }
  function filterGrade (value: number): boolean {
    // eslint-disable-next-line no-debugger
    return (grade.begin <= value && value <= grade.end)
  }

  const generate = function (n, rx, ry, id) {
    const theta = []
    const setup = function (n, rx, ry, id) {
      const main = document.getElementById(id) as HTMLElement
      const mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2))
      const circleArray: any[] = []
      for (let i = 0; i < n.length; i++) {
        const circle = document.createElement('div')
        circle.textContent = n[i].technology_name
        circle.className = 'svgNode circle number' + i
        circleArray.push(circle)
        circleArray[i].posx = Math.round(rx * (Math.cos(theta[i]))) + 'px'
        circleArray[i].posy = Math.round(ry * (Math.sin(theta[i]))) + 'px'
        circleArray[i].style.position = 'absolute'
        circleArray[i].style.width = n[i].distance * 100 + 'px'
        circleArray[i].style.height = n[i].distance * 100 + 'px'
        circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px'
        circleArray[i].style.left = ((mainHeight / 2) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px'
        // const newSvg = renderToString(<NodeSvg fill={((filterGrade(n[i].professionalism)) ? pSBC(0.2, setNodeGradient(coloration, n[i].professionalism)) : '#3A3A3A') as string} />)
        const newSvg = renderToString(<NodeSvg fill={(pSBC(0.2, setNodeGradient(coloration, n[i].professionalism))) as string} />)
        circleArray[i].style.backgroundImage = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(newSvg)}")`
        main.appendChild(circleArray[i])
      }
    }

    const frags = 360 / n.length
    for (let i = 0; i <= n.length; i++) {
      // @ts-expect-error dffge
      theta.push((frags / 180) * i * Math.PI)
    }
    setup(n, rx, ry, id)
  }

  return (
      <>
        {renderContainers()}
      </>
  )
}
