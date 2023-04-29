import {useNavigate} from "react-router-dom";

const colors = {
    main: '#6a5a5a',
    others: '#6a5a5a'
};
import * as d3 from "d3";
const width = window.innerWidth;
const height = window.innerHeight;
const svgNode = require('../../../src/static/images/svg-hex.svg')
import './../graphSelf/graphSelf.css'
function processData(data) {
    var obj = data.call_data;

    var newDataSet = [];

    for (var prop in obj) {
        newDataSet.push({
            name: obj[prop][0],
            className: obj[prop][0].toLowerCase(),
            size: obj[prop][1],
            img: obj[prop][2]
        });
    }
    return {
        children: newDataSet
    };
}

export const generateGraph = (data, showModal, grade) => {
    const bubble = data => d3.pack()
        .size([width, height])
        .padding(5)(d3.hierarchy({ children: data.map((el,i) => {
            el['index'] = i
                return el
        })}).sum(d => d.distance * 1000));

    if (document.getElementById('graph-chart'))
    document.getElementById('graph-chart').innerHTML = ''

    const svg = d3.select('#graph-chart')
        .style('width', width)
        .style('height', height);

    const root = bubble(data);
    const tooltip = d3.select('.tooltip');

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr("id", d => d.data.professionalism)
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .on('mouseover', function (e, d) {
                d3.select(this).style('cursor', 'pointer');
                // d3.select(this).style('fill', 'white')
                // tooltip.select('img').attr('src', d.data.img);
                tooltip.select('span').text(d.data.technology_name + ' ' +  d.data.distance * 100 + ' %');
                tooltip.select('span').attr('class', d.data.technology_name).text(d.data.technology_name);
                tooltip.style('visibility', 'visible');
            })
        .on('mouseout', function () {
            // d3.select(this).style('fill', 'black')
            tooltip.style('visibility', 'hidden');

        })





    node.append("image")
        .attr("class", "svgAni")
        .style('filter', d => (d.data.professionalism < grade.begin || d.data.professionalism > grade.end) ? 'brightness(0.3)' : 'brightness(1)'  )
        .attr('dy', 2)
        .attr("id", d => d.data.professionalism)
        .attr("xlink:href", d => ( d.data.index === 0) ? "static/svg-hex0.svg" : "static/svg-hex" + d.data.professionalism  + ".svg" )
        //     .attr("x", function (d, i) { return -mugDiameter / 2 - mugDiameter * (i % 9); })
        //.attr("y", function (d, i) { return -mugDiameter / 2 - mugDiameter * (i / 9 | 0); })
        .attr("width", d =>  d.data.distance * 100)
        .attr("height", d =>  d.data.distance * 100)
       .attr('x', d => -(d.r/1.5)/2)
        .attr('y', d => -(d.r/1.5)/2)
        .on('click', function(e,d){
            showModal(d.data)
        })
    let text = node
        .selectAll("text")
        .data(d => d)
        .enter()
        .append("text")
        .attr('fill', 'white')
        .attr("id", d => d.data.professionalism)
        .on('click', function(e,d){
            showModal(d.data)
        })
        .style('filter', d => (d.data.professionalism < grade.begin || d.data.professionalism > grade.end) ? 'brightness(0.3)' : 'drop-shadow(1px 1px 1px black)'  )
    // image.attr('src', svgNode)
    text.selectAll("tspan.text")
        .data(d => d.data.technology_name.split('-').join(' ').split(' ').slice(0,3))
        .enter()
        .append("tspan")
        .attr("class", "text")
        .text(d => d)
        .attr("x", 20)
        .attr("dy", 12)
    // node.append('text')
    //     .attr("id", d => d.data.professionalism)
    //     .style('fill', 'white')
    //     // .attr('dy', 2)
    //     .text(d => (d.data.technology_name).substring(0, d.r / 2))



    node.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // circle.transition()
    //     .ease(d3.easeExpInOut)
    //     .duration(1000)
    //     .attr('r', d => d.r);

    // label.transition()
    //     .delay(700)
    //     .ease(d3.easeExpInOut)
    //     .duration(1000)
    //     .style('opacity', 1)
};