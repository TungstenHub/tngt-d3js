import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {PolygonPQ, PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#thebault_1_problem", 100),

a = new DPoint( 0.75, 1.5),
b = new DPoint( 0.3,-0.75),
c = new DPoint(-0.75,-1.5),

d = new FPoint(
  (a,b,c) => {
    return {x: a.x + c.x - b.x, y: a.y + c.y - b.y}
  },
  [a,b,c]
),

p = new PolygonPQ(a,b,4),
q = new PolygonPQ(b,c,4),
r = new PolygonPQ(c,d,4),
s = new PolygonPQ(d,a,4),

cp = p.center(),
cq = q.center(),
cr = r.center(),
cs = s.center(),
t = new PolyLine([cp,cq,cr,cs,cp]);

wp.append(p, {"stroke": color.blue.w500, "fill": color.blue.w200+'88'});
wp.append(q, {"stroke": color.pink.w500, "fill": color.pink.w200+'88'});
wp.append(r, {"stroke": color.orange.w500, "fill": color.orange.w200+'88'});
wp.append(s, {"stroke": color.green.w500, "fill": color.green.w200+'88'});
wp.append(t, {"stroke": color.bluegray.w500, "fill": color.bluegray.w200+'88'});
wp.append([cp,cq,cr,cs], {"fill": color.bluegray.w800});
wp.append(d, {"fill": color.bluegray.w200});
wp.append([a,b,c], {"fill": color.white});

wp.end();