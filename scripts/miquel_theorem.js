import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPoint, FPoint, DPointOnSegment} from "../basic_objects/point.js";
import {Circle3P} from "../basic_objects/circle.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {from_bar_coords} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#miquel_theorem", 100),

a = new DPoint(0,2),
b = new DPoint(-2.5,-2),
c = new DPoint(2.5,-1),

p = new DPointOnSegment(0,0,b,c),
q = new DPointOnSegment(0,0,c,a),
r = new DPointOnSegment(0,0,a,b),

d = new Circle3P(a,q,r),
e = new Circle3P(b,r,p),
f = new Circle3P(c,p,q),

m = new FPoint(
    (A,B,C,P,Q,R) => {
        const a = Point.dist(B,C);
        const b = Point.dist(C,A);
        const c = Point.dist(A,B);
        const dp = Point.dist(B,P)/a;
        const dq = Point.dist(C,Q)/b;
        const dr = Point.dist(A,R)/c;
        const fa = - a*a*dp*(1-dp) + b*b*dp*dq + c*c*(1-dp)*(1-dr);
        const fb = + a*a*(1-dp)*(1-dq) - b*b*dq*(1-dq) + c*c*dq*dr;
        const fc = + a*a*dp*dr + b*b*(1-dq)*(1-dr) - c*c*dr*(1-dr);
        return from_bar_coords(A,B,C,[a*a*fa, b*b*fb, c*c*fc])
    },
    [a,b,c,p,q,r]
),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]);


wp.append(inn_t, {"fill": color.blue.w500 + '40'});
wp.append(t, {"stroke": color.blue.w500});

wp.append([d,e,f], {"stroke": color.orange.w500});

wp.append([p,q,r], {"fill": color.orange.w800});
wp.append(m, {"fill": color.red.w800});
wp.append([a,b,c], {"fill": color.blue.w800});

wp.end();