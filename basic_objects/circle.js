import {Element} from "./element.js";
import {Point} from "./point.js";

import {circumcenter_coords, circumcenter_radius} from "../utils/triangle_coordinates.js";

class Circle extends Element{
    constructor (p, r) {
        super();
        this.p = p;
        this.r = r;
        this.default_attrs = {"stroke-width": 5, "stroke": "black", "fill": "none"};
    }

    insertInto(wp, attrs={}) {
        this.phys = wp.svg.append("circle");
        super.insertInto(wp, attrs);
    }

    draw() {
        this.phys
            .attr("cx", this.wp.x(this.p.x))
            .attr("cy", this.wp.y(this.p.y))
            .attr("r", this.wp.radius*this.r);
    }
}

class CirclePR extends Circle{
    constructor (p, rq) {
        super(p, rq.v); //r=number, rq=Quantity
        this.rq = rq;
        p.dependents.push(this);
        rq.dependents.push(this);
    }

    update() {
        this.r = this.rq.v;
    }

}

class CirclePP extends Circle{
    constructor (p, q) {
        super(p, Point.dist(p,q)); //r=number, q=Point
        this.q = q;
        p.dependents.push(this);
        q.dependents.push(this);
    }

    update() {
        this.r = Point.dist(this.p,this.q);
    }

}

class Circle3P extends Circle{
    constructor (p1, p2, p3) {
        super(
            circumcenter_coords(p1,p2,p3), 
            circumcenter_radius(p1,p2,p3)
        );
        this.points = [p1,p2,p3];
        p1.dependents.push(this);
        p2.dependents.push(this);
        p3.dependents.push(this);
    }

    update() {
        this.p = circumcenter_coords(...this.points);
        this.r = circumcenter_radius(...this.points);
    }

}

export{
    Circle,
    CirclePR,
    CirclePP,
    Circle3P
}