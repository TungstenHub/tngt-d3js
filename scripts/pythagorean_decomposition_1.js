import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPointWithFunc, FPoint} from "../basic_objects/point.js";
import {PolyLine, PolygonPQ, translate_polyline} from "../basic_objects/polyline.js";
import {Vector, VectorPP} from "../basic_objects/vector.js";

import {snapToUpperQuarter} from "../utils/pythagorean_decomposition_utils.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#pythagorean_decomposition_1", 130),

a = new Point(-1,0),
b = new Point(1,0),

c = new DPointWithFunc(1,1.5,snapToUpperQuarter),

m = new PolygonPQ(b,a,4),
p = new PolygonPQ(a,c,4),
q = new PolygonPQ(c,b,4),

mo = m.center(),
po = p.center(),
qo = q.center(),

m2 = m.nvertex(2),
m3 = m.nvertex(3),

p2 = p.nvertex(2),
p3 = p.nvertex(3),

l0 = FPoint.add_vector(po, new Vector(1,0)),
l1 = FPoint.add_vector(po, new Vector(0,1)),

k0 = FPoint.int_ab_cd(po,l1,a,c),
k1 = FPoint.int_ab_cd(po,l0,c,p2),
k2 = FPoint.int_ab_cd(po,l1,p2,p3),
k3 = FPoint.int_ab_cd(po,l0,p3,a),

t0 = new PolyLine([po,k0,c,k1,po]),
tt0 = translate_polyline(t0, new VectorPP(po,a)),

t1 = new PolyLine([po,k1,p2,k2,po]),
tt1 = translate_polyline(t1, new VectorPP(po,m2)),

t2 = new PolyLine([po,k2,p3,k3,po]),
tt2 = translate_polyline(t2, new VectorPP(po,m3)),

t3 = new PolyLine([po,k3,a,k0,po]),
tt3 = translate_polyline(t3, new VectorPP(po,b)),

qt = translate_polyline(q, new VectorPP(qo,mo));

const attrs = {"stroke":color.black, "stroke-width":3, "stroke-linejoin":"round"};

wp.append([q,qt], {"fill": color.blue.w300, ...attrs});
wp.append([t0,tt0], {"fill": color.amber.w300, ...attrs});
wp.append([t1,tt1], {"fill": color.pink.w300, ...attrs});
wp.append([t2,tt2], {"fill": color.green.w300, ...attrs});
wp.append([t3,tt3], {"fill": color.purple.w300, ...attrs});
wp.append(c, {"fill": color.white});

wp.end();