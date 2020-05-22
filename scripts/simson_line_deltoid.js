import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity} from "../basic_objects/quantity.js";
import {Point, DPointOnCircle, FPoint} from "../basic_objects/point.js";
import {PolyLine, Parametric} from "../basic_objects/polyline.js";
import {Circle, CirclePR} from "../basic_objects/circle.js";
import {FVector} from "../basic_objects/vector.js";
import {LinePP} from "../basic_objects/line.js";
import {circumcenter_coords, orthocenter_coords, circumcenter_radius} from "../utils/triangle_coordinates.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#simson_line_deltoid", 200),

circ = new Circle(new Point(0,0), 1),

a = new DPointOnCircle(Math.cos(0.9), Math.sin(0.9), circ),
b = new DPointOnCircle(Math.cos(2.5), Math.sin(2.5), circ),
c = new DPointOnCircle(Math.cos(4.5), Math.sin(4.5), circ),

d = new DPointOnCircle(Math.cos(0-.1), Math.sin(0-.1), circ),

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
sl = new LinePP(p,q),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

fc = new FPoint((a,b,c) => {
    const {x:x1,y:y1} = circumcenter_coords(a,b,c);
    const {x:x2,y:y2} = orthocenter_coords(a,b,c);
    return {x:(x1+x2)/2, y:(y1+y2)/2}
}, [a,b,c]),
f = new FQuantity((a,b,c) => {
    return circumcenter_radius(a,b,c)/2;
}, [a,b,c]),
fcirc = new CirclePR(fc, f),

angle = p => Math.atan2(p.y,p.x),

phi = new FQuantity(angle, [d]),
psi = new FQuantity((a,b,c) => angle(a)+angle(b)+angle(c), [a,b,c]),

v = new FVector((f,phi) => ({x:2*f.v*Math.cos(phi.v), y:2*f.v*Math.sin(phi.v)}), [f,phi]),
w = new FVector((f,phi,psi) => ({x:f.v*Math.cos(-2*phi.v+psi.v), y:f.v*Math.sin(-2*phi.v+psi.v)}), [f,phi,psi]),

rc = FPoint.add_vector(fc, v),
delt = FPoint.add_vector(rc, w),

f_delt = t => (a,b,c) => {
    const {x:x1,y:y1} = circumcenter_coords(a,b,c);
    const {x:x2,y:y2} = orthocenter_coords(a,b,c);
    const f = circumcenter_radius(a,b,c)/2;
    const psi = angle(a)+angle(b)+angle(c);
    return {
        x: (x1+x2)/2 + 2*f*Math.cos(t) + f*Math.cos(-2*t+psi),
        y: (y1+y2)/2 + 2*f*Math.sin(t) + f*Math.sin(-2*t+psi)
    }
},

deltoid = new Parametric(
    f_delt, [a,b,c],
    0, 2*Math.PI, 100
);

wp.append(inn_t, {"fill": color.blue.w100});

wp.append(circ, {"stroke": "black", "stroke-width": 3});

wp.append(t, {"stroke": color.blue.w500, "stroke-width": 3});

wp.append([pb_aux,pc_aux,qc_aux,qa_aux,ra_aux,rb_aux], {
    "stroke": color.blue.w500,
    "stroke-width": 2.5, 
    "stroke-dasharray": ("10, 10")
});

wp.append([pd,qd,rd], {"stroke": color.yellow.w500, "stroke-width": 3});

wp.append(s, {"stroke": color.orange.w500, "stroke-width": 7});
wp.append(sl, {"stroke": color.orange.w500, "stroke-width": 3});
wp.append(fcirc, {"stroke": color.red.w800, "stroke-width": 3});
wp.append(deltoid, {"stroke": color.pink.w500, "stroke-linejoin":"round"});
wp.append([p,q,r], {"fill": color.orange.w800});
wp.append([delt], {"fill": color.pink.w800});
wp.append([a,b,c], {"fill": color.blue.w800});
wp.append(d, {"fill": color.yellow.w800});

wp.end();
