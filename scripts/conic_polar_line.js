import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {Conic5P} from "../basic_objects/conic.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Line} from "../basic_objects/line.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#conic_polar_line", 150),

a = new DPoint(0,-0.6),

k1 = new DPoint(-1,-1),
k2 = new DPoint( 1,-1),
k3 = new DPoint(-1, 1),
k4 = new DPoint( 1, 1),
k5 = new DPoint(-0.5,0),

c = new Conic5P(k1,k2,k3,k4,k5),

p = Line.polar_conic(a,c),

[tp1,tp2] = FPoint.tangency_points_conic(a,c),

t1 = new PolyLine([a,tp1]),
t2 = new PolyLine([a,tp2]);

wp.append(c, {"stroke": color.black});
wp.append([t1,t2], { 
    "stroke": color.green.w500, 
    "stroke-width": 4.5, 
    "stroke-dasharray": ("10, 10")
});
wp.append(p, {"stroke": color.green.w500});
wp.append([k1,k2,k3,k4,k5], {"fill": color.amber.w300});
wp.append(a, {"fill": color.blue.w800});

wp.end();