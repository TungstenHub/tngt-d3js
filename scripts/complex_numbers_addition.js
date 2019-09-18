import {WorkPlane} from "../utils/init_canvas.js";
import {axes, grid} from "../utils/display_utils.js";

import {Point, DPointSnapGrid} from "../basic_objects/point.js";
import {PComplex} from "../basic_objects/complex.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#complex_numbers_addition", 50),

o = new Point(0,0),

ax = axes(),
gr = grid(12,8),

a = new PComplex(new DPointSnapGrid(1,2)),
b = new PComplex(new DPointSnapGrid(4,1)),
c = a.add(b),

oa = new PolyLine([o,a]),
ob = new PolyLine([o,b]),
oc = new PolyLine([o,c]),
ac = new PolyLine([a,c]),
bc = new PolyLine([b,c]);

wp.append(gr, {"stroke": color.gray.w200, "stroke-width": 2});
wp.append(ax, {"stroke": color.gray.w500, "stroke-width": 3});
wp.append(ac, {"stroke": color.green.w500,
               "stroke-width": 3, 
               "stroke-dasharray": ("10, 10")});
wp.append(bc, {"stroke": color.lime.w500,
               "stroke-width": 3, 
               "stroke-dasharray": ("10, 10")});
wp.append(oa, {"stroke": color.lime.w500});
wp.append(ob, {"stroke": color.green.w500});
wp.append(oc, {"stroke": color.blue.w500});
wp.append(o, {"fill": color.gray.w200, "r":5});
wp.append(a, {"fill": color.lime.w800});
wp.append(b, {"fill": color.green.w800});
wp.append(c, {"fill": color.blue.w800});

wp.end();