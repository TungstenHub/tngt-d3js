import {Element} from "./element.js";
import d3 from "../utils/deps/d3.js";
import { mdColor as color } from "../utils/material_color.js";

// Utility functions

const proj_a_bc_coords = (a,b,c) => {
    const da = Point.dist(b,c)*Point.dist(b,c);
    const db = Point.dist(c,a)*Point.dist(c,a);
    const dc = Point.dist(a,b)*Point.dist(a,b);
    return {x: ((da+db-dc)*b.x+(da-db+dc)*c.x)/(2*da),
            y: ((da+db-dc)*b.y+(da-db+dc)*c.y)/(2*da)}
}

const int_ab_cd_coords = fun => (a,b,c,d) => {
    const l1 = (c.y-d.y)*(a.x-c.x) + (d.x-c.x)*(a.y-c.y);
    const l2 = (a.y-b.y)*(d.x-c.x) - (a.x-b.x)*(d.y-c.y);
    if (l2 == 0 && fun) return fun(a,b,c,d)
    else return {x:(l1/l2*b.x+(1-l1/l2)*a.x), y:(l1/l2*b.y+(1-l1/l2)*a.y)}
}

const inverse_coords = (a,circ) => {
    const d = (a.x-circ.p.x)*(a.x-circ.p.x)+(a.y-circ.p.y)*(a.y-circ.p.y);
    return {x:circ.p.x+circ.r*circ.r*(a.x-circ.p.x)/d, 
            y:circ.p.y+circ.r*circ.r*(a.y-circ.p.y)/d};
}

const int_circles_coords = sign => (g,h) => {
    const r = g.r;
    const s = h.r;
    const d = Point.dist(g.p,h.p);
    // formulas from radical axis
    const k = (s*s-r*r)/(d*d);
    const p = {x: (g.p.x+h.p.x-k*(h.p.x-g.p.x))/2, y: (g.p.y+h.p.y-k*(h.p.y-g.p.y))/2};
    // using Heron's formula
    const l = Math.sqrt(Math.max((d+r+s)*(-d+r+s)*(d-r+s)*(d+r-s),0))/(2*d);
    return {x:p.x+sign*l/d*(-h.p.y+g.p.y), y:p.y+sign*l/d*(h.p.x-g.p.x)}
}

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

    setCoords(x,y) {
        this.x = x;
        this.y = y;
        this.update_total();
    }

}

class DPoint extends Point {
    constructor (x, y) {
        super(x, y);
        this.default_attrs = {"r": 6, "stroke": color.black, "stroke-width": 2};
    }
    
    insertInto(wp, attrs={}) {
        this.calibrate();
        super.insertInto(wp, attrs);
        this.phys.classed("draggable", true);
    }

    drag() {
        if (this._visible) {
            this.x = this.wp.start_x + this.wp.x.invert(d3.event.x);
            this.y = this.wp.start_y + this.wp.y.invert(d3.event.y);
            this.update_total();
        }
    }

    update() {
        this.calibrate();
    }

    /**
     * Recalculate the coordinates of the point, if necessary
     */
    calibrate() {}

}

class DPointSnapGrid extends DPoint {
    constructor (x, y, div=1) {
        super(x, y);
        this.div = div;
        this.calibrate();
    }

    calibrate() {
        const x=this.x, y=this.y, d=this.div;
        const sn_x = Math.round(x*d)/d;
        const sn_y = Math.round(y*d)/d;
        const dist = Math.sqrt((x-sn_x)*(x-sn_x) + (y-sn_y)*(y-sn_y));
        let r = 1;
        if (this.wp) r = this.wp.radius;
        if (dist*r < 20) [this.x, this.y] = [sn_x, sn_y];
    }
}

class DPointOnCircle extends DPoint {
    constructor (x, y, c) {
        super(x, y);
        this.c = c;
        c.dependents.push(this);
        this.calibrate();
    }

