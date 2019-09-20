import {WorkPlane} from "../utils/init_canvas.js";
import {axes, grid} from "../utils/display_utils.js";

import {Point, DPointSnapGrid, FPoint} from "../basic_objects/point.js";
import {PComplex} from "../basic_objects/complex.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {AngleQPROr} from "../basic_objects/angle.js";
import {Vector} from "../basic_objects/vector.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#complex_numbers_product", 35),

o = new Point(0,0),

ax = axes(),
gr = grid(13,9),

a = new PComplex(new DPointSnapGrid(4,3)),
b = new PComplex(new DPointSnapGrid(-1,2)),
c = a.mul(b),

oa = new PolyLine([o,a]),
ob = new PolyLine([o,b]),
oc = new PolyLine([o,c]),

x = new Point(1,0),

alpha = new AngleQPROr(x,o,a),
beta = new AngleQPROr(x,o,b),
gamma = new AngleQPROr(x,o,c),

v = new Vector(-12, -7),
w = new Vector(2.5, 0),
u = new Vector(0, 0.3),
d = new Vector(0, -0.3),

ov = FPoint.add_vector(o,v),
xv = FPoint.add_vector(x,v),
av = FPoint.add_vector(a,v),
cv = FPoint.add_vector(c,v),
ovw = FPoint.add_vector(ov,w),
xvw = FPoint.add_vector(xv,w),
cvw = FPoint.add_vector(cv,w),

alpha_v = new AngleQPROr(xv,ov,av),
beta_v = new AngleQPROr(av,ov,cv),
gamma_v = new AngleQPROr(xvw,ovw,cvw),

ib = FPoint.add_vector(ovw,w),
eb = new FPoint(
    b => {return {x:ib.x + Point.dist(o,b)/5, y:ib.y}}, [b]
),

ia = FPoint.add_vector(ib,u),
ea = new FPoint(
    a => {return {x:ia.x + Point.dist(o,a)/5, y:ia.y}}, [a]
),
ic = FPoint.add_vector(ib,d),
ec = new FPoint(
    c => {return {x:ic.x + Point.dist(o,c)/5, y:ic.y}}, [c]
),

la = new PolyLine([ia, ea]),
lb = new PolyLine([ib, eb]),
lc = new PolyLine([ic, ec]);

wp.append(gr, {"stroke": color.gray.w200, "stroke-width": 2});
wp.append(ax, {"stroke": color.gray.w500, "stroke-width": 3});
wp.append(alpha, {"fill": color.lime.w500, "in_r": 37,"ex_r": 41});
wp.append(beta, {"fill": color.green.w500, "in_r": 45,"ex_r": 49});
wp.append(gamma, {"fill": color.blue.w500, "in_r": 53,"ex_r": 57});
wp.append(alpha_v, {"fill": color.lime.w500, "in_r": 17,"ex_r": 21});
wp.append(beta_v, {"fill": color.green.w500, "in_r": 25,"ex_r": 29});
wp.append(gamma_v, {"fill": color.blue.w500, "in_r": 33,"ex_r": 37});
wp.append(la, {"stroke": color.lime.w500, "stroke-width": 4});
wp.append(lb, {"stroke": color.green.w500, "stroke-width": 4});
wp.append(lc, {"stroke": color.blue.w500, "stroke-width": 4});
wp.append(oa, {"stroke": color.lime.w500});
wp.append(ob, {"stroke": color.green.w500});
wp.append(oc, {"stroke": color.blue.w500});
wp.append(o, {"fill": color.gray.w200, "r":5});
wp.append(c, {"fill": color.blue.w800});
wp.append(a, {"fill": color.lime.w800});
wp.append(b, {"fill": color.green.w800});

wp.end();