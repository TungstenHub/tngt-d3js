import {Element} from "./element.js";

var lineFunction = (wp) => d3.line()
    .x(function(d) { return wp.x(d.x); })
    .y(function(d) { return wp.y(d.y); });

class Conic extends Element {
    constructor (q) {
        super();
        this.q = q;
        const {a,b,c,d,e,f} = q;
        this.M = a*c*f+2*b*d*e-c*d*d-a*e*e-b*b*f; // Major determinant
        this.m = a*c-b*b;                         // Minor determinant
        this.default_attrs = {"stroke-width": 5, "stroke": "black", "fill": "none"};
    }

    insertInto(wp, attrs={}) {
        this.phys = wp.svg.append("path");
        super.insertInto(wp, attrs);
    }

    update() {
        const {a,b,c,d,e,f} = this.q;
        this.M = a*c*f+2*b*d*e-c*d*d-a*e*e-b*b*f; 
        this.m = a*c-b*b;                         
        
    }

    draw() {                            // Parameterization of the conic
        const points = [];
        if (Math.abs(this.m)>0.00001) { // Ellipse or Hyperbola
            const {a,b,c,d,e,f} = this.q;
            const cx = (b*e-c*d)/this.m;
            const cy = (b*d-a*e)/this.m;
            let t;
            for (let k=0; k<=128; k++) {
                t = 2*Math.PI*k/128;
                const
                    ct = Math.cos(t),
                    st = Math.sin(t),
                    R = -this.M/this.m/(a*ct*ct+2*b*ct*st+c*st*st),
                    r = (R >= 0 ? Math.min(Math.sqrt(R),50) : 50);
                points.push({x:cx+r*ct, y:cy+r*st})
            }
        } else {                        // Parabola
            let {a,b,c,d,e,f} = this.q;
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
            let t;
            for (let k=0; k<=128; k++) {
                t = Math.pow((k-64)/16,3);
                points.push({x: vx + t*wy + t*t*wx, y: vy - t*wx + t*t*wy})
            }
        }

        this.phys
            .attr("d", lineFunction(this.wp)(points));
    }
}

const fociQuadForm = (f1, f2, g, s) => {
    let r = Math.sqrt(
                Math.pow((g.x-f1.x),2) +
                Math.pow((g.y-f1.y),2)
            ) + s*Math.sqrt(
                Math.pow((g.x-f2.x),2) +
                Math.pow((g.y-f2.y),2)
            );
    let rr = r * r;
    let ax = f1.x;
    let ay = f1.y;
    let bx = f2.x;
    let by = f2.y;
    let axbx = ax - bx;
    let ayby = ay - by;
    let f = (rr - ax * ax - ay * ay + bx * bx + by * by) / (2 * r);
    return {
        a: (axbx * axbx) / rr - 1,
        b: axbx * ayby / rr,
        c: (ayby * ayby) / rr - 1,
        d: f * axbx / r + bx,
        e: f * ayby / r + by,
        f: f * f - bx * bx - by * by
    }
}

class Ellipse extends Conic{
    constructor (f1, f2, g) {
        super(fociQuadForm(f1, f2, g, 1));
        this.f1 = f1;
        this.f2 = f2;
        this.g = g;
        f1.dependents.push(this);
        f2.dependents.push(this);
        g.dependents.push(this);
    }

    update() {
        this.q = fociQuadForm(this.f1, this.f2, this.g, 1);
        super.update();
    }

}

class Hyperbola extends Conic{
    constructor (f1, f2, g) {
        super(fociQuadForm(f1, f2, g, -1));
        this.f1 = f1;
        this.f2 = f2;
        this.g = g;
        f1.dependents.push(this);
        f2.dependents.push(this);
        g.dependents.push(this);
    }

    update() {
        this.q = fociQuadForm(this.f1, this.f2, this.g, -1);
        super.update();
    }

}

const focusDirQuadForm = (f0, l) => {
    let a = l.v.y;
    let b = -l.v.x;
    let c = -l.v.y*l.p.x+l.v.x*l.p.y;
    let ab = a * a + b * b;
    let px = f0.x;
    let py = f0.y;
    return {
        a: b * b,
        b:-a * b,
        c: a * a,
        d: -c * a - ab * px,
        e: -c * b - ab * py,
        f: -(c * c - ab * (px * px + py * py))
    }
}

class Parabola extends Conic{
    constructor (f0, l) {
        super(focusDirQuadForm(f0, l));
        this.f0 = f0;
        this.l = l;
        f0.dependents.push(this);
        l.dependents.push(this);
    }

    update() {
        this.q = focusDirQuadForm(this.f0, this.l);
        super.update();
    }
}

export{
    Conic,
    Ellipse,
    Hyperbola,
    Parabola,
}