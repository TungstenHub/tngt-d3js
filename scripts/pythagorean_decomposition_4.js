import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPointWithFunc, FPoint} from "../basic_objects/point.js";
import {PolyLine, PolygonPQ, translate_polyline, rotate_polyline} from "../basic_objects/polyline.js";
import {Vector, VectorPP} from "../basic_objects/vector.js";
import {LinePP} from "../basic_objects/line.js";

import {snapToUpperQuarter} from "../utils/pythagorean_decomposition_utils.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#pythagorean_decomposition_4", 130),

a = new Point(-1,0),
b = new Point(1,0),

c = new DPointWithFunc(1,1.5,snapToUpperQuarter,[]),

m = new PolygonPQ(b,a,4),
p = new PolygonPQ(a,c,4),
q = new PolygonPQ(c,b,4),

m2 = m.nvertex(2),
m3 = m.nvertex(3),

p2 = p.nvertex(2),
p3 = p.nvertex(3),

q2 = q.nvertex(2),
q3 = q.nvertex(3),

h = FPoint.int_ab_cd(c,FPoint.add_vector(c, new Vector(1,0)),a,p3),
k = FPoint.reflect_in_line(h, new LinePP(c,p3)),
l = FPoint.int_ab_cd(h,FPoint.add_vector(h, new VectorPP(a,c)),c,p3),

t0 = new PolyLine([b,c,q3,b]),
tt0 = translate_polyline(t0, new VectorPP(q3,b)),

t1 = new PolyLine([b,q2,q3,b]),
tt1 = translate_polyline(t1, new VectorPP(b,m2)),

t2 = new PolyLine([c,a,h,c]),
tt2 = translate_polyline(t2, new VectorPP(h,a)),

t3 = new PolyLine([c,p2,k,c]),
tt3 = translate_polyline(rotate_polyline(t2,c,Math.PI), new VectorPP(c,m2)),

t4 = new PolyLine([p3,h,l,k,p3]),
tt4 = translate_polyline(t4, new VectorPP(p3,FPoint.reflect_over_point(h,a))),

t5 = new PolyLine([c,h,l,c]),
tt5 = translate_polyline(rotate_polyline(t5,c,-Math.PI/2), new VectorPP(c,m2)),

t6 = new PolyLine([c,k,l,c]),
tt6 = translate_polyline(rotate_polyline(t5,c,Math.PI/2), new VectorPP(c,b));

const attrs = {"stroke": "black", "stroke-width":3, "stroke-linejoin":"round"};

wp.append([t0,tt0], {"fill": color.blue.w300, ...attrs});
wp.append([t1,tt1], {"fill": color.green.w300, ...attrs});
wp.append([t2,tt2], {"fill": color.amber.w300, ...attrs});
wp.append([t3,tt3], {"fill": color.purple.w300, ...attrs});
wp.append([t4,tt4], {"fill": color.gray.w300, ...attrs});
wp.append([t5,tt5], {"fill": color.deeporange.w300, ...attrs});
wp.append([t6,tt6], {"fill": color.pink.w300, ...attrs});
wp.append(c, {"fill": "white"});

wp.end();