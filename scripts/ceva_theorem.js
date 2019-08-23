import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPointWithFunc, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Quantity, FQuantity} from "../basic_objects/quantity.js";
import {Text} from "../basic_objects/text.js";

import {inside_triangle} from "../utils/triangle_utils.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#ceva_theorem", 250, 0.8),

inside_unit_circle = p => {
    const r = Math.sqrt(p.x*p.x + p.y*p.y);
    const s = Math.min(r,0.99);
    return {x:s*p.x/r, y:s*p.y/r}
},

a = new DPointWithFunc(0,0.8, inside_unit_circle, []),
b = new DPointWithFunc(-3,-1, inside_unit_circle, []),
c = new DPointWithFunc(1.5,-1, inside_unit_circle, []),

inn_t = new PolyLine([a,b,c,a]),

adjusted_vertex = (a,b,c) => {
    return {
        x: 0.998*a.x + 0.001*b.x + 0.001*c.x,
        y: 0.998*a.y + 0.001*b.y + 0.001*c.y
    }
},

aa = new FPoint(adjusted_vertex, [a,b,c]),
bb = new FPoint(adjusted_vertex, [b,c,a]),
cc = new FPoint(adjusted_vertex, [c,a,b]),

d = new DPointWithFunc(0.12, -0.1, inside_triangle, [aa,bb,cc]),

p = FPoint.int_ab_cd(a,d,b,c),
q = FPoint.int_ab_cd(b,d,c,a),
r = FPoint.int_ab_cd(c,d,a,b),

la = new PolyLine([a,p]),
lb = new PolyLine([b,q]),
lc = new PolyLine([c,r]),

lar = new PolyLine([a,r]),
lrb = new PolyLine([r,b]),
lbp = new PolyLine([b,p]),
lpc = new PolyLine([p,c]),
lcq = new PolyLine([c,q]),
lqa = new PolyLine([q,a]),

quot_offset = 0.45,
anchor = new Point(1.2,0),

inc_dist = (A,B) => 5*Point.dist(A,B),

tar = new Text(new Point(anchor.x,anchor.y+0.08),new FQuantity(inc_dist, [a,r])),
trb = new Text(new Point(anchor.x,anchor.y-0.08),new FQuantity(inc_dist, [r,b])),
tbp = new Text(new Point(anchor.x+quot_offset,anchor.y+0.08),new FQuantity(inc_dist, [b,p])),
tpc = new Text(new Point(anchor.x+quot_offset,anchor.y-0.08),new FQuantity(inc_dist, [p,c])),
tcq = new Text(new Point(anchor.x+2*quot_offset,anchor.y+0.08),new FQuantity(inc_dist, [c,q])),
tqa = new Text(new Point(anchor.x+2*quot_offset,anchor.y-0.08),new FQuantity(inc_dist, [q,a])),

ql1 = new PolyLine([new Point(anchor.x-0.17,anchor.y+0.013), new Point(anchor.x+0.17,anchor.y+0.013)]),
ql2 = new PolyLine([new Point(anchor.x+quot_offset-0.17,anchor.y+0.013), new Point(anchor.x+quot_offset+0.17,anchor.y+0.013)]),
ql3 = new PolyLine([new Point(anchor.x+2*quot_offset-0.17,anchor.y+0.013), new Point(anchor.x+2*quot_offset+0.17,anchor.y+0.013)]),

prod1 = new Text(new Point(anchor.x+0.5*quot_offset,anchor.y),new Quantity("×")),
prod2 = new Text(new Point(anchor.x+1.5*quot_offset,anchor.y),new Quantity("×")),
t_eq = new Text(new Point(anchor.x+2*quot_offset+0.35,anchor.y),new Quantity("= 1"));


wp.append(inn_t, {"fill": color.blue.w100});

wp.append([ql1,ql2,ql3], {"stroke-width": 2, "stroke": color.bluegray.w800});
wp.append(tar, {"fill": color.pink.w300});
wp.append(trb, {"fill": color.pink.w800});
wp.append(tbp, {"fill": color.green.w300});
wp.append(tpc, {"fill": color.green.w800});
wp.append(tcq, {"fill": color.amber.w300});
wp.append(tqa, {"fill": color.amber.w800});
wp.append([t_eq,prod1,prod2], {"fill": color.bluegray.w800});

wp.append(lar, {"stroke": color.pink.w300});
wp.append(lrb, {"stroke": color.pink.w800});
wp.append(lbp, {"stroke": color.green.w300});
wp.append(lpc, {"stroke": color.green.w800});
wp.append(lcq, {"stroke": color.amber.w300});
wp.append(lqa, {"stroke": color.amber.w800});

wp.append([la,lb,lc], {
    "stroke": color.bluegray.w500,
    "stroke-width": 3
});
wp.append([p,q,r], {
    "fill": color.bluegray.w800,
    "r":5
});
wp.append(d, {"fill": color.bluegray.w800});
wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();