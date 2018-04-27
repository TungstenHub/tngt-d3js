var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var radius = 300;

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var graph = {
    "nodes": [
        {"id": "1", "x": x(Math.cos(1*2*Math.PI/6)), "y": y(Math.sin(1*2*Math.PI/6)) },
        {"id": "2", "x": x(Math.cos(2*2*Math.PI/6)), "y": y(Math.sin(2*2*Math.PI/6)) },
        {"id": "3", "x": x(Math.cos(3*2*Math.PI/6)), "y": y(Math.sin(3*2*Math.PI/6)) },
        {"id": "4", "x": x(Math.cos(4*2*Math.PI/6)), "y": y(Math.sin(4*2*Math.PI/6)) },
        {"id": "5", "x": x(Math.cos(5*2*Math.PI/6)), "y": y(Math.sin(5*2*Math.PI/6)) },
        {"id": "6", "x": x(Math.cos(6*2*Math.PI/6)), "y": y(Math.sin(6*2*Math.PI/6)) },
        {"id": "7", "x": x(0), "y": y(0) }
    ],
    "links": [
        {"source": "1", "target": "2"},
        {"source": "2", "target": "3"},
        {"source": "3", "target": "4"},
        {"source": "4", "target": "5"},
        {"source": "5", "target": "6"},
        {"source": "6", "target": "1"},
        {"source": "1", "target": "7"},
        {"source": "2", "target": "7"},
        {"source": "3", "target": "7"},
        {"source": "4", "target": "7"},
        {"source": "5", "target": "7"},
        {"source": "6", "target": "7"}
    ]
}
    
var nodes = graph.nodes,
        links = graph.links;

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
    .attr("fill", '#C62828') // red 800
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