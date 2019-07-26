import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, DPointOnLine} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {LinePP} from "../basic_objects/line.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#pappus_theorem", 100),

a = new DPoint(-2.7,0.7),
c = new DPoint(3.2,2.4),
d = new DPoint(-1.7,-1.1),
f = new DPoint(2.0,-2.0),

r = new LinePP(a,c),
s = new LinePP(d,f),

b = new DPointOnLine(0,0,r),
e = new DPointOnLine(0,0,s),

ae = new PolyLine([a,e]),
db = new PolyLine([d,b]),
ec = new PolyLine([e,c]),
bf = new PolyLine([b,f]),
cd = new PolyLine([c,d]),
fa = new PolyLine([f,a]),

p1 = FPoint.int_ab_cd(a,e,b,d),
p2 = FPoint.int_ab_cd(a,f,c,d),
p3 = FPoint.int_ab_cd(b,f,c,e),

m_ae = FPoint.midp(a,e),
m_db = FPoint.midp(d,b),
m_cd = FPoint.midp(c,d),
m_fa = FPoint.midp(f,a),
m_ec = FPoint.midp(e,c),
m_bf = FPoint.midp(b,f),

p1_aux1 = new PolyLine([m_ae,p1]),
p1_aux2 = new PolyLine([m_db,p1]),
p2_aux1 = new PolyLine([m_cd,p2]),
p2_aux2 = new PolyLine([m_fa,p2]),
p3_aux1 = new PolyLine([m_ec,p3]),
p3_aux2 = new PolyLine([m_bf,p3]),

q = new LinePP(p1,p3);

wp.append([r,s], {"stroke": color.bluegray.w500});

wp.append([cd,fa], {"stroke": color.green.w500});
wp.append([ae,db], {"stroke": color.pink.w500});
wp.append([ec,bf], {"stroke": color.blue.w500});

wp.append([p2_aux1,p2_aux2], {
    "stroke": color.green.w500, 
    "stroke-width": 4, 
    "stroke-dasharray": ("10, 10") 
});
wp.append([p1_aux1,p1_aux2], {
    "stroke": color.pink.w500, 
    "stroke-width": 4, 
    "stroke-dasharray": ("10, 10") 
});
wp.append([p3_aux1,p3_aux2], {
    "stroke": color.blue.w500, 
    "stroke-width": 4, 
    "stroke-dasharray": ("10, 10") 
});

wp.append(q, {"stroke": color.amber.w500});

wp.append(p1, {"fill": color.pink.w800});
wp.append(p2, {"fill": color.green.w800});
wp.append(p3, {"fill": color.blue.w800});

wp.append([a,b,c,d,e,f], {"fill": color.bluegray.w800});

wp.end();