import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint,FPoint} from "../basic_objects/point.js";
import {PolyLine, Parametric} from "../basic_objects/polyline.js";
import {Slider} from "../basic_objects/quantity.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#bezier_curve", 150, 0, 0.2),

t = new Slider(0.0, 1.0, 0, 1.85, 5, 0.15),

as = [
    new DPoint(-2,0.7),
    new DPoint(-0,1.5),
    new DPoint(-2.5,-1.5),
    new DPoint(2.5,-1.5),
    new DPoint(2,0.7),
],

interp = (p,q,t) => ({x:p.x+t.v*(q.x-p.x), y:p.y+t.v*(q.y-p.y)}),

step = ps => {
    const qs = [];
    for (let i = 0; i<ps.length-1; i++) {
        qs.push(new FPoint(interp, [ps[i],ps[i+1],t]))
    }
    return qs
},

bs = step(as),
cs = step(bs),
ds = step(cs),
es = step(ds),

a = new PolyLine(as),
b = new PolyLine(bs),
c = new PolyLine(cs),
d = new PolyLine(ds),

p = Math.pow,

bezier = new Parametric(
    t => (a0,a1,a2,a3,a4) => {
        return {
            x: p(1-t,4)*a0.x + 4*p(1-t,3)*p(t,1)*a1.x + 6*p(1-t,2)*p(t,2)*a2.x + 4*p(1-t,1)*p(t,3)*a3.x + p(t,4)*a4.x,
            y: p(1-t,4)*a0.y + 4*p(1-t,3)*p(t,1)*a1.y + 6*p(1-t,2)*p(t,2)*a2.y + 4*p(1-t,1)*p(t,3)*a3.y + p(t,4)*a4.y
        }
    }, as,
    0, 1, 100
);


wp.append(t, {"fill": color.black});
wp.append(d, {"stroke": color.orange.w500, "stroke-width": 3});
wp.append(c, {"stroke": color.yellow.w500, "stroke-width": 3});
wp.append(b, {"stroke": color.green.w500, "stroke-width": 3});
wp.append(a, {"stroke": color.blue.w500, "stroke-width": 5});
wp.append(bezier, {"stroke": color.pink.w500, "stroke-width": 7});
wp.append(es, {"fill": color.pink.w800});
wp.append(ds, {"fill": color.orange.w800});
wp.append(cs, {"fill": color.yellow.w800});
wp.append(bs, {"fill": color.green.w800});
wp.append(as, {"fill": color.blue.w800});

wp.end();