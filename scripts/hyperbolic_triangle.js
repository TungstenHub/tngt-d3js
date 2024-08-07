import {mdColor as color} from "../utils/material_color.js";
import d3 from "../utils/deps/d3.js";

let radius = 200

let point_coords = [{x:0.6, y:0.1}, {x:-0.2, y:0.7}, {x:-0.5, y:-0.6}];

const
vertex_color = color.blue.w800,
side_color = color.blue.w500,
triangle_color =color.blue.w500 + '40';

let chartDiv = document.getElementById("hyperbolic_triangle");
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

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

let hypLineFunction = function(a,b) {
    let norm_a = a.x*a.x+a.y*a.y;
    let norm_b = b.x*b.x+b.y*b.y;
    let bk_ax = 2*a.x/(1+norm_a) // Beltrami-Klein model
    let bk_ay = 2*a.y/(1+norm_a) 
    let bk_bx = 2*b.x/(1+norm_b) 
    let bk_by = 2*b.y/(1+norm_b) 
    let list = [a];
    for (let i = 1; i <= 100; i++) { 
        let px = (100-i)/100*bk_ax+i/100*bk_bx;
        let py = (100-i)/100*bk_ay+i/100*bk_by;
        let new_p = {x:px/(1+Math.sqrt(1-px*px-py*py)), y:py/(1+Math.sqrt(1-px*px-py*py))}; // back to Poincaré model
        list.push(new_p);
    }
    return list
}
        
let a = point_coords[0];
let b = point_coords[1];
let c = point_coords[2];
        
var circle = svg
    .append("circle")
    .attr("cx", x(0))
    .attr("cy", y(0))
    .attr("r", radius)
    .style("stroke-width", 5)
    .style("stroke", color.black)
    .style("fill", "none"); 

var triangle = svg.append("path")
    .attr("d", lineFunction(hypLineFunction(b,c).concat(hypLineFunction(c,a),hypLineFunction(a,b))))
    .attr("stroke", "none")
    .attr("fill", triangle_color);

var hyp_line_a = svg.append("path")
    .attr("d", lineFunction(hypLineFunction(b,c)))
    .attr('stroke-width', 5)
    .attr('stroke', side_color) 
    .attr('fill', 'none');

var hyp_line_b = svg.append("path")
    .attr("d", lineFunction(hypLineFunction(c,a)))
    .attr('stroke-width', 5)
    .attr('stroke', side_color) 
    .attr('fill', 'none');

var hyp_line_c = svg.append("path")
    .attr("d", lineFunction(hypLineFunction(a,b)))
    .attr('stroke-width', 5)
    .attr('stroke', side_color) 
    .attr('fill', 'none');

var vertices = svg
    .append("g")
    .attr("class", "vertices")
        .selectAll(".vertices")
        .data(point_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 7)
        .attr("fill", vertex_color); 

var drag_handler = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        let xx = start_x + x.invert(d3.event.x);
        let yy = start_y + y.invert(d3.event.y);
        d.x = xx/Math.max(1,1.001*Math.sqrt(xx*xx+yy*yy)) 
        d.y = yy/Math.max(1,1.001*Math.sqrt(xx*xx+yy*yy)) 
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        a = vertices.data()[0];
        b = vertices.data()[1];
        c = vertices.data()[2];
        hyp_line_a
            .attr("d", lineFunction(hypLineFunction(b,c)))
        hyp_line_b
            .attr("d", lineFunction(hypLineFunction(c,a)))
        hyp_line_c
            .attr("d", lineFunction(hypLineFunction(a,b)))
        triangle
            .attr("d", lineFunction(hypLineFunction(b,c).concat(hypLineFunction(c,a),hypLineFunction(a,b))))
    }); 
        
drag_handler(vertices);
