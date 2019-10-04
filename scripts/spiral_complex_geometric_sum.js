import {WorkPlane} from "../utils/init_canvas.js";
import {axes, grid} from "../utils/display_utils.js";

import {Point, FPoint} from "../basic_objects/point.js";
import {PComplex, Complex, FComplex} from "../basic_objects/complex.js";
import {Slider, FQuantity, Time} from "../basic_objects/quantity.js";
import {CirclePR} from "../basic_objects/circle.js";
import {PolyLine} from "../basic_objects/polyline.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#spiral_complex_geometric_sum", 150, 2.5, 0),

o = new Point(0,0),

ax = axes(),
gr = grid(13,9),

r = new Slider(0.1, 0.9, 0.5, 1.75, 2, 0.75),
u = new Complex(1,0),
c = new CirclePR(u,r),

// au = new PComplex(new DPointOnCircle(2,1,c)),

time = new Time(10),
q = new FPoint(
    (t,r) => {return {x: 1+r.v*Math.cos(t.v/100), y: r.v*Math.sin(t.v/100)}},
    [time,r]
),
au = new PComplex(q),

a = au.sub(u),

p = new FPoint(r => {return {x: 1/(1 - r.v*r.v), y:0}}, [r]),
rad = new FQuantity(r => r.v/(1 - r.v*r.v), [r]),
d = new CirclePR(p,rad),

partial = n => a => Complex.div(Complex.sub(u,Complex.pow(a,n+1)),Complex.sub(u,a)),

spiral = Array(50).fill().map((x,i) => new FComplex(partial(i),[a]));
const limit = new FComplex(a => Complex.div(u,Complex.sub(u,a)),[a]);

spiral.unshift(o);

const l = new PolyLine(spiral);

wp.append(gr, {"stroke": color.gray.w200, "stroke-width": 2});
wp.append(ax, {"stroke": color.gray.w500, "stroke-width": 3});
wp.append(r, {"fill": color.amber.w200});
wp.append(c, {"stroke": 'black', "stroke-width": 2, "stroke-dasharray": ("10, 10")});
wp.append(d, {"stroke": color.pink.w500, "stroke-width": 2});
wp.append(l, {"stroke": color.blue.w500, "stroke-linejoin":"round", "stroke-width": 3});
wp.append(spiral, {"fill": color.blue.w800, "r":4});
wp.append(limit, {"stroke": color.pink.w800, "fill": '#00000000', "stroke-width": 3, "r":5});
wp.append(au, {"fill": color.amber.w200});

wp.end();