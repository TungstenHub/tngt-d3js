import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, DPointOnSegment, Point} from "../basic_objects/point.js";
import {LinePP} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {FQuantity} from "../basic_objects/quantity.js";

import {orthocenter_coords} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#fagnano_altitude_problem", 100, 0, -0.7),

a = new DPoint(0,2),
b = new DPoint(-2.5,-2),
c = new DPoint(2.5,-1),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

x = new DPointOnSegment(-0.9,0,b,c),
y = new DPointOnSegment(0,-1.9,c,a),
z = new DPointOnSegment(0,-0.6,a,b),

ax = new PolyLine([a,x]),

w = new PolyLine([x,y,z,x]),

xb = FPoint.reflect_in_line(x, new LinePP(a,b)),
xc = FPoint.reflect_in_line(x, new LinePP(a,c)),

xb_z_y_xc = new PolyLine([xb,z,y,xc]),

xbxc = new PolyLine([xb,xc]),
xbaxc = new PolyLine([xb,a,xc]),

h = new FPoint(orthocenter_coords, [a,b,c]),
p = FPoint.int_ab_cd(a,h,b,c),
q = FPoint.int_ab_cd(b,h,c,a),
r = FPoint.int_ab_cd(c,h,a,b),

pb = FPoint.reflect_in_line(p, new LinePP(a,b)),
pc = FPoint.reflect_in_line(p, new LinePP(a,c)),

pbpc = new PolyLine([pb,pc]),
pbapc = new PolyLine([pb,a,pc]),

ped = new PolyLine([p,q,r,p]),

a_cev = new PolyLine([a,p]),
b_cev = new PolyLine([b,q]),
c_cev = new PolyLine([c,r]),

sd = (a,b) => Point.dist(a,b)/2,
sp = (a,b,c) => (Point.dist(a,b)+Point.dist(b,c)+Point.dist(c,a))/2,
d0 = new FQuantity(sp, [x,y,z]),
d1 = new FQuantity((xb,z,y,xc) => (Point.dist(xb,z)+Point.dist(z,y)+Point.dist(y,xc))/2, [xb,z,y,xc]),
d2 = new FQuantity(sd, [xb,xc]),
d3 = new FQuantity(sd, [pb,pc]),
d4 = new FQuantity(sp, [p,q,r]),

off = -2.7,
sep = -0.2,

l = (d,n) => new PolyLine([
    new FPoint(d=>({x:-d.v,y:off+n*sep}),[d]),
    new FPoint(d=>({x: d.v,y:off+n*sep}),[d])
]),

l0 = l(d0,0),
l1 = l(d1,1),
l2 = l(d2,2),
l3 = l(d3,3),
l4 = l(d4,4);

wp.append(inn_t, {"fill": color.blue.w100});

wp.append([a_cev,b_cev,c_cev], {"stroke": color.deeppurple.w500, "stroke-width": 2});
wp.append(ax, {"stroke": color.teal.w500, "stroke-dasharray": ("4, 4"), "stroke-width": 2});

wp.append(t, {"stroke": color.blue.w500});
wp.append(ped, {"stroke": color.purple.w800, "stroke-linejoin":"round"});
wp.append(w, {"stroke": color.teal.w500, "stroke-linejoin":"round"});
wp.append(pbapc, {"stroke": color.pink.w800, "stroke-dasharray": ("4, 4"), "stroke-width": 2});
wp.append(pbpc, {"stroke": color.pink.w800, "stroke-dasharray": ("10, 10"), "stroke-width": 3.5});
wp.append(xb_z_y_xc, {"stroke": color.yellow.a700, "stroke-dasharray": ("10, 10"), "stroke-width": 3.5});
wp.append(xbaxc, {"stroke": color.orange.w800, "stroke-dasharray": ("4, 4"), "stroke-width": 2});
wp.append(xbxc, {"stroke": color.orange.w800, "stroke-dasharray": ("10, 10"), "stroke-width": 3.5});

wp.append(l0, {"stroke": color.teal.w500});
wp.append(l1, {"stroke": color.yellow.a700});
wp.append(l2, {"stroke": color.orange.w800});
wp.append(l3, {"stroke": color.pink.w800});
wp.append(l4, {"stroke": color.purple.w800});

wp.append([pb,pc,p,q,r], {"fill": color.purple.w800, "r":4});
wp.append([xb,xc], {"fill": color.teal.w800, "r":4});
wp.append([x,y,z], {"fill": color.teal.w800});
wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();