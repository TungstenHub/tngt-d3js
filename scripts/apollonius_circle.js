import {WorkPlane} from "../utils/init_canvas.js";

import {CirclePR} from "../basic_objects/circle.js";
import {Point, FPoint, DPointOnCircle} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Quantity, FQuantity, Slider} from "../basic_objects/quantity.js";
import {Text} from "../basic_objects/text.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#apollonius_circle", 150),

a = new Point(-1,0),
b = new Point( 1,0),

al = new Point(wp.x.invert(0)+1.5,wp.y.invert(0)-0.5),
ar = new Point(wp.x.invert(wp.width)-1.9,wp.y.invert(0)-0.5),

s = new Slider(0.01,0.99,al.x,al.y,2,0.333, x => x/(1-x)),

m = new FPoint(s => {return {x: (1+s.v*s.v)/(1-s.v*s.v), y:0}}, [s]),
r = new FQuantity(s => Math.abs(2*s.v/(1-s.v*s.v)), [s]),
c = new CirclePR(m,r),

d = new DPointOnCircle(0,1,c),

l1 = new PolyLine([a,d]),
l2 = new PolyLine([d,b]),
d1 = new FQuantity(Point.dist, [a,d]),
d2 = new FQuantity(Point.dist, [d,b]),

t1 = new Text(new Point(ar.x,ar.y-0.133),d1),
t2 = new Text(new Point(ar.x,ar.y+0.133),d2),
t_eq = new Text(new Point(ar.x+0.4,ar.y),new Quantity("=")),
t = new Text(new Point(ar.x+0.8,ar.y),s),

quot_line = new PolyLine([new Point(ar.x-0.266,ar.y+0.0133), new Point(ar.x+0.266,ar.y+0.0133)]);

wp.append(s, {"fill": color.yellow.w100});

wp.append(quot_line, {"stroke-width": 2, "stroke": color.bluegray.w800});
wp.append(t1, {"fill": color.orange.w500});
wp.append(t2, {"fill": color.pink.w500});
wp.append([t_eq,t], {"fill": color.bluegray.w800});

wp.append(c, {"stroke": color.cyan.w500});
wp.append(l1, {"stroke": color.orange.w500});
wp.append(l2, {"stroke": color.pink.w500});
wp.append(d, {"fill": color.lightblue.w800});
wp.append([a,b], {"fill": color.blue.w800});

wp.end();