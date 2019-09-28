import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPointWithFunc, FPoint} from "../basic_objects/point.js";
import {PolyLine, PolygonPQ} from "../basic_objects/polyline.js";
import { Vector, VectorPP } from "../basic_objects/vector.js";

import {snapToUpperQuarter} from "../utils/pythagorean_decomposition_utils.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#pythagorean_decomposition_1", 130),

a = new Point(-1,0),
b = new Point(1,0),

c = new DPointWithFunc(1,1.5,snapToUpperQuarter,[]),

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

q2 = q.nvertex(2),
q3 = q.nvertex(3),

qm = new VectorPP(qo,mo),

i0 = FPoint.add_vector(c,qm),
i1 = FPoint.add_vector(b,qm),
i2 = FPoint.add_vector(q2,qm),
i3 = FPoint.add_vector(q3,qm),

t0 = FPoint.midp(a,m2),
t1 = FPoint.midp(m2,m3),
t2 = FPoint.midp(m3,b),
t3 = FPoint.midp(b,a),

pol0 = new PolyLine([i0,t0,m2,t1,i0]),
pol1 = new PolyLine([i1,t1,m3,t2,i1]),
pol2 = new PolyLine([i2,t2,b,t3,i2]),
pol3 = new PolyLine([i3,t3,a,t0,i3]),

pol = new PolyLine([i0,i1,i2,i3,i0]),

l0 = FPoint.add_vector(po, new Vector(1,0)),
l1 = FPoint.add_vector(po, new Vector(0,1)),

k0 = FPoint.int_ab_cd(po,l1,a,c),
k1 = FPoint.int_ab_cd(po,l0,c,p2),
k2 = FPoint.int_ab_cd(po,l1,p2,p3),
k3 = FPoint.int_ab_cd(po,l0,p3,a),

quad_0 = new PolyLine([po,k0,c,k1,po]),
quad_1 = new PolyLine([po,k1,p2,k2,po]),
quad_2 = new PolyLine([po,k2,p3,k3,po]),
quad_3 = new PolyLine([po,k3,a,k0,po]);

wp.append([pol,q], {"fill": color.blue.w300, "stroke": 'black', "stroke-width":3});
wp.append([pol0,quad_1], {"fill": color.pink.w300, "stroke": 'black', "stroke-width":3});
wp.append([pol1,quad_2], {"fill": color.green.w300, "stroke": 'black', "stroke-width":3});
wp.append([pol2,quad_3], {"fill": color.purple.w300, "stroke": 'black', "stroke-width":3});
wp.append([pol3,quad_0], {"fill": color.amber.w300, "stroke": 'black', "stroke-width":3});
wp.append(c, {"fill": 'white'});

wp.end();