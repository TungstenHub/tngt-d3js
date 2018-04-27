pivot_coord  = [{x:0, y:0}];

var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

radius = width/(2*Math.PI);

arrow_color = '#2196F3'; // blue 500
pivot_color = '#FFEB3B'; // yellow 500

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var lineFunction = d3.line()
	.x(function(d) { return x(d.x); })
	.y(function(d) { return y(d.y); });
		
c = pivot_coord[0];	
prev = {x:c.x,y:c.y};

var image = svg.append("svg:image")
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', width)
	.attr('height', height)
	.attr("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/7/74/Mercator-projection.jpg")

vectors = Array.from({length: 12}, (x,i) => {return {x:0.25*Math.cos(2*Math.PI*i/12), y:0.25*Math.sin(2*Math.PI*i/12)}})
arrows = Array.from({length: 12}, (x,i) => 'none')
markers = Array.from({length: 12}, (x,i) => 'none')

for (k of Array.from({length: 12}, (x,i) => i)) {
	arrows[k] = svg.append("path")
		.attr("d", lineFunction([c,{x:c.x+vectors[k].x,y:c.y+vectors[k].y}]))
		.attr("stroke-width", 5)
		.attr("stroke", arrow_color)
		.attr("opacity", 0.2);
	angle = Math.atan2(vectors[k].y,vectors[k].x);
	markers[k] = svg.append("path")
	.attr("d", lineFunction([{x:0.025*Math.cos(angle)+0.05*Math.cos(0*Math.PI/3+angle),y:0.025*Math.sin(angle)+0.05*Math.sin(0*Math.PI/3+angle)},
								{x:0.025*Math.cos(angle)+0.05*Math.cos(2*Math.PI/3+angle),y:0.025*Math.sin(angle)+0.05*Math.sin(2*Math.PI/3+angle)},
								{x:0.025*Math.cos(angle)+0.05*Math.cos(4*Math.PI/3+angle),y:0.025*Math.sin(angle)+0.05*Math.sin(4*Math.PI/3+angle)}]))
	.attr("transform", "translate(" + radius*(c.x+vectors[k].x) + "," + radius*(-c.y-vectors[k].y) + ")")
	.attr("stroke", 'none')
	.attr("fill", arrow_color)
	.attr("opacity", 0.2);
}

arrows[3].attr("opacity", 1);
markers[3].attr("opacity", 1);

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
		.attr("r", 5)
		.attr("fill", pivot_color);

prec = 100; // for the approximation to be more accurate

var drag_handler = d3.drag()
	.on("start", function(d) {
		start_x = x.invert(width) + d3.event.x;
		start_y = y.invert(height) + d3.event.y;
	})
	.on("drag", function(d) {
		d.x = start_x + x.invert(d3.event.x);
		d.y = start_y + y.invert(d3.event.y);
		d3.select(this)
			.attr("cx", x(d.x))
			.attr("cy", y(d.y));
		c = pivot.data()[0];
		dif_x = (c.x-prev.x)/prec;
		dif_y = (c.y-prev.y)/prec;
		for (i = 0; i < prec; i++) {
			t = -Math.tanh(prev.y+(i+0.5)*dif_y); // = G_22^2 = G_21^1 = G_12^1 = -G_11^2 http://www2.math.uu.se/~svante/papers/sjN15.pdf
			for (k of Array.from({length: 12}, (x,i) => i)) {
				delta_x =  t*dif_x*vectors[k].y+t*dif_y*vectors[k].x;// G_11^1*dif_x*vec.x+G_12^1*dif_x*vec.y+G_21^1*dif_y*vec.x+G_22^1*dif_y*vec.y
				delta_y = -t*dif_x*vectors[k].x+t*dif_y*vectors[k].y;// G_11^2*dif_x*vec.x+G_12^2*dif_x*vec.y+G_21^2*dif_y*vec.x+G_22^2*dif_y*vec.y
				vectors[k].x -= delta_x;
				vectors[k].y -= delta_y;
			}
		}
		for (k of Array.from({length: 12}, (x,i) => i)) {
			arrows[k]
				.attr("d", lineFunction([c,{x:c.x+vectors[k].x,y:c.y+vectors[k].y}]))
			angle = Math.atan2(vectors[k].y,vectors[k].x);
			markers[k]
			.attr("d", lineFunction([{x:0.025*Math.cos(angle)+0.05*Math.cos(0*Math.PI/3+angle),y:0.025*Math.sin(angle)+0.05*Math.sin(0*Math.PI/3+angle)},
									{x:0.025*Math.cos(angle)+0.05*Math.cos(2*Math.PI/3+angle),y:0.025*Math.sin(angle)+0.05*Math.sin(2*Math.PI/3+angle)},
									{x:0.025*Math.cos(angle)+0.05*Math.cos(4*Math.PI/3+angle),y:0.025*Math.sin(angle)+0.05*Math.sin(4*Math.PI/3+angle)}]))
				.attr("transform", "translate(" + radius*(c.x+vectors[k].x) + "," + radius*(-c.y-vectors[k].y) + ")");
		}
		prev = {x:c.x,y:c.y};
	}); 
		
drag_handler(pivot);