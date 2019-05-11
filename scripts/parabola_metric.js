import {WorkPlane} from "../utils/init_canvas.js";

import {Parabola} from "../basic_objects/conic.js";
import {DPoint, Point, DPointOnConic, FPoint} from "../basic_objects/point.js";
import {LinePP} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#parabola_metric", 100),

x_axis = new LinePP(new Point(-1,-1),new Point(1,-1)),
b = new DPoint(0,1),

c = new Parabola(b, x_axis),
d = new DPointOnConic(2,2,c),

p = FPoint.proj_in_line(d,x_axis),

l1 = new PolyLine([b,d]),
l2 = new PolyLine([d,p]);

wp.append(x_axis, {"stroke": color.bluegray.w800});
wp.append(c, {"stroke": color.teal.w500});
wp.append(l1, {"stroke": color.orange.w500});
wp.append(l2, {"stroke": color.pink.w500});
wp.append(d, {"fill": color.teal.w800});
wp.append(b, {"fill": color.blue.w800});

wp.end();