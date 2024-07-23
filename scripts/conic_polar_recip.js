import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, DPointOnLine} from "../basic_objects/point.js";
import {Line} from "../basic_objects/line.js";
import {Conic5P} from "../basic_objects/conic.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#conic_polar_recip", 150),

k1 = new DPoint(-1,-1),
k2 = new DPoint( 1,-1),
k3 = new DPoint(-1, 1),
k4 = new DPoint( 1, 1),
k5 = new DPoint(-0.5,0),

c = new Conic5P(k1,k2,k3,k4,k5),

a = new DPoint(0,-0.6),
a_polar = Line.polar_conic(a,c),

b = new DPointOnLine(0.6, -1/0.6, a_polar),
b_polar = Line.polar_conic(b,c);

wp.append(c, {"stroke": color.black});
wp.append(b_polar, {"stroke": color.green.w500});
wp.append(a_polar, {"stroke": color.blue.w500});
wp.append([k1,k2,k3,k4,k5], {"fill": color.amber.w300});
wp.append(b, {"fill": color.green.w800});
wp.append(a, {"fill": color.blue.w800});

wp.end();