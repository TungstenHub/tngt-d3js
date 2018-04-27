radius = 120

offset = -1.7

point_coords = [{x:Math.sqrt(2), y:0.0}];
angle = 0;

neigh_array = Array.from({length: 61}, (x,i) => 2*Math.PI*i/60);

unfold = function(p,k) {
    u = Math.atan2(p.y,p.x+0.95)+k*2*Math.PI;
    v = Math.sqrt((p.x+0.95)*(p.x+0.95)+p.y*p.y);
    return {x: 1.2*Math.sqrt(v-0.2)*Math.cos(u/3)+3, y: 1.2*Math.sqrt(v-0.2)*Math.sin(u/3)};
}

lemn_paramet = function(u){
    return {x: Math.sqrt(2)*Math.cos(u)/(1+Math.sin(u)*Math.sin(u)), y: Math.sqrt(2)*Math.cos(u)*Math.sin(u)/(1+Math.sin(u)*Math.sin(u))};
}

point_color = '#00695C'; // teal 800
path_color = '#009688'; // teal 500

lift_point_color = '#AD1457'; // pink 800
lift_path_color = '#E91E63'; // pink 500

var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2+radius*offset, width+radius*offset]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

// based on https://en.wikipedia.org/wiki/Cassini_oval
// SAGE CODE //
// l = var('l')
// solve([2*(1-x^2)-2*(1-x^2)*x^2-2*l*(1-x^2)*x-(1+x^2)^2 == 0],x) => 
//		[x == -1/2*l - 1/2*sqrt(2*l^2 + 2*(l^3 + 4*l)/sqrt(l^2 + 2*sqrt(l^2 + 4) + 4) - 2*sqrt(l^2 + 4) + 8) - 1/2*sqrt(l^2 + 2*sqrt(l^2 + 4) + 4), 
//		 x == -1/2*l + 1/2*sqrt(2*l^2 + 2*(l^3 + 4*l)/sqrt(l^2 + 2*sqrt(l^2 + 4) + 4) - 2*sqrt(l^2 + 4) + 8) - 1/2*sqrt(l^2 + 2*sqrt(l^2 + 4) + 4), 
//		 x == -1/2*l - 1/2*sqrt(2*l^2 - 2*(l^3 + 4*l)/sqrt(l^2 + 2*sqrt(l^2 + 4) + 4) - 2*sqrt(l^2 + 4) + 8) + 1/2*sqrt(l^2 + 2*sqrt(l^2 + 4) + 4), 
//		 x == -1/2*l + 1/2*sqrt(2*l^2 - 2*(l^3 + 4*l)/sqrt(l^2 + 2*sqrt(l^2 + 4) + 4) - 2*sqrt(l^2 + 4) + 8) + 1/2*sqrt(l^2 + 2*sqrt(l^2 + 4) + 4)]

to_lemn = function(px,py) { 
    if (Math.abs(px)<0.001 || (Math.abs(py)<0.001 && Math.abs(px)<1)){
        return {x:0, y:0};
    }
    if (Math.abs(py)<0.001){
        return {x:Math.sqrt(2)*Math.sign(px), y:0};
    }
    a = Math.abs(px);
    b = Math.abs(py);
    l = (a*a-b*b-1)/(a*b);
    s = -1/2*l - 1/2*Math.sqrt(2*l*l - 2*(l*l*l + 4*l)/Math.sqrt(l*l + 2*Math.sqrt(l*l + 4) + 4) - 2*Math.sqrt(l*l + 4) + 8) + 1/2*Math.sqrt(l*l + 2*Math.sqrt(l*l + 4) + 4);
    if (px>=0 && py>=0) {
        t = Math.asin(s);
    } else if (px>=0 && py<=0) {
        t = -Math.asin(s);
    } else if (px<=0 && py>=0) {
        t = Math.asin(s) + Math.PI;
    } else {
        t = Math.PI - Math.asin(s);
    }
    return lemn_paramet(t);
}

svg.append("path")
    .attr("d", lineFunction(Array.from({length: 26}, (x,i) => lemn_paramet(Math.PI*(i-25)/50))))
    .style("stroke-width", 7)
    .attr("stroke", "#2196F3") // blue 500
    .attr("fill", "none");
svg.append("path")
    .attr("d", lineFunction(Array.from({length: 26}, (x,i) => lemn_paramet(Math.PI*(i)/50))))
    .style("stroke-width", 3)
    .attr("stroke", "#2196F3") // blue 500
    .attr("fill", "none");

svg.append("path")
    .attr("d", lineFunction(Array.from({length: 26}, (x,i) => lemn_paramet(Math.PI*(i+25)/50))))
    .style("stroke-width", 3)
    .attr("stroke", "#FFC107") // amber 500
    .attr("fill", "none");
