import {Element} from "./element.js";
import {Point} from "./point.js";

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

export{
    Circle,
    CirclePR,
    CirclePP
}