c = {x:0, y:0};
e = {x:0.5, y:0};
vector = {x:e.x-c.x,y:e.y-c.y};

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

radius = height/2;

arrow_color = '#2196F3'; // blue 500
pivot_color = '#FFEB3B'; // yellow 500

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var lineFunction = d3.line()
	.x(function(d) { return x(d.x); })
	.y(function(d) { return y(d.y); });	

var image = svg.append("svg:image")
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', width)
    .attr('height', height)
    .attr("opacity", 0.2)
	.attr("xlink:href", "http://bulatov.org/math/1201/images/circle_limit_i_01.jpg")

arrow = svg.append("path")
    .attr("d", lineFunction([c,{x:c.x+vector.x,y:c.y+vector.y}]))
    .attr("stroke-width", 5)
    .attr("stroke", arrow_color);
angle = Math.atan2(vector.y,vector.x);
marker = svg.append("path")
.attr("d", lineFunction([{x:0.03*Math.cos(0*Math.PI/3+angle),y:0.03*Math.sin(0*Math.PI/3+angle)},
                         {x:0.03*Math.cos(2*Math.PI/3+angle),y:0.03*Math.sin(2*Math.PI/3+angle)},
                         {x:0.03*Math.cos(4*Math.PI/3+angle),y:0.03*Math.sin(4*Math.PI/3+angle)}]))
.attr("transform", "translate(" + radius*(c.x+vector.x) + "," + radius*(-c.y-vector.y) + ")")
.attr("stroke", 'none')
.attr("fill", arrow_color);

num_iter = 1000
save_every = 10
step = 0.01

trace_coords = [];
p = {x:c.x,y:c.y};
v = {x:vector.x,y:vector.y};
for (i = 0; i < num_iter; i++) {
    t_x = p.x ;
	t_y = p.y;
	t = 2/(1-t_x*t_x-t_y*t_y);
    p.x += (p.x*p.x+p.y*p.y<0.99)*step*v.x;
    p.y += (p.x*p.x+p.y*p.y<0.99)*step*v.y;
    delta_x = t*(t_x*v.x*v.x+t_y*v.x*v.y+t_y*v.y*v.x-t_x*v.y*v.y);
	delta_y = t*(-t_y*v.x*v.x+t_x*v.x*v.y+t_x*v.y*v.x+t_y*v.y*v.y);
	v.x -= step*delta_x;
    v.y -= step*delta_y;
    if (i%save_every==0) {trace_coords.push({x:p.x,y:p.y})}
}

var trace = svg
	.append("g")
	.attr("class", "pivot")
		.selectAll(".pivot")
		.data(trace_coords)
		.enter()
		.append("circle")
		.attr("class", "vertex")
		.attr("cx", function(d) {return(x(d.x))})
		.attr("cy", function(d) {return(y(d.y))})
		.attr("r", 3)
        .attr("fill", 'black')
        .attr("opacity",0.3);

var end_pivot = svg
	.append("g")
	.attr("class", "pivot")
		.selectAll(".pivot")
		.data([e])
		.enter()
		.append("circle")
		.attr("class", "vertex")
		.attr("cx", function(d) {return(x(d.x))})
		.attr("cy", function(d) {return(y(d.y))})
		.attr("r", 5)
        .attr("fill", pivot_color)
        .attr("opacity",0);

var pivot = svg
	.append("g")
	.attr("class", "pivot")
		.selectAll(".pivot")
		.data([c])
		.enter()
		.append("circle")
		.attr("class", "vertex")
		.attr("cx", function(d) {return(x(d.x))})
		.attr("cy", function(d) {return(y(d.y))})
		.attr("r", 5)
		.attr("fill", pivot_color);

var drag_handler = d3.drag()
	.on("start", function(d) {
		start_x = x.invert(width) + d3.event.x;
		start_y = y.invert(height) + d3.event.y;
	})
	.on("drag", function(d) {
		xx = start_x + x.invert(d3.event.x);
		yy = start_y + y.invert(d3.event.y);
		d.x = xx/Math.max(1,1.01*Math.sqrt(xx*xx+yy*yy)) 
		d.y = yy/Math.max(1,1.01*Math.sqrt(xx*xx+yy*yy)) 
		d3.select(this)
			.attr("cx", x(d.x))
			.attr("cy", y(d.y));
        c = pivot.data()[0];
        e = end_pivot.data()[0];
        vector = {x:e.x-c.x,y:e.y-c.y};
        trace_coords = [];
        p = {x:c.x,y:c.y};
        v = {x:vector.x,y:vector.y};
        for (i = 0; i < num_iter; i++) {
            t_x = p.x ;
            t_y = p.y;
            t = 2/(1-t_x*t_x-t_y*t_y);
            p.x += (p.x*p.x+p.y*p.y<0.99)*step*v.x;
            p.y += (p.x*p.x+p.y*p.y<0.99)*step*v.y;
            delta_x = t*(t_x*v.x*v.x+t_y*v.x*v.y+t_y*v.y*v.x-t_x*v.y*v.y);
            delta_y = t*(-t_y*v.x*v.x+t_x*v.x*v.y+t_x*v.y*v.x+t_y*v.y*v.y);
            v.x -= step*delta_x;
            v.y -= step*delta_y;
            if (i%save_every==0) {trace_coords.push({x:p.x,y:p.y})}
        }
        trace
            .data(trace_coords)
            .attr("cx", function(d) {return(x(d.x))})
		    .attr("cy", function(d) {return(y(d.y))})
        arrow
            .attr("d", lineFunction([c,e]))
        angle = Math.atan2(vector.y,vector.x);
        marker
            .attr("d", lineFunction([{x:0.03*Math.cos(0*Math.PI/3+angle),y:0.03*Math.sin(0*Math.PI/3+angle)},
                                     {x:0.03*Math.cos(2*Math.PI/3+angle),y:0.03*Math.sin(2*Math.PI/3+angle)},
                                     {x:0.03*Math.cos(4*Math.PI/3+angle),y:0.03*Math.sin(4*Math.PI/3+angle)}]))
            .attr("transform", "translate(" + radius*(c.x+vector.x) + "," + radius*(-c.y-vector.y) + ")");

	}); 
		
drag_handler(pivot);
drag_handler(end_pivot);