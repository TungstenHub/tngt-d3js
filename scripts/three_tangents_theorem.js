import {WorkPlane} from "../utils/init_canvas.js";

import {FPoint, Point, DPointOnCircle} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {LinePP, Line} from "../basic_objects/line.js";
import {Circle} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#three_tangents_theorem", 150),

g = new Circle(new Point(0,0), 1),

a = new DPointOnCircle(Math.cos(0.8),Math.sin(0.8),g),
b = new DPointOnCircle(Math.cos(4),Math.sin(4),g),
c = new DPointOnCircle(Math.cos(5.029),Math.sin(5.029),g),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

bc = new LinePP(b,c),
ca = new LinePP(c,a),
ab = new LinePP(a,b),

m_bc = FPoint.midp(b,c),
m_ca = FPoint.midp(c,a),
m_ab = FPoint.midp(a,b),

p = Line.polar(a,g),
q = Line.polar(b,g),
r = Line.polar(c,g),

u = FPoint.int_lines(bc,p),
v = FPoint.int_lines(ca,q),
w = FPoint.int_lines(ab,r),

l_bc = new PolyLine([m_bc,u]),
l_ca = new PolyLine([m_ca,v]),
l_ab = new PolyLine([m_ab,w]),

t_a = new PolyLine([a,u]),
t_b = new PolyLine([b,v]),
t_c = new PolyLine([c,w]),

l = new LinePP(u,w);

wp.append(inn_t, {"fill": color.amber.w100, "stroke": "none"});

wp.append([l_bc,l_ca,l_ab], {
    "stroke": color.amber.w300, 
    "stroke-width": 4, 
    "stroke-dasharray": ("10, 10") 
});

wp.append([t_a,t_b,t_c], {
    "stroke": color.blue.w300, 
    "stroke-width": 4, 
    "stroke-dasharray": ("10, 10") 
});

wp.append(t, {"stroke": color.amber.w500});

wp.append(l, {"stroke": color.pink.w500});
wp.append(g, {"stroke": color.blue.w500});

wp.append([u,v,w], {"fill": color.pink.w800});
wp.append([a,b,c], {"fill": color.amber.w800});

wp.end();