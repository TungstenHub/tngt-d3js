import {Element} from "./element.js";
import {Point, FPoint} from "./point.js";
import {FQuantity} from "./quantity.js";

import {circumcenter_coords, circumcenter_radius} from "../utils/triangle_coordinates.js";

class Circle extends Element{
    constructor (p, r) {
        super();
        this.p = p;
        this.r = r;
        this.default_attrs = {"stroke-width": 5, "stroke": "none", "fill": "none"};
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

    center(){
        const f = circle => {
            return circle.p;
        }
        return new FPoint(f, [this]);
    }
    
    radius(){
        const f = circle => {
            return circle.r;
        }
        return new FQuantity(f, [this]);
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

class Arc extends Element{
    constructor (p, rad, [alpha, beta]) {
        super();
        this.p = p;
        this.rad = rad;
        this.alpha = alpha;
        this.beta = beta;
        this.default_attrs = {"stroke-width": 5, "stroke": "none", "fill": "none"};
    }

    insertInto(wp, attrs={}) {
        this.phys = wp.svg.append("path");
        super.insertInto(wp, attrs);
    }

    draw() {
        this.phys
            .attr("d", d3.arc()({
                innerRadius: this.wp.radius*this.rad,
                outerRadius: this.wp.radius*this.rad,
                startAngle: Math.PI/2-this.beta,
                endAngle: Math.PI/2-this.alpha
              }))
            .attr("transform", `translate(${this.wp.x(this.p.x)},${this.wp.y(this.p.y)})`)
    }
}

const anticlock_angle = (a,b) => {
    let c,d;
    if (a<=b) {[c,d] = [a,b]} else {[c,d] = [a-2*Math.PI,b]};
    return [c,d]
}

class ArcQPR extends Arc {
    constructor (q,p,r) {
        super(p, Point.dist(p,q), anticlock_angle(
            Math.atan2(q.y-p.y,q.x-p.x), 
            Math.atan2(r.y-p.y,r.x-p.x)));
        this.q = q;
        this.r = r;
        p.dependents.push(this);
        q.dependents.push(this);
        r.dependents.push(this);
    }

    update() {
        const alpha = Math.atan2(this.q.y-this.p.y,this.q.x-this.p.x);
        const beta = Math.atan2(this.r.y-this.p.y,this.r.x-this.p.x); 
        [this.alpha, this.beta] = anticlock_angle(alpha, beta);
        this.rad = Point.dist(this.p,this.q);
    }

}

const arc_coords = (p1,p2,p3) => {
    const p = circumcenter_coords(p1,p2,p3);
    const r = circumcenter_radius(p1,p2,p3);
    let a = Math.atan2(p1.y-p.y,p1.x-p.x);
    let b = Math.atan2(p2.y-p.y,p2.x-p.x);
    let c = Math.atan2(p3.y-p.y,p3.x-p.x);
    if (a > c) a = a-2*Math.PI;
    if (b > c) b = b-2*Math.PI;
    if (b < a) [a,c] = [c-2*Math.PI,a]
    return [p,r,[a,c]]
}

class Arc3P extends Arc{
    constructor (p1, p2, p3) {
        super(...arc_coords(p1,p2,p3));
        this.points = [p1,p2,p3];
        p1.dependents.push(this);
        p2.dependents.push(this);
        p3.dependents.push(this);
    }

    update() {
        [this.p, this.rad, [this.alpha, this.beta]] = arc_coords(...this.points);
    }

}

export{
    Circle,
    CirclePR,
    CirclePP,
    Circle3P,
    Arc,
    ArcQPR,
    Arc3P
}