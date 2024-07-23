import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, Point} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {CirclePR, Circle3P} from "../basic_objects/circle.js";
import {FQuantity} from "../basic_objects/quantity.js";

import {incenter_coords, incenter_radius} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#conway_circle", 40),

a = new DPoint(0,2),
b = new DPoint(-2.5,-2),
c = new DPoint(2.5,-1),

cw = (a,b,c) => {
  const 
  d = Point.dist(a,b),
  vx = c.x - b.x,
  vy = c.y - b.y,
  k = d/Math.sqrt(vx*vx + vy*vy);
  return {x: c.x+k*vx, y: c.y+k*vy}
},

p_abc = new FPoint(cw, [a,b,c]),
p_acb = new FPoint(cw, [a,c,b]),
p_bca = new FPoint(cw, [b,c,a]),
p_bac = new FPoint(cw, [b,a,c]),
p_cab = new FPoint(cw, [c,a,b]),
p_cba = new FPoint(cw, [c,b,a]),

d = new Circle3P(p_abc,p_bca,p_cab),

i = new FPoint(incenter_coords, [a,b,c]),
rad = new FQuantity(incenter_radius, [a,b,c]),
ic = new CirclePR(i,rad),

ab = new PolyLine([a,b]),
bc = new PolyLine([b,c]),
ca = new PolyLine([c,a]),

t_abc = new PolyLine([c,p_abc]),
t_acb = new PolyLine([b,p_acb]),
t_bca = new PolyLine([a,p_bca]),
t_bac = new PolyLine([c,p_bac]),
t_cab = new PolyLine([b,p_cab]),
t_cba = new PolyLine([a,p_cba]),

t = new PolyLine([a,b,c,a]);

wp.append(t, {"fill": color.gray.w200});

wp.append([ab], {"stroke": color.amber.w500, "stroke-width": 7});
wp.append([bc], {"stroke": color.blue.w500, "stroke-width": 7});
wp.append([ca], {"stroke": color.pink.w500, "stroke-width": 7});
wp.append([t_abc,t_bac], {"stroke": color.amber.w500, "stroke-width": 4});
wp.append([t_bca,t_cba], {"stroke": color.blue.w500, "stroke-width": 4});
wp.append([t_acb,t_cab], {"stroke": color.pink.w500, "stroke-width": 4});

wp.append(ic, {"stroke": color.gray.w800, "stroke-width": 7});
wp.append(d, {"stroke": color.gray.w800});
wp.append(i, {"fill": color.gray.w800, "r": 4});

wp.append([p_abc,p_acb,p_bca,p_bac,p_cab,p_cba], {"fill": color.gray.w800});
wp.append([a,b,c], {"fill": color.white});

wp.end();