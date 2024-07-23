import {WorkPlane} from "../utils/init_canvas.js";

import {LinePP} from "../basic_objects/line.js";
import {Point, DPointOnLine, FPoint} from "../basic_objects/point.js";
import {CirclePP} from "../basic_objects/circle.js";
import {PolyLine, Parametric} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#witch_agnesi", 150, 0, 0.5),

o = new Point(0,0),

x_axis = new LinePP(o, new Point(1,0)),
y_axis = new LinePP(o, new Point(0,1)),

xx_axis = new LinePP(new Point(0,1), new Point(1,1)),

c = new CirclePP(new Point(0,1/2), o),

f = t => ({
    x: t,
    y: 1/(1 + t*t)
}),

g = t => ({
    x: t/(1 + t*t),
    y: 1/(1 + t*t)
}),

tx = new Parametric(
    t => () => f(t), [],
    -4, 4, 200
),

p = new DPointOnLine(1, 1, xx_axis),

q = new FPoint(p => f(p.x), [p]),

a = new FPoint(p => g(p.x), [p]),

l = new PolyLine([o,p,q,a]);

wp.append([x_axis, y_axis], {"stroke": color.gray.w500, "stroke-width": 2});
wp.append([xx_axis], {"stroke": color.gray.w500, "stroke-width": 2, "stroke-dasharray": ("10, 10")});
wp.append(c, {"stroke": color.gray.w800, "stroke-width": 3});
wp.append(l, {"stroke": color.gray.w800, "stroke-width": 2});
wp.append(tx, {"stroke": color.amber.w500, "stroke-linejoin":"round"});
wp.append([o,a], {"fill": color.gray.w800, "r":4});
wp.append(q, {"fill": color.amber.w800});
wp.append(p, {"fill": color.white});

wp.end();