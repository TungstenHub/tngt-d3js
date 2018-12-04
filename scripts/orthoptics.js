radius = 200

pivot_coord  = [{x:Math.cos(-2.5), y:Math.sin(-2.5)}];
point_coords = [{x:Math.cos(-1), y:Math.sin(-1)}, {x:Math.cos(1.8), y:Math.sin(1.8)}];

vertex_color = '#1565C0'; // blue 800
side_color = '#2196F3'; // blue 500

pivot_color = '#C62828'; // red 800
pivot_angle_color = '#F44336'; // red 500

center_color = '#EF6C00'; // orange 800
center_angle_color = '#FF9800'; // orange 500

var svg = d3.select("#d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

var angleFunction = d3.arc()
    .innerRadius(0)
    .outerRadius(25)
    .startAngle(function(d) { return d.startAngle })
    .endAngle(function(d) { return d.endAngle });

function pivot_angles(p,q,r){
    alpha = Math.PI/2-Math.atan2(q.y-p.y,q.x-p.x);
    beta = Math.PI/2-Math.atan2(r.y-p.y,r.x-p.x);
    gamma = Math.PI/2-Math.atan2(q.y,q.x);
    delta = Math.PI/2-Math.atan2(r.y,r.x);
    epsilon = Math.PI/2-Math.atan2(p.y,p.x);
    if (beta-alpha >= Math.PI) {
        p_angles = {startAngle: beta, 
                    endAngle: alpha + 2*Math.PI};
    } else if (alpha-beta >= Math.PI) {
        p_angles = {startAngle: alpha, 
                    endAngle: beta + 2*Math.PI};
    } else if (beta <= alpha) {
        p_angles = {startAngle: beta, 
                    endAngle: alpha};
    } else {
        p_angles = {startAngle: alpha, 
                    endAngle: beta};
    }
    if (gamma <= epsilon && epsilon <= delta) {
        c_angles = {startAngle: delta, 
                    endAngle: gamma + 2*Math.PI};
    } else if (delta <= epsilon && epsilon <= gamma) {
        c_angles = {startAngle: gamma, 
                    endAngle: delta + 2*Math.PI};
    } else {
        c_angles = {startAngle: gamma, 
            endAngle: delta};
    }
    return [p_angles, c_angles]
}
        
a = point_coords[0];
b = point_coords[1];
c = {x: 0, y: 0};

d = pivot_coord[0];
        
var circle = svg
    .append("circle")
    .attr("cx", x(0))
    .attr("cy", y(0))
    .attr("r", radius)
    .style("stroke-width", 5)
    .style("stroke", "black")   
    .style("fill", "none"); 

var pivot_arc = svg.append("path")
    .attr("d", angleFunction(pivot_angles(d,a,b)[0]))
    .attr("transform", "translate("+x(d.x)+","+y(d.y)+")")
    .attr("fill", pivot_angle_color);

var center_arc = svg.append("path")
    .attr("d", angleFunction(pivot_angles(d,a,b)[1]))
    .attr("transform", "translate("+x(0)+","+y(0)+")")
    .attr("fill", center_angle_color);

var center_arc_2 = svg.append("path")
    .attr("d", angleFunction(pivot_angles(d,a,b)[1]))
    .attr("transform", "translate("+x(1)+","+y(1)+")")
    .attr("fill", center_angle_color);

    new_gamma = pivot_angles(d,a,b)[1].startAngle;
    new_delta = pivot_angles(d,a,b)[1].endAngle;

var pivot_arc_1 = svg.append("path")
    .attr("d", angleFunction({startAngle: new_gamma, endAngle: (new_gamma+new_delta)/2}))
    .style("stroke-width", 2)
    .style("stroke", "white") 
    .attr("transform", "translate("+x(1.3)+","+y(1)+")")
    .attr("fill", pivot_angle_color);

var pivot_arc_2 = svg.append("path")
    .attr("d", angleFunction({startAngle: (new_gamma+new_delta)/2, endAngle: new_delta}))
    .style("stroke-width", 2)
    .style("stroke", "white")
    .attr("transform", "translate("+x(1.3)+","+y(1)+")")
    .attr("fill", pivot_angle_color);

var a_side = svg.append("path")
    .attr("d", lineFunction([d,a]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var b_side = svg.append("path")
    .attr("d", lineFunction([d,b]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var a_center = svg.append("path")
    .attr("d", lineFunction([c,a]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var b_center = svg.append("path")
    .attr("d", lineFunction([c,b]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var center = svg
    .append("g")
    .attr("class", "pivot")
        .selectAll(".pivot")
        .data(pivot_coord)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(c.x))})
        .attr("cy", function(d) {return(y(c.y))})
        .attr("r", 7)
        .attr("fill", center_color);

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

var drag_handler = d3.drag()
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
        d = pivot.data()[0];
        a_side
            .attr("d", lineFunction([d,a]));
        b_side
            .attr("d", lineFunction([d,b]));
        a_center
            .attr("d", lineFunction([c,a]));
        b_center
            .attr("d", lineFunction([c,b]));
        angles = pivot_angles(d,a,b)
        pivot_arc
            .attr("d", angleFunction(angles[0]))
            .attr("transform", "translate("+x(d.x)+","+y(d.y)+")")
        center_arc
            .attr("d", angleFunction(angles[1]))
        center_arc_2
            .attr("d", angleFunction(angles[1]))
        new_gamma = pivot_angles(d,a,b)[1].startAngle;
        new_delta = pivot_angles(d,a,b)[1].endAngle;
        pivot_arc_1
            .attr("d", angleFunction({startAngle: new_gamma, endAngle: (new_gamma+new_delta)/2}))
        pivot_arc_2
            .attr("d", angleFunction({startAngle: (new_gamma+new_delta)/2, endAngle: new_delta}))
    }); 
        
drag_handler(vertices);
drag_handler(pivot);   