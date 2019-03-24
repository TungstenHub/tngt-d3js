import {mdColor as color} from "../utils/material_color.js";

const
pivot_color = color.pink.w500,
iter_color = color.orange.w500;

let pivot_coord  = [{x:1.2, y:0.5}];

var svg = d3.select("#gradient_descent_ravine_minimum"),
width = +svg.attr("width"),
height = +svg.attr("height");

var radius=160;

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var l = d3.scaleLog().domain([0.001, 10]).range([x.invert(width*2/5), x.invert(width*3/5)]);

var start_x, start_y; 

function func_2d(x, y) { return Math.sqrt((x-1.5)*(x-1.5)+y*y)+Math.sqrt((x+1.5)*(x+1.5)+y*y)+0.01*x*x;}
function func_2d_der(x, y) { return [
        (x-1.5)/Math.sqrt((x-1.5)*(x-1.5)+y*y)+(x+1.5)/Math.sqrt((x+1.5)*(x+1.5)+y*y)+0.02*x,
        y/Math.sqrt((x-1.5)*(x-1.5)+y*y)+y/Math.sqrt((x+1.5)*(x+1.5)+y*y)
    ];}

var n = 240, m = 160, values = new Array(n * m);
for (var j = 0.5, k = 0; j < m; ++j) {
for (var i = 0.5; i < n; ++i, ++k) {
    values[k] = func_2d(x.invert(4*i), y.invert(4*j));
}
}

var min_value = Math.min(...values);
var max_value = Math.max(...values);

let n_thresh = 20;
var thresholds = d3.range(n_thresh).map(function(p) { return min_value+p*(max_value-min_value)/n_thresh; });

var contours = d3.contours()
    .size([n, m])
    .thresholds(thresholds);

var grad_color = d3.scaleLinear()
    .domain(d3.extent(thresholds))
    .interpolate(function() { return d3.interpolateYlGnBu; });

svg.selectAll("path")
    .data(contours(values))
    .enter().append("path")
        .attr("d", d3.geoPath(d3.geoIdentity().scale(width / n)))
        .attr("fill", function(d) { return grad_color(d.value); });

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

var lr = 1.4;

let iterates = function(a,b) {
    let z = {x:a, y:b};
    let line_list = [];
    let point_list = []
    let out = false;
    let prev_z;
    for (let i = 0; i < 100; i++) {
        if (!out) {
            prev_z = z
            z = {x:z.x-lr*func_2d_der(z.x,z.y)[0], y:z.y-lr*func_2d_der(z.x,z.y)[1]}
            if (Math.abs(z.x)>=4 || Math.abs(z.y)>=4) {
                out = true
            }
        } 
        line_list.push({p: [prev_z,z], c:(100-i)/100});
        point_list.push({p: z, c:(100-i)/100});
    }
    return [line_list,point_list]
}

let c = pivot_coord[0];	

var iter_path = svg.selectAll('.path')
    .data(iterates(c.x,c.y)[0])
    .enter().append('path')
    .attr('d', function(d) { return lineFunction(d.p); })
    .attr('stroke-width', 3)
    .attr('stroke', iter_color)
    .attr("stroke-opacity", function(d) { return d.c; })
    .attr('fill', 'none');

var trace = svg
    .append("g")
    .attr("class", "pivot")
        .selectAll(".pivot")
        .data(iterates(c.x,c.y)[1])
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.p.x))})
        .attr("cy", function(d) {return(y(d.p.y))})
        .attr("r", 3)
        .attr("fill", pivot_color)
        .attr("opacity",function(d) {return(d.c*d.c)});

var pivot = svg
    .append("g")
    .attr("class", "pivot")
        .selectAll(".pivot")
        .data(pivot_coord)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 7)
        .attr("fill", pivot_color);

svg.append("path")
    .attr("d", lineFunction([{x:x.invert(width*2/5),y:y.invert(height*9/10)},{x:x.invert(width*3/5),y:y.invert(height*9/10)}]))
    .attr("stroke-width", 2)
    .attr("stroke", 'black')
    .attr("fill", 'none');

var lr_pivot = svg
    .append("g")
    .attr("class", "pivot")
        .selectAll(".pivot")
        .data([{x:l(lr),y:y.invert(height*9/10)}])
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 5)
        .attr("fill", "white"); 


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
        c = pivot.data()[0];
        let it = iterates(c.x,c.y);
        iter_path
            .data(it[0])
            .attr('d', function(d) { return lineFunction(d.p); })
        trace
            .data(it[1])
            .attr("cx", function(d) {return(x(d.p.x))})
            .attr("cy", function(d) {return(y(d.p.y))})
            .attr("opacity",function(d) {return(d.c*d.c)});
    }); 

var drag_handler_lr = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width) + d3.event.x;
    })
    .on("drag", function(d) {
        let xx = start_x + x.invert(d3.event.x);
        d.x = Math.min(x.invert(width*3/5),Math.max(x.invert(width*2/5),start_x + x.invert(d3.event.x)));
        lr = l.invert(d.x);
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        c = pivot.data()[0];
        let it = iterates(c.x,c.y);
        iter_path
            .data(it[0])
            .attr('d', function(d) { return lineFunction(d.p); })
        trace
            .data(it[1])
            .attr("cx", function(d) {return(x(d.p.x))})
            .attr("cy", function(d) {return(y(d.p.y))})
            .attr("opacity",function(d) {return(d.c*d.c)});
    }); 
        
drag_handler(pivot);   
drag_handler_lr(lr_pivot);
