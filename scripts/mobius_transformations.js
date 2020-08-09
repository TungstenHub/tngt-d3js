import {WorkPlane} from "../utils/init_canvas.js";

import {FPoint, DPoint} from "../basic_objects/point.js";

import {mdColor as color} from "../utils/material_color.js";
import {Circle3P} from "../basic_objects/circle.js";

const
wp = WorkPlane.with("#mobius_transformations", 250),

a = new DPoint(0.011, 1.012),
b = new DPoint(-Math.sqrt(3)/2, -1/2),
c = new DPoint( Math.sqrt(3)/2, -1/2),

sub = (a, b) => ({x: a.x-b.x, y: a.y-b.y}),
mul = (a, b) => ({x: a.x*b.x - a.y*b.y, y: a.y*b.x + a.x*b.y}),
div = (a, b) => ({
    x:(a.x*b.x + a.y*b.y)/(b.x*b.x+b.y*b.y), 
    y:(a.y*b.x - a.x*b.y)/(b.x*b.x+b.y*b.y)
}),

// (z,i;o1,o2) = (w,a;b,c)
// (z-o1)(i-o2)/[(z-o2)(i-o1)] = (w-b)(a-c)/[(w-c)(a-b)]
// u(z-o1)(a-b)/[(z-o2)(a-c)] = (w-b)/(w-c)
// Z = (w-b)/(w-c)
// Zw-Zc = w-b
// w(Z-1) = Zc-b
// w = (Zc-b)/(Z-1)
mobius_transf = p => (a,b,c) => {
    const
    u = {x:1/2, y:Math.sqrt(3)/2},
    o1 = {x:-Math.sqrt(3)/2, y:-1/2},
    o2 = {x: Math.sqrt(3)/2, y:-1/2},
    Z = 
    div(
        mul(
            u,
            mul(
                sub(p,o1),
                sub(a,b)
            )
        ),
        mul(
            sub(p,o2),
            sub(a,c)
        )
    );
    return div(
        sub(
            mul(Z,c),
            b
        ),
        sub(Z,{x:1,y:0})
    );
},

getParallels = k => {
    let parallels = [];
    for (let j=1; j<k; j++) {
        parallels.push(
            new Circle3P(...[0,1,2].map(i => {
                const base_point = {
                    x:Math.tan(Math.PI*j/k/2)*Math.cos(2*Math.PI*i/3),
                    y:Math.tan(Math.PI*j/k/2)*Math.sin(2*Math.PI*i/3)
                };
                return new FPoint(mobius_transf(base_point),[a,b,c])
            }))   
        )
    }
    return parallels
},

getMeridians = k => {
    let meridians = [];
    for (let j=0; j<k; j++) {
        meridians.push(
            new Circle3P(...[-1,0,1].map(i => {
                const base_point = {
                    x:i*Math.cos(Math.PI*j/k),
                    y:i*Math.sin(Math.PI*j/k)
                };
                return new FPoint(mobius_transf(base_point),[a,b,c])
            }))   
        )
    }
    return meridians
},

main_parallels = getParallels(4),
base_parallels = getParallels(16),
main_meridians = getMeridians(6),
base_meridians = getMeridians(24);

const main_attrs = {
    "stroke": color.bluegray.w500,
    "stroke-width": 4
};
const base_attrs = {
    "stroke": color.bluegray.w200,
    "stroke-width": 2
};
wp.append(base_parallels, base_attrs);
wp.append(base_meridians, base_attrs);
wp.append(main_parallels, main_attrs);
wp.append(main_meridians, main_attrs);

wp.append([a,b,c], {"fill": color.gray.w800});

wp.end();
