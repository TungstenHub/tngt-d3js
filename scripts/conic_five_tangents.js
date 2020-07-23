import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, int_ab_cd_coords} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {LinePP} from "../basic_objects/line.js";
import {Conic5P} from "../basic_objects/conic.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#conic_five_tangents", 150),

a = new DPoint(-1.2,0.9),
b = new DPoint(0.8,1.4),
c = new DPoint(2,-0.5),
d = new DPoint(0.2,-1.7),
e = new DPoint(-2,-1),

ab = new LinePP(a,b),
bc = new LinePP(b,c),
cd = new LinePP(c,d),
de = new LinePP(d,e),
ea = new LinePP(e,a),

t = new PolyLine([a,b,c,d,e,a]),

tangency_p = (a,b,c,d,e) => {
  const h = int_ab_cd_coords()(b,d,c,e);
  return int_ab_cd_coords()(a,h,c,d);
},

aa = new FPoint(tangency_p, [a,b,c,d,e]),
bb = new FPoint(tangency_p, [b,c,d,e,a]),
cc = new FPoint(tangency_p, [c,d,e,a,b]),
dd = new FPoint(tangency_p, [d,e,a,b,c]),
ee = new FPoint(tangency_p, [e,a,b,c,d]),

q = new Conic5P(aa,bb,cc,dd,ee);

wp.append([ab,bc,cd,de,ea], {"stroke": color.gray.w800, "stroke-width": 2});
wp.append(t, {"stroke": color.blue.w500});
wp.append(q, {"stroke": color.cyan.w500});
wp.append([a,b,c,d,e], {"fill": color.blue.w800});

wp.end();