import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity} from "../basic_objects/quantity.js";
import {Point, FPoint, DPointWithFunc} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {inside_triangle} from "../utils/triangle_utils.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#viviani_theorem", 300),

a = new Point(Math.cos( 3*Math.PI/6), Math.sin( 3*Math.PI/6)-0.1),
b = new Point(Math.cos( 7*Math.PI/6), Math.sin( 7*Math.PI/6)-0.1),
c = new Point(Math.cos(11*Math.PI/6), Math.sin(11*Math.PI/6)-0.1),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

d = new DPointWithFunc(0.12, -0.1, inside_triangle, [a,b,c]),

d_ab = FPoint.proj_a_bc(d,a,b),
d_bc = FPoint.proj_a_bc(d,b,c),
d_ca = FPoint.proj_a_bc(d,c,a),

td_ab = new PolyLine([d,d_ab]),
td_bc = new PolyLine([d,d_bc]),
td_ca = new PolyLine([d,d_ca]),

d1 = new FQuantity(Point.dist, [d,d_ab]),
d3 = new FQuantity(Point.dist, [d,d_ca]),

offset = -0.85,

p = new Point(-0.75, offset),
q = new FPoint(
    (d1) => {
        return {x:-0.75+d1.v, y:offset}
    },
    [d1]
),
r = new FPoint(
    (d3) => {
        return {x:0.75-d3.v, y:offset}
    },
    [d3]
),
s = new Point(0.75, offset),

ld_ab = new PolyLine([p,q]),
ld_bc = new PolyLine([q,r]),
ld_ca = new PolyLine([r,s]);

wp.append(inn_t, {"fill": color.blue.w500, "fill-opacity": 0.3});

wp.append([td_ab,ld_ab], {"stroke": color.orange.w500});
wp.append([td_bc,ld_bc], {"stroke": color.pink.w500});
wp.append([td_ca,ld_ca], {"stroke": color.deeppurple.w500});

wp.append(t, {"stroke": color.blue.w500});

wp.append([a,b,c], {"fill": color.blue.w800});
wp.append(d, {"fill": color.white});

wp.end();
