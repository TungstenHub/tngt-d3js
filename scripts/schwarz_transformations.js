import {WorkPlane} from "../utils/init_canvas.js";

import {Point, FPoint, DPointWithFunc} from "../basic_objects/point.js";

import {mdColor as color} from "../utils/material_color.js";
import {Circle, Circle3P, Arc3P} from "../basic_objects/circle.js";

const
wp = WorkPlane.with("#schwarz_transformations", 300),

c = new Circle(new Point(0,0), 1),

inside_unit_circle = p => {
    const r = Math.sqrt(p.x*p.x + p.y*p.y);
    const s = Math.min(r,0.99);
    return {x:s*p.x/r, y:s*p.y/r}
},

d = new DPointWithFunc(0.12, -0.1, inside_unit_circle),

schwarz_transf = p => a => { // z -> (z+a)/(1+a'z) = (A+Bi)/(C+Di)
    const
    A = p.x + a.x,
    B = p.y + a.y,
    C = p.x*a.x + p.y*a.y + 1,
    D = -p.x*a.y + p.y*a.x,
    E = A*C + B*D,
    F = B*C - A*D;
    return {x:E/(C*C+D*D), y:F/(C*C+D*D)}
},

getCircles = k => {
    let circles = [];
    for (let j=1; j<k; j++) {
        circles.push(
            new Circle3P(...[0,1,2].map(i => {
                const base_point = {
                    x:j/k*Math.cos(2*Math.PI*i/3),
                    y:j/k*Math.sin(2*Math.PI*i/3)
                };
                return new FPoint(schwarz_transf(base_point),[d])
            }))   
        )
    }
    return circles
},

getLines = k => {
    let lines = [];
    for (let j=0; j<k; j++) {
        lines.push(
            new Arc3P(...[-1,0,1].map(i => {
                const base_point = {
                    x:i*Math.cos(Math.PI*j/k),
                    y:i*Math.sin(Math.PI*j/k)
                };
                return new FPoint(schwarz_transf(base_point),[d])
            }))   
        )
    }
    return lines
},

main_circles = getCircles(4),
base_circles = getCircles(16),
main_lines = getLines(6),
base_lines = getLines(24);

const main_attrs = {
    "stroke": color.bluegray.w500,
    "stroke-width": 2
};
const base_attrs = {
    "stroke": color.bluegray.w200,
    "stroke-width": 1
};
wp.append(base_circles, base_attrs);
wp.append(base_lines, base_attrs);
wp.append(main_circles, main_attrs);
wp.append(main_lines, main_attrs);

wp.append(c, {"stroke": color.black});

wp.append(d, {"fill": color.white});

wp.end();
