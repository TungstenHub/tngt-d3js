import {WorkPlane} from "../utils/init_canvas.js";

import {Ellipse} from "../basic_objects/conic.js";
import {Point, DPoint, DPointOnLine, DPointOnConic} from "../basic_objects/point.js";
import {LinePP, Line} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {ArcQPl} from "../basic_objects/arc.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#ellipse_optic", 100),

x_axis = new LinePP(new Point(-1,0),new Point(1,0)),
a1 = new DPointOnLine(-2, 0, x_axis),
a2 = new DPointOnLine( 2, 0, x_axis),
b = new DPoint(a1.x-1,a1.y),

c = new Ellipse(a1,a2,b),

d = new DPointOnConic(a1.x,a1.y+2,c),

t = new PolyLine([a1,d,a2]),

p = Line.polar_conic(d,c),

alpha1 = new ArcQPl(a1,d,p),
alpha2 = new ArcQPl(a2,d,p);

wp.append([alpha1,alpha2], {"fill": color.pink.w800});
wp.append(c, {"stroke": color.teal.w500});
wp.append(t, {"stroke": color.blue.w500});
wp.append([a1,a2], {"fill": color.blue.w800});
wp.append(b, {"fill": color.blue.w800});
wp.append(p, {"stroke": color.cyan.w500});
wp.append(d, {"fill": color.cyan.w800});

wp.end();