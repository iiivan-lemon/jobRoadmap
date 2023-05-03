import {useNavigate} from "react-router-dom";
import styles from './../../pages/jobsPage/JobsPage.module.css'
const colors = {
    main: 'rgba(119,122,208,0.8)',
    others: 'rgba(56,58,107,0.8)'
};
import * as d3 from "d3";
const width = window.innerWidth;
const height = window.innerHeight;
export const generateChart = (data, sendJob) => {

    const bubble = data => d3.pack()
        .size([width, height])
        .padding(10)(d3.hierarchy({ children: data }).sum(d => d.percent * 100));

    const svg = d3.select('#bubble-chart')
        .style('width', width)
        .style('height', height);

    const root = bubble(data);
    const tooltip = d3.select('.tooltip');

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // node.append("image")
    //     .attr("class", "svgAni")
    //     .attr('dy', 2)
    //     .attr("id", d => d.data.professionalism)
    //     .attr("xlink:href", "static/svg-hex.svg")
    //     //     .attr("x", function (d, i) { return -mugDiameter / 2 - mugDiameter * (i % 9); })
    //     //.attr("y", function (d, i) { return -mugDiameter / 2 - mugDiameter * (i / 9 | 0); })
    //     .attr("width", d =>  d.r)
    //     .attr("height", d =>  d.r)
    //     .attr('x', d => -(d.r/1.5)/2)
    //     .attr('y', d => -(d.r/1.5)/2)

    // let text = node
    //     .selectAll("text")
    //     .data(d => d)
    //     .enter()
    //     .append("text")
    //     .attr('fill', 'white')
    //         .on('click', function(e,d){
    //             sendJob({ value: d.data.job_name, isTechSearch: true })
    //             })
    //     .style('cursor', 'pointer')
    //     .style('font-size', '0.8rem')
    //     .attr("id", d => d.data.job_name)
    // // image.attr('src', svgNode)
    // text.selectAll("tspan.text")
    //     .data(d => d.data.job_name.split(' ').slice(0,3))
    //     .enter()
    //     .append("tspan")
    //     .attr("class", "text")
    //     .text(d => d)
    //     .attr("x", 20)
    //     .attr("dy", 12)
    const circle = node.append('circle')
        .style('fill', d => d.data.percent > 40 ? colors.main : colors.others)
        .style('filter', d => `drop-shadow(rgba(0, 0, 0, 0.8) 2px 4px 6px)`)
        .style('stroke', d => d.data.percent > 60 ? colors.main : colors.others)
        .style('stroke', '#FFFFFFFF')
        .style('stroke-width', '0px')
        .on('mouseover', function (e, d) {
            // tooltip.select('img').attr('src', d.data.img);
            tooltip.select('span').text(d.data.job_name + ' ' +  d.data.percent + ' %');
            // tooltip.select('span').text(d.data.job_name + ' ' +  d.data.percent + ' %');
            // tooltip.select('span').attr('class', d.data.category).text(d.data.category);
            tooltip.style('visibility', 'visible');
            d3.select(this).style('stroke-width', '3px');
        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY - 120}px`)
            .style('left', `${e.pageX}px`))
        .on('mouseout', function () {
            d3.select(this).style('stroke-width', '0px');
            return tooltip.style('visibility', 'hidden');
        })

    // image.attr('src', svgNode)
    const label = node.append('text')
        .attr('class', styles.labelJob)
        .attr('dy', 2)
        .style('filter', 'drop-shadow(2px 4px 2px black)')
        .text(d => (d.data.job_name.length < ( d.r/ 5)) ? d.data.job_name + ' ' + d.data.percent + '%' : (d.data.job_name.substring(0, d.r / 4) + '...'))
        .on('mouseover', function (e, d) {
            d3.select(this).style('cursor', 'pointer');
            tooltip.select('span').text('перейти на карту навыков');
            tooltip.style('visibility', 'visible');
        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY - 120}px`)
            .style('left', `${e.pageX}px`))
        .on('click', function(e,d){
            sendJob({ value: d.data.job_name, isTechSearch: true })
            })
        .on('mouseout', function () {
            tooltip.style('visibility', 'hidden');

        })

    node.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('r', d => d.r);

    label.transition()
        .delay(700)
        .ease(d3.easeExpInOut)
        .duration(1000)
        .style('opacity', 1)
};