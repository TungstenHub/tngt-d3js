import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity, Quantity} from "../basic_objects/quantity.js";
import {Point, FPoint, DPointOnCircle} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Circle} from "../basic_objects/circle.js";
import {RectanglePQQ} from "../basic_objects/rectangle.js";
import {Text} from "../basic_objects/text.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#ptolemy_theorem", 150),

offset = 1,

e = new Circle({x:0, y:offset}, 1),

a = new DPointOnCircle(Math.cos( 3*Math.PI/6), Math.sin( 3*Math.PI/6)+offset,e),
b = new DPointOnCircle(Math.cos( 7*Math.PI/6), Math.sin( 7*Math.PI/6)+offset,e),
c = new DPointOnCircle(Math.cos(11*Math.PI/6), Math.sin(11*Math.PI/6)+offset,e),
d = new DPointOnCircle(Math.cos(12*Math.PI/6), Math.sin(12*Math.PI/6)+offset,e),

order = k => (a,b,c,d) => {
    const alpha = Math.atan2(a.y,a.x);
    let beta  = Math.atan2(b.y,b.x);
    let gamma = Math.atan2(c.y,c.x);
    let delta = Math.atan2(d.y,d.x);
    beta  = (alpha > beta ) ? beta  - alpha + 2*Math.PI : beta  - alpha;
    gamma = (alpha > gamma) ? gamma - alpha + 2*Math.PI : gamma - alpha;
    delta = (alpha > delta) ? delta - alpha + 2*Math.PI : delta - alpha;
    const angles = [beta, gamma, delta];
    const points = [b,c,d];
    let indices = [0,1,2];
    indices.sort(function (i, j) { return angles[i] - angles[j]; });
    return points[indices[k]];
},

b_aux = new FPoint(order(0), [a,b,c,d]),
c_aux = new FPoint(order(1), [a,b,c,d]),
d_aux = new FPoint(order(2), [a,b,c,d]),

ab = new PolyLine([a,b_aux]),
ac = new PolyLine([a,c_aux]),
ad = new PolyLine([a,d_aux]),
bc = new PolyLine([b_aux,c_aux]),
bd = new PolyLine([b_aux,d_aux]),
cd = new PolyLine([c_aux,d_aux]),

d_ab = new FQuantity(Point.dist, [a,b_aux]),
d_ac = new FQuantity(Point.dist, [a,c_aux]),
d_ad = new FQuantity(Point.dist, [a,d_aux]),
d_bc = new FQuantity(Point.dist, [b_aux,c_aux]),
d_bd = new FQuantity(Point.dist, [b_aux,d_aux]),
d_cd = new FQuantity(Point.dist, [c_aux,d_aux]),

sw = 0.3, // sign_width

c1 = new FPoint((p,q,r) => {return {x:-(q.v+r.v)/2-sw, y: -offset}}, [d_cd,d_bc,d_bd]),
c2 = new FPoint((p,q,r) => {return {x: (p.v-r.v)/2   , y: -offset}}, [d_cd,d_bc,d_bd]),
c3 = new FPoint((p,q,r) => {return {x: (p.v+q.v)/2+sw, y: -offset}}, [d_cd,d_bc,d_bd]),

c_pl = new FPoint((p,q,r) => {return {x: (p.v-q.v-r.v-sw)/2, y: -offset}}, [d_cd,d_bc,d_bd]),
c_eq = new FPoint((p,q,r) => {return {x: (p.v+q.v-r.v+sw)/2, y: -offset}}, [d_cd,d_bc,d_bd]),

rect1 = new RectanglePQQ(c1,d_cd,d_ab),
rect2 = new RectanglePQQ(c2,d_bc,d_ad),
rect3 = new RectanglePQQ(c3,d_bd,d_ac),

t_pl = new Text(c_pl, new Quantity('+')),
t_eq = new Text(c_eq, new Quantity('='));

wp.append(e, {"stroke": color.green.w500});
wp.append([t_pl, t_eq], {});
wp.append(rect1, {"stroke": color.orange.w500, "fill": color.orange.w200});
wp.append(rect2, {"stroke": color.purple.w500, "fill": color.purple.w200});
wp.append(rect3, {"stroke": color.pink.w500, "fill": color.pink.w200});
wp.append([ab, cd], {"stroke": color.orange.w500});
wp.append([ac, bd], {"stroke": color.pink.w500});
wp.append([ad, bc], {"stroke": color.purple.w500});
wp.append([a,b,c,d], {"fill": color.blue.w800});

wp.end();
