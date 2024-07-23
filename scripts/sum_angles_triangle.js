import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPoint, DPointOnLine, FPoint} from "../basic_objects/point.js";
import {Line} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {AngleQPR} from "../basic_objects/angle.js";
import {Vector} from "../basic_objects/vector.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#sum_angles_triangle", 400, 0, 0.5),

base = new Line(new Point(0,0), new Vector(1,0)),

a = new DPointOnLine(-1,0,base),
b = new DPointOnLine( 1,0,base),
c = new DPoint(-0.5,1),
reflected = (a,b,c) => ({x:b.x+c.x-a.x, y:b.y+c.y-a.y}),
a2 = new FPoint(reflected, [a,b,c]),
b2 = new FPoint(reflected, [b,a,c]),

alpha = new AngleQPR(b,a,c),
beta  = new AngleQPR(c,b,a),
gamma = new AngleQPR(a,c,b),

alpha2 = new AngleQPR(b2,c,a),
beta2  = new AngleQPR(b,c,a2),

t = new PolyLine([c,a,b,c]),
inn_t = new PolyLine([c,a,b,c]),

up_base = new Line(c, new Vector(1,0));

wp.append(inn_t, {"fill": color.gray.w200});

wp.append([alpha, alpha2], {"fill": color.pink.w500,"in_r": 36,"ex_r": 44});
wp.append([beta, beta2], {"fill": color.orange.w500,"in_r": 36,"ex_r": 44});
wp.append(gamma, {"fill": color.blue.w500,"in_r": 36,"ex_r": 44});

wp.append(up_base, {"stroke": color.gray.w500, "stroke-width": 2, "stroke-dasharray": ("10, 10")});

wp.append(t, {"stroke": color.gray.w800, "stroke-width": 3});

wp.append([a,b,c], {"fill": color.white});

wp.end();