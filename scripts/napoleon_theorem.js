import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint} from "../basic_objects/point.js";
import {PolygonPQ, PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#napoleon_theorem", 100),

a = new DPoint(0.5,1.5),
b = new DPoint(0,-2),
c = new DPoint(-2,0),

p = new PolygonPQ(b,c,3),
q = new PolygonPQ(c,a,3),
r = new PolygonPQ(a,b,3),

cp = p.center(),
cq = q.center(),
cr = r.center(),
t = new PolyLine([cp,cq,cr,cp]);

wp.append(p, {"stroke": color.blue.w500, "fill": color.blue.w200+'88'});
wp.append(q, {"stroke": color.pink.w500, "fill": color.pink.w200+'88'});
wp.append(r, {"stroke": color.orange.w500, "fill": color.orange.w200+'88'});
wp.append(t, {"stroke": color.green.w500, "fill": color.green.w200+'88'});
wp.append([cp,cq,cr], {"fill": color.green.w800});
wp.append([a,b,c], {"fill": "white"});

wp.end();