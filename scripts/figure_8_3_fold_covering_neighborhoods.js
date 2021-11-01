import {mdColor as color} from "../utils/material_color.js";
import d3 from "../utils/deps/d3.js";

const
point_color = color.teal.w800,
path_color = color.teal.w500,
lift_point_color = color.pink.w800,
lift_path_color = color.pink.w500,
lemn_1 = color.blue.w500,
lemn_2 = color.amber.w500,
lemn_join = color.gray.w500;

let radius = 120

const offset = -1.7

let point_coords = [{x:Math.sqrt(2), y:0.0}];
let angle = 0;

let neigh_array = Array.from({length: 61}, (x,i) => 2*Math.PI*i/60);

const unfold = function(p,k) {
    const u = Math.atan2(p.y,p.x+0.95)+k*2*Math.PI;
    const v = Math.sqrt((p.x+0.95)*(p.x+0.95)+p.y*p.y);
    return {x: 1.2*Math.sqrt(v-0.2)*Math.cos(u/3)+3, y: 1.2*Math.sqrt(v-0.2)*Math.sin(u/3)};
}

const lemn_paramet = function(u){
    return {x: Math.sqrt(2)*Math.cos(u)/(1+Math.sin(u)*Math.sin(u)), y: Math.sqrt(2)*Math.cos(u)*Math.sin(u)/(1+Math.sin(u)*Math.sin(u))};
}

let chartDiv = document.getElementById("figure_8_3_fold_covering_neighborhoods");
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

// based on https://en.wikipedia.org/wiki/Cassini_oval
// SAGE CODE //
// l = var('l')
// solve([2*(1-x^2)-2*(1-x^2)*x^2-2*l*(1-x^2)*x-(1+x^2)^2 == 0],x) => 
//		[x == -1/2*l - 1/2*sqrt(2*l^2 + 2*(l^3 + 4*l)/sqrt(l^2 + 2*sqrt(l^2 + 4) + 4) - 2*sqrt(l^2 + 4) + 8) - 1/2*sqrt(l^2 + 2*sqrt(l^2 + 4) + 4), 
//		 x == -1/2*l + 1/2*sqrt(2*l^2 + 2*(l^3 + 4*l)/sqrt(l^2 + 2*sqrt(l^2 + 4) + 4) - 2*sqrt(l^2 + 4) + 8) - 1/2*sqrt(l^2 + 2*sqrt(l^2 + 4) + 4), 
//		 x == -1/2*l - 1/2*sqrt(2*l^2 - 2*(l^3 + 4*l)/sqrt(l^2 + 2*sqrt(l^2 + 4) + 4) - 2*sqrt(l^2 + 4) + 8) + 1/2*sqrt(l^2 + 2*sqrt(l^2 + 4) + 4), 
//		 x == -1/2*l + 1/2*sqrt(2*l^2 - 2*(l^3 + 4*l)/sqrt(l^2 + 2*sqrt(l^2 + 4) + 4) - 2*sqrt(l^2 + 4) + 8) + 1/2*sqrt(l^2 + 2*sqrt(l^2 + 4) + 4)]

const to_lemn = function(px,py) { 
    if (Math.abs(px)<0.001 || (Math.abs(py)<0.001 && Math.abs(px)<1)){
        return {x:0, y:0};
    }
    if (Math.abs(py)<0.001){
        return {x:Math.sqrt(2)*Math.sign(px), y:0};
    }
    let a = Math.abs(px);
    let b = Math.abs(py);
    let l = (a*a-b*b-1)/(a*b);
    let s = -1/2*l - 1/2*Math.sqrt(2*l*l - 2*(l*l*l + 4*l)/Math.sqrt(l*l + 2*Math.sqrt(l*l + 4) + 4) - 2*Math.sqrt(l*l + 4) + 8) + 1/2*Math.sqrt(l*l + 2*Math.sqrt(l*l + 4) + 4);
    let t;
    if (px>=0 && py>=0) {
        t = Math.asin(s);
    } else if (px>=0 && py<=0) {
        t = -Math.asin(s);
    } else if (px<=0 && py>=0) {
        t = Math.asin(s) + Math.PI;
    } else {
        t = Math.PI - Math.asin(s);
    }
    return lemn_paramet(t);
}

svg.append("path")
    .attr("d", lineFunction(Array.from({length: 26}, (x,i) => lemn_paramet(Math.PI*(i-25)/50))))
    .style("stroke-width", 7)
    .attr("stroke", lemn_1)
    .attr("fill", "none");
