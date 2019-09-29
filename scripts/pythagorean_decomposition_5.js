import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPointWithFunc, FPoint} from "../basic_objects/point.js";
import {PolyLine, PolygonPQ, translate_polyline} from "../basic_objects/polyline.js";
import {Vector, VectorPP} from "../basic_objects/vector.js";

import {snapToUpperSemicircle} from "../utils/pythagorean_decomposition_utils.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#pythagorean_decomposition_5", 130),

a = new Point(-1,0),
b = new Point(1,0),

c = new DPointWithFunc(1,1.5,snapToUpperSemicircle,[]),

m = new PolygonPQ(b,a,4),
p = new PolygonPQ(a,c,4),
q = new PolygonPQ(c,b,4),

po = p.center(),
qo = q.center(),

m2 = m.nvertex(2),
m3 = m.nvertex(3),

p2 = p.nvertex(2),
p3 = p.nvertex(3),

q2 = q.nvertex(2),
q3 = q.nvertex(3),

r0 = FPoint.int_ab_cd(po, FPoint.add_vector(po, new Vector(1,-1)),a,c, ()=>po),
r1 = FPoint.int_ab_cd(po, FPoint.add_vector(po, new Vector(1, 1)),c,p2, ()=>po),
r2 = FPoint.int_ab_cd(po, FPoint.add_vector(po, new Vector(1,-1)),p2,p3, ()=>po),
r3 = FPoint.int_ab_cd(po, FPoint.add_vector(po, new Vector(1, 1)),p3,a, ()=>po),

s0 = FPoint.int_ab_cd(qo, FPoint.add_vector(qo, new Vector(1, 1)),b,c, ()=>qo),
s1 = FPoint.int_ab_cd(qo, FPoint.add_vector(qo, new Vector(1,-1)),c,q3, ()=>qo),
s2 = FPoint.int_ab_cd(qo, FPoint.add_vector(qo, new Vector(1, 1)),q3,q2, ()=>qo),
s3 = FPoint.int_ab_cd(qo, FPoint.add_vector(qo, new Vector(1,-1)),q2,b, ()=>qo),

l = FPoint.add_vector(a,new VectorPP(r2,r0)),

t0 = new PolyLine([r0,r1,r2,r3,r0]),
tt0 = translate_polyline(t0, new VectorPP(r2,a)),

t1 = new PolyLine([s0,s1,s2,s3,s0]),
tt1 = translate_polyline(t1, new VectorPP(s3,m3)),

h0 = new PolyLine([r0,r1,c,r0]),
hh0 = translate_polyline(h0, new VectorPP(r0,l)),

h1 = new PolyLine([r1,r2,p2,r1]),
hh1 = translate_polyline(h1, new VectorPP(r2,m2)),

h2 = new PolyLine([r2,r3,p3,r2]),
hh2 = translate_polyline(h2, new VectorPP(r2,b)),

h3 = new PolyLine([r3,r0,a,r3]),
hh3 = translate_polyline(h3, new VectorPP(r0,l)),

k0 = new PolyLine([s0,s1,c,s0]),
kk0 = translate_polyline(k0, new VectorPP(s1,l)),

k1 = new PolyLine([s1,s2,q3,s1]),
kk1 = translate_polyline(k1, new VectorPP(s1,l)),

k2 = new PolyLine([s2,s3,q2,s2]),
kk2 = translate_polyline(k2, new VectorPP(s3,m2)),

k3 = new PolyLine([s3,s0,b,s3]),
kk3 = translate_polyline(k3, new VectorPP(s3,b));

const attrs = {"stroke": "black", "stroke-width":3, "stroke-linejoin":"round"};

wp.append([t0,tt0], {"fill": color.pink.w300, ...attrs});
wp.append([t1,tt1], {"fill": color.amber.w300, ...attrs});
wp.append([h0,hh0,h1,hh1,h2,hh2,h3,hh3], {"fill": color.blue.w300, ...attrs});
wp.append([k0,kk0,k1,kk1,k2,kk2,k3,kk3], {"fill": color.green.w300, ...attrs});
wp.append(c, {"fill": "white"});

wp.end();