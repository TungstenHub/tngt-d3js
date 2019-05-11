import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity} from "../basic_objects/quantity.js";
import {Hyperbola} from "../basic_objects/conic.js";
import {DPoint, Point, DPointOnLine, DPointOnConic, FPoint} from "../basic_objects/point.js";
import {LinePP} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#hyperbola_metric", 100),

x_axis = new LinePP(new Point(-1,0.5),new Point(1,0.5)),
f1 = new DPointOnLine(-2, 0.5, x_axis),
f2 = new DPointOnLine( 2, 0.5, x_axis),
b = new DPoint(f1.x+0.7,0.5),

c = new Hyperbola(f1,f2,b),
d = new DPointOnConic(2,2,c),

l1 = new PolyLine([f1,d]),
l2 = new PolyLine([f2,d]),
d1 = new FQuantity(Point.dist, [f1,d]),
d2 = new FQuantity(Point.dist, [f2,d]),
off = -1,
a1 = new FPoint(
    (d1,d2) => {
        return {x:-(d1.v-d2.v)/2+off, y:-2.5}
    },
    [d1,d2]
),
a2 = new FPoint(
    (d1,d2) => {
        return {x:(d1.v-d2.v)/2+off, y:-2.6}
    },
    [d1,d2]
),
m1 = new FPoint(
    (d1,d2) => {
        return {x:-(d1.v-d2.v)/2+d1.v+off, y:-2.5}
    },
    [d1,d2]
),
m2 = new FPoint(
    (d1,d2) => {
        return {x:(d1.v-d2.v)/2+d2.v+off, y:-2.6}
    },
    [d1,d2]
),
ll1 = new PolyLine([a1,m1]),
ll2 = new PolyLine([a2,m2]);

wp.append(c, {"stroke": color.teal.w500});
wp.append([l1,ll1], {"stroke": color.orange.w500});
wp.append([l2,ll2], {"stroke": color.pink.w500});
wp.append(d, {"fill": color.teal.w800});
wp.append([f1,f2,b], {"fill": color.blue.w800});

wp.end();