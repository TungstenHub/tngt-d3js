import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {CirclePP} from "../basic_objects/circle.js";
import {LinePP} from "../basic_objects/line.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#circles_dalembert_ext", 150),

a1 = new DPoint(0.9,0.1),
b1 = new DPoint(a1.x,a1.y+0.25),
c1 = new CirclePP(a1,b1),

a2 = new DPoint(0.1,1.0),
b2 = new DPoint(a2.x,a2.y+0.4),
c2 = new CirclePP(a2,b2),

a3 = new DPoint(-0.5,-0.7),
b3 = new DPoint(a3.x,a3.y+1.1),
c3 = new CirclePP(a3,b3),

e12 = FPoint.ext_point(c1,c2),
e23 = FPoint.ext_point(c2,c3),
e31 = FPoint.ext_point(c3,c1),

[t12_1, t12_2] = FPoint.tangency_points(e12,c1),
[t23_1, t23_2] = FPoint.tangency_points(e23,c2),
[t31_1, t31_2] = FPoint.tangency_points(e31,c3),

tl12_1 = new LinePP(e12,t12_1),
tl12_2 = new LinePP(e12,t12_2),
tl23_1 = new LinePP(e23,t23_1),
tl23_2 = new LinePP(e23,t23_2),
tl31_1 = new LinePP(e31,t31_1),
tl31_2 = new LinePP(e31,t31_2),

l = new LinePP(e12,e23);

wp.append(l,{"stroke-width": 4, "stroke": color.bluegray.w500});
wp.append([
    tl12_1,
    tl12_2,
    tl23_1,
    tl23_2,
    tl31_1,
    tl31_2],{"stroke-width": 2, "stroke": color.bluegray.w500});

wp.append([c1,c2,c3],{"stroke-width": 4, "stroke": color.blue.w500, "fill": color.blue.w500 + '40'});

wp.append([e12,e23,e31], {"fill": color.bluegray.w800});
wp.append([b1,b2,b3], {"fill": color.amber.w500});
wp.append([a1,a2,a3], {"fill": color.blue.w800});

wp.end();