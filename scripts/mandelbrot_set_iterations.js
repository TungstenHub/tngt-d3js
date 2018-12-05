radius = 312.75 // to adjust the photo
offset = 218.25

pivot_coord  = [{x:0.12, y:0.59}];

iterates = function(a,b) {
    z = {x:0, y:0};
    list = [{p: [z,z], c:1}];
    out = false;
    for (i = 0; i < 100; i++) {
        if (!out) {
            prev_z = z
            z = {x:z.x*z.x-z.y*z.y+a, y:2*z.x*z.y+b}
            if (Math.abs(z.x)>=4 || Math.abs(z.y)>=4) {
                out = true
            }
        } 
        list.push({p: [prev_z,z], c:(100-i)/100});
    }
    return list
}

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([offset+width/2, offset+width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });
        
c = pivot_coord[0];	

var mand = svg.append("svg:image")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .attr("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/2/21/Mandel_zoom_00_mandelbrot_set.jpg")

var x_axis = svg.append("path")
    .attr("d", lineFunction([{x: -2.25, y: 0}, {x: 1.5, y: 0}]))
    .attr("stroke-width", 1)
    .attr("stroke", '#FFFFFF80');

var y_axis = svg.append("path")
    .attr("d", lineFunction([{x: 0, y: -1.25}, {x: 0, y: 1.25}]))
    .attr("stroke-width", 1)
    .attr("stroke", '#FFFFFF80');

var iter_path = svg.selectAll('path')
    .data(iterates(c.x,c.y))
    .enter().append('path')
    .attr('d', function(d) { return lineFunction(d.p); })
    .attr('stroke-width', function(d) { return 3*d.c; })
    .attr('stroke',"#FFEB3B") // yellow 500
    .attr("stroke-opacity", function(d) { return d.c; })
    .attr('fill', 'none');

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
        .attr("fill", "#FFEB3B"); // yellow 500


var drag_handler = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width+2*offset) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        d.x = start_x + x.invert(d3.event.x);
        d.y = start_y + y.invert(d3.event.y);
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        c = pivot.data()[0];
        iter_path
            .data(iterates(c.x,c.y))
            .attr('d', function(d) { return lineFunction(d.p); })
    }); 
        
drag_handler(pivot);  