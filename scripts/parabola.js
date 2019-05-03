import {WorkPlane} from "../utils/init_canvas.js";

import {Parabola} from "../basic_objects/conic.js";
import {DPoint} from "../basic_objects/point.js";

import {mdColor as color} from "../utils/material_color.js";
import { LinePP } from "../basic_objects/line.js";

const
wp = WorkPlane.with("#parabola", 100),

a1 = new DPoint(-2, -1),
a2 = new DPoint( 2, -1),
l = new LinePP(a1, a2),
b = new DPoint(0,1),

c = new Parabola(b, l);

wp.append(l, {"stroke": color.bluegray.w800});
wp.append(c, {"stroke": color.teal.w500});
wp.append([a1,a2], {"fill": color.blue.w800});
wp.append(b, {"fill": color.amber.w800});

wp.end();