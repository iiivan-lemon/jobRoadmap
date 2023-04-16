import { DataGraphState } from '../models/dataGraph/dataGraphSlice'

// const coloration = addColorMap([...data].sort((a: DataGraphState, b: DataGraphState) => b.distance - a.distance))
//
// export const setNodeGradient = (coloration: string[] = coloration, prof: number): string => {
//   let resColor: string | null
//
//   // eslint-disable-next-line prefer-const
//   resColor = coloration[prof]
//
//   return resColor ?? 'grey'
// }
//
//
// const addColorMap = (data: any[]): string[] => {
//   data = [...new Set(data.map((el) => el.professionalism))]
//     .sort((a, b) => a - b)
//
//   const res = new Map()
//   data.forEach((el, i) => res.set(el, colors[i]))
//   // Return res;
//   return colors
// }
