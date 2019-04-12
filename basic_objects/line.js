import {Element} from "./element.js";
import {FPoint, Point} from "./point.js";
import { FVector, VectorPP } from "./vector.js";

class Line extends Element{
    constructor (p, v) {
        super();
        this.p = p;
        this.v = v;
        p.dependents.push(this);
        v.dependents.push(this);
        this.default_attrs = {"stroke-width": 5, "stroke": "black", "fill": "none"};
    }

    insertInto(wp, attrs={}) {
        this.phys = wp.svg.append("line");
        super.insertInto(wp, attrs);
    }

    draw() {
        if (this.v.x == 0 && this.v.y == 0) {
            this.phys
                .attr("x1", this.wp.x(this.p.x))
                .attr("x2", this.wp.x(this.p.x))
                .attr("y1", this.wp.y(this.p.y))
                .attr("y2", this.wp.y(this.p.y));
        } else if (this.v.x != 0) {
            const slope = this.v.y/this.v.x;
            const limit = this.wp.width/this.wp.radius+0.1;
            this.phys
                .attr("x1", this.wp.x(-limit))
                .attr("x2", this.wp.x(limit))
                .attr("y1", this.wp.y(this.p.y+slope*(-limit-this.p.x)))
                .attr("y2", this.wp.y(this.p.y+slope*(limit-this.p.x)));
        } else {
            const limit = this.wp.height/this.wp.radius+0.1;
            this.phys
                .attr("x1", this.wp.x(this.p.x))
                .attr("x2", this.wp.x(this.p.x))
                .attr("y1", this.wp.y(-limit))
                .attr("y2", this.wp.y(limit));
        }
    }

    q() {return {x: this.p.x+this.v.x, y:this.p.y+this.v.y}}

    static polar(p,c) {
        const i = FPoint.inverse(p,c);
        return new Line(i,FVector.perp(new VectorPP(p,i)));
    }

    static radical_axis(c,d) {
        const i = new FPoint(
            (c,d) => {
                let k = (d.r*d.r-c.r*c.r)/(Point.dist(c.p,d.p)*Point.dist(c.p,d.p));
                return {x: (c.p.x+d.p.x-k*(d.p.x-c.p.x))/2, y: (c.p.y+d.p.y-k*(d.p.y-c.p.y))/2}
            },
            [c,d]
        );
        return new Line(i,FVector.perp(new VectorPP(i,d.p)));
    }
}

class LinePP extends Line{
    constructor (p, q) {
        super(p, new VectorPP(p,q)); 
        this.q = q;
    }
}

class SemiLine extends Line{
    draw() {
        if (this.v.x == 0 && this.v.y == 0) {
            this.phys
                .attr("x1", this.wp.x(this.p.x))
                .attr("x2", this.wp.x(this.p.x))
                .attr("y1", this.wp.y(this.p.y))
                .attr("y2", this.wp.y(this.p.y));
        } else if (this.v.x != 0) {
            const slope = this.v.y/this.v.x;
            const limit = (this.wp.width/this.wp.radius+0.1)*Math.sign(this.v.x);
            this.phys
                .attr("x1", this.wp.x(this.p.x))
                .attr("x2", this.wp.x(limit))
                .attr("y1", this.wp.y(this.p.y))
                .attr("y2", this.wp.y(this.p.y+slope*(limit-this.p.x)));
        } else {
            const limit = (this.wp.height/this.wp.radius+0.1)*Math.sign(this.v.y);
            this.phys
                .attr("x1", this.wp.x(this.p.x))
                .attr("x2", this.wp.x(this.p.x))
                .attr("y1", this.wp.y(this.p.y))
                .attr("y2", this.wp.y(limit));
        }
    }
}

class SemiLinePP extends SemiLine{
    constructor (p, q) {
        super(p, new VectorPP(p,q)); 
        this.q = q;
    }
}

export{
    Line,
    LinePP,
    SemiLine,
    SemiLinePP
}