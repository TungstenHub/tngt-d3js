import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity} from "../basic_objects/quantity.js";
import {Point, DPointOnCircle, FPoint} from "../basic_objects/point.js";
import {PolyLine, Parametric} from "../basic_objects/polyline.js";
import {Circle, CirclePP} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#deltoid", 300),

c = new Circle(new Point(0,0), 1),
p = new DPointOnCircle(1, 0, new Circle(new Point(0,0), 2/3)),
angle = p => Math.atan2(p.y,p.x),
a = new FQuantity(angle, [p]),

f = t => ({
    x: (2/3)*Math.cos(t) + (1/3)*Math.cos(2*t),
    y: (2/3)*Math.sin(t) - (1/3)*Math.sin(2*t)
}),

d = new Parametric(
    t => () => f(t), [],
    0+0.1, 2*Math.PI+0.1, 100
),

hp = new FPoint(a => f(a.v), [a]),
h = new CirclePP(p,hp),

g1 = new FPoint(a => f(-a.v/2), [a]),
g2 = new FPoint(a => f(-a.v/2+Math.PI), [a]),
gd = new PolyLine([g1,g2]),
gm = FPoint.midp(g1,g2),
g = new CirclePP(gm,g1),

rotate = a => (c,p) => {
    const vx = p.x-c.x;
    const vy = p.y-c.y;
    return {
        x: c.x + Math.cos(a)*vx - Math.sin(a)*vy,
        y: c.y + Math.sin(a)*vx + Math.cos(a)*vy
    };
},

rolling_points = (c,p,n) => 
    [...Array(n).keys()].map(i => new FPoint(rotate(2*Math.PI*i/n),[c,p])),

h_aux = rolling_points(p,hp,12),
g_aux = rolling_points(gm,g1,24),
c_aux = rolling_points(new Point(0,0),new Point(1,0),36);

wp.append(c, {"stroke": color.blue.w500, "stroke-width": 4, "fill": color.blue.w200});
wp.append(c_aux, {"fill": color.blue.w500, "r":4});
wp.append(g, {"stroke": color.green.w500, "stroke-width": 4, "fill": color.green.w200});
wp.append(g_aux, {"fill": color.green.w500, "r":4});
wp.append(h, {"stroke": color.amber.w500, "stroke-width": 4, "fill": color.amber.w200});
wp.append(h_aux, {"fill": color.amber.w500, "r":4});
wp.append(gd, {"stroke": color.green.w500, "stroke-width": 7});
wp.append(d, {"stroke": color.blue.w500, "stroke-width": 9, "stroke-linejoin":"round"});
wp.append([g1,g2], {"fill": color.green.w800});
wp.append(hp, {"fill": color.amber.w800});
wp.append(p, {"fill": 'white'});

wp.end();
