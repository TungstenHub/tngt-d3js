import {mdColor as color} from "../utils/material_color.js";
import d3 from "../utils/deps/d3.js";

const node_color = color.red.w800;

var radius = 300;

let chartDiv = document.getElementById("graph_coxeter");
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
        {"id": "1", "x": x(Math.cos(1*2*Math.PI/24)), "y": y(Math.sin(1*2*Math.PI/24)) },
        {"id": "2", "x": x(Math.cos(2*2*Math.PI/24)), "y": y(Math.sin(2*2*Math.PI/24)) },
        {"id": "3", "x": x(Math.cos(3*2*Math.PI/24)), "y": y(Math.sin(3*2*Math.PI/24)) },
        {"id": "4", "x": x(Math.cos(4*2*Math.PI/24)), "y": y(Math.sin(4*2*Math.PI/24)) },
        {"id": "5", "x": x(Math.cos(5*2*Math.PI/24)), "y": y(Math.sin(5*2*Math.PI/24)) },
        {"id": "6", "x": x(Math.cos(6*2*Math.PI/24)), "y": y(Math.sin(6*2*Math.PI/24)) },
        {"id": "7", "x": x(Math.cos(7*2*Math.PI/24)), "y": y(Math.sin(7*2*Math.PI/24)) },
        {"id": "8", "x": x(Math.cos(8*2*Math.PI/24)), "y": y(Math.sin(8*2*Math.PI/24)) },
        {"id": "9", "x": x(Math.cos(9*2*Math.PI/24)), "y": y(Math.sin(9*2*Math.PI/24)) },
        {"id": "10", "x": x(Math.cos(10*2*Math.PI/24)), "y": y(Math.sin(10*2*Math.PI/24)) },
        {"id": "11", "x": x(Math.cos(11*2*Math.PI/24)), "y": y(Math.sin(11*2*Math.PI/24)) },
        {"id": "12", "x": x(Math.cos(12*2*Math.PI/24)), "y": y(Math.sin(12*2*Math.PI/24)) },
        {"id": "13", "x": x(Math.cos(13*2*Math.PI/24)), "y": y(Math.sin(13*2*Math.PI/24)) },
        {"id": "14", "x": x(Math.cos(14*2*Math.PI/24)), "y": y(Math.sin(14*2*Math.PI/24)) },
        {"id": "15", "x": x(Math.cos(15*2*Math.PI/24)), "y": y(Math.sin(15*2*Math.PI/24)) },
        {"id": "16", "x": x(Math.cos(16*2*Math.PI/24)), "y": y(Math.sin(16*2*Math.PI/24)) },
        {"id": "17", "x": x(Math.cos(17*2*Math.PI/24)), "y": y(Math.sin(17*2*Math.PI/24)) },
        {"id": "18", "x": x(Math.cos(18*2*Math.PI/24)), "y": y(Math.sin(18*2*Math.PI/24)) },
        {"id": "19", "x": x(Math.cos(19*2*Math.PI/24)), "y": y(Math.sin(19*2*Math.PI/24)) },
        {"id": "20", "x": x(Math.cos(20*2*Math.PI/24)), "y": y(Math.sin(20*2*Math.PI/24)) },
        {"id": "21", "x": x(Math.cos(21*2*Math.PI/24)), "y": y(Math.sin(21*2*Math.PI/24)) },
        {"id": "22", "x": x(Math.cos(22*2*Math.PI/24)), "y": y(Math.sin(22*2*Math.PI/24)) },
        {"id": "23", "x": x(Math.cos(23*2*Math.PI/24)), "y": y(Math.sin(23*2*Math.PI/24)) },
        {"id": "24", "x": x(Math.cos(24*2*Math.PI/24)), "y": y(Math.sin(24*2*Math.PI/24)) },
        {"id": "a", "x": x(0.5*Math.cos(1*2*Math.PI/3)), "y": y(0.5*Math.sin(1*2*Math.PI/3)) },
        {"id": "b", "x": x(0.5*Math.cos(2*2*Math.PI/3)), "y": y(0.5*Math.sin(2*2*Math.PI/3)) },
        {"id": "c", "x": x(0.5*Math.cos(3*2*Math.PI/3)), "y": y(0.5*Math.sin(3*2*Math.PI/3)) }
        ,
        {"id": "o", "x": x(0), "y": y(0) }
    ],
    "links": [
        {"source": "1", "target": "2"},
        {"source": "2", "target": "3"},
        {"source": "3", "target": "4"},
        {"source": "4", "target": "5"},
        {"source": "5", "target": "6"},
        {"source": "6", "target": "7"},
        {"source": "7", "target": "8"},
        {"source": "8", "target": "9"},
        {"source": "9", "target": "10"},
        {"source": "10", "target": "11"},
        {"source": "11", "target": "12"},
        {"source": "12", "target": "13"},
        {"source": "13", "target": "14"},
        {"source": "14", "target": "15"},
        {"source": "15", "target": "16"},
        {"source": "16", "target": "17"},
        {"source": "17", "target": "18"},
        {"source": "18", "target": "19"},
        {"source": "19", "target": "20"},
        {"source": "20", "target": "21"},
        {"source": "21", "target": "22"},
        {"source": "22", "target": "23"},
        {"source": "23", "target": "24"},
        {"source": "24", "target": "1"},

        {"source": "1", "target": "12"},
        {"source": "2", "target": "a"},
        {"source": "3", "target": "21"},
        {"source": "4", "target": "17"},
        {"source": "5", "target": "11"},
        {"source": "6", "target": "o"},
        {"source": "7", "target": "c"},
        {"source": "8", "target": "a"},
        {"source": "9", "target": "20"},
        {"source": "10", "target": "b"},
        {"source": "13", "target": "19"},
        {"source": "14", "target": "o"},
        {"source": "15", "target": "a"},
        {"source": "16", "target": "b"},
        {"source": "18", "target": "c"},
        {"source": "22", "target": "o"},
        {"source": "23", "target": "b"},
        {"source": "24", "target": "c"},
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
    .attr("stroke", 'black')
    .attr("stroke-width", 4)
    .attr("stroke-opacity", 0.6);

var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("r", 7)
    .attr("stroke", 'white')
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
