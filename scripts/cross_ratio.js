radius = 200

point_coords = [{x:-1.5, y:0}, {x:-0.5, y:0}, {x:0.5, y:0}, {x:1.5, y:0}];

side_color = '#2196F3'; // blue 500
vertex_color = '#1565C0'; // blue 800

point_label_color = '#4CAF50' // green 500
cr_label_color = '#2E7D32' // green 800

cross_ratio_guides = '#9E9E9E' // grey 500
cross_ratio_color = '#424242' //grey 800

var svg = d3.select(".d3svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var x = d3.scaleLinear().domain([0, width/(2*radius)]).range([width/2, width]);
var y = d3.scaleLinear().domain([0, height/(2*radius)]).range([height/2, height]);

var start_x, start_y; 

var lineFunction = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });
        
a = point_coords[0];
b = point_coords[1];
c = point_coords[2];
d = point_coords[3];

var line = svg.append("path")
    .attr("d", lineFunction([{x:-3, y:0}, {x:3, y:0}]))
    .attr("stroke-width", 5)
    .attr("stroke", side_color);

var base_points = svg
    .append("g")
    .attr("class", "base_points")
        .selectAll(".base_points")
        .data(point_coords)
        .enter()
        .append("circle")
        .attr("class", "vertex")
        .attr("cx", function(d) {return(x(d.x))})
        .attr("cy", function(d) {return(y(d.y))})
        .attr("r", 7)
        .attr("fill", vertex_color); 

var cross_ratio_text = svg
    .append("g")
    .attr("class", "cross_ratio_text")
        .selectAll(".cross_ratio_text")
        .data(point_coords)
        .enter()
        .append("text")
        .attr("font-size", "48px")
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("fill", function(d, i) { return i==3 ? cross_ratio_color : cross_ratio_guides; });

var point_labels = svg
    .append("g")
    .attr("class", "point_labels")
        .selectAll(".point_labels")
        .data(point_coords)
        .enter()
        .append("text")
        .attr("font-size", "24px")
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("fill", point_label_color);

var cr_labels = svg
    .append("g")
    .attr("class", "cr_labels")
        .selectAll(".cr_labels")
        .data(point_coords)
        .enter()
        .append("text")
        .attr("font-size", "24px")
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("fill", cr_label_color);

var cross_ratio = function(A, B, C, D) {
    return ((C-A)*(D-B))/((C-B)*(D-A));
}

update = function() {
    cross_ratio_text
        .attr("x", function(d, i) { return x(d.x); })
        .attr("y", function(d, i) { return i==3 ? y(-0.3) : y(0.3); })
        .text( function (data, i) { 
            switch(i) {
                case 0:
                    return '∞'
                case 1:
                    return '0'
                case 2:
                    return '1'
                default:
                    return d3.format(".2f")(cross_ratio(a.x,b.x,c.x,d.x))
            }
        });
    point_labels
        .attr("x", function(d, i) { return x(d.x); })
        .attr("y", function(d, i) { return y(-0.1); })
        .text( function (data, i) { 
            switch(i) {
                case 0:
                    return 'A'
                case 1:
                    return 'B'
                case 2:
                    return 'C'
                default:
                    return 'D'
            }
        });
    cr_labels
        .attr("x", function(d, i) { return x(d.x); })
        .attr("y", function(d, i) { return i==3 ? y(-0.6) : y(0.5); })
        .text( function (data, i) { 
            switch(i) {
                case 0:
                    return '(A,B;C,A)'
                case 1:
                    return '(A,B;C,B)'
                case 2:
                    return '(A,B;C,C)'
                default:
                    return '(A,B;C,D)'
            }
        });
}

update();

var drag_handler_base_points = d3.drag()
    .on("start", function(d) {
        start_x = x.invert(width) + d3.event.x;
        start_y = y.invert(height) + d3.event.y;
    })
    .on("drag", function(d) {
        xx = start_x + x.invert(d3.event.x);
        yy = start_y + y.invert(d3.event.y);
        d.x = xx;
        d.y = 0;
        d3.select(this)
            .attr("cx", x(d.x))
            .attr("cy", y(d.y));
        a = base_points.data()[0];
        b = base_points.data()[1];
        c = base_points.data()[2];
        d = base_points.data()[3];

        update();
    }); 

drag_handler_base_points(base_points);   