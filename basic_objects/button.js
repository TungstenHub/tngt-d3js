import {Element} from "./element.js";

const inner_margin = 10;
const grid_margin = 4;
const button_size = 30;
const icon_size = 24;

const common_icons = {
    'reload': '\uf021',
    'question': '\uf128',
}

class Button extends Element{
    constructor (c,k) {
        super();
        this.coords = c;
        this.k = k;
        this.default_attrs = {
            "fill": "#000000",
            "stroke-width": 5};
    }

    insertInto(wp, attrs={}) {
        this.phys = wp.svg.append("g");

        const cx = (this.coords[0] >= 0 ? inner_margin : wp.width - inner_margin + grid_margin) 
                    + this.coords[0]*(button_size+grid_margin)
        const cy = (this.coords[1] >= 0 ? inner_margin : wp.height - inner_margin + grid_margin) 
                    + this.coords[1]*(button_size+grid_margin)

        this.text = wp.svg.append("text")
            .attr("font-size", icon_size + "px")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central")
            .attr("font-family", "FontAwesome")
            .attr("fill", attrs["fill"] != undefined ? attrs["fill"] : this.default_attrs["fill"])
            .style("user-select", "none")
            .attr("x", cx + button_size/2)
            .attr("y", cy + button_size/2)
            .text(common_icons[this.k]);
        this.rect = wp.svg.append('rect')
            .attr("fill", "#00000000")
            .attr("stroke-width", 2)
            .attr("rx", 2)
            .attr("ry", 2)
            .attr("stroke", attrs["fill"] != undefined ? attrs["fill"] : this.default_attrs["fill"])
            .style("cursor", "pointer")
            .attr("x", cx)
            .attr("y", cy)
            .attr("width", button_size)
            .attr("height", button_size)
            .on("mouseover", function(d) {
                d3.select(this).attr("fill", (attrs["fill"] != undefined ? attrs["fill"] : this.default_attrs["fill"])+'40');
            })                  
            .on("mouseout", function(d) {
                d3.select(this).attr("fill", "#00000000");
            });
        super.insertInto(wp, attrs);
    }

    draw() {}
}

class ActionButton extends Button{
    constructor (c, k, f) {
        super(c,k);
        this.f = f;
    }

    insertInto(wp, attrs={}) {
        super.insertInto(wp, attrs);
        this.rect.on("click", (d) => { this.f(); }) 
    }

}

export{
    Button,
    ActionButton
}