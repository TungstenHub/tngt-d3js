radius = 200
	
pendulum_color = '#2196F3'; // blue 500
track_color = '#90CAF9'; // blue 200

var svg = d3.select("#d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var a1 = Math.PI/2, // first angle
    b1 = 0, // first angle momentum
    a2 = Math.PI/2, // second angle
    b2 = 0, // second angle momentum
    t = 0.01,
    iter = 0,
    max_iter = 10000,
    data = [];

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

var pendulum = svg.append("path")
    .attr("d", lineFunction([
        {x:0,y:0.75},
        {x:Math.sin(a1),y:0.75-Math.cos(a1)},
        {x:Math.sin(a1)+Math.sin(a2),y:0.75-Math.cos(a1)-Math.cos(a2)}]))
    .attr("stroke-width", 5)
    .attr("stroke", pendulum_color)
    .attr("fill", 'none');

var track = svg.append("path")
    .attr("d", lineFunction(data))
    .attr("stroke-width", 2)
    .attr("stroke", track_color)
    .attr("fill", 'none');

function update() {
    s = Math.sin(a1-a2);
    c = Math.cos(a1-a2);
    a1 += t*(b1);
    b1 += t*((-b1*b1*s*c -   b2*b2*s +   Math.sin(a2)*c - 2*Math.sin(a1))/(2-c*c));
    a2 += t*(b2);
    b2 += t*(( b2*b2*s*c + 2*b1*b1*s + 2*Math.sin(a1)*c - 2*Math.sin(a2))/(2-c*c));
    if (iter % 4 == 0) {
        data.push({x:Math.sin(a1)+Math.sin(a2),y:0.75-Math.cos(a1)-Math.cos(a2)});
        track.attr("d", lineFunction(data));
    }
    if (iter % max_iter == 0) {
        data=[];
        track.attr("d", lineFunction(data));
    }
    pendulum.attr("d", lineFunction([
        {x:0,y:0.75},
        {x:Math.sin(a1),y:0.75-Math.cos(a1)},
        {x:Math.sin(a1)+Math.sin(a2),y:0.75-Math.cos(a1)-Math.cos(a2)}]));
}
    
var interval = setInterval(function() {
    iter++;
    update();
}, 2);