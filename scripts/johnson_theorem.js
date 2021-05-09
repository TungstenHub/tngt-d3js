import {WorkPlane} from "../utils/init_canvas.js";

import {Point, FPoint, DPointOnCircle} from "../basic_objects/point.js";
import {Circle, Circle3P, CirclePP} from "../basic_objects/circle.js";

import {int_pair} from "../utils/circle_utils.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#johnson_theorem", 150),

o = new Point(0,0),

d = new Circle(o, 1),

x = new DPointOnCircle(1,2,d),
y = new DPointOnCircle(1,-1,d),
z = new DPointOnCircle(-2,-1,d),

a = new CirclePP(x,o),
b = new CirclePP(y,o),
c = new CirclePP(z,o),

p = new FPoint(int_pair, [y,z,o]),
q = new FPoint(int_pair, [z,x,o]),
r = new FPoint(int_pair, [x,y,o]),

h = new Circle3P(p,q,r);

wp.append(d, {"stroke": color.amber.w500, "stroke-width": 2, "stroke-dasharray": ("10, 10")});
wp.append([a,b,c], {"stroke": color.amber.w500});
wp.append(h, {"stroke": color.pink.w500});
wp.append([p,q,r], {"fill": color.pink.w800});
wp.append([x,y,z], {"fill": color.amber.w800});
wp.append(o, {"fill": color.bluegray.w800});

wp.end();