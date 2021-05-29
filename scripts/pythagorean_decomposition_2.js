import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPointWithFunc, FPoint} from "../basic_objects/point.js";
import {PolyLine, PolygonPQ, translate_polyline} from "../basic_objects/polyline.js";
import {Vector, VectorPP} from "../basic_objects/vector.js";

import {snapToUpperQuarter} from "../utils/pythagorean_decomposition_utils.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#pythagorean_decomposition_2", 130),

a = new Point(-1,0),
b = new Point(1,0),

c = new DPointWithFunc(1,1.5,snapToUpperQuarter),

m = new PolygonPQ(b,a,4),
p = new PolygonPQ(a,c,4),
q = new PolygonPQ(c,b,4),

m2 = m.nvertex(2),
m3 = m.nvertex(3),

p2 = p.nvertex(2),
p3 = p.nvertex(3),

q2 = q.nvertex(2),
q3 = q.nvertex(3),

h = FPoint.int_ab_cd(p3,FPoint.add_vector(p3, new Vector(1,0)),c,p2),
k = FPoint.int_ab_cd(h,FPoint.add_vector(h, new Vector(0,1)),a,c),
l = FPoint.int_ab_cd(b,FPoint.add_vector(b, new Vector(0,1)),q3,c,()=>b),

t0 = new PolyLine([p3,h,k,a,p3]),
tt0 = translate_polyline(t0, new VectorPP(h,b)),

t1 = new PolyLine([h,p2,p3,h]),
tt1 = translate_polyline(t1, new VectorPP(p3,m2)),

t2 = new PolyLine([h,c,k,h]),
tt2 = translate_polyline(t2, new VectorPP(h,a)),

t3 = new PolyLine([c,b,l,c]),
tt3 = translate_polyline(t3, new VectorPP(b,m3)),

t4 = new PolyLine([b,q2,q3,l,b]),
tt4 = translate_polyline(t4, new VectorPP(b,m2));

const attrs = {"stroke": 'black', "stroke-width":3, "stroke-linejoin":"round"};

wp.append([t0,tt0], {"fill": color.pink.w300, ...attrs});
wp.append([t1,tt1], {"fill": color.amber.w300, ...attrs});
wp.append([t2,tt2], {"fill": color.purple.w300, ...attrs});
wp.append([t3,tt3], {"fill": color.blue.w300, ...attrs});
wp.append([t4,tt4], {"fill": color.green.w300, ...attrs});
wp.append(c, {"fill": 'white'});

wp.end();