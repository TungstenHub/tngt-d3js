import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity} from "../basic_objects/quantity.js";
import {Point, DPointOnCircle, FPoint} from "../basic_objects/point.js";
import {PolyLine, Parametric} from "../basic_objects/polyline.js";
import {Circle, CirclePP} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#deltoid_astroid", 300),

c = new Circle(new Point(0,0), 1),
p1 = new DPointOnCircle(1, 0, new Circle(new Point(0,0), 3/4)),

angle = p => Math.atan2(p.y,p.x),
a = new FQuantity(angle, [p1]),

// k is the ratio between outer and inner circles
f = k => t => ({
    x: (1-1/k)*Math.cos(t) + (1/k)*Math.cos((k-1)*t),
    y: (1-1/k)*Math.sin(t) - (1/k)*Math.sin((k-1)*t)
}),

rad = r => t => ({
  x: r*Math.cos(t),
  y: r*Math.sin(t)
}),

rotate = a => (c,p) => {
  const vx = p.x-c.x;
  const vy = p.y-c.y;
  return {
      x: c.x + Math.cos(a)*vx - Math.sin(a)*vy,
      y: c.y + Math.sin(a)*vx + Math.cos(a)*vy
  };
},

q1 = new FPoint(a => f(4)(a.v), [a]),
h1 = new CirclePP(p1,q1),

p2 = new FPoint(a => rad(1/2)(a.v), [a]),
q2 = new FPoint(a => f(2)(a.v), [a]),
q2a = FPoint.reflect_over_point(q2,p2),
q2d = new PolyLine([q2,q2a]),
h2 = new CirclePP(p2,q2),

p3 = new FPoint(a => rad(1/4)(a.v), [a]),
q3 = new FPoint(a => f(4/3)(a.v), [a]),
q3a = new FPoint(rotate(2*Math.PI/3), [p3,q3]),
q3b = new FPoint(rotate(4*Math.PI/3), [p3,q3]),
h3 = new CirclePP(p3,q3),

ast = new Parametric(
  t => () => f(4)(t), [],
  0+0.1, 2*Math.PI+0.1, 100
),

delt = new Parametric(
  t => (a) => {
    const {x,y} = f(3)(t); 
    const xx = Math.cos(-a.v/3)*x - Math.sin(-a.v/3)*y;
    const yy = Math.sin(-a.v/3)*x + Math.cos(-a.v/3)*y;
    return {
      x:(3/4)*xx + (1/4)*Math.cos(a.v),
      y:(3/4)*yy + (1/4)*Math.sin(a.v)
    }
  }, [a],
  0+0.1, 2*Math.PI+0.1, 100
),

rolling_points = (c,p,n) => 
    [...Array(n).keys()].map(i => new FPoint(rotate(2*Math.PI*i/n),[c,p])),

h1_aux = rolling_points(p1,q1,12),
h2_aux = rolling_points(p2,q2,24),
h3_aux = rolling_points(p3,q3,36),
c_aux = rolling_points(new Point(0,0),new Point(1,0),48);

wp.append(c, {"stroke": color.blue.w600, "stroke-width": 4, "fill": color.blue.w200});
wp.append(c_aux, {"fill": color.blue.w600, "r":4});
wp.append(h3, {"stroke": color.green.w600, "stroke-width": 4, "fill": color.green.w200});
wp.append(h3_aux, {"fill": color.green.w600, "r":4});
wp.append(h2, {"stroke": color.amber.w600, "stroke-width": 4, "fill": color.amber.w200});
wp.append(h2_aux, {"fill": color.amber.w600, "r":4});
wp.append(h1, {"stroke": color.orange.w600, "stroke-width": 4, "fill": color.orange.w200});
wp.append(h1_aux, {"fill": color.orange.w600, "r":4});
wp.append(q2d, {"stroke": color.amber.w600, "stroke-width": 9});
wp.append(delt, {"stroke": color.green.w600, "stroke-width": 9, "stroke-linejoin":"round"});
wp.append(ast, {"stroke": color.blue.w600, "stroke-width": 9, "stroke-linejoin":"round"});
wp.append([q3,q3a,q3b], {"fill": color.green.w800});
wp.append([q2,q2a], {"fill": color.amber.w800});
wp.append(q1, {"fill": color.orange.w800});
wp.append(p1, {"fill": color.white});

wp.end();