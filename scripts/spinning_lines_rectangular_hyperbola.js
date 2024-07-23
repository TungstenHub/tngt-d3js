import {WorkPlane} from "../utils/init_canvas.js";

import {FPoint, DPoint} from "../basic_objects/point.js";
import {Slider, Time} from "../basic_objects/quantity.js";
import {LinePP} from "../basic_objects/line.js";
import {Conic5P} from "../basic_objects/conic.js";
import {Vector, FVector} from "../basic_objects/vector.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#spinning_lines_rectangular_hyperbola", 150),

ratio = 20,
a = new DPoint(1, 0),
b = new DPoint(-1, 0),
s = new Slider(0.0, 1.0, -1.5, 2.0, 2, 0.2),
time = new Time(ratio),

v = new FVector(
    (t) => {return {x: Math.cos(ratio*t.v/2500), y: Math.sin(ratio*t.v/2500)}},
    [time]
),
w = new FVector(
    (t,s) => {return {x: Math.cos(ratio*t.v/2500 - Math.PI*s.v), y: -Math.sin(ratio*t.v/2500 - Math.PI*s.v)}},
    [time,s]
),

h = new LinePP(a, FPoint.add_vector(a,v)),
k = new LinePP(b, FPoint.add_vector(b,w)),

i = FPoint.int_lines(h,k),

vec = phi => new Vector(Math.cos(phi), Math.sin(phi)),
s_vec = phi => s => {return {x: Math.cos(phi - Math.PI*s.v), y: -Math.sin(phi - Math.PI*s.v)}},

v1 = vec(1*Math.PI/12),
v2 = vec(5*Math.PI/12),
v3 = vec(9*Math.PI/12),
w1 = new FVector(s_vec(1*Math.PI/12), [s]),
w2 = new FVector(s_vec(5*Math.PI/12), [s]),
w3 = new FVector(s_vec(9*Math.PI/12), [s]),

i1 = FPoint.int_ab_cd(a, FPoint.add_vector(a,v1), b, FPoint.add_vector(b,w1)),
i2 = FPoint.int_ab_cd(a, FPoint.add_vector(a,v2), b, FPoint.add_vector(b,w2)),
i3 = FPoint.int_ab_cd(a, FPoint.add_vector(a,v3), b, FPoint.add_vector(b,w3)),

c = new Conic5P(a,b,i1,i2,i3);

wp.append(c, {"stroke": color.red.w800, "stroke-width": 4});
wp.append([h,k], {"stroke": color.blue.w500, "stroke-width": 3});
wp.append(s, {"fill": color.amber.w500});
wp.append(i, {"fill": color.red.w800, "r": 6});
wp.append([a,b], {"fill": color.blue.w800});

wp.end();