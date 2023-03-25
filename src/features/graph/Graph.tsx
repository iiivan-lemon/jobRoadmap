import React, { type FC } from 'react'
import VisGraph, {
  type Options
} from 'react-vis-graph-wrapper'
import styles from './Graph.module.css'

interface GraphProps {
  data: any
  title: string
}

const GraphRoadMap: FC<GraphProps> = ({ data, title }) => {
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

  // const addColorMap = (data: any[]): string[] => {
  //   // @ts-expect-error set iter need fix
  //   data = [...new Set(data.map(el => el.professionalism))]
  //     .sort((a, b) => a - b)
  //   const colors = ['#28C10F', '#146FC3', '#FB1A1A']
  //   const res = new Map()
  //   data.forEach((el, i) => res.set(el, colors[i]))
  //   // return res;
  //   return colors
  // }

  // const setNodeGradient = (coloration: string[], prof: number): string => {
  //   let resColor: string | null
  //   const fixProf = Number(prof.toFixed(2))
  //   if (fixProf < 0.5 && fixProf > 0) {
  //     resColor = pSBC(fixProf * 2, coloration[0], coloration[1])
  //   } else if (fixProf > 0.5 && fixProf < 1) {
  //     resColor = pSBC((fixProf - 0.5) * 2, coloration[1], coloration[2])
  //   } else {
  //     resColor = coloration[fixProf * 2]
  //   }
  //   return resColor ?? 'grey'
  // }
  //
  // const events = {
  // }

  return (
        <React.Fragment>
            <div></div>
            <div className={styles.graphBlock}>
                <VisGraph
                    key={Math.random()}
                    graph={data}
                    options={options}
                    getNetwork={(network: any) => {
                      // useNetwork()
                      // setNetwork(network)
                      //  if you want access to vis.js network api you can set the state in a parent component using this property
                    }}
                />
            </div>
        </React.Fragment>
  )
}

export default GraphRoadMap
