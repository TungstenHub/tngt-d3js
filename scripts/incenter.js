import {Point, dist} from "https://cdn.rawgit.com/TungstenHub/tngt-d3js/master/utils/basic_objects2.js";
import {mdColor as color} from "https://cdn.rawgit.com/TungstenHub/tngt-d3js/master/utils/material_color2.js";
import {from_bar_coords, cevian_int} from "https://cdn.rawgit.com/TungstenHub/tngt-d3js/master/utils/triangle_coordinates2.js";

const
vertex_color = color.blue.w800,
side_color = color.blue.w500,
triangle_color =color.blue.w100,
incenter_color = color.amber.w800,
incircle_color = color.amber.w800,
bisec_color = color.amber.w500;

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var lineFunction = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

function bar_incenter(A, B, C) {
    return [dist(B,C),dist(C,A),dist(A,B)];
}

function in_radius(A, B, C){
    return Math.abs(
        - A.y*B.x + A.x*B.y 
        + A.y*C.x - B.y*C.x 
        - A.x*C.y + B.x*C.y
        )/(dist(A,B)+dist(B,C)+dist(C,A))
}

let a = Point.with(238,486);
let b = Point.with(445,139);
let c = Point.with(677,368);
let i = from_bar_coords(a,b,c,bar_incenter(a,b,c));

var triangle = svg.append("path")
    .attr("d", lineFunction([a,b,c]))
    .attr("stroke", "none")
    .attr("fill", triangle_color);

var a_bisec = svg.append("path")
    .attr("d", lineFunction([a,cevian_int(a,b,c,i)]))
    .attr("stroke-width", 5)
    .attr("stroke", bisec_color);

var b_bisec = svg.append("path")
    .attr("d", lineFunction([b,cevian_int(b,c,a,i)]))
    .attr("stroke-width", 5)
    .attr("stroke", bisec_color);

var c_bisec = svg.append("path")
    .attr("d", lineFunction([c,cevian_int(c,a,b,i)]))
    .attr("stroke-width", 5)
    .attr("stroke", bisec_color);

var a_side = svg.append("path")
    .attr("d", lineFunction([b,c]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var b_side = svg.append("path")
    .attr("d", lineFunction([c,a]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var c_side = svg.append("path")
    .attr("d", lineFunction([a,b]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var incenter = svg
    .append("circle")
    .attr("cx", i.x)
    .attr("cy", i.y)
    .attr("r", 7)
    .attr("fill", incenter_color);

var incircle = svg
    .append("circle")
    .attr("cx", i.x)
    .attr("cy", i.y)
    .attr("r", in_radius(a,b,c))
    .style("stroke-width", 5)
    .style("stroke", incircle_color)   
    .style("fill", "none"); 

var vertices = svg
    .append("g")
    .attr("class", "vertices")
        .selectAll(".vertices")
        .data([a,b,c])
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(d.x)})
        .attr("cy", function(d) {return(d.y)})
        .attr("r", 7)
        .attr("fill", vertex_color); 

var drag_handler = d3.drag()
    .on("drag", function() {
        d3.select(this)
            .data([{x : d3.event.x, y : d3.event.y}])
            .attr("cx", function(d) {return(d.x)})
            .attr("cy", function(d) {return(d.y)});
        a = vertices.data()[0];
        b = vertices.data()[1];
        c = vertices.data()[2];
        i = from_bar_coords(a,b,c,bar_incenter(a,b,c));
        triangle
            .attr("d", lineFunction([a,b,c]));
        a_side
            .attr("d", lineFunction([b,c]));
        b_side
            .attr("d", lineFunction([c,a]));
        c_side
            .attr("d", lineFunction([a,b]));
        a_bisec
            .attr("d", lineFunction([a,cevian_int(a,b,c,i)]));
        b_bisec
            .attr("d", lineFunction([b,cevian_int(b,c,a,i)]));
        c_bisec
            .attr("d", lineFunction([c,cevian_int(c,a,b,i)]));
        incenter
            .attr("cx", i.x)
            .attr("cy", i.y)
        incircle
            .attr("cx", i.x)
            .attr("cy", i.y)
            .attr("r", in_radius(a,b,c))
    }); 
        
drag_handler(vertices);   
