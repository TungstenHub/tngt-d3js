import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity, Quantity} from "../basic_objects/quantity.js";
import {Point, FPoint, DPointWithFunc} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {RectanglePQQ} from "../basic_objects/rectangle.js";
import {Text} from "../basic_objects/text.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#apollonius_theorem", 150),

offset = 1,

inside_circle = p => {
    const y = p.y - offset;
    const r = Math.sqrt(p.x*p.x + y*y);
    const s = Math.min(r,0.99);
    return {x:s*p.x/r, y:offset+s*y/r}
},

a = new DPointWithFunc( -0.8, 0.5, inside_circle),
b = new DPointWithFunc(  0.8, 0.5, inside_circle),
c = new DPointWithFunc(  0.3, 1.6, inside_circle),

m = FPoint.midp(a,b),

am = new PolyLine([a,m]),
mb = new PolyLine([m,b]),
ac = new PolyLine([a,c]),
bc = new PolyLine([b,c]),
cm = new PolyLine([c,m]),

dist = (a,b) => 0.7*Point.dist(a,b),

d_ac = new FQuantity(dist, [a,c]),
d_bc = new FQuantity(dist, [b,c]),
d_cm = new FQuantity(dist, [c,m]),
d_am = new FQuantity(dist, [a,m]),

sw = 0.3, // sign_width
esw = 0.7, // extended_sign_width

c1 = new FPoint((p,q,r,s) => {return {x:(-q.v-r.v-s.v-3*sw-esw)/2, y: -offset}}, [d_ac,d_bc,d_cm,d_am]),
c2 = new FPoint((p,q,r,s) => {return {x: (p.v-r.v-s.v  -sw-esw)/2, y: -offset}}, [d_ac,d_bc,d_cm,d_am]),
c3 = new FPoint((p,q,r,s) => {return {x: (p.v+q.v-s.v  -sw+esw)/2, y: -offset}}, [d_ac,d_bc,d_cm,d_am]),
c4 = new FPoint((p,q,r,s) => {return {x: (p.v+q.v+r.v  +sw+esw)/2, y: -offset}}, [d_ac,d_bc,d_cm,d_am]),

c_pl1 = new FPoint((p,q,r,s) => {return {x: (p.v-q.v-r.v-s.v-2*sw-esw)/2, y: -offset}}, [d_ac,d_bc,d_cm,d_am]),
c_eq  = new FPoint((p,q,r,s) => {return {x: (p.v+q.v-r.v-s.v  -sw    )/2, y: -offset}}, [d_ac,d_bc,d_cm,d_am]),
c_pl2 = new FPoint((p,q,r,s) => {return {x: (p.v+q.v+r.v-s.v     +esw)/2, y: -offset}}, [d_ac,d_bc,d_cm,d_am]),
c_br  = new FPoint((p,q,r,s) => {return {x: (p.v+q.v+r.v+s.v+2*sw+esw)/2, y: -offset}}, [d_ac,d_bc,d_cm,d_am]),

rect1 = new RectanglePQQ(c1,d_ac,d_ac),
rect2 = new RectanglePQQ(c2,d_bc,d_bc),
rect3 = new RectanglePQQ(c3,d_cm,d_cm),
rect4 = new RectanglePQQ(c4,d_am,d_am),

t_pl1 = new Text(c_pl1, new Quantity('+')),
t_eq = new Text(c_eq, new Quantity('= 2 (')),
t_pl2 = new Text(c_pl2, new Quantity('+')),
t_br = new Text(c_br, new Quantity(')'));

wp.append([t_pl1, t_eq, t_pl2, t_br], {});
wp.append(rect1, {"stroke": color.blue.w500, "fill": color.blue.w200});
wp.append(rect2, {"stroke": color.green.w500, "fill": color.green.w200});
wp.append(rect3, {"stroke": color.amber.w500, "fill": color.amber.w200});
wp.append(rect4, {"stroke": color.orange.w500, "fill": color.orange.w200});
wp.append([ac], {"stroke": color.blue.w500});
wp.append([bc], {"stroke": color.green.w500});
wp.append([cm], {"stroke": color.amber.w500});
wp.append([am], {"stroke": color.orange.w500});
wp.append([mb], {"stroke": color.bluegray.w500});
wp.append(m, {"fill": color.bluegray.w800, "r": 5});
wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();
