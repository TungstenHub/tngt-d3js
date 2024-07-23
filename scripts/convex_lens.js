import {WorkPlane} from "../utils/init_canvas.js";

import {Point, FPoint, DPointWithFunc} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#convex_lens", 100),

x_axis = new PolyLine([new Point(-4, 0), new Point(4, 0)]),
y_axis = new PolyLine([new Point(0, -1), new Point(0, 1)]),
y_cap_1 = new PolyLine([new Point(-0.1, -0.8), new Point(0, -1), new Point(0.1, -0.8)]),
y_cap_2 = new PolyLine([new Point(-0.1,  0.8), new Point(0,  1), new Point(0.1,  0.8)]),
foc_1 = new PolyLine([new Point(-1, -0.1), new Point(-1, 0.1)]),
foc_2 = new PolyLine([new Point( 1, -0.1), new Point( 1, 0.1)]),
cen_1 = new PolyLine([new Point(-2, -0.05), new Point(-2, 0.05)]),
cen_2 = new PolyLine([new Point( 2, -0.05), new Point( 2, 0.05)]),

s = new DPointWithFunc(-3, 0.7, ({x,y}) => ({x:Math.min(x,-0.01),y})),
t = new FPoint(s => ({x: s.x/(s.x+1), y: s.y/(s.x+1)}), [s]),

i1 = new FPoint(s => ({x: 0, y: s.y}), [s]),
i2 = new FPoint(s => ({x: 0, y: s.y/(s.x+1)}), [s]),

x_lim = 10,

t0 = new FPoint(s => s.x <= -1.3 ? t : ({x: x_lim, y: x_lim * s.y/s.x}), [s]),
t1 = new FPoint(s => s.x <= -1.3 ? t : ({x: x_lim, y: (1-x_lim) * s.y}), [s]),
t2 = new FPoint(s => s.x <= -1.3 ? t : ({x: x_lim, y: t.y}), [s]),

r0 = new PolyLine([s,t0]),
r1 = new PolyLine([s,i1,t1]),
r2 = new PolyLine([s,i2,t2]),

rr0 = new PolyLine([s,t]),
rr1 = new PolyLine([i1,t]),
rr2 = new PolyLine([i2,t]),
rf = new PolyLine([new Point(-1, 0),s]);

wp.append([
  x_axis, 
  y_axis, 
  y_cap_1, 
  y_cap_2, 
  foc_1, 
  foc_2, 
  cen_1, 
  cen_2
], {"stroke": color.black, "stroke-width": 2});

wp.append([rr0,rr1,rr2,rf], {"stroke": color.yellow.w600, "stroke-width": 2.5, "stroke-dasharray": ("10, 10")});
wp.append([r0,r1,r2], {"stroke": color.yellow.w600, "stroke-width": 4});

wp.append(s, {"fill": color.yellow.w800});
wp.append(t, {"fill": color.cyan.w800});

wp.end();