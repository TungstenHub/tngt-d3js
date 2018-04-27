radius = 125

astroid_border_color = '#2196F3'; // blue 500
astroid_color = '#90CAF980' // blue 200 50% opacity

gear24_border_color = '#4CAF50'; // green 500
gear24_color = '#A5D6A7' // green 200

gear12_border_color = '#FF9800'; // orange 500
gear12_color = '#FFCC80' // orange 200

gear6_border_color = '#E91E63'; // pink 500
gear6_color = '#F48FB1' // pink 200

pivot_border_color = '#1565C0'; // blue 800
pivot_color = 'white'

tangent_point_color = '#9E9D24'; // lime 800
tangent_color = '#CDDC39'; // lime 500

pivot_coord  = [{x:Math.cos(0.4)/2, y:Math.sin(0.4)/2}];

offset = 2.5

array = Array.from({length: 501}, (x,i) => 2*Math.PI*i/500);

astroid_points = array.map(function(k) { return {x: Math.pow(Math.cos(k),3), y: Math.pow(Math.sin(k),3)}});
gear24_points = array.map(function(k) { return {x: (1+Math.cbrt(Math.cos(24*k))/24)*Math.cos(k), y: (1+Math.cbrt(Math.cos(24*k))/24)*Math.sin(k)}});
gear12_points = array.map(function(k) { return {x: 0.5*(1+Math.cbrt(Math.cos(12*k))/12)*Math.cos(k), y: 0.5*(1+Math.cbrt(Math.cos(12*k))/12)*Math.sin(k)}});
gear6_points = array.map(function(k) { return {x: 0.25*(1+Math.cbrt(Math.cos(6*k))/6)*Math.cos(k), y: 0.25*(1+Math.cbrt(Math.cos(6*k))/6)*Math.sin(k)}});

var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });
        
c = pivot_coord[0];	
angle = Math.PI/2-Math.atan2(c.x,c.y);
t = {x: Math.pow(Math.cos(angle),3), y: Math.pow(Math.sin(angle),3)}

var x_axis = svg.append("path")
    .attr("d", lineFunction([{x: -1.1, y: 0}, {x: 1.1, y: 0}]))
    .attr("stroke-width", 5)
    .attr("stroke", 'black');

var y_axis = svg.append("path")
    .attr("d", lineFunction([{x: 0, y: -1.1}, {x: 0, y: 1.1}]))
    .attr("stroke-width", 5)
    .attr("stroke", 'black');

var astroid = svg.append("path")
    .attr("d", lineFunction(astroid_points))
    .style("stroke-width", 5)
    .attr("stroke", astroid_border_color)
    .attr("fill", astroid_color);

var gear24_1 = svg.append("path")
    .attr("d", lineFunction(gear24_points))
    .attr("transform", "translate("+(-radius*offset)+",0)")
    .style("stroke-width", 5)
    .attr("stroke", gear24_border_color)
    .attr("fill", gear24_color);

var gear24_2 = svg.append("path")
    .attr("d", lineFunction(gear24_points))
    .attr("transform", "translate("+radius*offset+",0)")
    .style("stroke-width", 5)
    .attr("stroke", gear24_border_color)
    .attr("fill", gear24_color);

var tangent = svg.append("path")
    .attr("d", lineFunction([{x: 2*c.x, y: 0}, {x: 0, y: 2*c.y}]))
    .attr("stroke-width", 5)
    .attr("stroke", tangent_color);

var pivot_circle = svg
    .append("circle")
    .attr("cx", x(0))
    .attr("cy", y(0))
    .attr("r", radius/2)
    .style("stroke-width", 2)
    .attr("stroke-dasharray", ("10, 10"))
    .style("stroke", pivot_border_color)   
    .style("fill", "none");

var tangent_point = svg
    .append("circle")
    .attr("cx", x(t.x))
    .attr("cy", y(t.y))
    .attr("r", 7)
    .attr("fill", tangent_point_color);

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
        .style("stroke-width", 2)
        .attr("stroke", pivot_border_color)
        .attr("fill", pivot_color);

var gear12 = svg.append("path")
    .attr("d", lineFunction(gear12_points))
    .attr("transform", "translate("+(x(-offset+c.x))+","+(y(c.y))+")rotate("+180*angle/Math.PI+")translate("+(-x(0))+","+(-y(0))+")")
    .style("stroke-width", 5)
    .attr("stroke", gear12_border_color)
    .attr("fill", gear12_color);

var gear6 = svg.append("path")
    .attr("d", lineFunction(gear6_points))
    .attr("transform", "translate("+(x(offset+3*c.x/2))+","+(y(3*c.y/2))+")rotate("+180*3*angle/Math.PI+")translate("+(-x(0))+","+(-y(0))+")")
    .style("stroke-width", 5)
    .attr("stroke", gear6_border_color)
    .attr("fill", gear6_color);

var astroid_1 = svg.append("path")
    .attr("d", lineFunction(astroid_points))
    .attr("transform", "translate("+(-radius*offset)+",0)")
    .style("stroke-width", 5)
    .attr("stroke", astroid_color)
    .attr("fill", "none");

var astroid_2 = svg.append("path")
    .attr("d", lineFunction(astroid_points))
    .attr("transform", "translate("+(radius*offset)+",0)")
    .style("stroke-width", 5)
    .attr("stroke", astroid_color)
    .attr("fill", "none");

var tangent_1 = svg.append("path")
    .attr("d", lineFunction([{x: 2*c.x, y: 0}, {x: 0, y: 2*c.y}]))
    .attr("transform", "translate("+(-radius*offset)+",0)")
    .attr("stroke-width", 5)
    .attr("stroke", tangent_color);

var tangent_point_2 = svg
    .append("circle")
    .attr("cx", x(t.x))
    .attr("cy", y(t.y))
    .attr("transform", "translate("+radius*offset+",0)")
    .attr("r", 7)
    .attr("fill", tangent_point_color);

var drag_handler = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        xx = start_x + x.invert(d3.event.x);
        yy = start_y + y.invert(d3.event.y);
        d.x = xx/(2*Math.sqrt(xx*xx+yy*yy));
        d.y = yy/(2*Math.sqrt(xx*xx+yy*yy));
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        c = pivot.data()[0];
        angle = Math.PI/2-Math.atan2(c.x,c.y);
        t = {x: Math.pow(Math.cos(angle),3), y: Math.pow(Math.sin(angle),3)}
        tangent_point
            .attr("cx", x(t.x))
            .attr("cy", y(t.y))
        tangent
            .attr("d", lineFunction([{x: 2*c.x, y: 0}, {x: 0, y: 2*c.y}]))
        tangent_1
            .attr("d", lineFunction([{x: 2*c.x, y: 0}, {x: 0, y: 2*c.y}]))
        tangent_point_2
            .attr("cx", x(t.x))
            .attr("cy", y(t.y))
        gear12
            .attr("transform", "translate("+(x(-offset+c.x))+","+(y(c.y))+")rotate("+180*angle/Math.PI+")translate("+(-x(0))+","+(-y(0))+")")
        gear6
            .attr("transform", "translate("+(x(offset+3*c.x/2))+","+(y(3*c.y/2))+")rotate("+180*3*angle/Math.PI+")translate("+(-x(0))+","+(-y(0))+")")
            
    }); 
        
drag_handler(pivot);   