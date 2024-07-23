import {WorkPlane} from "../utils/init_canvas.js";

import {Ellipse} from "../basic_objects/conic.js";
import {DPoint, Point, DPointOnConic, FPoint} from "../basic_objects/point.js";
import {Line, LinePP, SemiLinePP} from "../basic_objects/line.js";
import {CirclePP} from "../basic_objects/circle.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#ellipse_curvature", 100),

f1 = new Point(-2, 0),
f2 = new Point( 2, 0),
x_axis = new LinePP(f1,f2),
b = new DPoint(f1.x-1.2,0),

c = new Ellipse(f1,f2,b),
d = new DPointOnConic(4,2,c),

l1 = new PolyLine([f1,d]),
l2 = new PolyLine([f2,d]),

p = Line.polar_conic(d,c),
q = Line.perpendicular(d,p),
i = FPoint.int_lines(x_axis,q),
di = new SemiLinePP(d,i),
r = Line.perpendicular(i,q),

a1 = FPoint.int_ab_l(d,f1,r),
a2 = FPoint.int_ab_l(d,f2,r),
a = new PolyLine([a1,a2]),

s = Line.perpendicular(a1,new LinePP(d,f1)),
o = FPoint.int_lines(s,q),
h = new CirclePP(o,d),

k = new PolyLine([d,a1,o,a2,d]),
k_inn = new PolyLine([d,a1,o,d,a2,o,d]);

wp.append(k_inn, {"stroke": color.white, "fill": color.green.w200, "stroke-width": 25});
wp.append(x_axis, {"stroke": color.gray.w800, "stroke-width": 2});
wp.append(c, {"stroke": color.blue.w500});
wp.append([di,a], {"stroke": color.green.w500, "stroke-width": 3});
wp.append([l1,l2], {"stroke": color.green.w500, "stroke-dasharray": ("10, 10"), "stroke-width": 4.5});
wp.append(k, {"stroke": color.green.w500});
wp.append(h, {"stroke": color.yellow.a700, "stroke-width": 9});
wp.append([i,a1,a2], {"fill": color.green.w800, "r":5});
wp.append([f1,f2], {"fill": color.blue.w800, "r":6});
wp.append(o, {"fill": color.yellow.w800});
wp.append(d, {"fill": color.white});
wp.append(b, {"fill": color.blue.w800});

wp.end();