
class WorkPlane {
    constructor(ident, radius, off_x = 0, off_y = 0) {
        this.svg = d3.select(ident);
        this.radius = radius;
        this.width = +this.svg.attr("width");
        this.height = +this.svg.attr("height");
        this.x = d3.scaleLinear().domain([off_x, off_x+this.width/(2*radius)]).range([this.width/2, this.width]);
        this.y = d3.scaleLinear().domain([off_y, off_y+this.height/(2*radius)]).range([this.height/2, 0]);
        this.start_x = 0;
        this.start_y = 0;
        this.svg.append('svg:defs').append('svg:marker')
            .attr('id', 'arrow')
            .attr('refX', 3)
            .attr('refY', 1.5)
            .attr('markerWidth', 3)
            .attr('markerHeight', 3)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,0 L3,1.5 L0,3 Z')
            .attr("class", "arrow");
    }

    static with(ident, radius, off_x = 0, off_y = 0) {
        return new WorkPlane(ident, radius, off_x, off_y);
    }

    append(elements, attrs={}) {
        if (Array.isArray(elements)) {
            for (let e of elements) {
                e.insertInto(this, attrs);
            }
        } else {
            elements.insertInto(this, attrs);
        }
    }

    end() {
        this.svg.selectAll(".draggable").call(
            d3.drag()
                .on("start", function(d) {
                    d.wp.start_x = d.wp.x.invert(d.wp.width) + d3.event.x;
                    d.wp.start_y = d.wp.y.invert(d.wp.height) + d3.event.y;
                })
                .on("drag", function(d) {
                    d.drag();
                })
        )
    }
}

export {WorkPlane};
