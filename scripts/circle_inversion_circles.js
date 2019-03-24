import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, Point, DPointOnCircle} from "../basic_objects/point.js";
import {FQuantity} from "../basic_objects/quantity.js";
import {Circle, CirclePP, CirclePR} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#circle_inversion_circles", 150),

base_c = new Circle(new Point(0,0),1),
a = new DPoint(0,-0.6),
b = new DPoint(0,-0.4),
domain_c = new CirclePP(a,b),

p = new DPointOnCircle(0.2,-0.6,domain_c),
q = FPoint.inverse(p,base_c),

r = new FQuantity(Point.dist,[a,b]),
d = new FQuantity(Point.dist,[new Point(0,0),a]),
image_c_radius = new FQuantity(
    (r,d) => r.v/Math.abs(d.v*d.v-r.v*r.v),
    [r,d]
),

image_c_center = new FPoint(
    (a,r,d) => {
        const factor = 1/(d.v*d.v-r.v*r.v);
        return {x:a.x*factor,y:a.y*factor};
    },
    [a,r,d]
),
image_c = new CirclePR(image_c_center,image_c_radius);

wp.append(base_c);
wp.append(domain_c,{"stroke-width": 3, "stroke": color.blue.w500});
wp.append(image_c,{"stroke-width": 3, "stroke": color.green.w500});

wp.append([a,b], {"fill": color.yellow.w100});
wp.append(q, {"fill": color.green.w800});
wp.append(p, {"fill": color.blue.w800});

wp.end();