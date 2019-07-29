
class WorkPlane {
    constructor(ident, radius, off_x = 0, off_y = 0) {
        this.chartDiv = document.getElementById(ident.slice(1));
        this.svg = d3.select(this.chartDiv).append("svg")
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0)
            .style("bottom", 0)
            .style("right", 0);
        this.width = this.chartDiv.clientWidth;
        this.height = this.chartDiv.clientHeight;
        this.svg
          .attr("width", this.width)
          .attr("height", this.height);
        this.radius = radius*Math.min(this.width/960, this.height/640);
        this.off_x = off_x;
        this.off_y = off_y;
        this.x = d3.scaleLinear().domain([off_x, off_x+this.width/(2*this.radius)]).range([this.width/2, this.width]);
        this.y = d3.scaleLinear().domain([off_y, off_y+this.height/(2*this.radius)]).range([this.height/2, 0]);
        this.start_x = 0;
        this.start_y = 0;
        this.elements = [];
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

        window.addEventListener("resize", () => {
            this.width = this.chartDiv.clientWidth;
            this.height = this.chartDiv.clientHeight;
            this.svg
                .attr("width", this.width)
                .attr("height", this.height);
            this.radius = radius*Math.min(this.width/960, this.height/640);
            this.x = d3.scaleLinear().domain([off_x, off_x+this.width/(2*this.radius)]).range([this.width/2, this.width]);
            this.y = d3.scaleLinear().domain([off_y, off_y+this.height/(2*this.radius)]).range([this.height/2, 0]);
            for (let e of this.elements) {
                e.update_total();
            }
        });
    }

    static with(ident, radius, off_x = 0, off_y = 0) {
        return new WorkPlane(ident, radius, off_x, off_y);
    }

    append(elements, attrs={}) {
        if (Array.isArray(elements)) {
            for (let e of elements) {
                e.insertInto(this, attrs);
                this.elements.push(e);
            }
        } else {
            elements.insertInto(this, attrs);
            this.elements.push(elements);
        }
    }

    end() {
        this.svg.selectAll(".draggable").call(
            d3.drag()
                .on("start", function(d) {
                    d.wp.start_x = d.wp.x.invert(d.wp.width) + d3.event.x - 2*d.wp.off_x;
                    d.wp.start_y = d.wp.y.invert(d.wp.height) + d3.event.y - 2*d.wp.off_y;
                })
                .on("drag", function(d) {
                    d.drag();
                })
        )
    }

}

export {WorkPlane};
