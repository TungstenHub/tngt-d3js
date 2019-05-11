import {WorkPlane} from "../utils/init_canvas.js";

import {Ellipse} from "../basic_objects/conic.js";
import {DPoint} from "../basic_objects/point.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#ellipse", 100),

a1 = new DPoint(-2, 0),
a2 = new DPoint( 2, 0),
b = new DPoint(a1.x,a1.y+2),

c = new Ellipse(a1,a2,b);

wp.append(c, {"stroke": color.teal.w500});
wp.append([a1,a2], {"fill": color.blue.w800});
wp.append(b, {"fill": color.amber.w800});

wp.end();