import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, DPointOnCircle} from "../basic_objects/point.js";
import {Circle3P} from "../basic_objects/circle.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#miquel_theorem_pivot", 100),

p = new DPoint(0.288,-1.442),
q = new DPoint(0.983,0.819),
r = new DPoint(-0.898,0.561),

m = new DPoint(0,0),

d = new Circle3P(m,q,r),
e = new Circle3P(m,r,p),
f = new Circle3P(m,p,q),

a = new DPointOnCircle(0,2,d),
a_aux = FPoint.proj_a_bc(e.center(),a,r),
b = FPoint.reflect_over_point(r, a_aux),
b_aux = FPoint.proj_a_bc(f.center(),b,p),
c = FPoint.reflect_over_point(p, b_aux),

p_aux = new PolyLine([p,FPoint.midp(b,c)]),
q_aux = new PolyLine([q,FPoint.midp(c,a)]),
r_aux = new PolyLine([r,FPoint.midp(a,b)]),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]);

wp.append(inn_t, {"fill": color.blue.w100});
wp.append([p_aux,q_aux,r_aux], {
  "stroke": color.blue.w500,
  "stroke-width": 4.5, 
  "stroke-dasharray": ("10, 10")
});
wp.append(t, {"stroke": color.blue.w500});

wp.append([d,e,f], {"stroke": color.orange.w500});

wp.append([p,q,r], {"fill": color.orange.w800});
wp.append(m, {"fill": color.red.w800});
wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();