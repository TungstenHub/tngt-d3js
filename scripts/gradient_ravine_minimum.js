pivot_coord  = [{x:0.5, y:0.2}];

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var radius=160;

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

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

n_thresh = 20;
var thresholds = d3.range(n_thresh).map(function(p) { return min_value+p*(max_value-min_value)/n_thresh; });

var contours = d3.contours()
    .size([n, m])
    .thresholds(thresholds);

var color = d3.scaleLinear()
    .domain(d3.extent(thresholds))
    .interpolate(function() { return d3.interpolateYlGnBu; });

svg.selectAll("path")
    .data(contours(values))
    .enter().append("path")
        .attr("d", d3.geoPath(d3.geoIdentity().scale(width / n)))
        .attr("fill", function(d) { return color(d.value); });

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

c = pivot_coord[0];	
grad = func_2d_der(c.x, c.y);

arrow = svg.append("path")
    .attr("d", lineFunction([c,{x:c.x+grad[0],y:c.y+grad[1]}]))
    .attr("stroke-width", 5)
    .attr("stroke", "#FF9800") // orange 500
angle = Math.atan2(grad[1],grad[0]);
marker = svg.append("path")
    .attr("d", lineFunction([{x:0.05*Math.cos(0*Math.PI/3+angle),y:0.05*Math.sin(0*Math.PI/3+angle)},
                            {x:0.05*Math.cos(2*Math.PI/3+angle),y:0.05*Math.sin(2*Math.PI/3+angle)},
                            {x:0.05*Math.cos(4*Math.PI/3+angle),y:0.05*Math.sin(4*Math.PI/3+angle)}]))
    .attr("transform", "translate(" + radius*(c.x+grad[0]) + "," + radius*(-c.y-grad[1]) + ")")
    .attr("stroke", 'none')
    .attr("fill", "#FF9800") // orange 500

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
        .attr("fill", "#E91E63"); // pink 500

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
        grad = func_2d_der(c.x, c.y);
        arrow
            .attr("d", lineFunction([c,{x:c.x+grad[0],y:c.y+grad[1]}]));
        angle = Math.atan2(grad[1],grad[0]);
        marker
            .attr("d", lineFunction([{x:0.05*Math.cos(0*Math.PI/3+angle),y:0.05*Math.sin(0*Math.PI/3+angle)},
                                    {x:0.05*Math.cos(2*Math.PI/3+angle),y:0.05*Math.sin(2*Math.PI/3+angle)},
                                    {x:0.05*Math.cos(4*Math.PI/3+angle),y:0.05*Math.sin(4*Math.PI/3+angle)}]))
            .attr("transform", "translate(" + radius*(c.x+grad[0]) + "," + radius*(-c.y-grad[1]) + ")");
    }); 
        
drag_handler(pivot);