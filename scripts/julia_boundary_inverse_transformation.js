vertex_color = '#000000'; // black
julia_color = '#FF9800'; // green 500
circles_color = '#2196F3'; // blue 500
rays_color = '#E91E63'; // pink 500

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

radius = 150

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

point_coords = [{x: 0, y: 0}];

function get_inverse_transf(point, seed){
    const c = point.x - seed.x;
    const d = point.y - seed.y;
    const a = Math.sqrt((c+Math.sqrt(c*c+d*d))/2);
    const b = (a!=0) ? d/(2*a) : Math.sqrt(-c); /////
    return [{x: a, y: b}, {x: -a, y: -b}]
}

function get_roots(iter, seed){
    let curr_roots = [{x: 1, y: 0}];
    for (let i=0; i<iter; i++) {
        curr_roots = [].concat(...curr_roots.map(p => get_inverse_transf(p, seed)));
    }
    return curr_roots
}

s = point_coords[0];

k = 9;

julia_coords = get_roots(k, s);

var x_axis = svg.append("path")
    .attr("d", lineFunction([{x: -4, y: 0}, {x: 4, y: 0}]))
    .attr("stroke-width", 1)
    .attr("stroke", '#00000080');

var y_axis = svg.append("path")
    .attr("d", lineFunction([{x: 0, y: -3}, {x: 0, y: 3}]))
    .attr("stroke-width", 1)
    .attr("stroke", '#00000080');

var julia_points = svg
    .append("g")
    .attr("class", "julia_points")
        .selectAll(".julia_points")
        .data(julia_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 3)
        .attr("fill", julia_color); 

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
        s = vertices.data()[0];
        julia_points
            .data(get_roots(k, s))
            .attr("cx", function(d) {return(x(d.x))})
            .attr("cy", function(d) {return(y(d.y))})
    }); 
        
drag_handler(vertices);   