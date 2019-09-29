import {Element} from "./element.js";
import {FPoint} from "./point.js";

const lineFunction = (wp) => d3.line()
    .x(function(d) { return wp.x(d.x); })
    .y(function(d) { return wp.y(d.y); });

class PolyLine extends Element{
    constructor (points, noPropagate) {
        super();
        this.points = points;
        if (!noPropagate) {
            for (let p of points) {
                p.dependents.push(this);
            }
        }
        this.default_attrs = {"stroke-width": 5, "stroke": "none", "fill": "none"};
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

const cpPoint = (c,p,n,k) => {
    const vx = p.x-c.x;
    const vy = p.y-c.y;
    const alpha = 2*Math.PI*k/n;
    return {
        x: c.x + vx*Math.cos(alpha) - vy*Math.sin(alpha), 
        y: c.y + vy*Math.cos(alpha) + vx*Math.sin(alpha)
    }
}

class PolygonCP extends PolyLine{
    constructor (c,p,n) {
        let points = [];
        for (let k=0; k<=n; k++) {
            points.push(new FPoint((c,p)=>cpPoint(c,p,n,k),[c,n]))
        }
        super(points, true);
        this.c = c;
        this.p = p;
        this.n = n;
        c.dependents.push(this);
        p.dependents.push(this);
    }

    nvertex(k){
        return this.points[k]
    }
}

const pqCenter = (p,q,n) => {
    const t = Math.tan(Math.PI/2-Math.PI/n)/2;
    return {x:(p.x+q.x)/2-t*(q.y-p.y), y:(p.y+q.y)/2+t*(q.x-p.x)};
}

const pqPoint = (p,q,n,k) => {
    const c = pqCenter(p,q,n);
    return cpPoint(c,p,n,k);
}

class PolygonPQ extends PolyLine{
    constructor (p,q,n) {
        let points = [];
        for (let k=0; k<=n; k++) {
            points.push(new FPoint((p,q)=>pqPoint(p,q,n,k),[p,q]))
        }
        super(points, true);
        this.p = p;
        this.q = q;
        this.n = n;
        p.dependents.push(this);
        q.dependents.push(this);
    }

    nvertex(k){
        return this.points[k]
    }

    center(){
        const f = polygon => {
            return pqCenter(polygon.p,polygon.q,polygon.n)
        }
        return new FPoint(f, [this]);
    }
}

const translate_polyline = (pol,v) => {
    return new PolyLine(
        pol.points.map(
            p => FPoint.add_vector(p,v)
        )
    )
}

const rotate_polyline = (pol,q,a) => {
    return new PolyLine(
        pol.points.map(
            p => FPoint.rotate(p,q,a)
        )
    )
}

export{
    PolyLine,
    PolygonCP,
    PolygonPQ,
    translate_polyline,
    rotate_polyline
}