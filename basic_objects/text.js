import {Element} from "./element.js";
import d3 from "../utils/deps/d3.js";
import { mdColor as color } from "../utils/material_color.js";

class Text extends Element{
    constructor (p, q) {
        super();
        this.p = p;
        this.q = q;
        p.dependents.push(this);
        q.dependents.push(this);
        this.default_attrs = {
            "font-size": "36px", 
            "text-anchor": "middle", 
            "alignment-baseline": "middle",
            "font-family": "sans-serif",
            "fill": color.black};
    }

    insertInto(wp, attrs={}) {
        this.phys = wp.svg.append("text");
        super.insertInto(wp, attrs);
    }

    draw() {
        this.phys
            .attr("x", this.wp.x(this.p.x))
            .attr("y", this.wp.y(this.p.y))
            .text(typeof this.q.v === 'string' ? this.q.v : d3.format(".2f")(this.q.v));
    }
}

export{Text}