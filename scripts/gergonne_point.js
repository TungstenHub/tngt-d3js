import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity} from "../basic_objects/quantity.js";
import {DPoint, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {CirclePR} from "../basic_objects/circle.js";

import {incenter_coords, incenter_radius, gergonne_coords} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#gergonne_point", 100),

a = new DPoint(0,2),
b = new DPoint(-2.5,-2),
c = new DPoint(2.5,-1),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

g = new FPoint(gergonne_coords, [a,b,c]),
i = new FPoint(incenter_coords, [a,b,c]),
p = FPoint.int_ab_cd(a,g,b,c),
q = FPoint.int_ab_cd(b,g,c,a),
r = FPoint.int_ab_cd(c,g,a,b),

a_cev = new PolyLine([a,p]),
b_cev = new PolyLine([b,q]),
c_cev = new PolyLine([c,r]),

rad = new FQuantity(incenter_radius, [a,b,c]),
ic = new CirclePR(i,rad);

wp.append(inn_t, {"fill": color.blue.w100});

wp.append([a_cev,b_cev,c_cev], {"stroke": color.teal.w500});

wp.append(t, {"stroke": color.blue.w500});

wp.append(ic, {"stroke": color.amber.w800});
wp.append(g, {"fill": color.teal.w800});

wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();