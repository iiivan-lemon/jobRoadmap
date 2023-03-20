import React, { type FC } from 'react'

import VisGraph, {
  type GraphData,
  GraphEvents,
  type Options
} from 'react-vis-graph-wrapper'
import styles from './Graph.module.css'

interface GraphProps {
  data: any
}

const GraphRoadMap: FC<GraphProps> = ({ data }) => {
  const options: Options = {
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
      // hierarchical: true
      // hierarchical: {
      //     levelSeparation: 150,
      //     nodeSpacing: 100,
      //     treeSpacing: 200,
      //     blockShifting: true,
      //     edgeMinimization: true,
      //     parentCentralization: true,
      //     direction: 'UD',        // UD, DU, LR, RL
      //     sortMethod: 'directed'   // hubsize, directed
      // }
    },
    edges: {
      color: '#fff'
    },
    height: '500px',
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

  const setNodeColor = (data: any[]): Map<number, string> => {
    // @ts-expect-error
    data = [...new Set(data.map(el => el.grade))]
    const colors = ['green', 'blue', 'yellow', 'red', 'black']
    const res = new Map()
    data.forEach((el, i) => res.set(el, colors[i]))
    return res
  }

  const setGraph = (): GraphData => {
    data = data.sort((a: { value: number }, b: { value: number }) => a.value - b.value)
    const coloration = setNodeColor(data)
    let graph = data.map((i: { skill: any, value: number, grade: any }, index: any) => {
      return ({
        id: index,
        label: i.skill,
        value: data.length - i.value,
        shape: 'hexagon',
        color: {
          border: 'grey',
          background: coloration.get(i.grade),
          highlight: {
            border: 'grey',
            background: coloration.get(i.grade)
          },
          hover: {
            border: 'grey',
            background: 'grey'
          }
        }
      })
    })
    graph = graph.sort((a: { count: number }, b: { count: number }) => a.count - b.count)
    const mainNode = graph[0]

    return {
      nodes: graph,
      edges: graph.map((el: { id: any, value: number }) => ({
        from: mainNode.id,
        to: el.id,
        length: 30 * (data.length - el.value + 1)
      })).filter((el: { from: any, to: any }) => el.from !== el.to)
    }
  }

  const events = {
    select: function (event: { edges: any }) {
      const { edges } = event
    }
  }

  return (
        <div className={styles.graphBlock}>
            <VisGraph
                key={Math.random()}
                graph={setGraph()}
                options={options}
                events={events}
                getNetwork={(network: any) => {
                  //  if you want access to vis.js network api you can set the state in a parent component using this property
                  console.log(network)
                }}
            />
        </div>
  )
}

export default GraphRoadMap
