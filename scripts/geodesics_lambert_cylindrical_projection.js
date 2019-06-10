import {mdColor as color} from "../utils/material_color.js";

let c = {x:0, y:0};
let e = {x:0.5, y:0};
let vector = {x:e.x-c.x,y:e.y-c.y};

let chartDiv = document.getElementById("geodesics_lambert_cylindrical_projection");
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

let radius = width/(2*Math.PI);

const
arrow_color = color.blue.w500,
pivot_color = color.yellow.w500;

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var lineFunction = d3.line()
	.x(function(d) { return x(d.x); })
	.y(function(d) { return y(d.y); });	

var image = svg.append("svg:image")
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', width)
	.attr('height', height)
	.attr("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/0/01/Lambert-cylindrical-equal-area-projection.jpg")

let arrow = svg.append("path")
    .attr("d", lineFunction([c,{x:c.x+vector.x,y:c.y+vector.y}]))
    .attr("stroke-width", 5)
    .attr("stroke", arrow_color);
let angle = Math.atan2(vector.y,vector.x);
let marker = svg.append("path")
.attr("d", lineFunction([{x:0.05*Math.cos(0*Math.PI/3+angle),y:0.05*Math.sin(0*Math.PI/3+angle)},
                         {x:0.05*Math.cos(2*Math.PI/3+angle),y:0.05*Math.sin(2*Math.PI/3+angle)},
                         {x:0.05*Math.cos(4*Math.PI/3+angle),y:0.05*Math.sin(4*Math.PI/3+angle)}]))
.attr("transform", "translate(" + radius*(c.x+vector.x) + "," + radius*(-c.y-vector.y) + ")")
.attr("stroke", 'none')
.attr("fill", arrow_color);

let num_iter = 1000
let save_every = 10
let step = 0.01

let trace_coords = [];
let p = {x:c.x,y:c.y};
let v = {x:vector.x,y:vector.y};
for (let i = 0; i < num_iter; i++) {
    let vy = p.y;
    p.x += step*v.x;
    p.y += step*v.y;
    let delta_x = -vy/(1-vy*vy)*v.x*v.y-vy/(1-vy*vy)*v.y*v.x;
	let delta_y = vy*(1-vy*vy)*v.x*v.x+vy/(1-vy*vy)*v.y*v.y;
	v.x -= step*delta_x;
    v.y -= step*delta_y;
    if (i%save_every==0) {trace_coords.push({x:p.x,y:p.y})}
}

var trace = svg
	.append("g")
	.attr("class", "pivot")
		.selectAll(".pivot")
		.data(trace_coords)
		.enter()
		.append("circle")
		.attr("class", "vertex")
		.attr("cx", function(d) {return(x(d.x))})
		.attr("cy", function(d) {return(y(d.y))})
		.attr("r", 3)
        .attr("fill", 'white')
        .attr("opacity",0.5);

var end_pivot = svg
	.append("g")
	.attr("class", "pivot")
		.selectAll(".pivot")
		.data([e])
		.enter()
		.append("circle")
		.attr("class", "vertex")
		.attr("cx", function(d) {return(x(d.x))})
		.attr("cy", function(d) {return(y(d.y))})
		.attr("r", 5)
        .attr("fill", pivot_color)
        .attr("opacity",0);

var pivot = svg
	.append("g")
	.attr("class", "pivot")
		.selectAll(".pivot")
		.data([c])
		.enter()
		.append("circle")
		.attr("class", "vertex")
		.attr("cx", function(d) {return(x(d.x))})
		.attr("cy", function(d) {return(y(d.y))})
		.attr("r", 5)
		.attr("fill", pivot_color);

var drag_handler = d3.drag()
	.on("start", function(d) {
		start_x = x.invert(width) + d3.event.x;
		start_y = y.invert(height) + d3.event.y;
	})
	.on("drag", function(d) {
		d.x = start_x + x.invert(d3.event.x);
		let yy = start_y + y.invert(d3.event.y);
		d.y = Math.min(Math.max(yy, -0.99), 0.99)
		d3.select(this)
			.attr("cx", x(d.x))
			.attr("cy", y(d.y));
        c = pivot.data()[0];
        e = end_pivot.data()[0];
        vector = {x:e.x-c.x,y:e.y-c.y};
        trace_coords = [];
        p = {x:c.x,y:c.y};
        v = {x:vector.x,y:vector.y};
        for (let i = 0; i < num_iter; i++) {
            let vy = p.y;
            p.x += step*v.x;
            p.y += step*v.y;
            let delta_x = -vy/(1-vy*vy)*v.x*v.y-vy/(1-vy*vy)*v.y*v.x;
            let delta_y = vy*(1-vy*vy)*v.x*v.x+vy/(1-vy*vy)*v.y*v.y;
            v.x -= step*delta_x;
            v.y -= step*delta_y;
            if (i%save_every==0) {trace_coords.push({x:p.x,y:p.y})}
        }
        trace
            .data(trace_coords)
            .attr("cx", function(d) {return(x(d.x))})
		    .attr("cy", function(d) {return(y(d.y))})
        arrow
            .attr("d", lineFunction([c,e]))
        angle = Math.atan2(vector.y,vector.x);
        marker
            .attr("d", lineFunction([{x:0.05*Math.cos(0*Math.PI/3+angle),y:0.05*Math.sin(0*Math.PI/3+angle)},
                                 {x:0.05*Math.cos(2*Math.PI/3+angle),y:0.05*Math.sin(2*Math.PI/3+angle)},
                                 {x:0.05*Math.cos(4*Math.PI/3+angle),y:0.05*Math.sin(4*Math.PI/3+angle)}]))
            .attr("transform", "translate(" + radius*(c.x+vector.x) + "," + radius*(-c.y-vector.y) + ")");

	}); 
		
drag_handler(pivot);
drag_handler(end_pivot);
