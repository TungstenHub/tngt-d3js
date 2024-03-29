import {mdColor as color} from "../utils/material_color.js";
import d3 from "../utils/deps/d3.js";

let radius = 200

let point_coords = [{x:-1.5, y:0}, {x:-0.5, y:0}, {x:0.5, y:0}, {x:1.5, y:0}];

const
base_color = color.blue.w500,
point_color = color.blue.w800,
point_label_color = color.green.w500,
cr_label_color = color.green.w800,
cross_ratio_guides = color.gray.w500,
cross_ratio_color = color.gray.w800;

let chartDiv = document.getElementById("cross_ratio");
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
        
let a = point_coords[0];
let b = point_coords[1];
let c = point_coords[2];
let d = point_coords[3];

var line = svg.append("path")
    .attr("d", lineFunction([{x:-3, y:0}, {x:3, y:0}]))
    .attr("stroke-width", 5)
    .attr("stroke", base_color);

var base_points = svg
    .append("g")
    .attr("class", "base_points")
        .selectAll(".base_points")
        .data(point_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 7)
        .attr("fill", point_color); 

var cross_ratio_text = svg
    .append("g")
    .attr("class", "cross_ratio_text")
        .selectAll(".cross_ratio_text")
        .data(point_coords)
        .enter()
        .append("text")
        .attr("font-size", "48px")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .attr("font-family", "sans-serif")
        .attr("fill", function(d, i) { return i==3 ? cross_ratio_color : cross_ratio_guides; });

var point_labels = svg
    .append("g")
    .attr("class", "point_labels")
        .selectAll(".point_labels")
        .data(point_coords)
        .enter()
        .append("text")
        .attr("font-size", "24px")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .attr("font-family", "sans-serif")
        .attr("fill", point_label_color);

var cr_labels = svg
    .append("g")
    .attr("class", "cr_labels")
        .selectAll(".cr_labels")
        .data(point_coords)
        .enter()
        .append("text")
        .attr("font-size", "24px")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .attr("font-family", "sans-serif")
        .attr("fill", cr_label_color);

var cross_ratio = function(A, B, C, D) {
    return ((C-A)*(D-B))/((C-B)*(D-A));
}

let update = function() {
    cross_ratio_text
        .attr("x", function(d, i) { return x(d.x); })
        .attr("y", function(d, i) { return i==3 ? y(0.35) : y(-0.35); })
        .text( function (data, i) { 
            switch(i) {
                case 0:
                    return '∞'
                case 1:
                    return '0'
                case 2:
                    return '1'
                default:
                    return d3.format(".2f")(cross_ratio(a.x,b.x,c.x,d.x))
            }
        });
    point_labels
        .attr("x", function(d, i) { return x(d.x); })
        .attr("y", function(d, i) { return y(0.12); })
        .text( function (data, i) { 
            switch(i) {
                case 0:
                    return 'A'
                case 1:
                    return 'B'
                case 2:
                    return 'C'
                default:
                    return 'D'
            }
        });
    cr_labels
        .attr("x", function(d, i) { return x(d.x); })
        .attr("y", function(d, i) { return i==3 ? y(0.6) : y(-0.6); })
        .text( function (data, i) { 
            switch(i) {
                case 0:
                    return '(A,B;C,A)'
                case 1:
                    return '(A,B;C,B)'
                case 2:
                    return '(A,B;C,C)'
                default:
                    return '(A,B;C,D)'
            }
        });
}

update();

var drag_handler_base_points = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        let xx = start_x + x.invert(d3.event.x);
        let yy = start_y + y.invert(d3.event.y);
        d.x = xx;
        d.y = 0;
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        a = base_points.data()[0];
        b = base_points.data()[1];
        c = base_points.data()[2];
        d = base_points.data()[3];

        update();
    }); 

drag_handler_base_points(base_points);
