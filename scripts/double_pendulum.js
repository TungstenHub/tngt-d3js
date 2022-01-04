import {mdColor as color} from "../utils/material_color.js";
import d3 from "../utils/deps/d3.js";

let radius = 200
	
let pendulum_color = color.blue.w500;
let track_color = color.blue.w200;

let chartDiv = document.getElementById("double_pendulum");
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

var start_x, start_y; 

var a1 = Math.PI/2, // first angle
    b1 = 0, // first angle momentum
    a2 = Math.PI/2, // second angle
    b2 = 0, // second angle momentum
    t = 0.01,
    iter = 0,
    max_iter = 10000,
    data = [];

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

var pendulum = svg.append("path")
    .attr("d", lineFunction([
        {x:0,y:0.75},
        {x:Math.sin(a1),y:0.75-Math.cos(a1)},
        {x:Math.sin(a1)+Math.sin(a2),y:0.75-Math.cos(a1)-Math.cos(a2)}]))
    .attr("stroke-width", 5)
    .attr("stroke", pendulum_color)
    .attr("fill", 'none');

var track = svg.append("path")
    .attr("d", lineFunction(data))
    .attr("stroke-width", 2)
    .attr("stroke", track_color)
    .attr("fill", 'none');

function update() {
    let s = Math.sin(a1-a2);
    let c = Math.cos(a1-a2);
    a1 += t*(b1);
    b1 += t*((-b1*b1*s*c -   b2*b2*s +   Math.sin(a2)*c - 2*Math.sin(a1))/(2-c*c));
    a2 += t*(b2);
    b2 += t*(( b2*b2*s*c + 2*b1*b1*s + 2*Math.sin(a1)*c - 2*Math.sin(a2))/(2-c*c));
    if (iter % 4 == 0) {
        data.push({x:Math.sin(a1)+Math.sin(a2),y:0.75-Math.cos(a1)-Math.cos(a2)});
        track.attr("d", lineFunction(data));
    }
    if (iter % max_iter == 0) {
        data=[];
        track.attr("d", lineFunction(data));
    }
    pendulum.attr("d", lineFunction([
        {x:0,y:0.75},
        {x:Math.sin(a1),y:0.75-Math.cos(a1)},
        {x:Math.sin(a1)+Math.sin(a2),y:0.75-Math.cos(a1)-Math.cos(a2)}]));
}
    
var interval = setInterval(function() {
    iter++;
    update();
}, 2);
