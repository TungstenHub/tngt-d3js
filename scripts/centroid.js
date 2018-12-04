point_coords = [{x:238, y:486}, {x:445, y:139}, {x:677,y:368}];

vertex_color = '#1565C0'; // blue 800
side_color = '#2196F3'; // blue 500
triangle_color = '#BBDEFB' // blue 100
centroid_color = '#2E7D32'; // green 800
median_color = '#4CAF50'; // green 500

var svg = d3.select("#d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var lineFunction = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

var triangle = svg.append("path")
    .attr("d", lineFunction(point_coords))
    .attr("stroke", "none")
    .attr("fill", triangle_color);

function mid_point(p, q){
    return {x:(p.x+q.x)/2, y:(p.y+q.y)/2}
}

function centroid_coords(p, q, r){
    return {x:(p.x+q.x+r.x)/3, y:(p.y+q.y+r.y)/3}
}

a = point_coords[0];
b = point_coords[1];
c = point_coords[2];

var a_median = svg.append("path")
    .attr("d", lineFunction([a,mid_point(b,c)]))
    .attr("stroke-width", 5)
    .attr("stroke", median_color);

var b_median = svg.append("path")
    .attr("d", lineFunction([b,mid_point(c,a)]))
    .attr("stroke-width", 5)
    .attr("stroke", median_color);

var c_median = svg.append("path")
    .attr("d", lineFunction([c,mid_point(a,b)]))
    .attr("stroke-width", 5)
    .attr("stroke", median_color);

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

var centroid = svg
    .append("circle")
    .attr("cx", centroid_coords(a,b,c).x)
    .attr("cy", centroid_coords(a,b,c).y)
    .attr("r", 7)
    .attr("fill", centroid_color);

var vertices = svg
    .append("g")
    .attr("class", "vertices")
        .selectAll(".vertices")
        .data(point_coords)
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
        triangle
            .attr("d", lineFunction([a,b,c]));
        a_side
            .attr("d", lineFunction([b,c]));
        b_side
            .attr("d", lineFunction([c,a]));
        c_side
            .attr("d", lineFunction([a,b]));
        a_median
            .attr("d", lineFunction([a,mid_point(b,c)]));
        b_median
            .attr("d", lineFunction([b,mid_point(c,a)]));
        c_median
            .attr("d", lineFunction([c,mid_point(a,b)]));
        centroid
            .attr("cx", centroid_coords(a,b,c).x)
            .attr("cy", centroid_coords(a,b,c).y)
    }); 
        
drag_handler(vertices);  