import {WorkPlane} from "../utils/init_canvas.js";

import {Time} from "../basic_objects/quantity.js";
import {Point, FPoint, DPointOnLine} from "../basic_objects/point.js";
import {CirclePP} from "../basic_objects/circle.js";
import {Line} from "../basic_objects/line.js";
import {Vector} from "../basic_objects/vector.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#circles_radical_axis_pencil", 150),

x_axis = new Line(new Point(0,0), new Vector(1,0)),

a1 = new DPointOnLine(-2,0,x_axis),
a2 = new DPointOnLine(0,0,x_axis),
p = new DPointOnLine(2,0,x_axis),

time = new Time(10),
b = new FPoint(
    (a1,a2,t) => {return {x: (a1.x+a2.x)/2, y: Math.tan(t.v/300)}},
    [a1,a2,time]
),
c = new CirclePP(b,a1),

[t1,t2] = FPoint.tangency_points(p,c),
l1 = new PolyLine([p,t1]),
l2 = new PolyLine([p,t2]),
pow_c = new CirclePP(p,t1);

wp.append(x_axis,{"stroke-width": 4});
wp.append([l1,l2,pow_c],{"stroke-width": 4, "stroke": color.amber.w200});
wp.append(c,{"stroke-width": 4, "stroke": color.blue.w500});

wp.append(p, {"fill": color.amber.w800});
wp.append([a1,a2], {"fill": color.blue.w800});

wp.end();