d3require(
    "utils/triangle_coordinates.js",
    "utils/material_color.js",
).then(d3m => {

const color = d3m.mdColor;

point_coords = [{x:238, y:486}, {x:445, y:139}, {x:677,y:368}];

vertex_color = color.blue.w800;
side_color = color.blue.w500;
triangle_color =color.blue.w100;
gergonne_color = color.teal.w800;
incircle_color = color.amber.w800;
cev_color = color.teal.w500;

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

function cev_point(p, q, r){
    let aa = dist(q,r);
    let bb = dist(r,p);
    let cc = dist(p,q);
    return {x:((aa+bb-cc)*q.x+(aa+cc-bb)*r.x)/(2*aa),
            y:((aa+bb-cc)*q.y+(aa+cc-bb)*r.y)/(2*aa)}
}

function incenter_coords(p, q, r){
    return {x:(dist(q,r)*p.x+dist(r,p)*q.x+dist(p,q)*r.x)/(dist(q,r)+dist(r,p)+dist(p,q)),
            y:(dist(q,r)*p.y+dist(r,p)*q.y+dist(p,q)*r.y)/(dist(q,r)+dist(r,p)+dist(p,q))}
}

function gergonne_coords(p, q, r){
    let aa = dist(q,r);
    let bb = dist(r,p);
    let cc = dist(p,q);
    let P = bb+cc-aa;
    let Q = cc+aa-bb;
    let R = aa+bb-cc;
    return {x:(Q*R*p.x+R*P*q.x+P*Q*r.x)/(P*Q+Q*R+R*P),
            y:(Q*R*p.y+R*P*q.y+P*Q*r.y)/(P*Q+Q*R+R*P)}
}

function radius(p, q, r){
    return Math.abs(-p.y*q.x + p.x*q.y + p.y*r.x - q.y*r.x - p.x*r.y + q.x*r.y)/(dist(p,q)+dist(q,r)+dist(r,p))
}

a = point_coords[0];
b = point_coords[1];
c = point_coords[2];

var a_cev = svg.append("path")
    .attr("d", lineFunction([a,cev_point(a,b,c)]))
    .attr("stroke-width", 5)
    .attr("stroke", cev_color);

var b_cev = svg.append("path")
    .attr("d", lineFunction([b,cev_point(b,c,a)]))
    .attr("stroke-width", 5)
    .attr("stroke", cev_color);

var c_cev = svg.append("path")
    .attr("d", lineFunction([c,cev_point(c,a,b)]))
    .attr("stroke-width", 5)
    .attr("stroke", cev_color);

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

var gergonne = svg
    .append("circle")
    .attr("cx", gergonne_coords(a,b,c).x)
    .attr("cy", gergonne_coords(a,b,c).y)
    .attr("r", 7)
    .attr("fill", gergonne_color);

var incircle = svg
    .append("circle")
    .attr("cx", incenter_coords(a,b,c).x)
    .attr("cy", incenter_coords(a,b,c).y)
    .attr("r", radius(a,b,c))
    .style("stroke-width", 5)
    .style("stroke", incircle_color)   
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
        a_cev
            .attr("d", lineFunction([a,cev_point(a,b,c)]));
        b_cev
            .attr("d", lineFunction([b,cev_point(b,c,a)]));
        c_cev
            .attr("d", lineFunction([c,cev_point(c,a,b)]));
        inc_coords = incenter_coords(a,b,c)
        ger_coords = gergonne_coords(a,b,c)
        gergonne
            .attr("cx", ger_coords.x)
            .attr("cy", ger_coords.y)
        incircle
            .attr("cx", inc_coords.x)
            .attr("cy", inc_coords.y)
            .attr("r", radius(a,b,c))
    }); 
        
drag_handler(vertices);

});