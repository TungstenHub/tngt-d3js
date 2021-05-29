import {WorkPlane} from "../utils/init_canvas.js";

import {Point, FPoint, DPointWithFunc} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#concave_lens", 100),

x_axis = new PolyLine([new Point(-4, 0), new Point(4, 0)]),
y_axis = new PolyLine([new Point(0, -0.8), new Point(0, 0.8)]),
y_cap_1 = new PolyLine([new Point(-0.1, -1), new Point(0, -0.8), new Point(0.1, -1)]),
y_cap_2 = new PolyLine([new Point(-0.1,  1), new Point(0,  0.8), new Point(0.1,  1)]),
foc_1 = new PolyLine([new Point(-1, -0.1), new Point(-1, 0.1)]),
foc_2 = new PolyLine([new Point( 1, -0.1), new Point( 1, 0.1)]),
cen_1 = new PolyLine([new Point(-2, -0.05), new Point(-2, 0.05)]),
cen_2 = new PolyLine([new Point( 2, -0.05), new Point( 2, 0.05)]),

s = new DPointWithFunc(-3, 0.7, ({x,y}) => ({x:Math.min(x,-0.01),y})),
t = new FPoint(s => ({x: s.x/(1-s.x), y: s.y/(1-s.x)}), [s]),

i1 = new FPoint(s => ({x: 0, y: s.y}), [s]),
i2 = new FPoint(s => ({x: 0, y: s.y/(1-s.x)}), [s]),

x_lim = 10,

t0 = new FPoint(s => ({x: x_lim, y: x_lim * s.y/s.x}), [s]),
t1 = new FPoint(s => ({x: x_lim, y: (1+x_lim) * s.y}), [s]),
t2 = new FPoint(t => ({x: x_lim, y: t.y}), [t]),

r0 = new PolyLine([s,t0]),
r1 = new PolyLine([s,i1,t1]),
r2 = new PolyLine([s,i2,t2]),

rr1 = new PolyLine([t,i1]),
rr2 = new PolyLine([t,i2]),
rf = new PolyLine([s,new Point(1, 0)]);

wp.append([
  x_axis, 
  y_axis, 
  y_cap_1, 
  y_cap_2, 
  foc_1, 
  foc_2, 
  cen_1, 
  cen_2
], {"stroke": "black", "stroke-width": 2});

wp.append([rr1,rr2,rf], {"stroke": color.yellow.a400, "stroke-width": 2.5, "stroke-dasharray": ("10, 10")});
wp.append([r0,r1,r2], {"stroke": color.yellow.a400, "stroke-width": 4});

wp.append(s, {"fill": color.yellow.w800});
wp.append(t, {"fill": color.cyan.w800});

wp.end();