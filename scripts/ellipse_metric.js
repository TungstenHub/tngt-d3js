import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity} from "../basic_objects/quantity.js";
import {Ellipse} from "../basic_objects/conic.js";
import {DPoint, Point, DPointOnLine, DPointOnConic, FPoint} from "../basic_objects/point.js";
import {LinePP} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#ellipse_metric", 100),

x_axis = new LinePP(new Point(-1,0.5),new Point(1,0.5)),
f1 = new DPointOnLine(-2, 0.5, x_axis),
f2 = new DPointOnLine( 2, 0.5, x_axis),
b = new DPoint(f1.x-0.7,0.5),

c = new Ellipse(f1,f2,b),
d = new DPointOnConic(2,2,c),

l1 = new PolyLine([f1,d]),
l2 = new PolyLine([f2,d]),
d1 = new FQuantity(Point.dist, [f1,d]),
d2 = new FQuantity(Point.dist, [f2,d]),
a1 = new FPoint(
    (d1,d2) => {
        return {x:-(d1.v+d2.v)/2, y:-2.5}
    },
    [d1,d2]
),
a2 = new FPoint(
    (d1,d2) => {
        return {x:(d1.v+d2.v)/2, y:-2.5}
    },
    [d1,d2]
),
m = new FPoint(
    (d1,d2) => {
        return {x:(d1.v-d2.v)/2, y:-2.5}
    },
    [d1,d2]
),
ll1 = new PolyLine([a1,m]),
ll2 = new PolyLine([a2,m]);

wp.append(c, {"stroke": color.teal.w500});
wp.append([l1,ll1], {"stroke": color.orange.w500});
wp.append([l2,ll2], {"stroke": color.pink.w500});
wp.append(d, {"fill": color.teal.w800});
wp.append([f1,f2,b], {"fill": color.blue.w800});

wp.end();