    calibrate() {
        const x=this.x, y=this.y, c=this.c;
        const d = Math.sqrt((x-c.p.x)*(x-c.p.x)+(y-c.p.y)*(y-c.p.y));
        this.x = c.p.x + c.r*(x-c.p.x)/d;
        this.y = c.p.y + c.r*(y-c.p.y)/d;
    }
}

class DPointOnLine extends DPoint {
    constructor (x, y, l) {
        super(x, y);
        this.l = l;
        l.dependents.push(this);
        this.calibrate();
    }

    calibrate() {
        const x=this.x, y=this.y, p=this.l.p, v=this.l.v;
        const t = ((x-p.x)*v.y-(y-p.y)*v.x)/(v.x*v.x+v.y*v.y);
        this.x = x-t*v.y;
        this.y = y+t*v.x;
    }
}

class DPointOnSegment extends DPoint {
    constructor (x, y, p, q) {
        super(x, y);
        this.p = p;
        this.q = q;
        p.dependents.push(this);
        q.dependents.push(this);
        this.calibrate();
    }

    calibrate() {
        const x=this.x, y=this.y, p=this.p, v={x:this.q.x-this.p.x, y:this.q.y-this.p.y};
        let t = ((x-p.x)*v.x+(y-p.y)*v.y)/(v.x*v.x+v.y*v.y);
        if (t<0) t=0;
        if (t>1) t=1;
        this.x = p.x+t*v.x;
        this.y = p.y+t*v.y;
    }
}

class DPointOnConic extends DPoint {
    constructor (x, y, cn) {
        super(x, y);
        this.cn = cn;
        cn.dependents.push(this);
        this.calibrate();
    }

    calibrate() {
        const x=this.x, y=this.y, q=this.cn.q, m=this.cn.m;

        if (this.cn.m > 0.00001) {          // Ellipse
            const {a,b,c,d,e,f} = q;
            const cx = (b*e-c*d)/m;
            const cy = (b*d-a*e)/m;
            const dx = x-cx, dy = y-cy;
            const R = -this.cn.M/m/(a*dx*dx+2*b*dx*dy+c*dy*dy);
            const r = Math.sqrt(R);
            this.x = cx+r*dx;
            this.y = cy+r*dy;
        } else if (this.cn.m < -0.00001) {  // Hyperbola
            const {a,b,c,d,e,f} = q;
            const cx = (b*e-c*d)/m;
            const cy = (b*d-a*e)/m;
            const D = Math.sqrt((a-c)*(a-c)+4*b*b);
            let vx = D+a-c;
            let vy = 2*b;
            let A = a*vx*vx+2*b*vx*vy+c*vy*vy;
            if (-this.cn.M/m/A<0) {
                [vx,vy] = [-vy,vx];
                A = a*vx*vx+2*b*vx*vy+c*vy*vy;
            }
            const w = proj_a_bc_coords({x:this.x,y:this.y},{x:cx,y:cy},{x:cx-vy,y:cy+vx});
            const wx = w.x-cx;
            const wy = w.y-cy;
            const C = this.cn.M/m + a*wx*wx+2*b*wx*wy+c*wy*wy;
            let t = Math.sqrt(-C/A);
            if ((this.x-wx-cx)*vx+(this.y-wy-cy)*vy < 0) t=-t;
            this.x = cx+wx+t*vx;
            this.y = cy+wy+t*vy;
        } else {                            // Parabola
            let {a,b,c,d,e,f} = q;
            if (a<0) [a,b,c,d,e,f] = [-a,-b,-c,-d,-e,-f];
            const 
                aq = (b<0 ? -1 : 1)*Math.sqrt(a),
                cq = Math.sqrt(c),
                l = -(2*aq*cq*d*e - (a+2*c)*d*d - 
                    (2*a+c)*e*e + (a+c)*(a+c)*f) /
                    (2*(a+c)*(a+c)*(cq*d-aq*e)),
                vx = -d/(a+c) + l*cq,
                vy = -e/(a+c) - l*aq,
                wx= -2*cq*(cq*d-aq*e)/((a+c)*(a+c)),
                wy=  2*aq*(cq*d-aq*e)/((a+c)*(a+c));
            const p = proj_a_bc_coords({x:this.x,y:this.y},{x:vx,y:vy},{x:vx+wy,y:vy-wx});
            const t = wy!=0 ? (p.x-vx)/wy : -(p.y-vy)/wx;
            this.x = vx + t*wy + t*t*wx;
            this.y = vy - t*wx + t*t*wy;
        }
    }
}

