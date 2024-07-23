import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPoint, DPointOnCircle, FPoint} from "../basic_objects/point.js";
import {LinePP} from "../basic_objects/line.js";
import {Circle3P, CirclePR, CirclePP} from "../basic_objects/circle.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Ellipse} from "../basic_objects/conic.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#van_schooten_locus_problem", 100),

o = new Point(0, 0),

a = new DPoint(1.4, -0.8),
b = new DPoint(-0.1, 1),
c = new DPoint(3.8, 2),
trg = new PolyLine([a,b,c,a]),

la = new LinePP(o,a),
lb = new LinePP(o,b),

insc_circ = new Circle3P(o,a,b),
r = insc_circ.radius(),
base_circ = new CirclePR(o,r),
d = new DPointOnCircle(1,1,base_circ),

pd_a = FPoint.proj_in_line(d,la),
pd_b = FPoint.proj_in_line(d,lb),

t_a = FPoint.reflect_over_point(o,pd_a),
t_b = FPoint.reflect_over_point(o,pd_b),

transformed_point = (a,b,c,p,q) => {
    const 
    alpha = Math.atan2(b.y-a.y, b.x-a.x),
    beta  = Math.atan2(q.y-p.y, q.x-p.x),
    gamma = beta - alpha,
    ac_x = c.x - a.x,
    ac_y = c.y - a.y,
    v_x = ac_x*Math.cos(gamma) - ac_y*Math.sin(gamma),
    v_y = ac_x*Math.sin(gamma) + ac_y*Math.cos(gamma);
    return {x: p.x + v_x, y: p.y + v_y}
},

t_c = new FPoint(transformed_point, [a,b,c,t_a,t_b]),
t_trg = new PolyLine([t_a,t_b,t_c,t_a]),

t_circ = new CirclePP(d,o),

cd = new LinePP(c,insc_circ.center()),
[p,q] = FPoint.int_line_circle(cd,insc_circ),

ellipseFoci = s => (c,p,q) => {
    const
    cp = Point.dist(c,p),
    cq = Point.dist(c,q),
    f = Math.sqrt(Math.abs(cq*cq - cp*cp)),
    m = (cp <= cq) ? p : q,
    mod = Math.sqrt(m.x*m.x + m.y*m.y);
    return {x: s*f*m.x/mod, y: s*f*m.y/mod};
},

f1 = new FPoint(ellipseFoci(-1), [c,p,q]),
f2 = new FPoint(ellipseFoci( 1), [c,p,q]),
e = new Ellipse(f1,f2,c),

t_p = new FPoint(transformed_point, [a,b,p,t_a,t_b]),
t_q = new FPoint(transformed_point, [a,b,q,t_a,t_b]),

op = new LinePP(o,p),
oq = new LinePP(o,q),

t_pc = new PolyLine([t_p,t_c]),
t_qc = new PolyLine([t_q,t_c]);

wp.append(trg, {
    "stroke": color.blue.w500,
    "stroke-width": 3, 
    "stroke-dasharray": ("10, 10")
});
wp.append(t_trg, {
    "stroke": color.pink.w500,
    "stroke-width": 3, 
    "fill": color.pink.w500 + '40',
});
wp.append([la,lb], {
    "stroke": color.black,
    "stroke-width": 4
});

wp.append([op,oq], {
    "stroke": color.orange.w500,
    "stroke-width": 2, 
    "stroke-dasharray": ("10, 10")
});
wp.append([t_circ,t_pc,t_qc], {
    "stroke": color.orange.w500,
    "stroke-width": 2
});
wp.append([t_p,t_q], {
    "fill": color.orange.w800,
    "r": 5
});

wp.append(e, {"stroke": color.pink.w500});
wp.append([t_a,t_b,t_c], {
    "fill": color.pink.w800,
    "r": 5
});

wp.append([a,b,c], {"fill": color.blue.w800});
wp.append(d, {"fill": color.white});

wp.end();