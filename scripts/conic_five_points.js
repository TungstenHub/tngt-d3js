point_coords = [{x: 535, y: 564}, {x:569, y:133}, {x:750,y:345}, {x:309, y:135}, {x:227,y:368}];

point_color = '#2E7D32'; // green 800
conic_color = '#4CAF50'; // green 500

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

array = Array.from({length: 200}, (x,i) => [Math.tan(Math.PI*(i/200-0.5)),Math.tan(Math.PI*((i+1)/200-0.5))]);

var lineFunction = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

function slope(p1,p2){
    return (p2.y - p1.y) / (p2.x - p1.x);
}
    
function intersect(p1, m1, p2, m2){
    var t = (m1*(p1.x - p2.x) - p1.y + p2.y) / (m1 - m2);
    return {x: p2.x + t, y: p2.y + t*m2};
}

function sixth_point(p1,p2,p3,p4,p5,alpha){
    slope12 = slope(p1,p2);
    slope45 = slope(p4,p5);
    int1245 = intersect(p1, slope12, p4, slope45);

    slope34 = slope(p3,p4);
    int6134 = intersect(p1, alpha, p3, slope34);

    slope_pascal_line = slope(int1245,int6134);

    slope23 = slope(p2,p3);
    third_pascal_point = intersect(p2, slope23, int1245, slope_pascal_line)

    slope56 = slope(p5,third_pascal_point)

    return intersect(p1, alpha, p5, slope56)
}

a = point_coords[0];
b = point_coords[1];
c = point_coords[2];
d = point_coords[3];
e = point_coords[4];

conic_points = array.map(function(k) { p=sixth_point(a,b,c,d,e,k[0]); q=sixth_point(a,b,c,d,e,k[1]); return {coord:[
    {x:1.05*p.x-0.05*q.x,y:1.05*p.y-0.05*q.y},
    {x:1.05*q.x-0.05*p.x,y:1.05*q.y-0.05*p.y}]}});

var conic = svg.selectAll('path')
    .data(conic_points)
    .enter().append('path')
    .attr('d', function(d) { return lineFunction(d.coord); })
    .style("stroke-width", 5)
    .attr("stroke", conic_color)
    .attr("stroke-opacity", function(d) { return ((
        Math.abs(d.coord[0].x)<2*width && 
        Math.abs(d.coord[1].x)<2*width && 
        Math.abs(d.coord[0].y)<2*height && 
        Math.abs(d.coord[1].y)<2*height) ? 1 : 0); })
    .attr("fill", 'None');

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
        .attr("fill", point_color); 

var drag_handler = d3.drag()
    .on("drag", function() {
        d3.select(this)
            .data([{x : d3.event.x, y : d3.event.y}])
            .attr("cx", function(d) {return(d.x)})
            .attr("cy", function(d) {return(d.y)});
        a = vertices.data()[0];
        b = vertices.data()[1];
        c = vertices.data()[2];
        d = vertices.data()[3];
        e = vertices.data()[4];
        conic_points = array.map(function(k) { p=sixth_point(a,b,c,d,e,k[0]); q=sixth_point(a,b,c,d,e,k[1]); return {coord:[
            {x:1.05*p.x-0.05*q.x,y:1.05*p.y-0.05*q.y},
            {x:1.05*q.x-0.05*p.x,y:1.05*q.y-0.05*p.y}]}});
        conic
            .data(conic_points)
            .attr('d', function(d) { return lineFunction(d.coord); })
            .attr("stroke-opacity", function(d) { return ((
                (-0.1*width<d.coord[0].x && d.coord[0].x<1.1*width && 
                    -0.1*width<d.coord[1].x && d.coord[1].x<1.1*width) || 
                (-0.1*height<d.coord[0].y && d.coord[0].y<1.1*height && 
                    -0.1*height<d.coord[1].y && d.coord[1].y<1.1*height)) ? 1 : 0); })
    }); 
        
drag_handler(vertices);   