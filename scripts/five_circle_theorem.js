import {WorkPlane} from "../utils/init_canvas.js";

import {FPoint, Point, DPointOnCircle} from "../basic_objects/point.js";
import {CirclePP, Circle} from "../basic_objects/circle.js";
import {LinePP} from "../basic_objects/line.js";

import {mdColor as color} from "../utils/material_color.js";
import {int_pair} from "../utils/circle_utils.js";

const
wp = WorkPlane.with("#five_circle_theorem", 150),

o = new Circle(new Point(0,0),1),

a = new DPointOnCircle(Math.cos(0.0),Math.sin(0.0), o),
b = new DPointOnCircle(Math.cos(1.2),Math.sin(1.2), o),
c = new DPointOnCircle(Math.cos(2.4),Math.sin(2.4), o),
d = new DPointOnCircle(Math.cos(3.5),Math.sin(3.5), o),
e = new DPointOnCircle(Math.cos(4.9),Math.sin(4.9), o),

fifth_point = (A,B,C,D,E) => {
    const t = Math.atan2(A.y,A.x)
            + Math.atan2(B.y,B.x) 
            + Math.atan2(D.y,D.x) 
            - Math.atan2(C.y,C.x)
            - Math.atan2(E.y,E.x)
            + Math.PI;
    return {x: Math.cos(t), y: Math.sin(t)}
},

pa = new FPoint(fifth_point, [a,b,c,d,e]),
pb = new FPoint(fifth_point, [b,c,d,e,a]),
pc = new FPoint(fifth_point, [c,d,e,a,b]),
pd = new FPoint(fifth_point, [d,e,a,b,c]),
pe = new FPoint(fifth_point, [e,a,b,c,d]),

ca = new CirclePP(a,pa),
cb = new CirclePP(b,pb),
cc = new CirclePP(c,pc),
cd = new CirclePP(d,pd),
ce = new CirclePP(e,pe),

qab = new FPoint(int_pair, [a,b,pa]),
qbc = new FPoint(int_pair, [b,c,pb]),
qcd = new FPoint(int_pair, [c,d,pc]),
qde = new FPoint(int_pair, [d,e,pd]),
qea = new FPoint(int_pair, [e,a,pe]),

la = new LinePP(qea,qab),
lb = new LinePP(qab,qbc),
lc = new LinePP(qbc,qcd),
ld = new LinePP(qcd,qde),
le = new LinePP(qde,qea),

ia = FPoint.int_lines(le,lb),
ib = FPoint.int_lines(la,lc),
ic = FPoint.int_lines(lb,ld),
id = FPoint.int_lines(lc,le),
ie = FPoint.int_lines(ld,la);

wp.append(o, {"stroke": color.blue.w800});
wp.append([ca,cb,cc,cd,ce], {"stroke": color.blue.w500});
wp.append([la,lb,lc,ld,le], {"stroke": color.amber.w500});
wp.append([qab,qbc,qcd,qde,qea], {"fill": color.pink.w800});
wp.append([ia,ib,ic,id,ie], {"fill": color.orange.w800});
wp.append([pa,pb,pc,pd,pe], {"fill": color.purple.w800});
wp.append([a,b,c,d,e], {"fill": color.blue.w800});

wp.end();