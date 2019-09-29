import {Element} from "./element.js";
import { Point, FPoint } from "./point.js";

const lineFunction = (wp) => d3.line()
    .x(function(d) { return wp.x(d.x); })
    .y(function(d) { return wp.y(d.y); });

class PolyLine extends Element{
    constructor (points) {
        super();
        this.points = points;
        for (let p of points) {
            p.dependents.push(this);
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

const cpPoints = (c,p,n) => {
    const vx = p.x-c.x;
    const vy = p.y-c.y;
    let points = [];
    let alpha;
    for (let k = 0; k<=n; k++) {
        alpha = 2*Math.PI*k/n;
        points.push(new Point(
            c.x + vx*Math.cos(alpha) - vy*Math.sin(alpha), 
            c.y + vy*Math.cos(alpha) + vx*Math.sin(alpha))
        )
    }
    return points;
}

class PolygonCP extends PolyLine{
    constructor (c,p,n) {
        super(cpPoints(c,p,n));
        this.c = c;
        this.p = p;
        this.n = n;
        c.dependents.push(this);
        p.dependents.push(this);
    }

    update() {
        this.points = cpPoints(this.c,this.p,this.n);
    }

    nvertex(k){
        const f = polygon => {
            const vertex = polygon.points[k];
            return {x:vertex.x, y:vertex.y}
        }
        return new FPoint(f, [this]);
    }
}

const pqCenter = (p,q,n) => {
    const t = Math.tan(Math.PI/2-Math.PI/n)/2;
    return {x:(p.x+q.x)/2-t*(q.y-p.y), y:(p.y+q.y)/2+t*(q.x-p.x)};
}

const pqPoints = (p,q,n) => {
    const c = pqCenter(p,q,n);
    return cpPoints(c,p,n);
}

class PolygonPQ extends PolyLine{
    constructor (p,q,n) {
        super(pqPoints(p,q,n));
        this.p = p;
        this.q = q;
        this.n = n;
        p.dependents.push(this);
        q.dependents.push(this);
    }

    update() {
        this.points = pqPoints(this.p,this.q,this.n);
    }

    nvertex(k){
        const f = polygon => {
            const vertex = polygon.points[k];
            return {x:vertex.x, y:vertex.y}
        }
        return new FPoint(f, [this]);
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