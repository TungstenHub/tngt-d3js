import {WorkPlane} from "../utils/init_canvas.js";

import {Quantity, FQuantity, Time} from "../basic_objects/quantity.js";
import {Point, FPoint, DPointWithFunc} from "../basic_objects/point.js";
import {PolyLine, Parametric} from "../basic_objects/polyline.js";
import {Circle, CirclePP} from "../basic_objects/circle.js";
import {FVector} from "../basic_objects/vector.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#hypocycloid_complementary", 300),

c = new Circle(new Point(0,0), 1),
a = new DPointWithFunc(0, 0, 
  p => ({
    x:1.4,
    y:Math.min(1,Math.max(0,Math.round(3*p.y)/3))})),
r = new FQuantity((a) => 1/Math.round(3*a.y+3), [a]),
l = new PolyLine([new Point(1.4,0), new Point(1.4,1)]),
t = new Time(10),
s = new FQuantity(t => t.v/3, [t]),

// k is the ratio between outer and inner circles
f = k => t => ({
    x: (1-1/k)*Math.cos(t) + (1/k)*Math.cos((k-1)*t),
    y: (1-1/k)*Math.sin(t) - (1/k)*Math.sin((k-1)*t)
}),

o = new Point(0, 0),
v = new FVector((r,s) => ({x:r.v*Math.cos(2*Math.PI*(1-r.v)*s.v/100), y: r.v*Math.sin(2*Math.PI*(1-r.v)*s.v/100)}), [r,s]),
w = new FVector((r,s) => ({x:(1-r.v)*Math.cos(2*Math.PI*r.v*s.v/100), y:-(1-r.v)*Math.sin(2*Math.PI*r.v*s.v/100)}), [r,s]),

p = FPoint.add_vector(o, v),
q = FPoint.add_vector(o, w),
h = FPoint.add_vector(p, w),

d = new CirclePP(p, h),
e = new CirclePP(q, h),

hyp = new Parametric(
  t => (r) => f(1/(1-r.v))(t), [r],
  0+0.1, 12*Math.PI+0.1, 200
),

rotate = a => (c,p) => {
  const vx = p.x-c.x;
  const vy = p.y-c.y;
  return {
      x: c.x + Math.cos(a)*vx - Math.sin(a)*vy,
      y: c.y + Math.sin(a)*vx + Math.cos(a)*vy
  };
},

max = 60,
rolling_points = s => (c,p,r) => 
    [...Array(max).keys()].map(i => new FPoint((c,p,r) => rotate(2*Math.PI*i/Math.round(max*((1+s)/2-s*r.v)))(c,p),[c,p,r])),

p_aux = rolling_points(1)(p,h,r),
q_aux = rolling_points(-1)(q,h,r),
c_aux = rolling_points(-1)(new Point(0,0),new Point(1,0),new Quantity(1)),

op = new PolyLine([o,p]),
oq = new PolyLine([o,q]),
ph = new PolyLine([p,h]),
qh = new PolyLine([q,h]);

wp.append(c, {"stroke": color.gray.w800, "stroke-width": 4});
wp.append(c_aux, {"fill": color.gray.w800, "r":4});
wp.append(d, {"stroke": color.cyan.w500, "stroke-width": 4, "fill": color.cyan.w200+'C0'});
wp.append(p_aux, {"fill": color.cyan.w500, "r":4});
wp.append(e, {"stroke": color.lime.w500, "stroke-width": 4, "fill": color.lime.w200+'C0'});
wp.append(q_aux, {"fill": color.lime.w500, "r":4});
wp.append(oq, {"stroke": color.cyan.w500+'C0', "stroke-width": 4});
wp.append(op, {"stroke": color.lime.w500+'C0', "stroke-width": 4});
wp.append(o, {"fill": color.gray.w800, "r":3});
wp.append(p, {"fill": color.cyan.w500, "r":5});
wp.append(q, {"fill": color.lime.w500, "r":5});
wp.append(ph, {"stroke": color.cyan.w500, "stroke-width": 4});
wp.append(qh, {"stroke": color.lime.w500, "stroke-width": 4});
wp.append(hyp, {"stroke": color.gray.w800, "stroke-width": 7, "stroke-linejoin":"round"});
wp.append(h, {"fill": color.gray.w800, "r":7});
wp.append(l, {"stroke": 'black', "stroke-width": 2});
wp.append(a, {"fill": 'white'});

wp.end();