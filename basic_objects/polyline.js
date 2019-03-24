import {Element} from "./element.js";

var lineFunction = (wp) => d3.line()
    .x(function(d) { return wp.x(d.x); })
    .y(function(d) { return wp.y(d.y); });

class PolyLine extends Element{
    constructor (points) {
        super();
        this.points = points;
        for (let p of points) {
            p.dependents.push(this);
        }
        this.default_attrs = {"stroke-width": 5, "stroke": "black", "fill": "none"};
    }

    insertInto(wp, attrs={}) {
        this.phys = wp.svg.append("path");
        super.insertInto(wp, attrs);
    }

    draw() {
        this.phys
            .attr("d", lineFunction(this.wp)(this.points));
    }
}

export{PolyLine}