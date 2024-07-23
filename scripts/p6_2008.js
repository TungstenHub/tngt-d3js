import { WorkPlane } from "../utils/init_canvas.js";

import { Point, FPoint, DPointOnCircle } from "../basic_objects/point.js";
import { LinePP, Line } from "../basic_objects/line.js";
import { PolyLine } from "../basic_objects/polyline.js";
import { Circle, CirclePR } from "../basic_objects/circle.js";
import { FQuantity } from "../basic_objects/quantity.js";

import { incenter_coords, incenter_radius } from "../utils/triangle_coordinates.js";
import { mdColor as color } from "../utils/material_color.js";

const
wp = WorkPlane.with("#p6_2008", 100),

o = new Circle(new Point(0,-4), 3),

p = new DPointOnCircle(-8, 0, o),
q = new DPointOnCircle(-2, 0, o),
r = new DPointOnCircle( 2.5, 0, o),
s = new DPointOnCircle( 7, 0, o),

i = Line.polar(p, o),
j = Line.polar(q, o),
k = Line.polar(r, o),
l = Line.polar(s, o),

a = FPoint.int_lines(i,k),
b = FPoint.int_lines(i,l),
c = FPoint.int_lines(j,l),
d = FPoint.int_lines(j,k),

pol = new PolyLine([a,b,c,d,a]),
ac = new PolyLine([a,c]),

c1 = new FPoint(incenter_coords, [a,b,c]),
r1 = new FQuantity(incenter_radius, [a,b,c]),
o1 = new CirclePR(c1,r1),

c2 = new FPoint(incenter_coords, [a,c,d]),
r2 = new FQuantity(incenter_radius, [a,c,d]),
o2 = new CirclePR(c2,r2),

e = FPoint.ext_point(o1,o2),
[tp1,tp2] = FPoint.tangency_points(e,o1),
t1 = new LinePP(e,tp1),
t2 = new LinePP(e,tp2);

wp.append([i,j,k,l], {"stroke": color.black, "stroke-width": 1, "stroke-dasharray": ("10, 10")});
wp.append(o, {"stroke": color.black, "stroke-width": 4});
wp.append(ac, {"stroke": color.cyan.w600, "stroke-width": 2});
wp.append(pol, {"stroke": color.cyan.w600});
wp.append([t1,t2], {"stroke": color.amber.w500, "stroke-width": 3});
wp.append([o1,o2], {"stroke": color.gray.w500, "stroke-width": 4});
wp.append(e, {"fill": color.gray.w800});
wp.append([p,q,r,s], {"fill": color.yellow.w200});

wp.end();