svg.append("path")
    .attr("d", lineFunction(Array.from({length: 26}, (x,i) => lemn_paramet(Math.PI*(i+50)/50))))
    .style("stroke-width", 7)
    .attr("stroke", "#FFC107") // amber 500
    .attr("fill", "none");

svg
    .append("circle")
    .attr("cx", x(0))
    .attr("cy", y(0))
    .attr("r", 5)
    .attr("fill", '#9E9E9E'); // gray 500

for (k of [0,1,2]) {
    svg.append("path")
        .attr("d", lineFunction(Array.from({length: 26}, (x,i) => unfold(lemn_paramet(Math.PI*(i-25)/50),k))))
        .style("stroke-width", 7)
        .attr("stroke", "#2196F3") // blue 500
        .attr("fill", "none");
    svg.append("path")
        .attr("d", lineFunction(Array.from({length: 26}, (x,i) => unfold(lemn_paramet(Math.PI*(i)/50),k))))
        .style("stroke-width", 3)
        .attr("stroke", "#2196F3") // blue 500
        .attr("fill", "none");
    svg.append("path")
        .attr("d", lineFunction(Array.from({length: 26}, (x,i) => unfold(lemn_paramet(Math.PI*(i+25)/50),k))))
        .style("stroke-width", 3)
        .attr("stroke", "#FFC107") // amber 500
        .attr("fill", "none");
    svg.append("path")
        .attr("d", lineFunction(Array.from({length: 26}, (x,i) => unfold(lemn_paramet(Math.PI*(i+50.01)/50),k))))
        .style("stroke-width", 7)
        .attr("stroke", "#FFC107") // amber 500
        .attr("fill", "none");
    svg
        .append("circle")
        .attr("cx", x(unfold({x:0,y:0},k).x))
        .attr("cy", y(unfold({x:0,y:0},k).y))
        .attr("r", 5)
        .attr("fill", '#9E9E9E'); // gray 500
}

point_neigh_coords = neigh_array.map(function(u) { return to_lemn(
    point_coords[0].x+0.25*Math.cos(u),point_coords[0].y+0.25*Math.sin(u))});

var point_neighborhood = svg.append("path")
    .attr("d", lineFunction(point_neigh_coords))
    .style("stroke-width", 10)
    .style("stroke", path_color)   
    .style("fill", 'none');

var point = svg
    .append("g")
    .attr("class", "point")
        .selectAll(".point")
        .data(point_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 7)
        .attr("fill", point_color);

lifts_neighborhoods = Array.from({length: 5}, (x,i) => 'none')

for (k of Array.from({length: 3}, (x,i) => i)) {
    lifts_neighborhoods[k] = svg.append("path")
    .attr("d", lineFunction(point_neigh_coords.map(function(u) { 
        return unfold(u,k)})))
    .style("stroke-width", 10)
    .style("stroke", lift_path_color)   
    .style("fill", 'none');
}			

lift_coords = [unfold(point_coords[0],0),
                unfold(point_coords[0],1),
                unfold(point_coords[0],2)];

var lifts = svg
    .append("g")
    .attr("class", "point")
        .selectAll(".point")
        .data(lift_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 7)
        .attr("fill", lift_point_color);

var drag_handler = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width+2*radius*offset) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        xx = start_x + x.invert(d3.event.x);
        yy = start_y + y.invert(d3.event.y);
        
        d.x = to_lemn(xx,yy).x
        d.y = to_lemn(xx,yy).y
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        point_neigh_coords = neigh_array.map(function(u) { return to_lemn(
            d.x+0.25*Math.cos(u),d.y+0.25*Math.sin(u))});
        point_neighborhood
            .attr("d", lineFunction(point_neigh_coords))
        lift_coords = [unfold({x:d.x,y:d.y},0),
                        unfold({x:d.x,y:d.y},1),
                        unfold({x:d.x,y:d.y},2)];
        lifts
            .data(lift_coords)
            .attr("cx", function(d) {return(x(d.x))})
            .attr("cy", function(d) {return(y(d.y))})
        for (k of Array.from({length: 3}, (x,i) => i)) {
            lifts_neighborhoods[k]
                .attr("d", lineFunction(point_neigh_coords.map(function(u) { 
                    a1 = Math.atan2(d.y,d.x+0.95)
                    a2 = Math.atan2(u.y,u.x+0.95)
                    if (Math.abs(a2+2*Math.PI-a1)<Math.abs(a2-a1)) {
                        kk = 1
                    } else if (Math.abs(a2-a1)<Math.abs(a2-2*Math.PI-a1)) {
                        kk = 0
                    } else {
                        kk = -1
                    }
                    return unfold(u,k+kk)})))
        }		
    }); 
        
drag_handler(point);  