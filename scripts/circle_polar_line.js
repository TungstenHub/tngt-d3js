import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, Point} from "../basic_objects/point.js";
import {Circle} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";
import { Line } from "../basic_objects/line.js";

const
wp = WorkPlane.with("#circle_polar_line", 150),

a = new DPoint(0,-0.6),

c = new Circle(new Point(0,0),1),

p = Line.polar(a,c);

wp.append(c);
wp.append(p, {"stroke": color.green.w500});
wp.append(a, {"fill": color.blue.w800});

wp.end();