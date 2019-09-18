import {Point} from "../basic_objects/point.js";
import {LinePP} from "../basic_objects/line.js";

function axes() {
    return [new LinePP(new Point(0,0), new Point(1,0)),
            new LinePP(new Point(0,0), new Point(0,1))]
}

function grid(m,n) {
    const lines = [];
    let i
    for (i = -m; i <= m; i++) {
        lines.push(new LinePP(new Point(i,0), new Point(i,1)))
    }
    for (i = -n; i <= n; i++) {
        lines.push(new LinePP(new Point(0,i), new Point(1,i)))
    }
    return lines
}

export {
    axes,
    grid
};