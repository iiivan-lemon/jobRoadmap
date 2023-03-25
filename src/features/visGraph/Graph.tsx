import React, { useEffect } from 'react'
import { type Options } from 'vis-network/standalone/esm/vis-network'

import useVisNetwork from './useVisNetwork'
// import GraphRoadMap from '../graph/Graph'
import { type GraphData } from 'react-vis-graph-wrapper'
import pSBC from 'shade-blend-color'

interface GraphProps {
  data: any
  title: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,react/display-name
const Graph = ({ data, title }: GraphProps) => {
  const options: Options = {
    height: '100%',
    width: '100%',
    physics: {
      barnesHut: { gravitationalConstant: -30000 },
      stabilization: { iterations: 2500 }
    },
    interaction: {
      keyboard: false,
      dragNodes: false,
      dragView: true
    },
    layout: {
      randomSeed: undefined,
      improvedLayout: true
    },
    edges: {
      physics: true,
      width: 2,
      color: 'transparent',
      arrows: { to: { enabled: false } }
    },
    nodes: {
      borderWidth: 1,
      borderWidthSelected: 2,
      brokenImage: undefined,
      chosen: true,

      font: {
        color: '#fff',
        size: 18,
        bold: {
          mod: 'bold'
        }
      }
    }

  }
  const addColorMap = (data: any[]): string[] => {
    // @ts-expect-error set iter need fix
    data = [...new Set(data.map(el => el.professionalism))]
      .sort((a, b) => a - b)
    const colors = ['#28C10F', '#146FC3', '#FB1A1A']
    const res = new Map()
    data.forEach((el, i) => res.set(el, colors[i]))
    // return res;
    return colors
  }

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
  const setGraph = (data: any): GraphData => {
    data = data.sort((a: { distance: number }, b: { distance: number }) => b.distance - a.distance)
    const coloration = addColorMap(data)
    let graph = data.map((i: { name: any, distance: number, professionalism: number }, index: any) => {
      return ({
        scaling: {
          label: false
        },
        size: i.distance,
        id: index,
        label: i.name,
        value: (data.length - index) * 1000,
        shape: 'hexagon',
        shadow: {
          enabled: true,
          color: setNodeGradient(coloration, i.professionalism),
          size: 10,
          x: 0,
          y: 4
        },
        color: {
          border: setNodeGradient(coloration, i.professionalism),
          background: pSBC(0.5, setNodeGradient(coloration, i.professionalism)),
          highlight: {
            border: pSBC(0.3, setNodeGradient(coloration, i.professionalism)),
            background: pSBC(-0.3, setNodeGradient(coloration, i.professionalism))
          }
        }
      })
    })
    graph = graph.sort((a: { count: number }, b: { count: number }) => a.count - b.count)
    graph.unshift({
      scaling: {
        label: false
      },
      id: -1,
      label: title,
      value: (data.length) * 1000,
      shape: 'box',
      shadow: {
        enabled: true,
        color: 'white',
        size: 2,
        x: 0,
        y: 4
      },
      color: {
        border: 'white',
        background: pSBC(0.3, '#808080'),
        highlight: {
          border: pSBC(0.3, '#808080'),
          background: pSBC(-0.3, '#808080')
        }
      }
    })
    const mainNode = graph[0]
    // eslint-disable-next-line no-debugger
    return {
      nodes: graph,
      edges: graph.map((el: { id: number, value: number, size: number }, index: number) => ({
        from: mainNode.id,
        to: el.id,
        length: index * 10
      })).filter((el) => el.to !== el.from)
    }
  }

  const { ref, network } = useVisNetwork({ ...setGraph(data), options })

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClickFocus = () => {
    if (!network) return
    // network.fit()
    network.focus(-1)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClickFit = () => {
    if (!network) return
    network.fit()
  }

  useEffect(() => {
    if (!network) return

    network.once('beforeDrawing', () => {
      // eslint-disable-next-line no-debugger
      // network.focus(-1)
      network.fit()
    })
    // eslint-disable-next-line no-debugger
    network.setData(setGraph(data))
  }, [data])

  return (
        <>
            <button onClick={handleClickFocus}>Focus</button>
          <button onClick={handleClickFit}>Fit</button>
            <div style={{ height: '100%', width: '100%' }} ref={ref}/>
        </>
  )
}
export default Graph
