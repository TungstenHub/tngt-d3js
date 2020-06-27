import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {Time} from "../basic_objects/quantity.js";
import {Line} from "../basic_objects/line.js";
import {Conic5P} from "../basic_objects/conic.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {FVector} from "../basic_objects/vector.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#conic_polar_tangents", 150),

k1 = new DPoint(-1,-1),
k2 = new DPoint( 1,-1),
k3 = new DPoint(-1, 1),
k4 = new DPoint( 1, 1),
k5 = new DPoint(-0.5,0),

c = new Conic5P(k1,k2,k3,k4,k5),

a = new DPoint(0,-0.6),
a_polar = Line.polar_conic(a,c),

time = new Time(10),
v = new FVector(
    (t) => {return {x: Math.cos(t.v/200), y: Math.sin(t.v/200)}},
    [time]
),

b_polar = new Line(a,v),
b = FPoint.pole_conic(b_polar,c),

[tp1,tp2] = FPoint.tangency_points_conic(b,c),

t1 = new PolyLine([b,tp1]),
t2 = new PolyLine([b,tp2]);

wp.append(c, {"stroke": "black"});

wp.append([t1,t2], { 
    "stroke": color.green.w500, 
    "stroke-width": 4.5, 
    "stroke-dasharray": ("10, 10")
});

wp.append(b_polar, {"stroke": color.green.w500});
wp.append(a_polar, {"stroke": color.blue.w500});
wp.append([k1,k2,k3,k4,k5], {"fill": color.yellow.w200});
wp.append(b, {"fill": color.green.w800});
wp.append(a, {"fill": color.blue.w800});

wp.end();