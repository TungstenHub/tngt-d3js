import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {isotomic_conjugate} from "../utils/triangle_coordinates.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#isotomic_conjugate", 300),

a = new DPoint(Math.cos( 3*Math.PI/6), Math.sin( 3*Math.PI/6)-0.25),
b = new DPoint(Math.cos( 7*Math.PI/6), Math.sin( 7*Math.PI/6)-0.25),
c = new DPoint(Math.cos(11*Math.PI/6), Math.sin(11*Math.PI/6)-0.25),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

d = new DPoint(0.12, -0.1),
e = new FPoint(isotomic_conjugate, [a,b,c,d]),

pd = FPoint.int_ab_cd(a,d,b,c),
qd = FPoint.int_ab_cd(b,d,c,a),
rd = FPoint.int_ab_cd(c,d,a,b),
ad_cev = new PolyLine([a,pd]),
bd_cev = new PolyLine([b,qd]),
cd_cev = new PolyLine([c,rd]),
ad_aux = new PolyLine([a,d]),
bd_aux = new PolyLine([b,d]),
cd_aux = new PolyLine([c,d]),

pe = FPoint.int_ab_cd(a,e,b,c),
qe = FPoint.int_ab_cd(b,e,c,a),
re = FPoint.int_ab_cd(c,e,a,b),
ae_cev = new PolyLine([a,pe]),
be_cev = new PolyLine([b,qe]),
ce_cev = new PolyLine([c,re]),
ae_aux = new PolyLine([a,e]),
be_aux = new PolyLine([b,e]),
ce_aux = new PolyLine([c,e]);


wp.append(inn_t, {"fill": color.blue.w100});

wp.append([ae_aux,be_aux,ce_aux], {
    "stroke": color.yellow.w500, 
    "stroke-width": 3.5, 
    "stroke-dasharray": ("10, 10")
});
wp.append([ad_aux,bd_aux,cd_aux], {
    "stroke": color.bluegray.w500, 
    "stroke-width": 3.5, 
    "stroke-dasharray": ("10, 10")
});
wp.append([ae_cev,be_cev,ce_cev], {
    "stroke": color.yellow.w500, 
    "stroke-width": 3.5
});
wp.append([ad_cev,bd_cev,cd_cev], {
    "stroke": color.bluegray.w500, 
    "stroke-width": 3.5
});

wp.append(t, {"stroke": color.blue.w500});

wp.append(e, {"fill": color.yellow.a700});
wp.append(d, {"fill": color.bluegray.w800});

wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();
