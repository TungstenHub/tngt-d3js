import {WorkPlane} from "../utils/init_canvas.js";

import {Parabola} from "../basic_objects/conic.js";
import {Point, DPointOnConic, FPoint} from "../basic_objects/point.js";

import {mdColor as color} from "../utils/material_color.js";
import {Line, LinePP} from "../basic_objects/line.js";
import {Circle3P} from "../basic_objects/circle.js";

const
wp = WorkPlane.with("#lambert_parabola_theorem", 100),

a1 = new Point(-2, -1),
a2 = new Point( 2, -1),
l = new LinePP(a1, a2),
b = new Point(0,1),

c = new Parabola(b, l),

d = new DPointOnConic(2.5,0,c),
e = new DPointOnConic(-2.8,0,c),
f = new DPointOnConic(0.4,0,c),

td = Line.polar_conic(d,c),
te = Line.polar_conic(e,c),
tf = Line.polar_conic(f,c),

p = FPoint.int_lines(te,tf),
q = FPoint.int_lines(tf,td),
r = FPoint.int_lines(td,te),

g = new Circle3P(p,q,r);

wp.append(c, {"stroke": color.blue.w500});
wp.append([td,te,tf], {"stroke": color.green.w500});
wp.append(g, {"stroke": color.amber.w500});
wp.append([p,q,r], {"fill": color.amber.w800});
wp.append([d,e,f], {"fill": color.green.w800});
wp.append(b, {"fill": color.blue.w800});

wp.end();