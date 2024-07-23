import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {centroid_coords} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#centroid", 100),

a = new DPoint(0,2),
b = new DPoint(-2.5,-2),
c = new DPoint(2.5,-1),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

cent = new FPoint(centroid_coords, [a,b,c]),
p = FPoint.int_ab_cd(a,cent,b,c),
q = FPoint.int_ab_cd(b,cent,c,a),
r = FPoint.int_ab_cd(c,cent,a,b),

a_cev = new PolyLine([a,p]),
b_cev = new PolyLine([b,q]),
c_cev = new PolyLine([c,r]);

wp.append(inn_t, {"fill": color.blue.w500 + '40'});

wp.append([a_cev,b_cev,c_cev], {"stroke": color.green.w500});

wp.append(t, {"stroke": color.blue.w500});

wp.append(cent, {"fill": color.green.w800});

wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();