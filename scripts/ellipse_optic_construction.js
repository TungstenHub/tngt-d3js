import {WorkPlane} from "../utils/init_canvas.js";

import {Ellipse} from "../basic_objects/conic.js";
import {Point, DPointOnSegment, DPointOnConic, FPoint} from "../basic_objects/point.js";
import {Line} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {AngleQPl} from "../basic_objects/angle.js";
import {Circle} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#ellipse_optic_construction", 300),

a1 = new Point(0, 0),
a2 = new DPointOnSegment(-0.5, 0, new Point(-0.999,0),new Point(0.999,0)),
b = new FPoint(a => {return {x:(a.x-1)/2,y:0}}, [a2]),
c = new Ellipse(a1,a2,b),
d = new DPointOnConic(0,0.5,c),

e = new Circle(a1,1),

p = Line.polar_conic(d,c),
dd = FPoint.reflect_in_line(a2,p),

t1 = new PolyLine([a1,d]),
t2 = new PolyLine([d,a2]),
t3 = new PolyLine([d,dd]),

alpha1 = new AngleQPl(a1,d,p),
alpha2 = new AngleQPl(a2,d,p);

wp.append(c, {"stroke": color.teal.w500});
wp.append(e, {"stroke": 'black', "stroke-width": 3});
wp.append([alpha1,alpha2], {
    "fill": color.lightblue.w900,
    "in_r": 0,
    "ex_r": 25
});
wp.append(t1, {"stroke": color.pink.w500});
wp.append(t2, {"stroke": color.orange.w500});
wp.append(t3, {"stroke": color.orange.w500,"stroke-dasharray": ("10, 10")});
wp.append([a1,a2], {"fill": color.blue.w800});
wp.append(p, {"stroke": color.cyan.w500});
wp.append(dd, {"fill": color.cyan.w800});
wp.append(d, {"fill": color.cyan.w800});

wp.end();