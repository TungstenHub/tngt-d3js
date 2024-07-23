import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, DPointOnLine} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {LinePP} from "../basic_objects/line.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#desargues_theorem", 100),

a = new DPoint(2.3,1.7),
b = new DPoint(3.3,0.2),
c = new DPoint(1.4,-1.3),

o = new DPoint(-3.2,0),

r = new LinePP(o,a),
s = new LinePP(o,b),
t = new LinePP(o,c),

d = new DPointOnLine(-0.6,0,r),
e = new DPointOnLine(-1.7,0,s),
f = new DPointOnLine(0.2,0,t),

ab = new PolyLine([a,b]),
bc = new PolyLine([b,c]),
ca = new PolyLine([c,a]),
de = new PolyLine([d,e]),
ef = new PolyLine([e,f]),
fd = new PolyLine([f,d]),

p1 = FPoint.int_ab_cd(a,b,d,e),
p2 = FPoint.int_ab_cd(b,c,e,f),
p3 = FPoint.int_ab_cd(c,a,f,d),

m_ab = FPoint.midp(a,b),
m_bc = FPoint.midp(b,c),
m_ca = FPoint.midp(c,a),
m_de = FPoint.midp(d,e),
m_ef = FPoint.midp(e,f),
m_fd = FPoint.midp(f,d),

p1_aux1 = new PolyLine([m_ab,p1]),
p1_aux2 = new PolyLine([m_de,p1]),
p2_aux1 = new PolyLine([m_bc,p2]),
p2_aux2 = new PolyLine([m_ef,p2]),
p3_aux1 = new PolyLine([m_ca,p3]),
p3_aux2 = new PolyLine([m_fd,p3]),

q = new LinePP(p1,p3);

wp.append([r,s,t], {"stroke": color.bluegray.w500});

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

wp.append([ab,de], {"stroke": color.pink.w500});
wp.append([bc,ef], {"stroke": color.green.w500});
wp.append([ca,fd], {"stroke": color.blue.w500});

wp.append(q, {"stroke": color.amber.w500});

wp.append(p1, {"fill": color.pink.w800});
wp.append(p2, {"fill": color.green.w800});
wp.append(p3, {"fill": color.blue.w800});

wp.append(o, {"fill": color.white});
wp.append([a,b,c,d,e,f], {"fill": color.bluegray.w800});

wp.end();