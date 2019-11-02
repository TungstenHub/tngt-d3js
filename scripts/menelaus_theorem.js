import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPointWithFunc, FPoint, DPointOnCircle} from "../basic_objects/point.js";
import {LinePP} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Circle} from "../basic_objects/circle.js";
import {Quantity, FQuantity} from "../basic_objects/quantity.js";
import {Text} from "../basic_objects/text.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#menelaus_theorem", 250, 0.8),

inside_unit_circle = p => {
    const r = Math.sqrt(p.x*p.x + p.y*p.y);
    const s = Math.min(r,0.7);
    return {x:s*p.x/r, y:s*p.y/r}
},

a = new DPointWithFunc(0,0.56, inside_unit_circle, []),
b = new DPointWithFunc(-2.1,-0.7, inside_unit_circle, []),
c = new DPointWithFunc(1.05,-0.7, inside_unit_circle, []),

inn_t = new PolyLine([a,b,c,a]),

g = new Circle(new Point(0, 0), 1),

d = new DPointOnCircle(-3, 1.2, g),
e = new DPointOnCircle(4, -1.2, g),
l = new LinePP(d,e),

p = FPoint.int_ab_cd(d,e,b,c),
q = FPoint.int_ab_cd(d,e,c,a),
r = FPoint.int_ab_cd(d,e,a,b),

lar = new PolyLine([a,r]),
lrb = new PolyLine([r,b]),
lbp = new PolyLine([b,p]),
lpc = new PolyLine([p,c]),
lcq = new PolyLine([c,q]),
lqa = new PolyLine([q,a]),

lar_aux = new PolyLine([r,a]),
lrb_aux = new PolyLine([r,b]),
lbp_aux = new PolyLine([p,b]),
lpc_aux = new PolyLine([p,c]),
lcq_aux = new PolyLine([q,c]),
lqa_aux = new PolyLine([q,a]),

quot_offset = 0.55,
anchor = new Point(0.9,0),

inc_dist = (A,B,C) => {
    let ab = Point.dist(A,B);
    let bc = Point.dist(B,C);
    let ca = Point.dist(C,A);
    return 5*ab*((bc > ca && bc > ab) ? -1 : 1)
},

tar = new Text(new Point(anchor.x,anchor.y+0.08),new FQuantity(inc_dist, [a,r,b])),
trb = new Text(new Point(anchor.x,anchor.y-0.08),new FQuantity(inc_dist, [b,r,a])),
tbp = new Text(new Point(anchor.x+quot_offset,anchor.y+0.08),new FQuantity(inc_dist, [b,p,c])),
tpc = new Text(new Point(anchor.x+quot_offset,anchor.y-0.08),new FQuantity(inc_dist, [c,p,b])),
tcq = new Text(new Point(anchor.x+2*quot_offset,anchor.y+0.08),new FQuantity(inc_dist, [c,q,a])),
tqa = new Text(new Point(anchor.x+2*quot_offset,anchor.y-0.08),new FQuantity(inc_dist, [a,q,c])),

ql1 = new PolyLine([new Point(anchor.x-0.22,anchor.y+0.013), new Point(anchor.x+0.22,anchor.y+0.013)]),
ql2 = new PolyLine([new Point(anchor.x+quot_offset-0.22,anchor.y+0.013), new Point(anchor.x+quot_offset+0.22,anchor.y+0.013)]),
ql3 = new PolyLine([new Point(anchor.x+2*quot_offset-0.22,anchor.y+0.013), new Point(anchor.x+2*quot_offset+0.22,anchor.y+0.013)]),

prod1 = new Text(new Point(anchor.x+0.5*quot_offset,anchor.y),new Quantity("×")),
prod2 = new Text(new Point(anchor.x+1.5*quot_offset,anchor.y),new Quantity("×")),
t_eq = new Text(new Point(anchor.x+2*quot_offset+0.35,anchor.y),new Quantity("= -1"));


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

wp.append(lar_aux, {"stroke": color.pink.w300, "stroke-dasharray": ("10, 10")});
wp.append(lrb_aux, {"stroke": color.pink.w800, "stroke-dasharray": ("10, 10"), "stroke-dashoffset": 10});
wp.append(lbp_aux, {"stroke": color.green.w300, "stroke-dasharray": ("10, 10")});
wp.append(lpc_aux, {"stroke": color.green.w800, "stroke-dasharray": ("10, 10"), "stroke-dashoffset": 10});
wp.append(lcq_aux, {"stroke": color.amber.w300, "stroke-dasharray": ("10, 10")});
wp.append(lqa_aux, {"stroke": color.amber.w800, "stroke-dasharray": ("10, 10"), "stroke-dashoffset": 10});

wp.append(l, {
    "stroke": color.bluegray.w500,
    "stroke-width": 3
});
wp.append([p,q,r], {
    "fill": color.bluegray.w800,
    "r":5
});
wp.append([d,e], {"fill": color.yellow.w200});
wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();