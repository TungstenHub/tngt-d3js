import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {
    centroid_coords, 
    circumcenter_coords, 
    orthocenter_coords, 
    incenter_coords} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#euler_line", 100),

a = new DPoint(0,2),
b = new DPoint(-2.5,-2),
c = new DPoint(2.5,-1),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

cent = new FPoint(centroid_coords, [a,b,c]),
circ = new FPoint(circumcenter_coords, [a,b,c]),
h = new FPoint(orthocenter_coords, [a,b,c]),
i = new FPoint(incenter_coords, [a,b,c]),

el = new PolyLine([h,circ]);

wp.append(inn_t, {"fill": color.blue.w500 + '40'});

wp.append(t, {"stroke": color.blue.w500});

wp.append(el, {"stroke": color.bluegray.w800});

wp.append(cent, {"fill": color.green.w800});
wp.append(circ, {"fill": color.red.w800});
wp.append(h, {"fill": color.deeppurple.w800});
wp.append(i, {"fill": color.amber.w800});

wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();