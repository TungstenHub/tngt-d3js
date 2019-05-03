import {Element} from "./element.js";


class Implicit extends Element{
    constructor (f) {
        super();
        this.f = f;
        this.default_attrs = {
            "stroke-width": 0.5, 
            "stroke": "black", 
            "stroke-linejoin": "round",
            "fill": "none"
        };
    }

    insertInto(wp, attrs={}, offset=10, res=8) {
        
        this.w = wp.width+2*offset;
        this.h = wp.height+2*offset;
        this.offset = offset;
        this.res = res;
        let x_dim = Math.floor(this.w / res);
        let y_dim = Math.floor(this.h / res);
        this.contours = d3.contours()
            .size([x_dim,y_dim]);
        this.x_range = Array.apply(null, Array(x_dim)).map(function (_, i) {return wp.x.invert(res*(i+0.5)-offset);});
        this.y_range = Array.apply(null, Array(y_dim)).map(function (_, i) {return wp.y.invert(res*(i+0.5)-offset);});
        this.values = new Array(x_dim*y_dim);
        this.phys = wp.svg.append("path")
            .attr("transform", `translate(${-this.offset}, ${-this.offset}) scale(${this.res})`);
        super.insertInto(wp, attrs);
    }
    

    draw() {
        
        let k = 0;
        for (let j of this.y_range) {
            for (let i of this.x_range) {
                this.values[k] = this.f(i,j);
                k++;
            }
        }

        this.phys
            .attr("d", d3.geoPath()(this.contours.contour(this.values, 0)));
    } 
}

export{
    Implicit
}