import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, DPointOnCircle} from "../basic_objects/point.js";
import {CirclePP} from "../basic_objects/circle.js";
import {SemiLinePP} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";
import {int_pair} from "../utils/circle_utils.js";

const
wp = WorkPlane.with("#constant_chord_theorem", 100),

a = new DPoint(-2, 0),
b = new DPoint( 1, 0),
p = new DPoint(-1.2, 0.7),
q = new FPoint(int_pair, [a,b,p]),

c_a = new CirclePP(a,p),
c_b = new CirclePP(b,p),

i = new DPointOnCircle(-4,1,c_a),

lp = new SemiLinePP(i,p),
lq = new SemiLinePP(i,q),

bp = FPoint.proj_a_bc(b,i,p),
bq = FPoint.proj_a_bc(b,i,q),

rp = FPoint.reflect_over_point(p, bp),
rq = FPoint.reflect_over_point(q, bq),

lp_aux = new PolyLine([i,rp]),
lq_aux = new PolyLine([i,rq]),

s = new PolyLine([rp, rq]);

wp.append([c_a,c_b], {"stroke": color.blue.w500});
wp.append([lp,lq], {"stroke": color.amber.w500, 'stroke-width': 4});
wp.append([lp_aux,lq_aux], {
    "stroke": color.amber.w500, 
    "stroke-width": 3,
    "stroke-dasharray": ("10, 10")
});
wp.append(s, {"stroke": color.pink.w500});
wp.append([rp,rq], {"fill": color.pink.w800});
wp.append(i, {"fill": color.amber.w800});
wp.append([a,b,p,q], {"fill": color.blue.w800});

wp.end();