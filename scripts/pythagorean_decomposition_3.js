import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPointWithFunc, FPoint} from "../basic_objects/point.js";
import {PolyLine, PolygonPQ, translate_polyline, rotate_polyline} from "../basic_objects/polyline.js";
import {Vector, VectorPP} from "../basic_objects/vector.js";

import {snapToUpperSemicircle} from "../utils/pythagorean_decomposition_utils.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#pythagorean_decomposition_3", 130),

a = new Point(-1,0),
b = new Point(1,0),

c = new DPointWithFunc(1,1.5,snapToUpperSemicircle,[]),

m = new PolygonPQ(b,a,4),
p = new PolygonPQ(a,c,4),
q = new PolygonPQ(c,b,4),

m2 = m.nvertex(2),
m3 = m.nvertex(3),

p2 = p.nvertex(2),
p3 = p.nvertex(3),

q2 = q.nvertex(2),
q3 = q.nvertex(3),

pi = FPoint.int_ab_cd(c,FPoint.add_vector(c, new Vector(1,0)),a,p2, ()=>c),
pe = FPoint.int_ab_cd(p3,FPoint.add_vector(p3, new Vector(1,0)),a,p2, ()=>p3),
qi = FPoint.int_ab_cd(c,FPoint.add_vector(c, new Vector(1,0)),b,q3, ()=>c),
qe = FPoint.int_ab_cd(q2,FPoint.add_vector(q2, new Vector(1,0)),b,q3, ()=>q2),

t0 = new PolyLine([a,pe,p3,a]),
tt0 = translate_polyline(t0, new VectorPP(p3,a)),

t1 = new PolyLine([c,p2,pi,c]),
tt1 = translate_polyline(t1, new VectorPP(c,m3)),

t2 = new PolyLine([pe,p2,p3,pe]),
tt2 = translate_polyline(rotate_polyline(t2,p3,-Math.PI/2), new VectorPP(p3,a)),

t3 = new PolyLine([pi,a,c,pi]),
tt3 = translate_polyline(rotate_polyline(t3,c,-Math.PI/2), new VectorPP(c,m3)),

t4 = new PolyLine([q3,qe,q2,q3]),
tt4 = translate_polyline(rotate_polyline(t4,q2,Math.PI/2), new VectorPP(q2,b)),

t5 = new PolyLine([c,b,qi,c]),
tt5 = translate_polyline(rotate_polyline(t5,c,Math.PI/2), new VectorPP(c,m2)),

t6 = new PolyLine([c,qi,q3,c]),
tt6 = translate_polyline(t6, new VectorPP(c,m2)),

t7 = new PolyLine([b,qe,q2,b]),
tt7 = translate_polyline(t7, new VectorPP(q2,b));

const attrs = {"stroke": "black", "stroke-width":3, "stroke-linejoin":"round"};

wp.append([t0,tt0], {"fill": color.pink.w300, ...attrs});
wp.append([t1,tt1], {"fill": color.green.w300, ...attrs});
wp.append([t2,tt2], {"fill": color.deeporange.w300, ...attrs});
wp.append([t3,tt3], {"fill": color.blue.w300, ...attrs});
wp.append([t4,tt4], {"fill": color.indigo.w300, ...attrs});
wp.append([t5,tt5], {"fill": color.amber.w300, ...attrs});
wp.append([t6,tt6], {"fill": color.lime.w300, ...attrs});
wp.append([t7,tt7], {"fill": color.purple.w300, ...attrs});
wp.append(c, {"fill": "white"});

wp.end();