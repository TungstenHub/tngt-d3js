import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, Point, DPointOnLine} from "../basic_objects/point.js";
import {Circle} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";
import { Line } from "../basic_objects/line.js";

const
wp = WorkPlane.with("#circle_polar_recip", 150),

c = new Circle(new Point(0,0),1),

a = new DPoint(0,-0.6),
a_polar = Line.polar(a,c),

b = new DPointOnLine(0.6, -1/0.6, a_polar),
b_polar = Line.polar(b,c);

wp.append(c, {"stroke": color.black});
wp.append(b_polar, {"stroke": color.green.w500});
wp.append(a_polar, {"stroke": color.blue.w500});
wp.append(b, {"fill": color.green.w800});
wp.append(a, {"fill": color.blue.w800});

wp.end();