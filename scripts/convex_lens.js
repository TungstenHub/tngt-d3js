radius = 100

source_color = '#F9A825'; // yellow 800
ray_color = '#FFEB3B'; // yellow 500
target_color = '#00838F'; // cyan 800

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var source_coords = {x:-3,y:1};

xx = source_coords.x;
yy = source_coords.y;
target_x = xx/(xx+1);
target_y = yy/(xx+1);

var lineFunction = d3.line()
	.x(function(d) { return x(d.x); })
	.y(function(d) { return y(d.y); });

svg.append("path")
	.attr("d", lineFunction([{x:-4,y:0},{x:4,y:0}]))
	.attr("stroke-width", 2)
	.attr("stroke", 'black')
	.attr("fill", 'none');

svg.append("path")
	.attr("d", lineFunction([{x:0,y:-1},{x:0,y:1}]))
	.attr("stroke-width", 2)
	.attr("stroke", 'black')
	.attr("fill", 'none');

svg.append("path")
	.attr("d", lineFunction([{x:-1,y:-0.1},{x:-1,y:0.1}]))
	.attr("stroke-width", 2)
	.attr("stroke", 'black')
	.attr("fill", 'none');

svg.append("path")
	.attr("d", lineFunction([{x:1,y:-0.1},{x:1,y:0.1}]))
	.attr("stroke-width", 2)
	.attr("stroke", 'black')
	.attr("fill", 'none');

svg.append("path")
	.attr("d", lineFunction([{x:-2,y:-0.05},{x:-2,y:0.05}]))
	.attr("stroke-width", 2)
	.attr("stroke", 'black')
	.attr("fill", 'none');

svg.append("path")
	.attr("d", lineFunction([{x:2,y:-0.05},{x:2,y:0.05}]))
	.attr("stroke-width", 2)
	.attr("stroke", 'black')
	.attr("fill", 'none');

svg.append("path")
	.attr("d", lineFunction([{x:-0.1,y:-0.8},{x:0,y:-1},{x:0.1,y:-0.8}]))
	.attr("stroke-width", 2)
	.attr("stroke", 'black')
	.attr("fill", 'none');

svg.append("path")
	.attr("d", lineFunction([{x:-0.1,y:0.8},{x:0,y:1},{x:0.1,y:0.8}]))
	.attr("stroke-width", 2)
	.attr("stroke", 'black')
	.attr("fill", 'none');

var ray1 = svg.append("path")
	.attr("d", lineFunction([{x:xx,y:yy},{x:0,y:yy}]))
	.attr("stroke-width", 5)
	.attr("stroke", ray_color);

var ray2 = svg.append("path")
	.attr("d", lineFunction([{x:xx,y:yy},{x:0,y:0}]))
	.attr("stroke-width", 5)
	.attr("stroke", ray_color);

var ray3 = svg.append("path")
	.attr("d", lineFunction([{x:xx,y:yy},{x:0,y:yy/(1+xx)}]))
	.attr("stroke-width", 5)
	.attr("stroke", ray_color);

var ray1after = svg.append("path")
	.attr("d", lineFunction([{x:0,y:yy},{x:target_x,y:target_y}]))
	.attr("stroke-width", 4)
	.attr("stroke", ray_color);

var ray2after = svg.append("path")
	.attr("d", lineFunction([{x:0,y:0},{x:target_x,y:target_y}]))
	.attr("stroke-width", 4)
	.attr("stroke", ray_color);

var ray3after = svg.append("path")
	.attr("d", lineFunction([{x:0,y:yy/(1+xx)},{x:target_x,y:target_y}]))
	.attr("stroke-width", 4)
	.attr("stroke", ray_color);

var ray1cont = svg.append("path")
	.attr("d", lineFunction([{x:0,y:yy},{x:target_x,y:target_y}]))
	.attr("stroke-width", 4)
	.attr("stroke-dasharray", ("20, 20"))
	.attr("stroke", ray_color);

var ray2cont = svg.append("path")
	.attr("d", lineFunction([{x:0,y:0},{x:target_x,y:target_y}]))
	.attr("stroke-width", 4)
	.attr("stroke-dasharray", ("20, 20"))
	.attr("stroke", ray_color);

var ray3cont = svg.append("path")
	.attr("d", lineFunction([{x:0,y:yy/(1+xx)},{x:target_x,y:target_y}]))
	.attr("stroke-width", 4)
	.attr("stroke-dasharray", ("20, 20"))
	.attr("stroke", ray_color);

var target = svg
	.append("circle")
	.attr("cx", x(target_x))
	.attr("cy", y(target_y))
	.attr("r", 7)
	.attr("fill", target_color);

var source = svg
	.append("g")
	.attr("class", "pivot")
		.selectAll(".pivot")
		.data([source_coords])
		.enter()
		.append("circle")
		.attr("class", "vertex")
		.attr("cx", function(d) {return(x(d.x))})
		.attr("cy", function(d) {return(y(d.y))})
		.attr("r", 7)
		.attr("fill", source_color);

	var drag_handler = d3.drag()
	.on("start", function(d) {
		start_x = x.invert(width) + d3.event.x;
		start_y = y.invert(height) + d3.event.y;
	})
	.on("drag", function(d) {
		d.x = Math.min(start_x + x.invert(d3.event.x),0);
		d.y = start_y + y.invert(d3.event.y);
		d3.select(this)
			.attr("cx", x(d.x))
			.attr("cy", y(d.y));
		xx = source_coords.x;
		yy = source_coords.y;
		target_x = xx/(xx+1);
		target_y = yy/(xx+1);
		ray1.attr("d", lineFunction([{x:xx,y:yy},{x:0,y:yy}]));
		ray2.attr("d", lineFunction([{x:xx,y:yy},{x:0,y:0}]));
		ray3.attr("d", lineFunction([{x:xx,y:yy},{x:0,y:yy/(1+xx)}]));
		if (xx<-1) {
			ray1after.attr("d", lineFunction([{x:0,y:yy},{x:target_x,y:target_y}]));
			ray2after.attr("d", lineFunction([{x:0,y:0},{x:target_x,y:target_y}]));
			ray3after.attr("d", lineFunction([{x:0,y:yy/(1+xx)},{x:target_x,y:target_y}]));
		} else {
			ray1after.attr("d", lineFunction([{x:0,y:yy},{x:4,y:-3*yy}]));
			ray2after.attr("d", lineFunction([{x:0,y:0},{x:4,y:4*yy/xx}]));
			ray3after.attr("d", lineFunction([{x:0,y:yy/(1+xx)},{x:4,y:target_y}]));
		}
		ray1cont.attr("d", lineFunction([{x:0,y:yy},{x:target_x,y:target_y}]));
		ray2cont.attr("d", lineFunction([{x:0,y:0},{x:target_x,y:target_y}]));
		ray3cont.attr("d", lineFunction([{x:0,y:yy/(1+xx)},{x:target_x,y:target_y}]));
		target
			.attr("cx", x(target_x))
			.attr("cy", y(target_y))
	}); 
		
drag_handler(source);