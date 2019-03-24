import {Element} from "./element.js";

/** Point */
class Point extends Element {
    constructor (x, y) {
        super();
        this.x = x;
        this.y = y;
        this.default_attrs = {"r": 7};
    }

    /**
     * Distance between points
     * @param {Point} A 
     * @param {Point} B
     * @return {number} 
     */
    static dist(A, B){
        var dx = A.x - B.x;
        var dy = A.y - B.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    insertInto(wp, attrs={}) {
        this.phys = wp.svg.append("circle");
        super.insertInto(wp, attrs);
    }

    draw() {
        let wp = this.wp;
        this.phys
            .attr("cx", function(d) {return wp.x(d.x)})
            .attr("cy", function(d) {return wp.y(d.y)});
    }

}

class DPoint extends Point {
    constructor (x, y) {
        super(x, y);
        this.default_attrs = {"r": 6, "stroke": "black", "stroke-width": 2};
    }

    insertInto(wp, attrs={}) {
        this.calibrate();
        super.insertInto(wp, attrs);
        this.phys.classed("draggable", true);
    }

    drag() {
        this.x = this.wp.start_x + this.wp.x.invert(d3.event.x);
        this.y = this.wp.start_y + this.wp.y.invert(d3.event.y);
        this.update_total();
    }

    update() {
        this.calibrate();
    }

    /**
     * Recalculate the coordinates of the point, if necessary
     */
    calibrate() {}

}

class DPointOnCircle extends DPoint {
    constructor (x, y, c) {
        super(x, y);
        this.c = c;
        c.dependents.push(this);
    }

    calibrate() {
        const x=this.x, y=this.y, c=this.c;
        const d = Math.sqrt((x-c.p.x)*(x-c.p.x)+(y-c.p.y)*(y-c.p.y));
        this.x = c.p.x + c.r*(x-c.p.x)/d;
        this.y = c.p.y + c.r*(y-c.p.y)/d;
    }

}

/** Functional Point */
class FPoint extends Point {
    constructor (f, array) {
        super(f(...array).x, f(...array).y);
        this.f = f;
        this.array = array;
        for (let e of array) {
            e.dependents.push(this);
        }
    }

    static midp(A, B){
        const f = (a,b) => {
            return {x:(a.x+b.x)/2, y:(a.y+b.y)/2}
        }
        return new FPoint(f, [A,B]);
    }

    static proj_a_bc(A, B, C){
        const f = (a,b,c) => {
            const da = Point.dist(b,c)*Point.dist(b,c);
            const db = Point.dist(c,a)*Point.dist(c,a);
            const dc = Point.dist(a,b)*Point.dist(a,b);
            return {x: ((da+db-dc)*B.x+(da-db+dc)*C.x)/(2*da),
                    y: ((da+db-dc)*B.y+(da-db+dc)*C.y)/(2*da)}
        }
        return new FPoint(f, [A,B,C]);
    }

    /**
     * Intersection of cevian AD with side BC
     * @param {Point} A - triangle vertex
     * @param {Point} B - triangle vertex
     * @param {Point} C - triangle vertex
     * @param {Point} D - anchor
     * @return {Point} - intersection
     */
    static int_ab_cd(A, B, C, D){
        const f = (a,b,c,d) => {
            const l1 = (c.y-d.y)*(a.x-c.x) + (d.x-c.x)*(a.y-c.y);
            const l2 = (a.y-b.y)*(d.x-c.x) - (a.x-b.x)*(d.y-c.y);
            return {x:(l1/l2*b.x+(1-l1/l2)*a.x), y:(l1/l2*b.y+(1-l1/l2)*a.y)};
        }
        return new FPoint(f, [A,B,C,D]);
    }

    static inverse(A, c){
        const f = (a,circ) => {
            const d = (a.x-circ.p.x)*(a.x-circ.p.x)+(a.y-circ.p.y)*(a.y-circ.p.y);
            return {x:circ.p.x+circ.r*circ.r*(a.x-circ.p.x)/d, 
                    y:circ.p.y+circ.r*circ.r*(a.y-circ.p.y)/d};
        }
        return new FPoint(f, [A,c]);
    }

    update() {
        this.x = this.f(...this.array).x;
        this.y = this.f(...this.array).y;
    }
}

export{
    Point,
    DPoint,
    DPointOnCircle,
    FPoint
}