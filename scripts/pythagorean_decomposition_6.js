import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPointWithFunc, FPoint} from "../basic_objects/point.js";
import {PolyLine, PolygonPQ} from "../basic_objects/polyline.js";
import {FQuantity} from "../basic_objects/quantity.js";
import {CirclePR} from "../basic_objects/circle.js";

import {snapToUpperSemicircle} from "../utils/pythagorean_decomposition_utils.js";
import {incenter_coords, incenter_radius} from "../utils/triangle_coordinates.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#pythagorean_decomposition_6", 130),

a = new Point(-1,0),
b = new Point(1,0),

c = new DPointWithFunc(1,1.5,snapToUpperSemicircle,[]),

m = new PolygonPQ(b,a,4),
p = new PolygonPQ(a,c,4),
q = new PolygonPQ(c,b,4),

mo = m.center(),
po = p.center(),
qo = q.center(),

m2 = m.nvertex(2),
m3 = m.nvertex(3),

incenter_tangency = (a,b,c) => {
    const
    da = Point.dist(b,c),
    db = Point.dist(c,a),
    dc = Point.dist(a,b),
    l = (db+dc-da)/2;
    if (dc != 0) {
        const
        vx = (b.x-a.x)*l/dc,
        vy = (b.y-a.y)*l/dc;
        return {x: a.x+vx, y: a.y+vy}
    } else return {x: a.x, y: a.y}
},

x0 = new FPoint(incenter_tangency, [b,c,a]),
y0 = new FPoint(incenter_tangency, [c,a,b]),
z0 = new FPoint(incenter_tangency, [a,b,c]),

y1 = FPoint.rotate(y0,po,Math.PI/2),
y2 = FPoint.rotate(y0,po,Math.PI),
y3 = FPoint.rotate(y0,po,3*Math.PI/2),

x1 = FPoint.rotate(x0,qo,-Math.PI/2),
x2 = FPoint.rotate(x0,qo,-Math.PI),
x3 = FPoint.rotate(x0,qo,-3*Math.PI/2),

z1 = FPoint.rotate(z0,mo,Math.PI/2),
z2 = FPoint.rotate(z0,mo,Math.PI),
z3 = FPoint.rotate(z0,mo,3*Math.PI/2),

l = new FQuantity(Point.dist, [c,x0]),

l0 = new FPoint(
    (z,l) => {return {x:z.x, y:z.y-l.v}},
    [z0,l]
),

l1 = FPoint.rotate(l0,mo,Math.PI/2),
l2 = FPoint.rotate(l0,mo,Math.PI),
l3 = FPoint.rotate(l0,mo,3*Math.PI/2),

i0 = FPoint.int_ab_cd(b,l0,a,l1, ()=>mo),
i1 = FPoint.int_ab_cd(a,l1,m2,l2, ()=>mo),
i2 = FPoint.int_ab_cd(m2,l2,m3,l3, ()=>mo),
i3 = FPoint.int_ab_cd(m3,l3,b,l0, ()=>mo),

p2 = p.nvertex(2),
p3 = p.nvertex(3),

q2 = q.nvertex(2),
q3 = q.nvertex(3),

t0 = new PolyLine([x0,x1,x2,x3,x0]),
tt0 = new PolyLine([i0,i1,i2,i3,i0]),

w0 = new PolyLine([po,y0,y1,po]),
w1 = new PolyLine([po,y1,y2,po]),
w2 = new PolyLine([po,y2,y3,po]),
w3 = new PolyLine([po,y3,y0,po]),

ww0 = new PolyLine([l0,i0,a,l0]),
ww1 = new PolyLine([l1,i1,m2,l1]),
ww2 = new PolyLine([l2,i2,m3,l2]),
ww3 = new PolyLine([l3,i3,b,l3]),

h0 = new PolyLine([y0,y1,c,y0]),
h1 = new PolyLine([y1,y2,p2,y1]),
h2 = new PolyLine([y2,y3,p3,y2]),
h3 = new PolyLine([y3,y0,a,y3]),

hh0 = new PolyLine([a,z0,l0,a]),
hh1 = new PolyLine([m2,z1,l1,m2]),
hh2 = new PolyLine([m3,z2,l2,m3]),
hh3 = new PolyLine([b,z3,l3,b]),

k0 = new PolyLine([x0,x1,c,x0]),
k1 = new PolyLine([x1,x2,q3,x1]),
k2 = new PolyLine([x2,x3,q2,x2]),
k3 = new PolyLine([x3,x0,b,x3]),

kk0 = new PolyLine([b,z0,l0,b]),
kk1 = new PolyLine([a,z1,l1,a]),
kk2 = new PolyLine([m2,z2,l2,m2]),
kk3 = new PolyLine([m3,z3,l3,m3]),

i = new FPoint(incenter_coords, [a,b,c]),
rad = new FQuantity(incenter_radius, [a,b,c]),
ic = new CirclePR(i,rad);

const attrs = {"stroke": "black", "stroke-width":3, "stroke-linejoin":"round"};

wp.append([t0,tt0], {"fill": color.pink.w300, ...attrs});
wp.append([w0,w1,w2,w3,ww0,ww1,ww2,ww3], {"fill": color.amber.w300, ...attrs});
wp.append([h0,hh0,h1,hh1,h2,hh2,h3,hh3], {"fill": color.green.w300, ...attrs});
wp.append([k0,kk0,k1,kk1,k2,kk2,k3,kk3], {"fill": color.blue.w300, ...attrs});
wp.append(ic, {"stroke": "black", "stroke-width":2});
wp.append(c, {"fill": "white"});

wp.end();