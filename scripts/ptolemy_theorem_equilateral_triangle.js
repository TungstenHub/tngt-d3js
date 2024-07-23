import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity} from "../basic_objects/quantity.js";
import {Point, FPoint, DPointOnCircle} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Circle} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#ptolemy_theorem_equilateral_triangle", 225),

offset = 0.3,

d = new Circle({x:-offset, y:0}, 1),

p = new DPointOnCircle(1-offset,0,d),

a = new Point(Math.cos( 3*Math.PI/6)-offset, Math.sin( 3*Math.PI/6)),
b = new Point(Math.cos( 7*Math.PI/6)-offset, Math.sin( 7*Math.PI/6)),
c = new Point(Math.cos(11*Math.PI/6)-offset, Math.sin(11*Math.PI/6)),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

pa = new PolyLine([p,a]),
pb = new PolyLine([p,b]),
pc = new PolyLine([p,c]),

d1 = new FQuantity(Point.dist, [p,a]),
d2 = new FQuantity(Point.dist, [p,b]),
d3 = new FQuantity(Point.dist, [p,c]),

aux_init = (a,b,c) => {
    if (a.v >= Math.sqrt(3)) {
        return {x:1 + offset - 0.1, y: -a.v/2}
    } else if (b.v >= Math.sqrt(3)) {
        return {x:1 + offset, y: b.v/2 - a.v}
    } else {
        return {x:1 + offset, y: -c.v/2}
    }
},

aux_end = (a,b,c) => {
    if (a.v >= Math.sqrt(3)) {
        return {x:1 + offset - 0.1, y: a.v/2}
    } else if (b.v >= Math.sqrt(3)) {
        return {x:1 + offset, y: b.v/2}
    } else {
        return {x:1 + offset, y: -c.v/2 + a.v}
    }
},

lai = new FPoint(aux_init, [d1,d2,d3]),
lbi = new FPoint(aux_init, [d2,d3,d1]),
lci = new FPoint(aux_init, [d3,d1,d2]),

lae = new FPoint(aux_end, [d1,d2,d3]),
lbe = new FPoint(aux_end, [d2,d3,d1]),
lce = new FPoint(aux_end, [d3,d1,d2]),

la = new PolyLine([lai, lae]),
lb = new PolyLine([lbi, lbe]),
lc = new PolyLine([lci, lce]);

wp.append(inn_t, {"fill": color.blue.w500 + '40'});
wp.append(t, {"stroke": color.blue.w500});

wp.append(d, {"stroke": color.green.w500});

wp.append([pa, la], {"stroke": color.orange.w500});
wp.append([pb, lb], {"stroke": color.pink.w500});
wp.append([pc, lc], {"stroke": color.deeppurple.w500});

wp.append([a,b,c], {"fill": color.blue.w800});
wp.append(p, {"fill": color.green.w800});

wp.end();
