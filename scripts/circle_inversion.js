import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, Point} from "../basic_objects/point.js";
import {Circle} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#circle_inversion", 150),

a = new DPoint(0,-0.6),

c = new Circle(new Point(0,0),1),
i = FPoint.inverse(a,c);

wp.append(c, {"stroke": color.black});

wp.append(i, {"fill": color.green.w800});
wp.append(a, {"fill": color.blue.w800});

wp.end();