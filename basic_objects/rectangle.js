import {Element} from "./element.js";

class Rectangle extends Element{
    constructor (x,y,w,h) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.default_attrs = {"stroke-width": 5, "stroke": "none", "fill": "none"};
    }

    insertInto(wp, attrs={}) {
        this.phys = wp.svg.append("rect");
        super.insertInto(wp, attrs);
    }

    draw() {
        this.phys
            .attr("x", this.wp.x(this.x-this.w/2))
            .attr("y", this.wp.y(this.y+this.h/2))
            .attr("width", this.wp.radius*this.w)
            .attr("height", this.wp.radius*this.h);
    }
}

class RectanglePQQ extends Rectangle{
    constructor (p, wq, hq) {
        super(p.x, p.y, wq.v, hq.v); 
        this.p = p;
        this.wq = wq;
        this.hq = hq;
        p.dependents.push(this);
        wq.dependents.push(this);
        hq.dependents.push(this);
    }

    update() {
        this.x = this.p.x;
        this.y = this.p.y;
        this.w = this.wq.v;
        this.h = this.hq.v;
    }

}

export{
    Rectangle,
    RectanglePQQ
}