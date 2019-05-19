import {WorkPlane} from "../utils/init_canvas.js";

import {EccConic} from "../basic_objects/conic.js";
import {Point, DPointOnConic, FPoint} from "../basic_objects/point.js";
import {LinePP} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Quantity, FQuantity, Slider} from "../basic_objects/quantity.js";
import {Text} from "../basic_objects/text.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#conic_eccentricity", 100),

x_axis = new LinePP(new Point(-1,-1),new Point(1,-1)),
b = new Point(0,1),

al = new Point(wp.x.invert(0)+1.8,wp.y.invert(0)-1),
ar = new Point(wp.x.invert(wp.width)-2.4,wp.y.invert(0)-1),

s = new Slider(0.01,4,al.x,al.y,2,0.5),

c = new EccConic(b, x_axis, s),
d = new DPointOnConic(2,0.5,c),

p = FPoint.proj_in_line(d,x_axis),

l1 = new PolyLine([b,d]),
l2 = new PolyLine([d,p]),

d1 = new FQuantity(Point.dist, [b,d]),
d2 = new FQuantity(Point.dist, [d,p]),

t1 = new Text(new Point(ar.x,ar.y+0.2),d1),
t2 = new Text(new Point(ar.x,ar.y-0.2),d2),
t_eq = new Text(new Point(ar.x+0.6,ar.y),new Quantity("=")),
t = new Text(new Point(ar.x+1.2,ar.y),s),

quot_line = new PolyLine([new Point(ar.x-0.4,ar.y+0.02), new Point(ar.x+0.4,ar.y+0.02)]);

wp.append(x_axis, {"stroke": color.bluegray.w800});
wp.append(s, {"fill": color.yellow.w100});
wp.append(quot_line, {"stroke-width": 2, "stroke": color.bluegray.w800});
wp.append(t1, {"fill": color.orange.w500});
wp.append(t2, {"fill": color.pink.w500});
wp.append([t_eq,t], {"fill": color.bluegray.w800});
wp.append(c, {"stroke": color.teal.w500});
wp.append(l1, {"stroke": color.orange.w500});
wp.append(l2, {"stroke": color.pink.w500});
wp.append(d, {"fill": color.teal.w800});
wp.append(b, {"fill": color.blue.w800});

wp.end();