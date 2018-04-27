point_coords = [{x:238, y:486}, {x:445, y:139}, {x:677,y:368}]; 

vertex_color = '#1565C0'; // blue 800
side_color = '#2196F3'; // blue 500
triangle_color = '#BBDEFB' // blue 100
centroid_color = '#2E7D32'; // green 800
incenter_color = '#FFA000'; // amber 800
circumcenter_color = '#C62828'; // red 800
orthocenter_color = '#4527A0'; // deep purple 800
euler_color = '#37474F'; // blue grey 800

var svg = d3.select("svg"),
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

function centroid_coords(p, q, r){
    return {x:(p.x+q.x+r.x)/3, y:(p.y+q.y+r.y)/3}
}

function incenter_coords(p, q, r){
    return {x:(dist(q,r)*p.x+dist(r,p)*q.x+dist(p,q)*r.x)/(dist(q,r)+dist(r,p)+dist(p,q)),
            y:(dist(q,r)*p.y+dist(r,p)*q.y+dist(p,q)*r.y)/(dist(q,r)+dist(r,p)+dist(p,q))}
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

var euler = svg.append("path")
    .attr("d", lineFunction([circumcenter_coords(a,b,c),orthocenter_coords(a,b,c)]))
    .attr("stroke-width", 5)
    .attr("stroke", euler_color);

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

var incenter = svg
    .append("circle")
    .attr("cx", incenter_coords(a,b,c).x)
    .attr("cy", incenter_coords(a,b,c).y)
    .attr("r", 7)
    .attr("fill", incenter_color);

var circumcenter = svg
    .append("circle")
    .attr("cx", circumcenter_coords(a,b,c).x)
    .attr("cy", circumcenter_coords(a,b,c).y)
    .attr("r", 7)
    .attr("fill", circumcenter_color);

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
        centroid
            .attr("cx", centroid_coords(a,b,c).x)
            .attr("cy", centroid_coords(a,b,c).y)
        inc_coords = incenter_coords(a,b,c)
        incenter
            .attr("cx", inc_coords.x)
            .attr("cy", inc_coords.y)
        circ_coords = circumcenter_coords(a,b,c);
        circumcenter
            .attr("cx", circ_coords.x)
            .attr("cy", circ_coords.y)
        orth_coords = orthocenter_coords(a,b,c);
        orthocenter
            .attr("cx", orth_coords.x)
            .attr("cy", orth_coords.y)
        euler
            .attr("d", lineFunction([circ_coords,orth_coords]))
    });

drag_handler(vertices);