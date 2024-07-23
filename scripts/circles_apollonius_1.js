import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {CirclePP} from "../basic_objects/circle.js";
import {Line,LinePP,SemiLinePP} from "../basic_objects/line.js";

import {apollonius_factory} from "../utils/apollonius_function.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#circles_apollonius_1", 150),

a1 = new DPoint(0.9,0.1),
b1 = new DPoint(a1.x,a1.y+0.25),
c1 = new CirclePP(a1,b1),

a2 = new DPoint(0.1,1.0),
b2 = new DPoint(a2.x,a2.y+0.4),
c2 = new CirclePP(a2,b2),

a3 = new DPoint(-0.5,-0.7),
b3 = new DPoint(a3.x,a3.y+1.1),
c3 = new CirclePP(a3,b3),

e12 = FPoint.int_point(c1,c2),
e23 = FPoint.ext_point(c2,c3),
e31 = FPoint.int_point(c3,c1),

l = new LinePP(e12,e23),

p1 = FPoint.pole(l,c1),
p2 = FPoint.pole(l,c2),
p3 = FPoint.pole(l,c3),

ra12 = Line.radical_axis(c1,c2),
ra23 = Line.radical_axis(c2,c3),

rc = FPoint.int_lines(ra12, ra23),
l1 = new SemiLinePP(rc,p1),
l2 = new SemiLinePP(rc,p2),
l3 = new SemiLinePP(rc,p3),

c_p = apollonius_factory(c1,c2,c3,-1, 1, 1),
c_m = apollonius_factory(c1,c2,c3, 1,-1,-1);

wp.append([l1,l2,l3],{"stroke-width": 3, "stroke": color.amber.w500});
wp.append(rc, {"fill": color.amber.w800});

wp.append(l,{"stroke-width": 3, "stroke": color.bluegray.w500});
wp.append([c_p,c_m],{"stroke-width": 3, "stroke": color.indigo.w500});

wp.append([c1,c2,c3],{"stroke-width": 4, "stroke": color.blue.w500, "fill": color.blue.w500 + '40'});

wp.append([p1,p2,p3], {"fill": color.bluegray.w800});
wp.append([e12,e23,e31], {"fill": color.indigo.w800});
wp.append([b1,b2,b3], {"fill": color.amber.w500});
wp.append([a1,a2,a3], {"fill": color.blue.w800});

wp.end();