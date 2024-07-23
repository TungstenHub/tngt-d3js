import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {orthocenter_coords} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";
import { CirclePP, Circle3P } from "../basic_objects/circle.js";
import { LinePP } from "../basic_objects/line.js";

const
wp = WorkPlane.with("#p1_2008", 100),

a = new DPoint(-0.1,2.7),
b = new DPoint(-2.5,-2),
c = new DPoint(2.5,-1),

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

m_a = FPoint.midp(b,c),
m_b = FPoint.midp(c,a),
m_c = FPoint.midp(a,b),

c_a = new CirclePP(m_a, h),
c_b = new CirclePP(m_b, h),
c_c = new CirclePP(m_c, h),

[ia1,ia2] = FPoint.int_line_circle(new LinePP(b,c),c_a),
[ib1,ib2] = FPoint.int_line_circle(new LinePP(c,a),c_b),
[ic1,ic2] = FPoint.int_line_circle(new LinePP(a,b),c_c),

d = new Circle3P(ia1,ib1,ic1);

wp.append(inn_t, {"fill": color.blue.w500 + '40'});

wp.append([a_cev,b_cev,c_cev], {
    "stroke": color.deeppurple.w500,
    "stroke-width": 2.5
});
wp.append([a_cev_aux,b_cev_aux,c_cev_aux], {
    "stroke": color.deeppurple.w500,
    "stroke-width": 2, 
    "stroke-dasharray": ("10, 10")
});

wp.append(t, {"stroke": color.blue.w500});



wp.append([c_a,c_b,c_c], {
    "stroke": color.orange.w500,
    "stroke-width": 3
});
wp.append(d, {"stroke": color.red.w500});
wp.append([ia1,ia2,ib1,ib2,ic1,ic2], {"fill": color.red.w800});
wp.append([m_a,m_b,m_c], {
    "fill": color.orange.w800,
    "r": 5
});

wp.append(h, {
    "fill": color.deeppurple.w800,
    "r": 5
});

wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();