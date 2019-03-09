d3require(
    "utils/triangle_coordinates.js",
    "utils/material_color.js",
).then(d3m => {

const color = d3m.mdColor;

point_coords = [{x:238, y:486}, {x:445, y:139}, {x:677,y:368}];

const
vertex_color = color.blue.w800,
side_color = color.blue.w500,
triangle_color = color.blue.w100,
orthocenter_color = color.deeppurple.w800;
altitude_color = color.deeppurple.w500;

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

function pedal_point(p,q,r){
    da = dist(q,r);
    db = dist(r,p);
    dc = dist(p,q);
    return {x: ((da*da+db*db-dc*dc)*q.x+(da*da-db*db+dc*dc)*r.x)/(2*da*da),
            y: ((da*da+db*db-dc*dc)*q.y+(da*da-db*db+dc*dc)*r.y)/(2*da*da)}
}

function orthocenter_coords(p, q, r){
    da = dist(q,r);
    db = dist(r,p);
    dc = dist(p,q);
    aa = (da*da+db*db-dc*dc)*(da*da-db*db+dc*dc)
    bb = (db*db+dc*dc-da*da)*(db*db-dc*dc+da*da)
    cc = (dc*dc+da*da-db*db)*(dc*dc-da*da+db*db)
    return {x: (aa*p.x+bb*q.x+cc*r.x)/(aa+bb+cc),
            y: (aa*p.y+bb*q.y+cc*r.y)/(aa+bb+cc)}
}

a = point_coords[0];
b = point_coords[1];
c = point_coords[2];

var a_altitude_d = svg.append("path")
    .attr("d", lineFunction([a,orthocenter_coords(a,b,c)]))
    .attr("stroke-width", 4.5)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", altitude_color);

var b_altitude_d = svg.append("path")
    .attr("d", lineFunction([b,orthocenter_coords(a,b,c)]))
    .attr("stroke-width", 4.5)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", altitude_color);

var c_altitude_d = svg.append("path")
    .attr("d", lineFunction([c,orthocenter_coords(a,b,c)]))
    .attr("stroke-width", 4.5)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", altitude_color);

var a_altitude = svg.append("path")
    .attr("d", lineFunction([a,pedal_point(a,b,c)]))
    .attr("stroke-width", 5)
    .attr("stroke", altitude_color);

var b_altitude = svg.append("path")
    .attr("d", lineFunction([b,pedal_point(b,c,a)]))
    .attr("stroke-width", 5)
    .attr("stroke", altitude_color);

var c_altitude = svg.append("path")
    .attr("d", lineFunction([c,pedal_point(c,a,b)]))
    .attr("stroke-width", 5)
    .attr("stroke", altitude_color);

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

var orthocenter = svg
    .append("circle")
    .attr("cx", orthocenter_coords(a,b,c).x)
    .attr("cy", orthocenter_coords(a,b,c).y)
    .attr("r", 7)
    .attr("fill", orthocenter_color);

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
        circ_coords = orthocenter_coords(a,b,c);
        a_altitude_d
            .attr("d", lineFunction([a,circ_coords]));
        b_altitude_d
            .attr("d", lineFunction([b,circ_coords]));
        c_altitude_d
            .attr("d", lineFunction([c,circ_coords]));
        a_altitude
            .attr("d", lineFunction([a,pedal_point(a,b,c)]));
        b_altitude
            .attr("d", lineFunction([b,pedal_point(b,c,a)]));
        c_altitude
            .attr("d", lineFunction([c,pedal_point(c,a,b)]));
        orthocenter
            .attr("cx", circ_coords.x)
            .attr("cy", circ_coords.y)
    });

drag_handler(vertices);

});