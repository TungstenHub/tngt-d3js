import {Element} from "./element.js";
import { Point, DPointOnSegment, FPoint } from "./point.js";
import { PolyLine } from "./polyline.js";
import { Text } from "./text.js";

/** Quantity */
class Quantity extends Element {
    constructor (v) {
        super();
        this.v = v;
    }

    static with(v) {
        return new Quantity(v);
    }

}

/** Functional Quantity */
class FQuantity extends Quantity {
    constructor (f, array) {
        super(f(...array));
        this.f = f;
        this.array = array;
        for (let e of array) {
            e.dependents.push(this);
        }
    }

    insertInto(wp, attrs) {
        throw new Error('FQuantities cannot be represented in a SVG');
    }

    update() {
        this.v = this.f(...this.array);
    }
}

class Time extends Quantity {
    constructor (lapse) {
        super(0);
        this.lapse = lapse
        this.sInt = setInterval(() => {
            this.v++;
            this.update_total();
        }, lapse);
    }

    insertInto(wp, attrs) {
        throw new Error('Time Quantities cannot be represented in a SVG');
    }

    clear() {clearInterval(this.sInt);}

}

var lineFunction = (wp) => d3.line()
    .x(function(d) { return wp.x(d.x); })
    .y(function(d) { return wp.y(d.y); });

class Slider extends Quantity {
    constructor (a, b, x, y, w, init) {
        let v = init;
        if (v<a) v=a;
        if (v>b) v=b;
        super(v);
        this.a = a;
        this.b = b;
        this.x = x;
        this.y = y;
        this.w = w;
        this.default_attrs = {
            "stroke-width": 2, 
            "stroke": "black", 
            "fill": "black",
            "font-size": "18px"
        };
    }

    insertInto(wp, attrs={}) {
        const [x,y,w] = [this.x,this.y,this.w];
        this.phys = wp.svg.append("g");
        this.segment = new PolyLine([new Point(x-w/2,y),new Point(x+w/2,y)]);
        const t = (this.v-this.a)/(this.b-this.a);
        const px = x-w/2 + t*w;
        this.anchor = new DPointOnSegment(px,y,new Point(x-w/2,y),new Point(x+w/2,y));

        this.segment.insertInto(wp, {
            "stroke-width": attrs["stroke-width"] != undefined ? attrs["stroke-width"] : this.default_attrs["stroke-width"], 
            "stroke": attrs["stroke"] != undefined ? attrs["stroke"] : this.default_attrs["stroke"], });
        this.anchor.insertInto(wp, {"fill": attrs["fill"] != undefined ? attrs["fill"] : this.default_attrs["fill"],});

        this.second_anchor = new FPoint(a => {return {x:a.x, y:a.y+0.2}},[this.anchor]);
        this.text = new Text(this.second_anchor,this);
        this.text.insertInto(wp, {
            "font-size": attrs["font-size"] != undefined ? attrs["font-size"] : this.default_attrs["font-size"],});

        this.anchor.dependents.push(this);

        super.insertInto(wp, attrs);
    }

    update() {
        this.v = this.a+(this.anchor.x-this.x+this.w/2)*(this.b-this.a)/this.w;
    }

}

export{
    Quantity, 
    FQuantity, 
    Time,
    Slider
}