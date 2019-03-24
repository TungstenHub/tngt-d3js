import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, Point, DPointOnCircle, DPointOnLine} from "../basic_objects/point.js";
import {FQuantity} from "../basic_objects/quantity.js";
import {Line} from "../basic_objects/line.js";
import {Circle, CirclePP, CirclePR} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";
import { Vector } from "../basic_objects/vector.js";

const
wp = WorkPlane.with("#circle_inversion_lines", 150),

base_c = new Circle(new Point(0,0),1),

a = new DPointOnLine(0,-0.6,new Line(new Point(0,0),new Vector(0,1))),

domain_l = new Line(a,new Vector(1,0)),

p = new DPointOnLine(0.3,-0.6,domain_l),
q = FPoint.inverse(p,base_c),

image_c_radius = new FQuantity(
    (a) => 1/Math.abs(2*a.y),
    [a]
),
image_c_center = new FPoint(
    (a) => {
        return {x:0,y:1/(2*a.y)};
    },
    [a]
),
image_c = new CirclePR(image_c_center,image_c_radius);

wp.append(base_c);
wp.append(domain_l,{"stroke-width": 3, "stroke": color.blue.w500});
wp.append(image_c,{"stroke-width": 3, "stroke": color.green.w500});

wp.append(a, {"fill": color.yellow.w100});
wp.append(q, {"fill": color.green.w800});
wp.append(p, {"fill": color.blue.w800});

wp.end();