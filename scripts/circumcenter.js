point_coords = [{x:238, y:486}, {x:445, y:139}, {x:677,y:368}];

vertex_color = '#1565C0'; // blue 800
side_color = '#2196F3'; // blue 500
triangle_color = '#BBDEFB' // blue 100
circumcenter_color = '#C62828'; // red 800
circumcircle_color = '#C62828'; // red 800
perp_bisec_color = '#F44336'; // red 500

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var lineFunction = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

var triangle = svg.append("path")
    .attr("d", lineFunction(point_coords))
    .attr("stroke", "none")
    .attr("fill", triangle_color);

function dist(p, q){
    var dx = p.x - q.x;
    var dy = p.y - q.y;
    return Math.sqrt(dx*dx + dy*dy);
}

function mid_point(p, q){
    return {x:(p.x+q.x)/2, y:(p.y+q.y)/2}
}

function circumcenter_coords(p, q, r){
    da = dist(q,r);
    db = dist(r,p);
    dc = dist(p,q);
    aa = da*da*(da*da-db*db-dc*dc)
    bb = db*db*(db*db-dc*dc-da*da)
    cc = dc*dc*(dc*dc-da*da-db*db)
    return {x: (aa*p.x+bb*q.x+cc*r.x)/(aa+bb+cc),
            y: (aa*p.y+bb*q.y+cc*r.y)/(aa+bb+cc)}
}

function radius(p, q, r){
    return (dist(p,q)*dist(q,r)*dist(r,p))/(2*Math.abs(-p.y*q.x + p.x*q.y + p.y*r.x - q.y*r.x - p.x*r.y + q.x*r.y))
}

a = point_coords[0];
b = point_coords[1];
c = point_coords[2];

var a_perp_bisec = svg.append("path")
    .attr("d", lineFunction([circumcenter_coords(a,b,c),mid_point(b,c)]))
    .attr("stroke-width", 5)
    .attr("stroke", perp_bisec_color);

var b_perp_bisec = svg.append("path")
    .attr("d", lineFunction([circumcenter_coords(a,b,c),mid_point(c,a)]))
    .attr("stroke-width", 5)
    .attr("stroke", perp_bisec_color);

var c_perp_bisec = svg.append("path")
    .attr("d", lineFunction([circumcenter_coords(a,b,c),mid_point(a,b)]))
    .attr("stroke-width", 5)
    .attr("stroke", perp_bisec_color);

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

var circumcenter = svg
    .append("circle")
    .attr("cx", circumcenter_coords(a,b,c).x)
    .attr("cy", circumcenter_coords(a,b,c).y)
    .attr("r", 7)
    .attr("fill", circumcenter_color);

var circumcircle = svg
    .append("circle")
    .attr("cx", circumcenter_coords(a,b,c).x)
    .attr("cy", circumcenter_coords(a,b,c).y)
    .attr("r", radius(a,b,c))
    .style("stroke-width", 5)
    .style("stroke", circumcircle_color)
    .style("fill", "none");

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
        circ_coords = circumcenter_coords(a,b,c);
        a_perp_bisec
            .attr("d", lineFunction([circ_coords,mid_point(b,c)]));
        b_perp_bisec
            .attr("d", lineFunction([circ_coords,mid_point(c,a)]));
        c_perp_bisec
            .attr("d", lineFunction([circ_coords,mid_point(a,b)]));
        circumcenter
            .attr("cx", circ_coords.x)
            .attr("cy", circ_coords.y)
        circumcircle
            .attr("cx", circ_coords.x)
            .attr("cy", circ_coords.y)
            .attr("r", radius(a,b,c))
    });

drag_handler(vertices);