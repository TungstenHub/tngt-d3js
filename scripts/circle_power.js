import {WorkPlane} from "../utils/init_canvas.js";

import {FPoint, Point, DPointOnLine} from "../basic_objects/point.js";
import {Time, FQuantity} from "../basic_objects/quantity.js";
import {Line} from "../basic_objects/line.js";
import {Circle} from "../basic_objects/circle.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Vector} from "../basic_objects/vector.js";

import {mdColor as color} from "../utils/material_color.js";

const

off = -1.65,

wp = WorkPlane.with("#circle_power", 150),

base_c = new Circle(new Point(off,0),1),

a = new DPointOnLine(off,-1.6,new Line(new Point(off,0),new Vector(0,1))),

time = new Time(10),
b = new FPoint(
    (t) => {return {x: Math.cos(t.v/200)+off, y: Math.sin(t.v/200)}},
    [time]
),

c = new FPoint(
    (a,b) => {
        const power = a.y*a.y - 1;
        const ab = Point.dist(a,b);
        const ac = power/ab;
        return {x: a.x+(b.x-a.x)*ac/ab, y: a.y+(b.y-a.y)*ac/ab};
    },
    [a,b]
),

lb = new PolyLine([a,b]),
lc = new PolyLine([a,c]),

ab = new FQuantity(Point.dist, [a,b]),
ac = new FQuantity(Point.dist, [a,c]),

v = new Point(0,-1),
vb = new FPoint(
    (ab) => {return {x: v.x+ab.v, y: v.y};},
    [ab]
),
vc = new FPoint(
    (ac) => {return {x: v.x, y: v.y+ac.v};},
    [ac]
),
vbc = new FPoint(
    (ab,ac) => {return {x: v.x+ab.v, y: v.y+ac.v};},
    [ab,ac]
),

rect = new PolyLine([v,vb,vbc,vc,v]),

lvb = new PolyLine([v,vb]),
lvc = new PolyLine([v,vc]);


wp.append(base_c);

wp.append(rect, { 
    "fill": color.lime.w200, 
    "stroke": null,
});

wp.append([lb,lvb], { 
    "stroke": color.red.w500, 
    "stroke-width": 5, 
});

wp.append([lc,lvc], { 
    "stroke": color.orange.w500, 
    "stroke-width": 5, 
});

wp.append([c,vc], {"fill": color.orange.w800});
wp.append([b,vb], {"fill": color.red.w800});
wp.append([a,v], {"fill": color.blue.w800});

wp.end();