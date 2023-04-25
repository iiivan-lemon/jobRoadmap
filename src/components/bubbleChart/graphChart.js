import {useNavigate} from "react-router-dom";

const colors = {
    main: 'rgba(28,136,199,0.85)',
    others: 'rgba(18,83,121,0.76)'
};
import * as d3 from "d3";
const width = window.innerWidth;
const height = window.innerHeight;
const svgNode = require('../../../src/static/images/svg-hex.svg')
export const generateGraph = (data) => {
console.log(svgNode)
    const bubble = data => d3.pack()
        .size([width, height])
        .padding(10)(d3.hierarchy({ children: data }).sum(d => d.distance * 1000));


    const svg = d3.select('#graph-chart')
        .style('width', width)
        .style('height', height);

    const root = bubble(data);
    const tooltip = d3.select('.tooltip');

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const circle = node.append('circle')
        .style('fill', d => d.data.distance > 0.5 ? colors.main : colors.others)
        .style('filter', d => `drop-shadow(0px 0px 5px ${ d.data.distance > 0.5 ? colors.main : colors.others})`)
        .style('stroke', d => d.data.distance > 0.5 ? colors.main : colors.others)
        .on('mouseover', function (e, d) {
            // tooltip.select('img').attr('src', d.data.img);
            // tooltip.select('span').text(d.data.job_name + ' ' +  d.data.percent + ' %');
            // // tooltip.select('span').attr('class', d.data.category).text(d.data.category);
            // tooltip.style('visibility', 'visible');
            d3.select(this).style('cursor', 'pointer');
            d3.select(this).style('stroke', '#FFFFFFFF');
        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY - 100}px`)
            .style('left', `${e.pageX}px`))
        .on('mouseout', function () {
            d3.select(this).style('stroke', 'none');
            return tooltip.style('visibility', 'hidden');
        })

    const image = node
        .append('svg:image')
        .attr('xlink:href', '../../../src/static/images/svg-hex.svg')
        .attr("x",0)
        .attr("y",0)
    // image.attr('src', svgNode)
    const label = node.append('text')
        .attr('dy', 2)
        .text(d => (d.data.technology_name.length < d.r / 2 ) ? d.data.technology_name.substring(0, d.r / 4) : d.data.technology_name.substring(0, 0) )
        .on('mouseover', function (e, d) {
            d3.select(this).style('cursor', 'pointer');
            d3.select(this).style('fill', 'white')
            // tooltip.select('img').attr('src', d.data.img);
            tooltip.select('span').text(d.data.technology_name + ' ' +  d.data.distance * 100 + ' %');
            tooltip.select('span').attr('class', d.data.category).text(d.data.category);
        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY - 100}px`)
            .style('left', `${e.pageX}px`))
        .on('click', function(e,d){
            })
        .on('mouseout', function () {
            d3.select(this).style('fill', 'black')

        })

    node.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('r', d => d.r);

    // label.transition()
    //     .delay(700)
    //     .ease(d3.easeExpInOut)
    //     .duration(1000)
    //     .style('opacity', 1)
};