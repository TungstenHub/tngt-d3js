import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, Point} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {AngleQPR} from "../basic_objects/angle.js";

import {from_bar_coords} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#morley_theorem", 100),

morley_vertex = (A,B,C) => {
    const a = Point.dist(B,C);
    const b = Point.dist(C,A);
    const c = Point.dist(A,B);
    const beta = Math.acos((a*a+c*c-b*b)/(2*a*c));
    const gamma = Math.acos((a*a+b*b-c*c)/(2*a*b));
    return from_bar_coords(A,B,C,[a, 2*b*Math.cos(gamma/3), 2*c*Math.cos(beta/3)])
},

a = new DPoint(0,2),
b = new DPoint(-2.5,-2),
c = new DPoint(2.5,-1),

ma = new FPoint(morley_vertex, [a,b,c]),
mb = new FPoint(morley_vertex, [b,c,a]),
mc = new FPoint(morley_vertex, [c,a,b]),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

mbac = new PolyLine([mb,a,mc]),
macb = new PolyLine([ma,c,mb]),
mcba = new PolyLine([mc,b,ma]),

alpha1 = new AngleQPR(b,a,mc),
alpha2 = new AngleQPR(mc,a,mb),
alpha3 = new AngleQPR(mb,a,c),

beta1 = new AngleQPR(c,b,ma),
beta2 = new AngleQPR(ma,b,mc),
beta3 = new AngleQPR(mc,b,a),

gamma1 = new AngleQPR(a,c,mb),
gamma2 = new AngleQPR(mb,c,ma),
gamma3 = new AngleQPR(ma,c,b),

mt = new PolyLine([ma,mb,mc,ma]);

wp.append(inn_t, {"fill": color.blue.w100});

wp.append(alpha1, {"fill": color.green.w800,"in_r": 40,"ex_r": 44});
wp.append(alpha2, {"fill": color.green.w800,"in_r": 45,"ex_r": 49});
wp.append(alpha3, {"fill": color.green.w800,"in_r": 50,"ex_r": 54});

wp.append(beta1, {"fill": color.orange.w800,"in_r": 40,"ex_r": 44});
wp.append(beta2, {"fill": color.orange.w800,"in_r": 45,"ex_r": 49});
wp.append(beta3, {"fill": color.orange.w800,"in_r": 50,"ex_r": 54});

wp.append(gamma1, {"fill": color.pink.w800,"in_r": 40,"ex_r": 44});
wp.append(gamma2, {"fill": color.pink.w800,"in_r": 45,"ex_r": 49});
wp.append(gamma3, {"fill": color.pink.w800,"in_r": 50,"ex_r": 54});

wp.append(mbac, {"stroke": color.green.w500});
wp.append(macb, {"stroke": color.pink.w500});
wp.append(mcba, {"stroke": color.orange.w500});
wp.append(t, {"stroke": color.blue.w500});
wp.append(mt, {"stroke": color.yellow.w500,"fill": color.yellow.w200+'66'});

wp.append([ma,mb,mc], {"fill": color.yellow.w500});
wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();