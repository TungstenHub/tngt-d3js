import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, Point} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Circle3P, CirclePR} from "../basic_objects/circle.js";
import {FQuantity} from "../basic_objects/quantity.js";

import {
    orthocenter_coords, 
    incenter_coords, 
    incenter_radius, 
    excenter_coords, 
    excenter_radius
} from "../utils/triangle_coordinates.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#feuerbach_circle", 100),

a = new DPoint(0,1.1),
b = new DPoint(-2.5,-2.5),
c = new DPoint(2.8,0.1),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

h = new FPoint(orthocenter_coords, [a,b,c]),
p = FPoint.int_ab_cd(a,h,b,c),
q = FPoint.int_ab_cd(b,h,c,a),
r = FPoint.int_ab_cd(c,h,a,b),

a_cev = new PolyLine([a,p]),
b_cev = new PolyLine([b,q]),
c_cev = new PolyLine([c,r]),

a_cev_aux = new PolyLine([a,h]),
b_cev_aux = new PolyLine([b,h]),
c_cev_aux = new PolyLine([c,h]),

f = new Circle3P(p,q,r),

ma = FPoint.midp(b,c),
mb = FPoint.midp(c,a),
mc = FPoint.midp(a,b),

na = FPoint.midp(a,h),
nb = FPoint.midp(b,h),
nc = FPoint.midp(c,h),

i = new FPoint(incenter_coords, [a,b,c]),
rad = new FQuantity(incenter_radius, [a,b,c]),
ic = new CirclePR(i,rad),

ea = new FPoint(excenter_coords, [a,b,c]),
ear = new FQuantity(excenter_radius, [a,b,c]),
eac = new CirclePR(ea,ear),
[ta1,ta2] = FPoint.tangency_points(a,eac),
ta = new PolyLine([ta1,a,ta2]),

eb = new FPoint(excenter_coords, [b,c,a]),
ebr = new FQuantity(excenter_radius, [b,c,a]),
ebc = new CirclePR(eb,ebr),
[tb1,tb2] = FPoint.tangency_points(b,ebc),
tb = new PolyLine([tb1,b,tb2]),

ec = new FPoint(excenter_coords, [c,a,b]),
ecr = new FQuantity(excenter_radius, [c,a,b]),
ecc = new CirclePR(ec,ecr),
[tc1,tc2] = FPoint.tangency_points(c,ecc),
tc = new PolyLine([tc1,c,tc2]);

wp.append(inn_t, {"fill": color.blue.w100});
wp.append(ic, {"fill": color.amber.w500+'80'});
wp.append([ta,tb,tc], {
    "stroke": color.amber.w500, 
    "stroke-width": 2, 
    "stroke-dasharray": ("10, 10")
});
wp.append([eac,ebc,ecc], {
    "stroke": color.amber.w500, 
    "stroke-width": 2, 
    "fill": color.amber.w500+'60'
});

wp.append([a_cev,b_cev,c_cev], {"stroke": color.deeppurple.w500, "stroke-width": 3});
wp.append([a_cev_aux,b_cev_aux,c_cev_aux], {
    "stroke": color.deeppurple.w500,
    "stroke-width": 2.5, 
    "stroke-dasharray": ("10, 10")
});

wp.append(t, {"stroke": color.blue.w500});

wp.append(h, {"fill": color.deeppurple.w800, "r": 5});

wp.append(f, {"stroke": color.amber.w500, "stroke-width": 8});

wp.append([p,q,r], {"fill": color.purple.w800});
wp.append([ma,mb,mc], {"fill": color.red.w800});
wp.append([na,nb,nc], {"fill": color.orange.w800});

wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();