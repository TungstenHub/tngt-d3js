import {WorkPlane} from "../utils/init_canvas.js";

import {FPoint, Point, DPointOnLine} from "../basic_objects/point.js";
import {CirclePR} from "../basic_objects/circle.js";
import {Line} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {FQuantity} from "../basic_objects/quantity.js";

import {mdColor as color} from "../utils/material_color.js";
import { Vector } from "../basic_objects/vector.js";

const
wp = WorkPlane.with("#equal_incircles_theorem", 400, 0, 0.5),

base = new Line(new Point(0,0), new Vector(1,0)),
up_base = new Line(new Point(0,1), new Vector(1,0)),

v = new DPointOnLine(-0.5,0,up_base),
a = new DPointOnLine(-1,0,base),
b = new DPointOnLine( 1,0,base),

t = new PolyLine([v,a,b,v]),

k = 5,

angle_from_point = (p,q) => Math.asinh(q.x-p.x),
point_from_angle = t => 
    (p, alpha, beta) => {return {x: p.x + Math.sinh((1-t)*alpha.v+t*beta.v), y:0}},

radius = j => w => { //w is width = beta - alpha
    const x = Math.tanh(w*j/(2*k));
    return x/(1+x);
},

incenter_from_level_and_order = (j,i) => 
    (p, alpha, beta) => {
        const r = radius(j)(beta.v - alpha.v);
        const gamma_1 = Math.atan(Math.sinh((1-i/k)*alpha.v+i/k*beta.v));
        const gamma_2 = Math.atan(Math.sinh((1-(i+j)/k)*alpha.v+(i+j)/k*beta.v));
        return {x: p.x + Math.tan((gamma_1+gamma_2)/2)*(1-r), y:r}
    },

alpha = new FQuantity(angle_from_point, [v,a]),
beta = new FQuantity(angle_from_point, [v,b]);

let inner_segments = [];
for (let i=1; i<k; i++) {
    const anchor = new FPoint(
        point_from_angle(i/k),
        [v,alpha,beta]
    );
    inner_segments.push(new PolyLine([v,anchor]));
}

let base_circles = [];
for (let j=1; j<=k; j++) {
    let circle_row = [];
    for (let i=0; i<=k-j; i++) {
        const circle = new CirclePR(
            new FPoint(incenter_from_level_and_order(j,i), [v,alpha,beta]),
            new FQuantity((alpha,beta) => radius(j)(beta.v-alpha.v), [alpha,beta])
        );
        circle_row.push(circle);
    }
    base_circles.push(circle_row);
}

wp.append(inner_segments, {"stroke": color.blue.w500, "stroke-width": 3});
wp.append(t, {"stroke": color.blue.w500});

wp.append(base_circles[4], {"stroke": color.blue.w500, "stroke-width": 1});
wp.append(base_circles[3], {"stroke": color.green.w500, "stroke-width": 2});
wp.append(base_circles[2], {"stroke": color.amber.w500, "stroke-width": 3});
wp.append(base_circles[1], {"stroke": color.orange.w500, "stroke-width": 4});
wp.append(base_circles[0], {"stroke": color.pink.w500});
wp.append([v,a,b], {"fill": color.blue.w800});

wp.end();