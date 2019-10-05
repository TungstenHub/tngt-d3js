import {WorkPlane} from "../utils/init_canvas.js";

import {LinePP} from "../basic_objects/line.js";
import {DPoint, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {VectorPP} from "../basic_objects/vector.js";
import {Parabola} from "../basic_objects/conic.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#parabola_envelope", 200),

a = new DPoint(-1.5, 1.3),
b = new DPoint(-0.3, -1.3),
c = new DPoint(1.5, 0.5),

ab = new PolyLine([a,b]),
bc = new PolyLine([b,c]),

linear_combination = k => (a,b) => {
    return {x: a.x + k*(b.x-a.x), y: a.y + k*(b.y-a.y)}
};

const n = 32;
const points = [];
const segments = [];

let p, q;
for (let i=1; i < n; i++) {
    p = new FPoint(linear_combination(i/n), [a,b]);
    q = new FPoint(linear_combination(i/n), [b,c]);
    segments.push(new PolyLine([p,q]));
    points.push(p, q);
};

const 
m = FPoint.midp(a,c),
v = new VectorPP(m,b),
aa = FPoint.add_vector(a,v),
cc = FPoint.add_vector(c,v),
l1 = new LinePP(a,b),
l2 = new LinePP(c,b),
af = FPoint.reflect_in_line(aa, l1),
cf = FPoint.reflect_in_line(cc, l2),
f = FPoint.int_ab_cd(a,af,c,cf),
h = FPoint.reflect_in_line(f, l1),
k = FPoint.reflect_in_line(f, l2),
par = new Parabola(f, new LinePP(h,k));

wp.append(par, {"stroke": color.lime.w500});
wp.append(segments, {"stroke": color.cyan.w500, "stroke-width": 1.5});
wp.append([ab,bc], {"stroke": color.blue.w500, "stroke-width": 3});
wp.append(points, {"fill": color.cyan.w800, "r": 3});
wp.append([a,b,c], {"fill": color.blue.w800, "r": 5});

wp.end();
