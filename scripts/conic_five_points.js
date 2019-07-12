import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint} from "../basic_objects/point.js";
import {Conic5P} from "../basic_objects/conic.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#conic_five_points", 150),

a = new DPoint(-2,1),
b = new DPoint(2,1),
c = new DPoint(-1,-1),
d = new DPoint(1,-1),
e = new DPoint(0,0.5),

q = new Conic5P(a,b,c,d,e);

wp.append(q, {"stroke": color.blue.w500});
wp.append([a,b,c,d,e], {"fill": color.blue.w800});

wp.end();