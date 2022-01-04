import {mdColor as color} from "../utils/material_color.js";
import d3 from "../utils/deps/d3.js";

const
point_color = color.teal.w800,
path_color = color.teal.w500,
disc_color = color.teal.w200,
lift_point_color = color.pink.w800,
lift_path_color = color.pink.w500;

let radius = 200

let offset = -1

let point_coords = [{x:0.6, y:0.0}];
let angle = 0;

let array = Array.from({length: 401}, (x,i) => 2*Math.PI*(i-200)/40);

let p = 0.5;
let q = 0.1;
let r = 0.05;

let polar = function(u,v) {
    return {x: v*Math.cos(u), y: v*Math.sin(u)};
}

let transv_polar = function(u){
    return [polar(u,0.2), polar(u,1)];
}

let smooth_step = function(u) {return u/(2*Math.PI)-Math.atan(50*Math.sin(u)/(Math.cos(u) + 1))/Math.PI-Math.floor((u+Math.PI)/(2*Math.PI))}

let helix = function(u,v) {
    return {x: 2+p*v*Math.cos(u), y: q*v*Math.sin(u)+r*2*5*Math.PI*smooth_step((u-6*Math.PI)/5+0.3)};
}

let long_helix = function(v){
    return array.map(function(u) { return helix(u,v)});
}

let transv_helix = function(u){
    return [helix(u,0.2), helix(u,1)];
}

let chartDiv = document.getElementById("circle_circle_5_fold_covering_path_lifting");
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

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2+radius*offset, width+radius*offset]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });
        
var circle1 = svg
    .append("circle")
    .attr("cx", x(0))
    .attr("cy", y(0))
    .attr("r", radius)
    .style("stroke-width", 5)
    .style("stroke", "black")   
    .style("fill", disc_color);

var circle2 = svg
    .append("circle")
    .attr("cx", x(0))
    .attr("cy", y(0))
    .attr("r", 0.2*radius)
    .style("stroke-width", 5)
    .style("stroke", "black")   
    .style("fill", "white");

for (let v of [0.4, 0.6, 0.8]) {
    svg.append("circle")
        .attr("cx", x(0))
        .attr("cy", y(0))
        .attr("r", v*radius)
        .style("stroke-width", 1)
        .style("stroke", "black")   
        .style("fill", "none");
}

for (let v of Array.from({length: 20}, (x,i) => 2*Math.PI*i/20)) {
    svg.append("path")
        .attr("d", lineFunction(transv_polar(v)))
        .style("stroke-width", 1)
        .attr("stroke", "black")
        .attr("fill", "none");
}

for (let v of [0.4, 0.6, 0.8]) {
    svg.append("path")
        .attr("d", lineFunction(long_helix(v)))
        .style("stroke-width", 1)
        .attr("stroke", "black")
        .attr("fill", "none");
}

for (let v of [0.2, 1]) {
    svg.append("path")
        .attr("d", lineFunction(long_helix(v)))
        .style("stroke-width", 2)
        .attr("stroke", "black")
        .attr("fill", "none");
}

for (let v of Array.from({length: 201}, (x,i) => 2*Math.PI*(i-100)/20)) {
    svg.append("path")
        .attr("d", lineFunction(transv_helix(v)))
        .style("stroke-width", 1)
        .attr("stroke", "black")
        .attr("fill", "none");
}

let path_data = [];

var path = svg.append("path")
    .attr("d", lineFunction(path_data))
    .style("stroke-width", 5)
    .attr("stroke", path_color)
    .attr("fill", "none");

var point = svg
    .append("g")
    .attr("class", "point")
        .selectAll(".point")
        .data(point_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 7)
        .attr("fill", point_color);

let lift_path_data = [];

var lift_path = svg.append("path")
    .attr("d", lineFunction(lift_path_data))
    .style("stroke-width", 5)
    .attr("stroke", lift_path_color)
    .attr("fill", "none");

var lift = svg
    .append("circle")
    .attr("cx", x(helix(0,0.6).x))
    .attr("cy", y(helix(0,0.6).y))
    .attr("r", 7)
    .attr("fill", lift_point_color);

var clear = svg.append("svg:image")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 40)
    .attr('height', 40)
    .attr("xlink:href", "https://d30y9cdsu7xlg0.cloudfront.net/png/446387-200.png")
    .on("click", function() {
        path_data=[];
        lift_path_data=[];
        path
            .attr("d", lineFunction(path_data));
        lift_path
            .attr("d", lineFunction(lift_path_data));});

var drag_handler = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width+2*radius*offset) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        let xx = start_x + x.invert(d3.event.x);
        let yy = start_y + y.invert(d3.event.y);
        let rev = Math.floor(angle/(2*Math.PI))
        let alpha = Math.atan2(yy,xx)+2*Math.PI*rev;
        if (Math.abs(alpha-angle)<Math.abs(alpha+2*Math.PI-angle)) {
            angle = alpha
        } else {
            angle = alpha + 2*Math.PI
        };
        d.x = xx/Math.max(Math.sqrt(xx*xx+yy*yy),Math.min(1,5*Math.sqrt(xx*xx+yy*yy))) 
        d.y = yy/Math.max(Math.sqrt(xx*xx+yy*yy),Math.min(1,5*Math.sqrt(xx*xx+yy*yy))) 
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        path_data.push({x: d.x, y: d.y});
        path
            .attr("d", lineFunction(path_data))
        let lx = helix(angle,Math.sqrt(d.x*d.x+d.y*d.y)).x;
        let ly = helix(angle,Math.sqrt(d.x*d.x+d.y*d.y)).y;
        lift
            .attr("cx", x(lx))
            .attr("cy", y(ly))
        lift_path_data.push({x: lx, y: ly});
        lift_path
            .attr("d", lineFunction(lift_path_data))
    }); 
        
drag_handler(point);  
