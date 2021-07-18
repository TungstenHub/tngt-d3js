import {WorkPlane} from "../utils/init_canvas.js";

import {LinePP} from "../basic_objects/line.js";
import {Point, DPointOnLine, FPoint} from "../basic_objects/point.js";
import {PolyLine, Parametric} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#tractrix", 150, 0, 0.5),

x_axis = new LinePP(new Point(0,0), new Point(1,0)),
y_axis = new LinePP(new Point(0,0), new Point(0,1)),

f = t => ({
    x: t - Math.tanh(t),
    y: 1/Math.cosh(t)
}),

tx = new Parametric(
    t => () => f(t), [],
    -6, 6, 100
),

p = new DPointOnLine(1, 0, x_axis),

q = new FPoint(p => f(p.x), [p]),

l = new PolyLine([p,q]);

wp.append([x_axis, y_axis], {"stroke": color.gray.w500, "stroke-width": 2});
wp.append(l, {"stroke": color.gray.w800, "stroke-width": 4});
wp.append(tx, {"stroke": color.teal.w800, "stroke-linejoin":"round"});
wp.append(q, {"fill": color.teal.w500});
wp.append(p, {"fill": 'white'});

wp.end();