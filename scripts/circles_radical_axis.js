import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, Point, DPointOnLine} from "../basic_objects/point.js";
import {CirclePP} from "../basic_objects/circle.js";
import {Line} from "../basic_objects/line.js";
import {Vector} from "../basic_objects/vector.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#circles_radical_axis", 150),

x_axis = new Line(new Point(0,0), new Vector(1,0)),

a1 = new DPointOnLine(-1,0,x_axis),
b1 = new DPoint(-1,0.4),
c1 = new CirclePP(a1,b1),

a2 = new DPointOnLine(1,0,x_axis),
b2 = new DPoint(1,1),
c2 = new CirclePP(a2,b2),

l = Line.radical_axis(c1,c2);

wp.append([c1,c2],{"stroke-width": 4, "stroke": color.blue.w500});
wp.append(l,{"stroke-width": 4, "stroke": color.orange.w500});

wp.append([b1,b2], {"fill": color.amber.w500});
wp.append([a1,a2], {"fill": color.blue.w800});

wp.end();