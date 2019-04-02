import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, Point, DPointOnCircle, DPointOnLine} from "../basic_objects/point.js";
import {FQuantity} from "../basic_objects/quantity.js";
import {CirclePP} from "../basic_objects/circle.js";
import {Line, LinePP} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";
import { Vector, VectorPP, FVector } from "../basic_objects/vector.js";

const
wp = WorkPlane.with("#circles_interior_point", 150),

x_axis = new Line(new Point(0,0), new Vector(1,0)),

a1 = new DPointOnLine(-1,0,x_axis),
b1 = new DPoint(-1,0.4),
c1 = new CirclePP(a1,b1),

a2 = new DPointOnLine(1,0,x_axis),
b2 = new DPoint(1,1),
c2 = new CirclePP(a2,b2),

e = FPoint.int_point(c1,c2),
[tp1,tp2] = FPoint.tangency_points(e,c1),
t1 = new LinePP(e,tp1),
t2 = new LinePP(e,tp2),

p = new DPointOnCircle(-1-0.2*Math.sqrt(2),0.2*Math.sqrt(2),c1),

v = new VectorPP(a1,p),
w = FVector.multiply(v, new FQuantity((c,d) => -d.r/c.r, [c1,c2])),

q = FPoint.add_vector(a2,w),

r1 = new PolyLine([a1,p]),
r2 = new PolyLine([a2,q]),

l = new LinePP(p,q);

wp.append([t1,t2], {"stroke-width": 4, "stroke": color.green.w500});
wp.append([c1,c2],{"stroke-width": 4, "stroke": color.blue.w500});
wp.append(l,{"stroke-width": 4, "stroke": color.orange.w500});
wp.append([r1,r2],{"stroke-width": 4, "stroke": color.pink.w500});

wp.append(e, {"fill": color.green.w800});
wp.append([b1,b2], {"fill": color.yellow.w100});
wp.append([a1,a2], {"fill": color.blue.w800});
wp.append([p,q], {"fill": color.pink.w800});

wp.end();