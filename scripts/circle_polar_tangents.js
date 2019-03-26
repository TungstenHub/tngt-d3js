import {WorkPlane} from "../utils/init_canvas.js";

import {FPoint, Point, DPointOnLine} from "../basic_objects/point.js";
import {Time} from "../basic_objects/quantity.js";
import {Line} from "../basic_objects/line.js";
import {Circle} from "../basic_objects/circle.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Vector, FVector} from "../basic_objects/vector.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#circle_polar_tangents", 150),

base_c = new Circle(new Point(0,0),1),

a = new DPointOnLine(0,-0.6,new Line(new Point(0,0),new Vector(0,1))),
a_polar = Line.polar(a,base_c),

time = new Time(10),
v = new FVector(
    (t) => {return {x: Math.cos(t.v/200), y: Math.sin(t.v/200)}},
    [time]
),

b_polar = new Line(a,v),
b = FPoint.pole(b_polar,base_c),

[tp1,tp2] = FPoint.tangency_points(b,base_c),

t1 = new PolyLine([tp1,b]),
t2 = new PolyLine([tp2,b]);

wp.append(base_c);

wp.append([t1,t2], { 
    "stroke": color.green.w500, 
    "stroke-width": 4.5, 
    "stroke-dasharray": ("10, 10")
});

wp.append(b_polar, {"stroke": color.green.w500});
wp.append(a_polar, {"stroke": color.blue.w500});
wp.append(b, {"fill": color.green.w800});
wp.append(a, {"fill": color.blue.w800});

wp.end();