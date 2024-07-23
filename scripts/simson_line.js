import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPointOnCircle, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Circle} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#simson_line", 200),

circ = new Circle(new Point(0,0), 1),

a = new DPointOnCircle(Math.cos(1), Math.sin(1), circ),
b = new DPointOnCircle(Math.cos(-1.8), Math.sin(-1.8), circ),
c = new DPointOnCircle(Math.cos(-3), Math.sin(-3), circ),

d = new DPointOnCircle(Math.cos(2.5), Math.sin(2.5), circ),

p = FPoint.proj_a_bc(d,b,c),
q = FPoint.proj_a_bc(d,c,a),
r = FPoint.proj_a_bc(d,a,b),

pd = new PolyLine([p,d]),
qd = new PolyLine([q,d]),
rd = new PolyLine([r,d]),

pb_aux = new PolyLine([p,b]),
pc_aux = new PolyLine([p,c]),

qc_aux = new PolyLine([q,c]),
qa_aux = new PolyLine([q,a]),

ra_aux = new PolyLine([r,a]),
rb_aux = new PolyLine([r,b]),

s = new PolyLine([p,q,r,p]),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]);

wp.append(inn_t, {"fill": color.blue.w500 + '40'});

wp.append(circ, {"stroke": color.black});

wp.append(t, {"stroke": color.blue.w500});

wp.append([pb_aux,pc_aux,qc_aux,qa_aux,ra_aux,rb_aux], {
    "stroke": color.blue.w500,
    "stroke-width": 4.5, 
    "stroke-dasharray": ("10, 10")
});

wp.append([pd,qd,rd], {"stroke": color.yellow.w500});

wp.append(s, {"stroke": color.orange.w500});

wp.append([p,q,r], {"fill": color.orange.w800});
wp.append([a,b,c], {"fill": color.blue.w800});
wp.append(d, {"fill": color.yellow.w800});

wp.end();
