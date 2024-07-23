import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity} from "../basic_objects/quantity.js";
import {DPoint, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {CirclePR} from "../basic_objects/circle.js";

import {circumcenter_coords, circumcenter_radius} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#circumcenter", 100),

a = new DPoint(0,2),
b = new DPoint(-2.5,-2),
c = new DPoint(2.5,-1),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

circ = new FPoint(circumcenter_coords, [a,b,c]),

a_perp = new PolyLine([FPoint.midp(b,c),circ]),
b_perp = new PolyLine([FPoint.midp(c,a),circ]),
c_perp = new PolyLine([FPoint.midp(a,b),circ]),

rad = new FQuantity(circumcenter_radius, [a,b,c]),
circc = new CirclePR(circ,rad);

wp.append(inn_t, {"fill": color.blue.w500 + '40'});

wp.append([a_perp,b_perp,c_perp], {"stroke": color.red.w500});

wp.append(t, {"stroke": color.blue.w500});

wp.append(circc, {"stroke": color.red.w800});
wp.append(circ, {"fill": color.red.w800});

wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();