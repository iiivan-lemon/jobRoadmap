import React, { useEffect } from 'react'
import { type Options } from 'vis-network/standalone/esm/vis-network'

import useVisNetwork from './useVisNetwork'
// import GraphRoadMap from '../graph/Graph'
import { type GraphData } from 'react-vis-graph-wrapper'
import pSBC from 'shade-blend-color'
import styles from './Graph.module.css'

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
      randomSeed: 1,
      improvedLayout: true
      // hierarchical: true
      // hierarchical: {
      //     levelSeparation: 150,
      //     nodeSpacing: 100,
      // treeSpacing: 200,
      // blockShifting: true,
      // edgeMinimization: true,
      // parentCentralization: true,
      // direction: 'UD',        // UD, DU, LR, RL
      // sortMethod: 'directed'   // hubsize, directed
      // }
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
      scaling: {
        max: 75
      },
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
    const colors = ['#28C10F', '#ffe500', '#FB1A1A']
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
          size: 5,
          x: 0,
          y: 2
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
      hidden: false,
      size: 0,
      value: 0,
      scaling: {
        label: false
      },
      id: -1,
      label: title,
      shape: 'elipse',
      shadow: {
        enabled: true,
        color: 'black',
        size: 2,
        x: 0,
        y: 2
      },
      // color: {
      //   border: 'black',
      //   background: pSBC(0.3, '#808080'),
      //   highlight: {
      //     border: pSBC(0.3, '#808080'),
      //     background: pSBC(-0.3, '#808080')
      //   }
      // },
      color: {
        border: 'transparent',
        background: 'transparent',
        highlight: {
          border: 'transparent',
          background: 'transparent'
        }
      },
      font: {
        color: 'white',
        size: 36,
        bold: {
          mod: 'bold'
        },
        face: 'GT Eesti Pro Display, serif'
      }
    })
    const mainNode = graph[0]
    return {
      nodes: graph,
      edges: graph.map((el: { id: number, value: number, size: number }, index: number) => ({
        from: mainNode.id,
        to: el.id,
        length: 10 * (1 + index)
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
      // network.focus(-1)
      network.fit()
    })
    network.setData(setGraph(data))
    network.setOptions({ ...options, layout: { randomSeed: network.getSeed() } })
  }, [data])

  return (
        <>
            <button onClick={handleClickFocus}>Focus</button>
            <button onClick={handleClickFit}>Fit</button>
            <div className={styles.graphBlock} ref={ref}/>
        </>
  )
}
export default Graph
