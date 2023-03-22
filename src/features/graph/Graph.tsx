import React, {type FC, useEffect, useRef, useState} from 'react'
import pSBC from 'shade-blend-color';
import VisGraph, {
    type GraphData,
    GraphEvents,
    type Options
} from 'react-vis-graph-wrapper'
import styles from './Graph.module.css'
import {debug} from "util";
import {Data, DataSet, Network} from "vis-network";
import {DataInterfaceEdges, DataInterfaceNodes, Edge, Node} from "vis-network/declarations/network/Network";
import * as net from "net";

interface GraphProps {
    data: any
}

const GraphRoadMap: FC<GraphProps> = ({data}) => {

    const options: Options = {
        height: "100%",
        width: '100%',
        physics: {
            barnesHut: {gravitationalConstant: -30000},
            stabilization: {iterations: 2500}
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
            color: 'transparent'
        },
        nodes: {
            borderWidth: 2,
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

    const setNodeColor = (data: any[]): string[] => {
        // @ts-expect-error
        data = [...new Set(data.map(el => el.professionalism))].sort((a, b) => a - b)
        const colors = ['#28C10F', '#146FC3', '#FB1A1A'];
        const res = new Map()
        data.forEach((el, i) => res.set(el, colors[i]))
        // return res;
        return colors;
    }


    const setGraph = (): GraphData => {
        data = data.sort((a: { distance: number }, b: { distance: number }) => b.distance - a.distance)
        const coloration = setNodeColor(data);
        let graph = data.map((i: { name: any, distance: number, professionalism: number }, index: any) => {
            return ({
                size: i.distance * 50,
                id: index,
                label: i.name,
                value: i.distance * 50,
                shape: 'hexagon',
                color: {
                    border: coloration[Math.round(i.professionalism*2)],
                    background: pSBC(0.5, coloration[Math.round(i.professionalism*2)]),
                    highlight: {
                        border: pSBC(0.3, coloration[Math.round(i.professionalism*2)]),
                        background: pSBC(-0.3, coloration[Math.round(i.professionalism*2)]),
                    },
                }
            })
        })
        graph = graph.sort((a: { count: number }, b: { count: number }) => a.count - b.count)
        const mainNode = graph[0];
        // nodes = graph;
        // edges = graph.map((el: { id: any, value: number }, index) => ({
        //     from: mainNode.id,
        //     to: el.id,
        //     length: (Math.pow(data[index].value, 2))
        // })).filter((el: { from: any, to: any }) => el.from !== el.to);
        return {
            nodes: graph,
            edges: graph.map((el: { id: any, value: number }, index) => ({
                from: mainNode.id,
                to: el.id,
                length: (data[0].distance - data[index].distance + 1) * 50
            })).filter((el: { from: any, to: any }) => el.from !== el.to)
        }
    }


    const events = {
        stabilized: () => {
            // if (network) { // Network will be set using getNetwork event from the Graph component
            //     network.setOptions({physics: false}); // Disable physics after stabilization
            //     network.fit();
            // }
        }
    };



    return (
        <div className={styles.graphBlock}>
            <VisGraph
                key={Math.random()}
                graph={setGraph()}
                options={options}
                events={events}
                getNetwork={(network: any) => {
                    // setNetwork(network);
                    //  if you want access to vis.js network api you can set the state in a parent component using this property
                }}
            />
        </div>
    )
}

export default GraphRoadMap
