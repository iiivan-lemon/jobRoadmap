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
    physics: {
      enabled: true,
      barnesHut: {
        theta: 0.5,
        gravitationalConstant: -2000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 0
      },
      forceAtlas2Based: {
        theta: 0.5,
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springConstant: 0.08,
        springLength: 100,
        damping: 0.4,
        avoidOverlap: 0
      },
      repulsion: {
        centralGravity: 0.2,
        springLength: 200,
        springConstant: 0.05,
        nodeDistance: 100,
        damping: 0.09
      },
      hierarchicalRepulsion: {
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.01,
        nodeDistance: 120,
        damping: 0.09,
        avoidOverlap: 0
      },
      maxVelocity: 50,
      minVelocity: 0.1,
      solver: 'forceAtlas2Based',
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 100,
        onlyDynamicEdges: false,
        fit: true
      },
      timestep: 0.5,
      adaptiveTimestep: true,
      wind: { x: 0, y: 0 }
    },
    height: '100%',
    width: '100%',
    // physics: true,
    interaction: {
      keyboard: false,
      dragNodes: false,
      dragView: true
    },
    layout: {
      randomSeed: 2,
      improvedLayout: true
    },
    edges: {
      width: 2,
      color: 'transparent',
      arrows: { to: { enabled: false } },
      physics: false
      // scaling: {
      //   min: 1,
      //   max: 1
      // }
    },
    nodes: {
      scaling: {
        min: 20,
        max: 50
      },
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
    console.log({
      nodes: graph,
      edges: graph.map((el: { id: number, value: number, size: number }, index: number) => ({
        from: mainNode.id,
        to: el.id,
        length: (el.id > -1) ? 1 - data[el.id].distance : 1
      })).filter((el) => el.to !== el.from)
    })
    return {
      nodes: graph,
      edges: graph.map((el: { id: number, value: number, size: number }, index: number) => ({
        from: mainNode.id,
        to: el.id,
        length: 10 * (graph.length - index)
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