svg.append("path")
    .attr("d", lineFunction(Array.from({length: 26}, (x,i) => lemn_paramet(Math.PI*(i)/50))))
    .style("stroke-width", 3)
    .attr("stroke", lemn_1)
    .attr("fill", "none");

svg.append("path")
    .attr("d", lineFunction(Array.from({length: 26}, (x,i) => lemn_paramet(Math.PI*(i+25)/50))))
    .style("stroke-width", 3)
    .attr("stroke", lemn_2)
    .attr("fill", "none");
svg.append("path")
    .attr("d", lineFunction(Array.from({length: 26}, (x,i) => lemn_paramet(Math.PI*(i+50)/50))))
    .style("stroke-width", 7)
    .attr("stroke", lemn_2)
    .attr("fill", "none");

svg.append("circle")
    .attr("cx", x(0))
    .attr("cy", y(0))
    .attr("r", 5)
    .attr("fill", lemn_join);

for (let k of [0,1,2]) {
    svg.append("path")
        .attr("d", lineFunction(Array.from({length: 26}, (x,i) => unfold(lemn_paramet(Math.PI*(i-25)/50),k))))
        .style("stroke-width", 7)
        .attr("stroke", lemn_1)
        .attr("fill", "none");
    svg.append("path")
        .attr("d", lineFunction(Array.from({length: 26}, (x,i) => unfold(lemn_paramet(Math.PI*(i)/50),k))))
        .style("stroke-width", 3)
        .attr("stroke", lemn_1)
        .attr("fill", "none");
    svg.append("path")
        .attr("d", lineFunction(Array.from({length: 26}, (x,i) => unfold(lemn_paramet(Math.PI*(i+25)/50),k))))
        .style("stroke-width", 3)
        .attr("stroke", lemn_2)
        .attr("fill", "none");
    svg.append("path")
        .attr("d", lineFunction(Array.from({length: 26}, (x,i) => unfold(lemn_paramet(Math.PI*(i+50.01)/50),k))))
        .style("stroke-width", 7)
        .attr("stroke", lemn_2)
        .attr("fill", "none");
    svg
        .append("circle")
        .attr("cx", x(unfold({x:0,y:0},k).x))
        .attr("cy", y(unfold({x:0,y:0},k).y))
        .attr("r", 5)
        .attr("fill", lemn_join);
}

let point_neigh_coords = neigh_array.map(function(u) { return to_lemn(
    point_coords[0].x+0.25*Math.cos(u),point_coords[0].y+0.25*Math.sin(u))});

var point_neighborhood = svg.append("path")
    .attr("d", lineFunction(point_neigh_coords))
    .style("stroke-width", 10)
    .style("stroke", path_color)   
    .style("fill", 'none');

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

let lifts_neighborhoods = Array.from({length: 5}, (x,i) => 'none')

for (let k of Array.from({length: 3}, (x,i) => i)) {
    lifts_neighborhoods[k] = svg.append("path")
    .attr("d", lineFunction(point_neigh_coords.map(function(u) { 
        return unfold(u,k)})))
    .style("stroke-width", 10)
    .style("stroke", lift_path_color)   
    .style("fill", 'none');
}			

let lift_coords = [unfold(point_coords[0],0),
                unfold(point_coords[0],1),
                unfold(point_coords[0],2)];

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
        
        d.x = to_lemn(xx,yy).x
        d.y = to_lemn(xx,yy).y
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        point_neigh_coords = neigh_array.map(function(u) { return to_lemn(
            d.x+0.25*Math.cos(u),d.y+0.25*Math.sin(u))});
        point_neighborhood
            .attr("d", lineFunction(point_neigh_coords))
        lift_coords = [unfold({x:d.x,y:d.y},0),
                        unfold({x:d.x,y:d.y},1),
                        unfold({x:d.x,y:d.y},2)];
        lifts
            .data(lift_coords)
            .attr("cx", function(d) {return(x(d.x))})
            .attr("cy", function(d) {return(y(d.y))})
        for (let k of Array.from({length: 3}, (x,i) => i)) {
            lifts_neighborhoods[k]
                .attr("d", lineFunction(point_neigh_coords.map(function(u) { 
                    let a1 = Math.atan2(d.y,d.x+0.95)
                    let a2 = Math.atan2(u.y,u.x+0.95)
                    let kk;
                    if (Math.abs(a2+2*Math.PI-a1)<Math.abs(a2-a1)) {
                        kk = 1
                    } else if (Math.abs(a2-a1)<Math.abs(a2-2*Math.PI-a1)) {
                        kk = 0
                    } else {
                        kk = -1
                    }
                    return unfold(u,k+kk)})))
        }		
    }); 
        
drag_handler(point); 
