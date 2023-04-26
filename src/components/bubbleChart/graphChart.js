import {useNavigate} from "react-router-dom";

const colors = {
    main: 'transparent',
    others: 'transparent'
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

var json = {
    call_data: [
        [
            "Lifestyle",
            1,
            "https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5bb3ce2f801fbc657f83dd57_pp-lifestyle(white).svg"
        ],
        [
            "Sports",
            10,
            "https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5c9131911ad86f445cb5abc7_pp-sport(white).svg"
        ],
        [
            "Environment",
            8,
            "https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/59f2a4bef42fff000159ba7a_pp-environ(white).svg"
        ],
        [
            "Medical",
            6,
            "https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/59f2a4dc831e8500015fda53_pp-health(white).svg"
        ],
        [
            "Food",
            4,
            "https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/59f8c2cc78cc2d0001fd4a7e_pp-food(white).svg"
        ]
    ]
};
export const generateGraph = (data) => {
    const bubble = data => d3.pack()
        .size([width, height])
        .padding(1000)(d3.hierarchy({ children: data }).sum(d => d.distance * 1000));

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
            // d3.select(this).style('stroke', '#FFFFFFFF');
        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY - 100}px`)
            .style('left', `${e.pageX}px`))
        .on('mouseout', function () {
            d3.select(this).style('stroke', 'none');
            return tooltip.style('visibility', 'hidden');
        })

    node.append("image")
        .attr("class", "svgAni")
        .attr('dy', 2)
        .attr("xlink:href", "https://cdn-icons-png.flaticon.com/512/6101/6101080.png")
        //     .attr("x", function (d, i) { return -mugDiameter / 2 - mugDiameter * (i % 9); })
        //.attr("y", function (d, i) { return -mugDiameter / 2 - mugDiameter * (i / 9 | 0); })
        .attr("width", d =>  d.data.distance * 1000)
        .attr("height", d =>  d.data.distance * 1000)
       .attr('x', d => -(d.r/1.5)/2)
        .attr('y', d => -(d.r/1.5)/2)
    // image.attr('src', svgNode)
    node.append('text')
        .style('fill', 'white')
        .attr('dy', 2)
        .text(d => (d.data.technology_name.substring(0, d.r / 4)))
        .on('mouseover', function (e, d) {
            d3.select(this).style('cursor', 'pointer');
            // d3.select(this).style('fill', 'white')
            // tooltip.select('img').attr('src', d.data.img);
            tooltip.select('span').text(d.data.technology_name + ' ' +  d.data.distance * 100 + ' %');
            tooltip.select('span').attr('class', d.data.technology_name).text(d.data.technology_name);
            tooltip.style('visibility', 'visible');

        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY - 100}px`)
            .style('left', `${e.pageX}px`))
        .on('click', function(e,d){
            })
        .on('mouseout', function () {
            // d3.select(this).style('fill', 'black')
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

    // label.transition()
    //     .delay(700)
    //     .ease(d3.easeExpInOut)
    //     .duration(1000)
    //     .style('opacity', 1)
};