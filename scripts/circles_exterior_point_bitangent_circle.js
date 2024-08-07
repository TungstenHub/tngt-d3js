import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, Point, DPointOnCircle, DPointOnLine} from "../basic_objects/point.js";
import {CirclePP} from "../basic_objects/circle.js";
import {Line, LinePP} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";
import { Vector } from "../basic_objects/vector.js";

const
wp = WorkPlane.with("#circles_exterior_point_bitangent_circle", 150),

x_axis = new Line(new Point(0,0), new Vector(1,0)),

a1 = new DPointOnLine(-1,0,x_axis),
b1 = new DPoint(-1,0.4),
c1 = new CirclePP(a1,b1),

a2 = new DPointOnLine(1,0,x_axis),
b2 = new DPoint(1,1),
c2 = new CirclePP(a2,b2),

e = FPoint.ext_point(c1,c2),
[tp1,tp2] = FPoint.tangency_points(e,c1),
t1 = new LinePP(e,tp1),
t2 = new LinePP(e,tp2),

p = new DPointOnCircle(-1+0.2*Math.sqrt(2),0.2*Math.sqrt(2),c1),

q = new FPoint(
    (c,d,p) => {
        const r = c.r/(d.r-c.r);
        const e = {x:c.p.x+r*(c.p.x-d.p.x), y:c.p.y+r*(c.p.y-d.p.y)};
        const pow_c = Math.pow(Point.dist(c.p,e),2)-c.r*c.r;
        const pow_d = Math.pow(Point.dist(d.p,e),2)-d.r*d.r;
        const k = Math.sqrt(pow_c*pow_d)/Math.pow(Point.dist(e,p),2)*Math.sign(pow_c);
        return {x:e.x+(p.x-e.x)*k,y:e.y+(p.y-e.y)*k}
    },
    [c1,c2,p]
),

bit_p = FPoint.int_ab_cd(a1,p,a2,q),
bit_c = new CirclePP(bit_p,p),

[powp1,powp2] = FPoint.tangency_points(e,bit_c),
pow1 = new PolyLine([e,powp1]),
pow2 = new PolyLine([e,powp2]),

pow_c = new CirclePP(e,powp1),

l = new LinePP(p,q);

wp.append([pow1,pow2,pow_c],{"stroke-width": 2, "stroke": color.amber.w500, "stroke-dasharray": ("10, 10")});
wp.append([t1,t2], {"stroke-width": 4, "stroke": color.green.w500});
wp.append([c1,c2],{"stroke-width": 4, "stroke": color.blue.w500});
wp.append(l,{"stroke-width": 4, "stroke": color.orange.w500});
wp.append(bit_c,{"stroke-width": 4, "stroke": color.pink.w500});

wp.append(e, {"fill": color.green.w800});
wp.append([b1,b2], {"fill": color.amber.w500});
wp.append([a1,a2], {"fill": color.blue.w800});
wp.append([p,q], {"fill": color.pink.w800});

wp.end();