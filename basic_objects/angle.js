import {Element} from "./element.js";

class Angle extends Element{
    constructor (p, [alpha, beta]) {
        super();
        this.p = p;
        this.alpha = alpha;
        this.beta = beta;
        p.dependents.push(this);
        this.default_attrs = {"stroke": "none", "fill": "black"};
    }

    insertInto(wp, attrs={}) {
        this.in_r = attrs.in_r != undefined ? attrs.in_r : 40;
        this.ex_r = attrs.ex_r != undefined ? attrs.ex_r : 45;
        this.phys = wp.svg.append("path");
        super.insertInto(wp, attrs);
    }

    draw() {
        this.phys
            .attr("d", d3.arc()({
                innerRadius: this.in_r,
                outerRadius: this.ex_r,
                startAngle: Math.PI/2-this.beta,
                endAngle: Math.PI/2-this.alpha
              }))
            .attr("transform", `translate(${this.wp.x(this.p.x)},${this.wp.y(this.p.y)})`)
    }
}

const minor_angle = (a,b) => {
    let c,d;
    if (a<=b) {[c,d] = [a,b]} else {[c,d] = [b,a]};
    if (d-c >= Math.PI) {[c,d] = [d,c+2*Math.PI]}
    return [c,d]
}

class AngleQPR extends Angle {
    constructor (q,p,r) {
        super(p, minor_angle(Math.atan2(q.y-p.y,q.x-p.x), Math.atan2(r.y-p.y,r.x-p.x)));
        this.q = q;
        this.r = r;
        p.dependents.push(this);
        q.dependents.push(this);
        r.dependents.push(this);
    }

    update() {
        const alpha = Math.atan2(this.q.y-this.p.y,this.q.x-this.p.x);
        const beta = Math.atan2(this.r.y-this.p.y,this.r.x-this.p.x); 
        [this.alpha, this.beta] = minor_angle(alpha, beta);
    }

}

const anticlock_angle = (a,b) => {
    let c,d;
    if (a<=b) {[c,d] = [a,b]} else {[c,d] = [a-2*Math.PI,b]};
    return [c,d]
}

class AngleQPROr extends Angle {
    constructor (q,p,r) {
        super(p, anticlock_angle(Math.atan2(q.y-p.y,q.x-p.x), Math.atan2(r.y-p.y,r.x-p.x)));
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
    }

}

class AngleQPl extends Angle {
    constructor (q,p,l) {
        let [vx,vy] = [l.v.x,l.v.y];
        if ((q.x-p.x)*vx+(q.y-p.y)*vy < 0) [vx,vy] = [-vx,-vy]
        super(p, minor_angle(Math.atan2(q.y-p.y,q.x-p.x), Math.atan2(vy,vx)));
        this.q = q;
        this.l = l;
        p.dependents.push(this);
        q.dependents.push(this);
        l.dependents.push(this);
    }

    update() {
        let [vx,vy] = [this.l.v.x,this.l.v.y];
        const [pqx,pqy] = [this.q.x-this.p.x,this.q.y-this.p.y];
        if (pqx*vx+pqy*vy < 0) [vx,vy] = [-vx,-vy]
        const alpha = Math.atan2(pqy,pqx);
        const beta = Math.atan2(vy,vx); 
        [this.alpha, this.beta] = minor_angle(alpha, beta);
    }

}

export{
    Angle,
    AngleQPR,
    AngleQPROr,
    AngleQPl
}