class DPointWithFunc extends DPoint {
    constructor (x, y, f, elems=[]) {
        super(x, y);
        this.f = f;
        this.elems = elems;
        for (let e of elems) {
            e.dependents.push(this);
        }
        this.calibrate();
    }

    calibrate() {
        ({x: this.x, y: this.y} = this.f({x:this.x,y:this.y},this.elems));
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
        return new FPoint(proj_a_bc_coords, [A,B,C]);
    }

    /**
     * Intersection of cevian AD with side BC
     * @param {Point} A - triangle vertex
     * @param {Point} B - triangle vertex
     * @param {Point} C - triangle vertex
     * @param {Point} D - anchor
     * @return {Point} - intersection
     */
    static int_ab_cd(A, B, C, D, fun){
        return new FPoint(int_ab_cd_coords(fun), [A,B,C,D]);
    }

    static int_ab_l(A, B, l, fun){
        return new FPoint(
            (A,B,l) => int_ab_cd_coords(fun)(A,B,l.p,l.get_q()), [A,B,l]);
    }

    static int_lines(l,k,fun){
        return new FPoint(
            (l,k) => int_ab_cd_coords(fun)(l.p,l.get_q(),k.p,k.get_q()), [l,k]);
    }

    static int_line_circle(l, c){
        const f = s => (l,circ) => {
            const base = proj_a_bc_coords(circ.p,l.p,{x:l.p.x+l.v.x,y:l.p.y+l.v.y});
            const d = Point.dist(base,circ.p);
            if (d<circ.r) {
                const factor = Math.sqrt(circ.r*circ.r-d*d);
                return {x:base.x+s*l.v.x*factor/Math.sqrt(l.v.x*l.v.x+l.v.y*l.v.y), 
                        y:base.y+s*l.v.y*factor/Math.sqrt(l.v.x*l.v.x+l.v.y*l.v.y)};
            } else {
                return {x:circ.p.x, y:circ.p.y};
            }
        }
        return [new FPoint(f(1), [l,c]), new FPoint(f(-1), [l,c])];
    }

    static inverse(A, c){
        return new FPoint(inverse_coords, [A,c]);
    }

    static tangency_points(A, c){
        const f = s => (a,circ) => {
            const d = Point.dist(a,circ.p);
            if (d>circ.r) {
                const inv = inverse_coords(a,circ);
                const factor = circ.r*Math.sqrt(1-circ.r*circ.r/(d*d))/d;
                return {x:inv.x+s*(a.y-circ.p.y)*factor, 
                    y:inv.y-s*(a.x-circ.p.x)*factor};
            } else {
                return {x:a.x, y:a.y};
            }
        }
        return [new FPoint(f(1), [A,c]), new FPoint(f(-1), [A,c])];
    }

    static tangency_points_conic(p,k){
        const f = s => (p,k) => {
            const {a,b,c,d,e,f} = k.q;
            const x = p.x;
            const y = p.y;
            const u = (a*x+b*y+d);
            const v = (b*x+c*y+e);
            const w = (d*x+e*y+f);
            const A = a*v*v + c*u*u - 2*b*u*v;
            const B = 2*(d*v*v - b*v*w + c*u*w - e*u*v);
            const C = f*v*v + c*w*w - 2*e*v*w;
            let t;
            if (A!=0) {
                const D = B*B - 4*A*C;
                if (D<0) return {x:p.x, y:p.y};
                t = (-B+s*Math.sqrt(D))/(2*A);
            } else {
                t = -C/B;
            }
            return {x:t, y:(-w-t*u)/v};
        }
        return [new FPoint(f(1), [p,k]), new FPoint(f(-1), [p,k])];
    }

