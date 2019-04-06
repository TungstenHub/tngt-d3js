import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {CirclePP} from "../basic_objects/circle.js";
import {Line} from "../basic_objects/line.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#circles_radical_center", 150),

a1 = new DPoint(Math.cos(0),Math.sin(0)),
b1 = new DPoint(1.8*Math.cos(0),1.8*Math.sin(0)),
c1 = new CirclePP(a1,b1),

a2 = new DPoint(Math.cos(2*Math.PI/3),Math.sin(2*Math.PI/3)),
b2 = new DPoint(2.1*Math.cos(2*Math.PI/3),2.1*Math.sin(2*Math.PI/3)),
c2 = new CirclePP(a2,b2),

a3 = new DPoint(Math.cos(4*Math.PI/3),Math.sin(4*Math.PI/3)),
b3 = new DPoint(2.4*Math.cos(4*Math.PI/3),2.4*Math.sin(4*Math.PI/3)),
c3 = new CirclePP(a3,b3),

l12 = Line.radical_axis(c1,c2),
l23 = Line.radical_axis(c2,c3),
l31 = Line.radical_axis(c3,c1),

p = FPoint.int_lines(l12, l23),

[tpc11,tpc12] = FPoint.tangency_points(p,c1),
tc11 = new PolyLine([p,tpc11]),
tc12 = new PolyLine([p,tpc12]),
[tpc21,tpc22] = FPoint.tangency_points(p,c2),
tc21 = new PolyLine([p,tpc21]),
tc22 = new PolyLine([p,tpc22]),
[tpc31,tpc32] = FPoint.tangency_points(p,c3),
tc31 = new PolyLine([p,tpc31]),
tc32 = new PolyLine([p,tpc32]),

pow_c = new CirclePP(p,tpc11);

wp.append([tc11,tc12,tc21,tc22,tc31,tc32,pow_c],{"stroke-width": 4, "stroke": color.amber.w200});
wp.append([c1,c2,c3],{"stroke-width": 4, "stroke": color.blue.w500});
wp.append([l12,l23,l31],{"stroke-width": 4, "stroke": color.orange.w500});

wp.append(p, {"fill": color.orange.w800});
wp.append([b1,b2,b3], {"fill": color.yellow.w100});
wp.append([a1,a2,a3], {"fill": color.blue.w800});

wp.end();