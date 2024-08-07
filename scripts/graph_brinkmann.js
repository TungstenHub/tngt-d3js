import {mdColor as color} from "../utils/material_color.js";
import d3 from "../utils/deps/d3.js";

const node_color = color.pink.w600;

var radius = 300;

let chartDiv = document.getElementById("graph_brinkmann");
let prevChild = chartDiv.lastElementChild; 
while (prevChild) {
    chartDiv.removeChild(prevChild);
    prevChild = chartDiv.lastElementChild;
}
let svg = d3.select(chartDiv).append("svg")
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0)
            .style("bottom", 0)
            .style("right", 0);
let width = chartDiv.clientWidth;
let height = chartDiv.clientHeight;
svg
    .attr("width", width)
    .attr("height", height);
radius = radius*Math.min(width/960, height/640);

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var graph = {
    "nodes": [
        {"id": "1", "x": x(0.2*Math.cos((1+1/4)*2*Math.PI/7)), "y": y(0.2*Math.sin((1+1/4)*2*Math.PI/7)) },
        {"id": "2", "x": x(0.2*Math.cos((2+1/4)*2*Math.PI/7)), "y": y(0.2*Math.sin((2+1/4)*2*Math.PI/7)) },
        {"id": "3", "x": x(0.2*Math.cos((3+1/4)*2*Math.PI/7)), "y": y(0.2*Math.sin((3+1/4)*2*Math.PI/7)) },
        {"id": "4", "x": x(0.2*Math.cos((4+1/4)*2*Math.PI/7)), "y": y(0.2*Math.sin((4+1/4)*2*Math.PI/7)) },
        {"id": "5", "x": x(0.2*Math.cos((5+1/4)*2*Math.PI/7)), "y": y(0.2*Math.sin((5+1/4)*2*Math.PI/7)) },
        {"id": "6", "x": x(0.2*Math.cos((6+1/4)*2*Math.PI/7)), "y": y(0.2*Math.sin((6+1/4)*2*Math.PI/7)) },
        {"id": "7", "x": x(0.2*Math.cos((7+1/4)*2*Math.PI/7)), "y": y(0.2*Math.sin((7+1/4)*2*Math.PI/7)) },
        {"id": "8", "x": x(0.6*Math.cos((1+1/4)*2*Math.PI/7)), "y": y(0.6*Math.sin((1+1/4)*2*Math.PI/7)) },
        {"id": "9", "x": x(0.6*Math.cos((2+1/4)*2*Math.PI/7)), "y": y(0.6*Math.sin((2+1/4)*2*Math.PI/7)) },
        {"id": "10", "x": x(0.6*Math.cos((3+1/4)*2*Math.PI/7)), "y": y(0.6*Math.sin((3+1/4)*2*Math.PI/7)) },
        {"id": "11", "x": x(0.6*Math.cos((4+1/4)*2*Math.PI/7)), "y": y(0.6*Math.sin((4+1/4)*2*Math.PI/7)) },
        {"id": "12", "x": x(0.6*Math.cos((5+1/4)*2*Math.PI/7)), "y": y(0.6*Math.sin((5+1/4)*2*Math.PI/7)) },
        {"id": "13", "x": x(0.6*Math.cos((6+1/4)*2*Math.PI/7)), "y": y(0.6*Math.sin((6+1/4)*2*Math.PI/7)) },
        {"id": "14", "x": x(0.6*Math.cos((7+1/4)*2*Math.PI/7)), "y": y(0.6*Math.sin((7+1/4)*2*Math.PI/7)) },
        {"id": "15", "x": x(1.3*Math.cos((1-1/4)*2*Math.PI/7)), "y": y(1.3*Math.sin((1-1/4)*2*Math.PI/7)) },
        {"id": "16", "x": x(1.3*Math.cos((2-1/4)*2*Math.PI/7)), "y": y(1.3*Math.sin((2-1/4)*2*Math.PI/7)) },
        {"id": "17", "x": x(1.3*Math.cos((3-1/4)*2*Math.PI/7)), "y": y(1.3*Math.sin((3-1/4)*2*Math.PI/7)) },
        {"id": "18", "x": x(1.3*Math.cos((4-1/4)*2*Math.PI/7)), "y": y(1.3*Math.sin((4-1/4)*2*Math.PI/7)) },
        {"id": "19", "x": x(1.3*Math.cos((5-1/4)*2*Math.PI/7)), "y": y(1.3*Math.sin((5-1/4)*2*Math.PI/7)) },
        {"id": "20", "x": x(1.3*Math.cos((6-1/4)*2*Math.PI/7)), "y": y(1.3*Math.sin((6-1/4)*2*Math.PI/7)) },
        {"id": "21", "x": x(1.3*Math.cos((7-1/4)*2*Math.PI/7)), "y": y(1.3*Math.sin((7-1/4)*2*Math.PI/7)) }
    ],
    "links": [
        {"source": "1", "target": "4"},
        {"source": "4", "target": "7"},
        {"source": "7", "target": "3"},
        {"source": "3", "target": "6"},
        {"source": "6", "target": "2"},
        {"source": "2", "target": "5"},
        {"source": "5", "target": "1"},

        {"source": "1", "target": "9"},
        {"source": "2", "target": "10"},
        {"source": "3", "target": "11"},
        {"source": "4", "target": "12"},
        {"source": "5", "target": "13"},
        {"source": "6", "target": "14"},
        {"source": "7", "target": "8"},

        {"source": "1", "target": "14"},
        {"source": "2", "target": "8"},
        {"source": "3", "target": "9"},
        {"source": "4", "target": "10"},
        {"source": "5", "target": "11"},
        {"source": "6", "target": "12"},
        {"source": "7", "target": "13"},

        {"source": "8", "target": "15"},
        {"source": "9", "target": "16"},
        {"source": "10", "target": "17"},
        {"source": "11", "target": "18"},
        {"source": "12", "target": "19"},
        {"source": "13", "target": "20"},
        {"source": "14", "target": "21"},

        {"source": "8", "target": "16"},
        {"source": "9", "target": "17"},
        {"source": "10", "target": "18"},
        {"source": "11", "target": "19"},
        {"source": "12", "target": "20"},
        {"source": "13", "target": "21"},
        {"source": "14", "target": "15"},

        {"source": "15", "target": "17"},
        {"source": "16", "target": "18"},
        {"source": "17", "target": "19"},
        {"source": "18", "target": "20"},
        {"source": "19", "target": "21"},
        {"source": "20", "target": "15"},
        {"source": "21", "target": "16"}
    ]
}

var forceLink = d3
.forceLink().id(function (d) {
    return d.id;
})
.distance(function (d) {
    return 0.7*Math.sqrt(Math.pow(d.target.x-d.source.x,2)+Math.pow(d.target.y-d.source.y,2));
})
.strength(0.5);

var simulation = d3.forceSimulation()
    .force("link", forceLink)
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));


var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .attr("stroke", color.black)
    .attr("stroke-width", 4)
    .attr("stroke-opacity", 0.6);

var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("r", 7)
    .attr("stroke", color.white)
    .attr("stroke-width", 2)
    .attr("fill", node_color)
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

simulation
    .nodes(graph.nodes)
    .on("tick", ticked);

simulation.force("link")
    .links(graph.links);

function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
