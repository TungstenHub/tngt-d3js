d3require(
    "utils/material_color.js",
).then(d3m => {

const color = d3m.mdColor;

radius = 200

pivot_coord  = [{x:Math.cos(-2.5), y:Math.sin(-2.5)}];
point_coords = [{x:Math.cos(-1), y:Math.sin(-1)}, {x:Math.cos(1.8), y:Math.sin(1.8)}, {x:Math.cos(3), y:Math.sin(3)}];

const
vertex_color = color.blue.w800,
side_color = color.blue.w500,
triangle_color =color.blue.w100,
pivot_color = color.green.w800,
altitude_color = color.green.w500,
pedal_point_color = color.orange.w800,
simson_line_color = color.orange.w500;

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, height]);

var start_x, start_y; 

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });
    
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
        
a = point_coords[0];
b = point_coords[1];
c = point_coords[2];

d = pivot_coord[0];

ap = pedal_point(d,b,c);
bp = pedal_point(d,c,a);
cp = pedal_point(d,a,b);

var triangle = svg.append("path")
    .attr("d", lineFunction(point_coords))
    .attr("stroke", "none")
    .attr("fill", triangle_color);
        
var circle = svg
    .append("circle")
    .attr("cx", x(0))
    .attr("cy", y(0))
    .attr("r", radius)
    .style("stroke-width", 5)
    .style("stroke", "black")   
    .style("fill", "none"); 

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

var ab_aux = svg.append("path")
    .attr("d", lineFunction([ap,b]))
    .attr("stroke-width", 4)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", side_color);

var bc_aux = svg.append("path")
    .attr("d", lineFunction([bp,c]))
    .attr("stroke-width", 4)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", side_color);

var ca_aux = svg.append("path")
    .attr("d", lineFunction([cp,a]))
    .attr("stroke-width", 4)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", side_color);

var ac_aux = svg.append("path")
    .attr("d", lineFunction([ap,c]))
    .attr("stroke-width", 4)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", side_color);

var ba_aux = svg.append("path")
    .attr("d", lineFunction([bp,a]))
    .attr("stroke-width", 4)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", side_color);

var cb_aux = svg.append("path")
    .attr("d", lineFunction([cp,b]))
    .attr("stroke-width", 4)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", side_color);

var a_altitude = svg.append("path")
    .attr("d", lineFunction([d,ap]))
    .attr("stroke-width", 5)
    .attr("stroke", altitude_color);

var b_altitude = svg.append("path")
    .attr("d", lineFunction([d,bp]))
    .attr("stroke-width", 5)
    .attr("stroke", altitude_color);

var c_altitude = svg.append("path")
    .attr("d", lineFunction([d,cp]))
    .attr("stroke-width", 5)
    .attr("stroke", altitude_color);

var a_simson = svg.append("path")
    .attr("d", lineFunction([bp,cp]))
    .attr("stroke-width", 5)
    .attr("stroke", simson_line_color);

var b_simson = svg.append("path")
    .attr("d", lineFunction([cp,ap]))
    .attr("stroke-width", 5)
    .attr("stroke", simson_line_color);

var c_simson = svg.append("path")
    .attr("d", lineFunction([ap,bp]))
    .attr("stroke-width", 5)
    .attr("stroke", simson_line_color);

var ap_point = svg
    .append("circle")
    .attr("cx", x(ap.x))
    .attr("cy", y(ap.y))
    .attr("r", 7)
    .attr("fill", pedal_point_color);

var bp_point = svg
    .append("circle")
    .attr("cx", x(bp.x))
    .attr("cy", y(bp.y))
    .attr("r", 7)
    .attr("fill", pedal_point_color);

var cp_point = svg
    .append("circle")
    .attr("cx", x(cp.x))
    .attr("cy", y(cp.y))
    .attr("r", 7)
    .attr("fill", pedal_point_color);

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

update = function() {
    ap = pedal_point(d,b,c);
    bp = pedal_point(d,c,a);
    cp = pedal_point(d,a,b);
    a_altitude
        .attr("d", lineFunction([d,ap]));
    b_altitude
        .attr("d", lineFunction([d,bp]));
    c_altitude
        .attr("d", lineFunction([d,cp]));
    ap_point
        .attr("cx", x(ap.x))
        .attr("cy", y(ap.y));
    bp_point
        .attr("cx", x(bp.x))
        .attr("cy", y(bp.y));
    cp_point
        .attr("cx", x(cp.x))
        .attr("cy", y(cp.y));
    a_simson
        .attr("d", lineFunction([bp,cp]));
    b_simson
        .attr("d", lineFunction([cp,ap]));
    c_simson
        .attr("d", lineFunction([ap,bp]));
    ab_aux
        .attr("d", lineFunction([ap,b]));
    bc_aux
        .attr("d", lineFunction([bp,c]));
    ca_aux
        .attr("d", lineFunction([cp,a]));
    ac_aux
        .attr("d", lineFunction([ap,c]));
    cb_aux
        .attr("d", lineFunction([cp,b]));
    ba_aux
        .attr("d", lineFunction([bp,a]));
}

var drag_handler_vertices = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        xx = start_x + x.invert(d3.event.x);
        yy = start_y + y.invert(d3.event.y);
        d.x = xx/Math.sqrt(xx*xx+yy*yy)
        d.y = yy/Math.sqrt(xx*xx+yy*yy)
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
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
        update();
    }); 

var drag_handler_pivot = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        xx = start_x + x.invert(d3.event.x);
        yy = start_y + y.invert(d3.event.y);
        d.x = xx/Math.sqrt(xx*xx+yy*yy)
        d.y = yy/Math.sqrt(xx*xx+yy*yy)
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        d = pivot.data()[0];
        update();
    }); 
        
drag_handler_vertices(vertices);
drag_handler_pivot(pivot);

});