import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {FVector, VectorPP} from "../basic_objects/vector.js";
import {LinePP} from "../basic_objects/line.js";

import {orthocenter_coords} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#droz_farny_line_theorem", 100),

a = new DPoint(0.5,2),
b = new DPoint(-3,-2),
c = new DPoint(3,-2),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

h = new FPoint(orthocenter_coords, [a,b,c]),

d = new DPoint(3,1.1),
e = FPoint.add_vector(h, FVector.perp(new VectorPP(h,d))),

hd = new LinePP(h,d),
he = new LinePP(h,e),

a1 = FPoint.int_ab_cd(h,d,b,c),
b1 = FPoint.int_ab_cd(h,d,c,a),
c1 = FPoint.int_ab_cd(h,d,a,b),

a2 = FPoint.int_ab_cd(h,e,b,c),
b2 = FPoint.int_ab_cd(h,e,c,a),
c2 = FPoint.int_ab_cd(h,e,a,b),

aa = FPoint.midp(a1,a2),
bb = FPoint.midp(b1,b2),
cc = FPoint.midp(c1,c2),

la = new PolyLine([a1,a2]),
lb = new PolyLine([b1,b2]),
lc = new PolyLine([c1,c2]),

lab = new PolyLine([aa,bb]),
lbc = new PolyLine([bb,cc]),
lca = new PolyLine([cc,aa]);

wp.append(inn_t, {"fill": color.blue.w100});

wp.append(t, {"stroke": color.blue.w500});

wp.append([hd,he], {
    "stroke": color.bluegray.w500,
    "stroke-width": 3
});

wp.append([lab,lbc,lca], {"stroke": color.gray.w700});

wp.append(la, {"stroke": color.green.w500, "stroke-width": 7});
wp.append([a1,a2], {"fill": color.green.w800, "r": 5});
wp.append(aa, {"fill": color.green.w800});

wp.append(lb, {"stroke": color.amber.w500, "stroke-width": 7});
wp.append([b1,b2], {"fill": color.amber.w800, "r": 5});
wp.append(bb, {"fill": color.amber.w800});

wp.append(lc, {"stroke": color.pink.w500, "stroke-width": 7});
wp.append([c1,c2], {"fill": color.pink.w800, "r": 5});
wp.append(cc, {"fill": color.pink.w800});

wp.append(h, {"fill": color.deeppurple.w800});

wp.append([a,b,c], {"fill": color.blue.w800});
wp.append(d, {"fill": color.white});

wp.end();