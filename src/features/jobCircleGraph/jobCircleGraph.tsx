// import React from 'react'
//
// const dataCircleGraph = ({ percent = 0.1 }) => {
//   const radius = 100
//   const perimeter = 2 * Math.PI * radius
//   const color = '#007ac1'
//   React.useEffect(() => {
//     const mySvg = document.querySelector('#my-svg') as SVGSVGElement
//     const snap = Snap(mySvg)
//     const w = mySvg.width.baseVal.value
//     const h = mySvg.height.baseVal.value
//     const cx = w / 2
//     const cy = h / 2
//
//     const circle = snap.circle(cx, cy, radius)
//     const text = document.querySelector('.percent-text') as HTMLElement
//     text.style.color = color
//
//     updateGraph(percent)
//     function updateGraph (perc) {
//       // Reset attributes
//       circle.attr({
//         fill: 'none',
//         stroke: color,
//         strokeWidth: '0.5cm',
//         strokeDasharray: '0 ' + perimeter,
//         strokeDashoffset: perimeter * 0.25
//       })
//
//       // Animate
//       Snap.animate(0, perc, (val) => {
//         circle.attr({
//           strokeDasharray: perimeter * val + ' ' + perimeter * (1 - val)
//         })
//
//         text.innerHTML = Math.round(val * 100) + '%'
//       }, 1500, mina.easeinout)
//     }
//   }, [])
//
//   return (
//     <div className="graph-container">
//       <svg id="my-svg" width="250px" height="250px"/>
//   <span className="percent-text">10%</span>
// </div>
//   )
// }
