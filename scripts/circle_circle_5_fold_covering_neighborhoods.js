import {mdColor as color} from "../utils/material_color.js";
import d3 from "../utils/deps/d3.js";

const
point_color = color.teal.w800,
path_color = color.teal.w500,
disc_color = color.teal.w200,
lift_point_color = color.pink.w800,
lift_path_color = color.pink.w500,
lift_disc_color = color.pink.w200;

let radius = 200

let offset = -1

let point_coords = [{x:0.6, y:0.0}];

let array = Array.from({length: 401}, (x,i) => 2*Math.PI*(i-200)/40);
let neigh_array = Array.from({length: 61}, (x,i) => 2*Math.PI*i/60);

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

let inside_annulus = function(a,b){
    return {x: a/Math.max(Math.sqrt(a*a+b*b),Math.min(1,5*Math.sqrt(a*a+b*b))), 
            y: b/Math.max(Math.sqrt(a*a+b*b),Math.min(1,5*Math.sqrt(a*a+b*b)))};
}

let chartDiv = document.getElementById("circle_circle_5_fold_covering_neighborhoods");
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
    .style("fill", "white");

var circle2 = svg
    .append("circle")
    .attr("cx", x(0))
    .attr("cy", y(0))
    .attr("r", 0.2*radius)
    .style("stroke-width", 5)
    .style("stroke", "black")   
    .style("fill", "white");

let point_neigh_coords = neigh_array.map(function(u) { return inside_annulus(
    point_coords[0].x+0.17*Math.cos(u),point_coords[0].y+0.17*Math.sin(u))});

var point_neighborhood = svg.append("path")
    .attr("d", lineFunction(point_neigh_coords))
    .style("stroke-width", 5)
    .style("stroke", path_color)   
    .style("fill", disc_color);

let lifts_neighborhoods = Array.from({length: 5}, (x,i) => 'none')

let rad = Math.sqrt(point_coords[0].x*point_coords[0].x+point_coords[0].y*point_coords[0].y)
let arg = Math.atan2(point_coords[0].y,point_coords[0].x)
let lift_coords = Array.from({length: 5}, (x,i) => helix(2*Math.PI*i+arg, rad));

for (let k of Array.from({length: 5}, (x,i) => i)) {
    lifts_neighborhoods[k] = svg.append("path")
    .attr("d", lineFunction(point_neigh_coords.map(function(u) { 
        let atan = Math.atan2(u.y,u.x);
        let angle;
        if (Math.abs(atan+2*Math.PI-arg)<Math.abs(atan-arg)) {
            angle = atan+2*Math.PI
        } else if (Math.abs(atan-arg)<Math.abs(atan-2*Math.PI-arg)) {
            angle = atan
        } else {
            angle = atan-2*Math.PI
        }
        return helix(angle+2*Math.PI*k,Math.sqrt(u.x*u.x+u.y*u.y))})))
    .style("stroke-width", 5)
    .style("stroke", lift_path_color)   
    .style("fill", lift_disc_color);
}

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

var lifts = svg
    .append("g")
    .attr("class", "point")
        .selectAll(".point")
        .data(lift_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 7)
        .attr("fill", lift_point_color);

var drag_handler = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width+2*radius*offset) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        let xx = start_x + x.invert(d3.event.x);
        let yy = start_y + y.invert(d3.event.y);
        d.x = xx/Math.max(Math.sqrt(xx*xx+yy*yy),Math.min(1,5*Math.sqrt(xx*xx+yy*yy))) 
        d.y = yy/Math.max(Math.sqrt(xx*xx+yy*yy),Math.min(1,5*Math.sqrt(xx*xx+yy*yy))) 
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        rad = Math.sqrt(d.x*d.x+d.y*d.y)
        arg = Math.atan2(d.y,d.x)
        lift_coords = Array.from({length: 5}, (x,i) => helix(2*Math.PI*i+arg, rad));
        lifts
            .data(lift_coords)
            .attr("cx", function(d) {return(x(d.x))})
            .attr("cy", function(d) {return(y(d.y))})
        point_neigh_coords = neigh_array.map(function(u) { return inside_annulus(
            d.x+0.17*Math.cos(u),d.y+0.17*Math.sin(u))});
        point_neighborhood
            .attr("d", lineFunction(point_neigh_coords))
        for (let k of Array.from({length: 5}, (x,i) => i)) {
            lifts_neighborhoods[k]
                .attr("d", lineFunction(point_neigh_coords.map(function(u) { 
                    let atan = Math.atan2(u.y,u.x);
                    let angle;
                    if (Math.abs(atan+2*Math.PI-arg)<Math.abs(atan-arg)) {
                        angle = atan+2*Math.PI
                    } else if (Math.abs(atan-arg)<Math.abs(atan-2*Math.PI-arg)) {
                        angle = atan
                    } else {
                        angle = atan-2*Math.PI
                    }
                    return helix(angle+2*Math.PI*k,Math.sqrt(u.x*u.x+u.y*u.y))})))
        }
    }); 
        
drag_handler(point);  
