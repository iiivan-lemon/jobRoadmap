// import React, { useEffect, useState } from 'react'
// import { type Options } from 'vis-network/standalone/esm/vis-network'
//
// import useVisNetwork, { type UseVisNetworkOptions } from './useVisNetwork'
//
// /*
//  * Import GraphRoadMap from '../graph/Graph'
//  * import { type GraphData } from 'react-vis-graph-wrapper'
//  */
// import pSBC from 'shade-blend-color'
// import styles from './Graph.module.css'
// import { type Data, type DataInterfaceNodes, type Node } from 'vis-network/declarations/network/Network'
// import NodeModal from '../nodeModal/NodeModal'
// import { type DataGraphState } from '../../models/dataGraph/dataGraphSlice'
// import { ReactComponent as YourSvg } from '../../static/images/node.svg'
// import ii from './node.png'
// import { renderToString } from 'react-dom/server'
// import GradientGrade from '../gradientGrade/GradientGrade'
//
// /*
//  * Interface GraphProps {
//  *   data: any
//  *   title: string
//  * }
//  * import { recolorSVGString } from 'recolor-img'
//  */
//
// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,react/display-name
// const Graph = ({ data, title, grade }) => {
//   const options: Options = {
//     height: '100%',
//     width: '100%',
//     physics: {
//       barnesHut: {
//         centralGravity: 1,
//         gravitationalConstant: -50000,
//         avoidOverlap: 0,
//         springLength: 0
//       },
//       stabilization: { iterations: 250000, onlyDynamicEdges: true }
//
//     },
//     // interaction: {
//     //   keyboard: false,
//     //   dragNodes: false,
//     //   dragView: true
//     // },
//     layout: {
//       randomSeed: 2,
//       improvedLayout: true
//
//       /*
//        * Hierarchical: true
//        * hierarchical: {
//        *     levelSeparation: 150,
//        *     nodeSpacing: 100,
//        * treeSpacing: 200,
//        * blockShifting: true,
//        * edgeMinimization: true,
//        * parentCentralization: true,
//        * direction: 'UD',        // UD, DU, LR, RL
//        * sortMethod: 'directed'   // hubsize, directed
//        * }
//        */
//     },
//     edges: {
//       // physics: false,
//       width: 2,
//       color: 'white',
//       arrows: { to: { enabled: false } }
//     },
//     nodes: {
//       scaling: {
//         min: 16,
//         max: 50
//       },
//       shape: 'image',
//       brokenImage: ii,
//       borderWidth: 1,
//       borderWidthSelected: 2,
//       chosen: true,
//       // scaling: {
//       //   max: 75
//       // },
//       font: {
//         color: '#fff',
//         size: 18,
//         bold: {
//           mod: 'bold'
//         }
//       }
//     }
//
//   }
//   const addColorMap = (data: any[]): string[] => {
//     data = [...new Set(data.map((el) => el.professionalism))]
//       .sort((a, b) => a - b)
//     const colors = [
//       '#21c705',
//       '#cbe520',
//       '#e54e20'
//     ]
//     const res = new Map()
//     data.forEach((el, i) => res.set(el, colors[i]))
//     // Return res;
//     return colors
//   }
//
//   const setNodeGradient = (coloration: string[], prof: number): string => {
//     let resColor: string | null
//     const fixProf = Number(prof.toFixed(2))
//     if (fixProf < 0.5 && fixProf > 0) {
//       resColor = pSBC(fixProf * 2, coloration[0], coloration[1])
//     } else if (fixProf > 0.5 && fixProf < 1) {
//       resColor = pSBC((fixProf - 0.5) * 2, coloration[1], coloration[2])
//     } else {
//       resColor = coloration[fixProf * 2]
//     }
//     return resColor ?? 'black'
//   }
//   const setGraph = (data: any[]): Data => {
//     const dataGraph = [...data].sort((a: DataGraphState, b: DataGraphState) => b.distance - a.distance)
//     const coloration = addColorMap(dataGraph)
//     let graph = dataGraph.map((i: { technology_name: any, distance: number, professionalism: number }, index: any) => ({
//       scaling: {
//         label: false
//       },
//       image: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(renderToString(<YourSvg fill={((filterGrade(i.professionalism)) ? pSBC(0.2, setNodeGradient(coloration, i.professionalism)) : '#3A3A3A') as string} />))}`,
//       // size: i.distance,
//       id: index,
//       label: i.technology_name,
//       value: i.distance * 1000,
//       shadow: {
//         enabled: (filterGrade(i.professionalism)),
//         color: setNodeGradient(coloration, i.professionalism),
//         size: 5,
//         x: 0,
//         y: 2
//       },
//       color: {
//         border: (filterGrade(i.professionalism)) ? setNodeGradient(coloration, i.professionalism) : '#3A3A3A',
//         // Border: setNodeGradient(coloration, i.professionalism),
//         background: (filterGrade(i.professionalism)) ? pSBC(0.2, setNodeGradient(coloration, i.professionalism)) : '#3A3A3A',
//         highlight: {
//           border: pSBC(0.3, setNodeGradient(coloration, i.professionalism)),
//           background: pSBC(-0.3, setNodeGradient(coloration, i.professionalism))
//         }
//       },
//       font: {
//         color: 'white',
//         size: 20,
//         bold: {
//           mod: 'bold'
//         },
//         face: 'GT Eesti Pro Display, serif'
//       }
//     }))
//     graph = graph.sort((a, b) => b.value - a.value)
//
//     /*
//      * Graph.unshift({
//      *   size: 0,
//      *   value: 0,
//      *   scaling: {
//      *     label: false
//      *   },
//      *   id: -1,
//      *   label: title,
//      *   shadow: {
//      *     enabled: true,
//      *     color: 'black',
//      *     size: 2,
//      *     x: 0,
//      *     y: 2
//      *   },
//      *   // color: {
//      *   //   border: 'black',
//      *   //   background: pSBC(0.3, '#808080'),
//      *   //   highlight: {
//      *   //     border: pSBC(0.3, '#808080'),
//      *   //     background: pSBC(-0.3, '#808080')
//      *   //   }
//      *   // },
//      *   color: {
//      *     border: 'transparent',
//      *     background: 'transparent',
//      *     highlight: {
//      *       border: 'transparent',
//      *       background: 'transparent'
//      *     }
//      *   },
//      *   font: {
//      *     color: 'white',
//      *     size: 30,
//      *     bold: {
//      *       mod: 'bold'
//      *     },
//      *     face: 'GT Eesti Pro Display, serif'
//      *   },
//      *   image: ii
//      * })
//      */
//     const mainNode = graph[0]
//     return {
//       nodes: graph as (Node[] | DataInterfaceNodes),
//       edges: graph.map((el: { id: number, value: number }, index: number) => ({
//         from: mainNode.id,
//         to: el.id,
//         length: 0.1 * (1000 - el.value),
//         width: 2
//         // length: 500 * (1 - data[index].distance)
//       })).filter((el) => el.to !== el.from)
//     }
//   }
//
//   const { ref, network } = useVisNetwork({ ...setGraph(data), options } as UseVisNetworkOptions)
//
//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   const handleClickFit = () => {
//     if (network == null) return
//     network.fit({ nodes: network?.getConnectedNodes(-1) as string[], animation: true })
//   }
//
//   const [
//     isModalOpen,
//     setIsModalOpen
//   ] = useState(-1)
//
//   useEffect(() => {
//     if (network == null) return
//
//     network.once('beforeDrawing', () => {
//       // Network.focus(-1)
//       network.fit()
//     })
//     network.setData(setGraph(data))
//     // network.setOptions({ ...options, layout: { randomSeed: network.getSeed() } })
//     network.on('selectNode', () => {
//       // SetIsModalOpen(+network.getSelectedNodes()[0])
//     })
//   }, [data])
//
//   React.useEffect(() => {
//     console.log('FILTER: ', grade)
//   }, [grade])
//
//   function filterGrade (value: number): boolean {
//     return (grade.begin <= value && value <= grade.end)
//   }
//
//   function nodeModal (): void {
//     if (network == null) return
//     if (Number(network.getSelectedNodes()[0]) === isModalOpen) {
//       setIsModalOpen(-1)
//       return
//     }
//     setIsModalOpen(Number(network.getSelectedNodes()[0]))
//   }
//   // Const svg1 = image
//   // // recolorPNGImage recolors image of the given <img> element with the specified color.
//   // Document
//   //   .getElementById('svg1')
//   //   .setAttribute('src', recolorSVGString(image, '#83c400', true))
//
//   return (
//       <>
//
//           <div
//               className={styles.graphBlock}
//               onClick={nodeModal}
//               ref={ref}
//           />
//       </>
//   )
// }
// export default Graph
