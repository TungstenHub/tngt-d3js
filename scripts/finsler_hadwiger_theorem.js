import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {PolygonPQ, PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#finsler_hadwiger_theorem", 100),

a = new DPoint(0,0),
b = new DPoint(2,-2),
c = new DPoint(-2,1),

p = new PolygonPQ(a,b,4),
q = new PolygonPQ(a,c,4),

p_aux = p.nvertex(3),
q_aux = q.nvertex(3),

cp = p.center(),
cq = q.center(),

tb = new PolyLine([b,q_aux]),
tc = new PolyLine([c,p_aux]),

mb = FPoint.midp(b,q_aux),
mc = FPoint.midp(c,p_aux),

t = new PolyLine([cp,mb,cq,mc,cp]);

wp.append(p, {"stroke": color.blue.w500, "fill": color.blue.w200+'88'});
wp.append(q, {"stroke": color.pink.w500, "fill": color.pink.w200+'88'});
wp.append([tb,tc], {"stroke": "black", "stroke-width": 3});
wp.append(t, {"stroke": color.amber.w500, "fill": color.amber.w200+'88'});
wp.append(p_aux, {"fill": color.blue.w800});
wp.append(q_aux, {"fill": color.pink.w800});
wp.append([mb,mc,cp,cq], {"fill": color.amber.w800});
wp.append([a,b,c], {"fill": "white"});

wp.end();