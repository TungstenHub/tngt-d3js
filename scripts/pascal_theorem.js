import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, DPointOnConic, FPoint} from "../basic_objects/point.js";
import {Conic5P} from "../basic_objects/conic.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {LinePP} from "../basic_objects/line.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#pascal_theorem", 80, -1.0, 0.5),

a = new DPoint(-1.7,-1.0),
b = new DPoint(-1.1,0),
c = new DPoint(0,0.5),
d = new DPoint(1.3,0),
e = new DPoint(1.5,-2.1),

q = new Conic5P(a,b,c,d,e),

f = new DPointOnConic(-0.9,-1.7,q),

p1 = FPoint.int_ab_cd(a,b,d,e),
p2 = FPoint.int_ab_cd(b,c,e,f),
p3 = FPoint.int_ab_cd(c,d,f,a),

m_ab = FPoint.midp(a,b),
m_bc = FPoint.midp(b,c),
m_cd = FPoint.midp(c,d),
m_de = FPoint.midp(d,e),
m_ef = FPoint.midp(e,f),
m_fa = FPoint.midp(f,a),

p1_aux1 = new PolyLine([m_ab,p1]),
p1_aux2 = new PolyLine([m_de,p1]),
p2_aux1 = new PolyLine([m_bc,p2]),
p2_aux2 = new PolyLine([m_ef,p2]),
p3_aux1 = new PolyLine([m_cd,p3]),
p3_aux2 = new PolyLine([m_fa,p3]),

l = new LinePP(p1,p3),

t = new PolyLine([a,b,c,d,e,f,a]);

wp.append([
        p1_aux1,
        p1_aux2,
        p2_aux1,
        p2_aux2,
        p3_aux1,
        p3_aux2
    ], 
    {
        "stroke": color.teal.w500, 
        "stroke-width": 4, 
        "stroke-dasharray": ("10, 10") 
    });

wp.append(t, {"stroke": color.teal.w500});
wp.append(q, {"stroke": color.blue.w500});
wp.append(l, {"stroke": color.amber.w500});
wp.append([p1,p2,p3], {"fill": color.pink.w800});
wp.append([a,b,c,d,e], {"fill": color.blue.w800});
wp.append(f, {"fill": color.teal.w800});

wp.end();