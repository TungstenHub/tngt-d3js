import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, Point, FPoint} from "../basic_objects/point.js";
import {Circle} from "../basic_objects/circle.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";
import { Line } from "../basic_objects/line.js";

const
wp = WorkPlane.with("#circle_polar_line", 150),

a = new DPoint(0,-0.6),

c = new Circle(new Point(0,0),1),

p = Line.polar(a,c),

[tp1,tp2] = FPoint.tangency_points(a,c),

t1 = new PolyLine([a,tp1]),
t2 = new PolyLine([a,tp2]);

wp.append(c);
wp.append([t1,t2], { 
    "stroke": color.green.w500, 
    "stroke-width": 4.5, 
    "stroke-dasharray": ("10, 10")
});
wp.append(p, {"stroke": color.green.w500});
wp.append(a, {"fill": color.blue.w800});

wp.end();