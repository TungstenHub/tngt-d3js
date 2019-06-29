import {Element} from "./element.js";

/** Vector */
class Vector extends Element {
    constructor (x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    dot(w) {
        return this.x*w.x + this.y*w.y;
    }
}

var lineFunction = (wp) => d3.line()
    .x(function(d) { return wp.x(d.x); })
    .y(function(d) { return wp.y(d.y); });

class VectorPP extends Vector {
    constructor (p, q) {
        super(q.x-p.x, q.y-p.y);
        this.p = p;
        this.q = q;
        p.dependents.push(this);
        q.dependents.push(this);
        this.default_attrs = {
            "stroke-width": 5, 
            "stroke": "black", 
            "fill": "none", 
            "marker-end":"url(#arrow)"};

    }

    insertInto(wp, attrs={}) {
        this.phys = wp.svg.append("path");
        super.insertInto(wp, attrs);
    }

    draw() {console.log('vector drawn');
        this.phys
            .attr("d", lineFunction(this.wp)([this.p,this.q]));
    }

    update() {
        this.x = this.q.x-this.p.x;
        this.y = this.q.y-this.p.y;
    }

}

/** Functional Vector */
class FVector extends Vector {
    constructor (f, array) {
        super(f(...array).x, f(...array).y);
        this.f = f;
        this.array = array;
        for (let e of array) {
            e.dependents.push(this);
        }
    }

    static perp(v){
        const f = (vect) => {
            return {x:-vect.y, y:vect.x}
        }
        return new FVector(f, [v]);
    }

    static multiply(v,q){
        const f = (v,q) => {
            return {x:v.x*q.v, y:v.y*q.v}
        }
        return new FVector(f, [v,q]);
    }

    update() {
        this.x = this.f(...this.array).x;
        this.y = this.f(...this.array).y;
    }
}

export{
    Vector,
    VectorPP,
    FVector
}