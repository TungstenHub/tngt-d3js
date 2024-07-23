import {mdColor as color} from "../utils/material_color.js";
import d3 from "../utils/deps/d3.js";

import {get_projective_transformation, direct_transform} from "../utils/projective_transformation_utils.js";

const
vertex_color = color.black,
grid_color = color.orange.w500,
circles_color = color.blue.w500,
rays_color = color.pink.w500;

let radius = 100;

let chartDiv = document.getElementById("projective_transformation");
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

let point_coords = [{x: -1, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}];

let a = point_coords[0];
let b = point_coords[1];
let c = point_coords[2];
let d = point_coords[3];

let transf_matrix = get_projective_transformation([{x: -1, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}], point_coords)

let grid_res = 10;

let grid_coords = [];

for (let i = 0; i <= grid_res; i++) {
    for (let j = 0; j <= grid_res; j++) {
        grid_coords.push({x:-1+2*i/grid_res,y:-1+2*j/grid_res});
    }
}

var grid_points = svg
    .append("g")
    .attr("class", "grid_points")
        .selectAll(".grid_points")
        .data(grid_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 3)
        .attr("fill", grid_color); 

let circles_res = 72;

let circles_coords = [];

for (let i = 2; i <= 10; i++) {
    for (let j = 0; j < circles_res; j++) {
        circles_coords.push({x:i*Math.cos(2*Math.PI*j/circles_res),y:i*Math.sin(2*Math.PI*j/circles_res)});
    }
}

var circles_points = svg
    .append("g")
    .attr("class", "circles_points")
        .selectAll(".circles_points")
        .data(circles_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 3)
        .attr("fill", circles_color); 

let rays_res = 40;

let rays_coords = [];

for (let i = 8; i <= rays_res; i++) {
    for (let j = 0; j < 12; j++) {
        rays_coords.push({x:10*i*Math.cos(2*Math.PI*j/12)/rays_res,y:10*i*Math.sin(2*Math.PI*j/12)/rays_res});
    }
}

var rays_points = svg
    .append("g")
    .attr("class", "rays_points")
        .selectAll(".rays_points")
        .data(rays_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 3)
        .attr("fill", rays_color); 

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
        d.x = start_x + x.invert(d3.event.x);
        d.y = start_y + y.invert(d3.event.y);
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        a = vertices.data()[0];
        b = vertices.data()[1];
        c = vertices.data()[2];
        d = vertices.data()[3];

        transf_matrix = get_projective_transformation([{x: -1, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}], point_coords);

        let transf_grid_coords = grid_coords.map(p => direct_transform(transf_matrix,p));
        grid_points
            .data(transf_grid_coords)
            .attr("cx", function(d) {return(x(d.x))})
            .attr("cy", function(d) {return(y(d.y))})

        let transf_circles_coords = circles_coords.map(p => direct_transform(transf_matrix,p));
        circles_points
            .data(transf_circles_coords)
            .attr("cx", function(d) {return(x(d.x))})
            .attr("cy", function(d) {return(y(d.y))})

        let transf_rays_coords = rays_coords.map(p => direct_transform(transf_matrix,p));
        rays_points
            .data(transf_rays_coords)
            .attr("cx", function(d) {return(x(d.x))})
            .attr("cy", function(d) {return(y(d.y))})
    }); 
        
drag_handler(vertices);
