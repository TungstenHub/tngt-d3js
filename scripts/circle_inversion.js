radius = 100;

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var circle = svg
    .append("circle")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", radius)
    .style("stroke-width", 5)
    .style("stroke", "black")   
    .style("fill", "none"); 

var inverse = svg
    .append("circle")
    .attr("cx", width/2)
    .attr("cy", height/2+200)
    .attr("r", 10)   
    .style("fill", "green"); 

var point = svg
    .append("g")
    .attr("class", "point")
        .selectAll(".point")
        .data([{x : 0, y : 50}])
        .enter()
        .append("circle")
        .attr("cx", function(d) {return(width/2+d.x)})
        .attr("cy", function(d) {return(height/2+d.y)})
        .attr("r", 10)
        .attr("fill", "steelblue"); 
 
var drag_handler = d3.drag()
    .on("drag", function() {
        point
            .data([{x : d3.event.x, y : d3.event.y}])
            .attr("cx", function(d) {return(width/2+d.x)})
            .attr("cy", function(d) {return(height/2+d.y)});
        factor = radius*radius/(point.data()[0].x*point.data()[0].x+point.data()[0].y*point.data()[0].y)
        inverse
            .attr("cx", width/2+point.data()[0].x*factor)
            .attr("cy", height/2+point.data()[0].y*factor)
    }); 
         
drag_handler(point);   