    static int_circles(g,h){
        return [
            new FPoint(int_circles_coords(1), [g,h]), 
            new FPoint(int_circles_coords(-1), [g,h])
        ];
    }

    static pole(l, c){
        return new FPoint((l,circ) => {
            const base = proj_a_bc_coords(circ.p,l.p,{x:l.p.x+l.v.x,y:l.p.y+l.v.y});
            return inverse_coords(base,circ);
        }, [l,c]);
    }

    static pole_conic(l, c){
        return new FPoint((l,k) => {
            const {x,y} = l.p;
            const {x:u,y:v} = l.get_q();
            const {a,b,c,d,e,f} = k.q;
            const D1 = a*x+b*y+d;
            const E1 = b*x+c*y+e;
            const F1 = d*x+e*y+f;
            const D2 = a*u+b*v+d;
            const E2 = b*u+c*v+e;
            const F2 = d*u+e*v+f;
            const Q = D1*E2 - D2*E1;
            return {
                x: -(E2*F1-E1*F2)/Q,
                y: -(-D2*F1+D1*F2)/Q,
            }
        }, [l,c]);
    }

    static ext_point(c, d){
        const f = (c,d) => {
            const r = c.r/(d.r-c.r);
            return {x:c.p.x+r*(c.p.x-d.p.x), y:c.p.y+r*(c.p.y-d.p.y)}
        }
        return new FPoint(f, [c,d]);
    }

    static int_point(c, d){
        const f = (c,d) => {
            const r = c.r/(d.r+c.r);
            return {x:c.p.x+r*(d.p.x-c.p.x), y:c.p.y+r*(d.p.y-c.p.y)}
        }
        return new FPoint(f, [c,d]);
    }

    static add_vector(A, v){
        const f = (A,v) => {
            return {x:A.x+v.x, y:A.y+v.y}
        }
        return new FPoint(f, [A,v]);
    }

    static proj_in_line(A, l){
        const f = (A,l) => {
            return proj_a_bc_coords(A,l.p,{x:l.p.x+l.v.x,y:l.p.y+l.v.y});
        }
        return new FPoint(f, [A,l]);
    }
    
    static reflect_over_point(A, B){
        const f = (A,B) => {
            return {x:2*B.x-A.x, y:2*B.y-A.y} 
        }
        return new FPoint(f, [A,B]);
    }

    static reflect_in_line(A, l){
        const f = (A,l) => {
            const p = proj_a_bc_coords(A,l.p,{x:l.p.x+l.v.x,y:l.p.y+l.v.y});
            return {x:2*p.x-A.x, y:2*p.y-A.y} 
        }
        return new FPoint(f, [A,l]);
    }

    static rotate(A, B, a){
        const f = (A,B) => {
            const x = A.x - B.x;
            const y = A.y - B.y;
            return {
                x: B.x + Math.cos(a)*x - Math.sin(a)*y, 
                y: B.y + Math.sin(a)*x + Math.cos(a)*y} 
        }
        return new FPoint(f, [A,B]);
    }

    update() {
        this.x = this.f(...this.array).x;
        this.y = this.f(...this.array).y;
    }
}

export{
    Point,
    DPoint,
    DPointSnapGrid,
    DPointOnCircle,
    DPointOnLine,
    DPointOnSegment,
    DPointOnConic,
    DPointWithFunc,
    FPoint,
    // Utility functions
    proj_a_bc_coords,
    int_ab_cd_coords,
    inverse_coords
}