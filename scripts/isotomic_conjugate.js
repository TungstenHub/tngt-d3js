d3require(
    "utils/triangle_coordinates.js",
).then(d3m => {

vertex_color = '#1565C0'; // blue 800
side_color = '#2196F3'; // blue 500
triangle_color = '#BBDEFB' // blue 100
anchor_color = '#37474F'; // blue_gray 800
anchor_cev_color = '#607D8B'; // blue_gray 500
isot_color = '#FFD600'; // yellow acc 700
isot_cev_color = '#FFEB3B'; // yellow 500

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var radius = 300;

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, 0]);

var start_x, start_y; 

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

point_coords = [
    {x:Math.cos( 3*Math.PI/6), y:Math.sin( 3*Math.PI/6)-0.25}, 
    {x:Math.cos( 7*Math.PI/6), y:Math.sin( 7*Math.PI/6)-0.25}, 
    {x:Math.cos(11*Math.PI/6), y:Math.sin(11*Math.PI/6)-0.25}
];

anchor_coords = [
    {x:0.12, y:-0.1}
];

var triangle = svg.append("path")
    .attr("d", lineFunction(point_coords))
    .attr("stroke", "none")
    .attr("fill", triangle_color);

/**
 * Computes the barycentric coordinates of the isotomic conjugate
 * @param {number[]} bar - barycentric coordinates
 * @return {number[]} - isotomic conjugate barycentric coordinates
 */
function isot_conj(bar){
    let [p, q, r] = bar;
    return [q*r, r*p, p*q];
}

a = point_coords[0];
b = point_coords[1];
c = point_coords[2];

o = anchor_coords[0];
i = d3m.from_bar_coords(a,b,c,isot_conj(d3m.get_bar_coords(a,b,c,o)));

var a_cev_aux = svg.append("path")
    .attr("d", lineFunction([a,o]))
    .attr("stroke-width", 3)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", anchor_cev_color);

var b_cev_aux = svg.append("path")
    .attr("d", lineFunction([b,o]))
    .attr("stroke-width", 3)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", anchor_cev_color);

var c_cev_aux = svg.append("path")
    .attr("d", lineFunction([c,o]))
    .attr("stroke-width", 3)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", anchor_cev_color);

var a_isot_aux = svg.append("path")
    .attr("d", lineFunction([a,i]))
    .attr("stroke-width", 3)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", isot_cev_color);

var b_isot_aux = svg.append("path")
    .attr("d", lineFunction([b,i]))
    .attr("stroke-width", 3)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", isot_cev_color);

var c_isot_aux = svg.append("path")
    .attr("d", lineFunction([c,i]))
    .attr("stroke-width", 3)
    .attr("stroke-dasharray", ("10, 10"))
    .attr("stroke", isot_cev_color);

var a_cev = svg.append("path")
    .attr("d", lineFunction([a,d3m.cevian_int(a,b,c,o)]))
    .attr("stroke-width", 3.5)
    .attr("stroke", anchor_cev_color);

var b_cev = svg.append("path")
    .attr("d", lineFunction([b,d3m.cevian_int(b,c,a,o)]))
    .attr("stroke-width", 3.5)
    .attr("stroke", anchor_cev_color);

var c_cev = svg.append("path")
    .attr("d", lineFunction([c,d3m.cevian_int(c,a,b,o)]))
    .attr("stroke-width", 3.5)
    .attr("stroke", anchor_cev_color);

var a_isot = svg.append("path")
    .attr("d", lineFunction([a,d3m.cevian_int(a,b,c,i)]))
    .attr("stroke-width", 3.5)
    .attr("stroke", isot_cev_color);

var b_isot = svg.append("path")
    .attr("d", lineFunction([b,d3m.cevian_int(b,c,a,i)]))
    .attr("stroke-width", 3.5)
    .attr("stroke", isot_cev_color);

var c_isot = svg.append("path")
    .attr("d", lineFunction([c,d3m.cevian_int(c,a,b,i)]))
    .attr("stroke-width", 3.5)
    .attr("stroke", isot_cev_color);

var a_side = svg.append("path")
    .attr("d", lineFunction([b,c]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var b_side = svg.append("path")
    .attr("d", lineFunction([c,a]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var c_side = svg.append("path")
    .attr("d", lineFunction([a,b]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var isotomic = svg
    .append("circle")
    .attr("cx", x(i.x))
    .attr("cy", y(i.y))
    .attr("r", 7)
    .attr("fill", isot_color);

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

var anchor = svg
    .append("g")
    .attr("class", "anchor")
        .selectAll(".anchor")
        .data(anchor_coords)
        .enter()
        .append("circle")
        .attr("class", "anchor")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 7)
        .attr("fill", anchor_color); 

var drag_handler = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        d.x = start_x + x.invert(d3.event.x);
        d.y = start_y + y.invert(d3.event.y); 
        d3.select(this)
            .attr("cx", function(d) {return(x(d.x))})
            .attr("cy", function(d) {return(y(d.y))});
        a = vertices.data()[0];
        b = vertices.data()[1];
        c = vertices.data()[2];
        o = anchor.data()[0];
        i = d3m.from_bar_coords(a,b,c,isot_conj(d3m.get_bar_coords(a,b,c,o)));
        triangle
            .attr("d", lineFunction([a,b,c]));
        a_side
            .attr("d", lineFunction([b,c]));
        b_side
            .attr("d", lineFunction([c,a]));
        c_side
            .attr("d", lineFunction([a,b]));
        a_cev
            .attr("d", lineFunction([a,d3m.cevian_int(a,b,c,o)]));
        b_cev
            .attr("d", lineFunction([b,d3m.cevian_int(b,c,a,o)]));
        c_cev
            .attr("d", lineFunction([c,d3m.cevian_int(c,a,b,o)]));
        a_isot
            .attr("d", lineFunction([a,d3m.cevian_int(a,b,c,i)]));
        b_isot
            .attr("d", lineFunction([b,d3m.cevian_int(b,c,a,i)]));
        c_isot
            .attr("d", lineFunction([c,d3m.cevian_int(c,a,b,i)]));
        a_cev_aux
            .attr("d", lineFunction([a,o]));
        b_cev_aux
            .attr("d", lineFunction([b,o]));
        c_cev_aux
            .attr("d", lineFunction([c,o]));
        a_isot_aux
            .attr("d", lineFunction([a,i]));
        b_isot_aux
            .attr("d", lineFunction([b,i]));
        c_isot_aux
            .attr("d", lineFunction([c,i]));
        isotomic
            .attr("cx", x(i.x))
            .attr("cy", y(i.y))
    }); 
        
drag_handler(vertices);   
drag_handler(anchor);  

});