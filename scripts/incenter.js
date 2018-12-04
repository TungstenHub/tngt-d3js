point_coords = [{x:238, y:486}, {x:445, y:139}, {x:677,y:368}];

vertex_color = '#1565C0'; // blue 800
side_color = '#2196F3'; // blue 500
triangle_color = '#BBDEFB' // blue 100
incenter_color = '#FFA000'; // amber 800
incircle_color = '#FFA000'; // amber 800
bisec_color = '#FFC107'; // amber 500

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

function dist(p, q){
    var dx = p.x - q.x;
    var dy = p.y - q.y;
    return Math.sqrt(dx*dx + dy*dy);
}

function bisec_point(p, q, r){
    return {x:(dist(p,r)*q.x+dist(p,q)*r.x)/(dist(p,q)+dist(p,r)),
            y:(dist(p,r)*q.y+dist(p,q)*r.y)/(dist(p,q)+dist(p,r))}
}

function incenter_coords(p, q, r){
    return {x:(dist(q,r)*p.x+dist(r,p)*q.x+dist(p,q)*r.x)/(dist(q,r)+dist(r,p)+dist(p,q)),
            y:(dist(q,r)*p.y+dist(r,p)*q.y+dist(p,q)*r.y)/(dist(q,r)+dist(r,p)+dist(p,q))}
}

function radius(p, q, r){
    return Math.abs(-p.y*q.x + p.x*q.y + p.y*r.x - q.y*r.x - p.x*r.y + q.x*r.y)/(dist(p,q)+dist(q,r)+dist(r,p))
}

a = point_coords[0];
b = point_coords[1];
c = point_coords[2];

var a_bisec = svg.append("path")
    .attr("d", lineFunction([a,bisec_point(a,b,c)]))
    .attr("stroke-width", 5)
    .attr("stroke", bisec_color);

var b_bisec = svg.append("path")
    .attr("d", lineFunction([b,bisec_point(b,c,a)]))
    .attr("stroke-width", 5)
    .attr("stroke", bisec_color);

var c_bisec = svg.append("path")
    .attr("d", lineFunction([c,bisec_point(c,a,b)]))
    .attr("stroke-width", 5)
    .attr("stroke", bisec_color);

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

var incenter = svg
    .append("circle")
    .attr("cx", incenter_coords(a,b,c).x)
    .attr("cy", incenter_coords(a,b,c).y)
    .attr("r", 7)
    .attr("fill", incenter_color);

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
        a_bisec
            .attr("d", lineFunction([a,bisec_point(a,b,c)]));
        b_bisec
            .attr("d", lineFunction([b,bisec_point(b,c,a)]));
        c_bisec
            .attr("d", lineFunction([c,bisec_point(c,a,b)]));
        inc_coords = incenter_coords(a,b,c)
        incenter
            .attr("cx", inc_coords.x)
            .attr("cy", inc_coords.y)
        incircle
            .attr("cx", inc_coords.x)
            .attr("cy", inc_coords.y)
            .attr("r", radius(a,b,c))
    }); 
        
drag_handler(vertices);   