import {WorkPlane} from "../utils/init_canvas.js";

import {Ellipse} from "../basic_objects/conic.js";
import {DPoint, Point, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {AngleQPR} from "../basic_objects/angle.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#ellipse_isogonal", 100),

f1 = new Point(-2, 0),
f2 = new Point( 2, 0),
b = new DPoint(f1.x-0.7,0),

c = new Ellipse(f1,f2,b),
d = new DPoint(1,2.5),

[t1,t2] = FPoint.tangency_points_conic(d,c),

cb = (d,f,t) => Point.dist(d,t) < 0.01 ? f : t,

tt1 = new FPoint(cb, [d,f1,t1]),
tt2 = new FPoint(cb, [d,f2,t2]),

alpha1 = new AngleQPR(f1,d,tt1),
alpha2 = new AngleQPR(tt2,d,f2),

lf = new PolyLine([f1,d,f2]),
lt = new PolyLine([t1,d,t2]);

wp.append(c, {"stroke": color.blue.w500});
wp.append([alpha1,alpha2], {"fill": color.orange.w500,"in_r": 0,"ex_r": 50});
wp.append(lt, {"stroke": color.pink.w500});
wp.append(lf, {"stroke": color.amber.w500});
wp.append([f1,f2], {"fill": color.blue.w800});
wp.append([t1,t2], {"fill": color.pink.w800, "r":5});
wp.append(d, {"fill": color.pink.w800});
wp.append(b, {"fill": color.blue.w800});

wp.end();