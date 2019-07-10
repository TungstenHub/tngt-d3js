import {WorkPlane} from "../utils/init_canvas.js";

import {Conic} from "../basic_objects/conic.js";
import {DPointOnConic, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {orthocenter_coords} from "../utils/triangle_coordinates.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#orthocenter_triangle_equilateral_hyperbola", 150),

d = new Conic({a: 1, b: 0, c: -1, d: 0, e: 0, f: -1}),

a = new DPointOnConic(1,0.8,d),
b = new DPointOnConic(1,-1.2,d),
c = new DPointOnConic(-1,-0.4,d),

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
c_cev_aux = new PolyLine([c,h]);

wp.append(inn_t, {"fill": color.blue.w100,"stroke": 'none'});
wp.append(d, {"stroke": color.green.w500});
wp.append([a_cev,b_cev,c_cev], {"stroke": color.lightblue.w500,"stroke-width": 3});
wp.append([a_cev_aux,b_cev_aux,c_cev_aux], {
    "stroke": color.lightblue.w500,
    "stroke-width": 2.5, 
    "stroke-dasharray": ("10, 10")
});
wp.append(t, {"stroke": color.blue.w500,"stroke-width": 4});
wp.append(h, {"fill": color.lightblue.w800});
wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();