import {WorkPlane} from "../utils/init_canvas.js";

import {FPoint, Point, DPointOnSegment} from "../basic_objects/point.js";
import {CirclePR, CircleDiam, Circle3P} from "../basic_objects/circle.js";
import {FQuantity} from "../basic_objects/quantity.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#pappus_chain", 300),

a = new Point(-1, 0),
b = new Point( 1, 0),
c = new CircleDiam(a, b),

aa = new Point(-0.99, 0),
bb = new Point( 0.99, 0),
d = new DPointOnSegment(0, 0, aa, bb),
e = new CircleDiam(a, d),

r = new FQuantity(d => (1+d.x)/2, [d]),

inv = p => {
    const
    x = p.x,
    y = p.y,
    d = (x+1)*(x+1) + y*y;
    return {
        x: 4*(x+1)/d - 1,
        y:     4*y/d
    }
},

bases = v => k => r => ({x:(1+v.x)*(1/r.v-1)+1, y:(v.y+2*k)*(1/r.v-1)}),
pap_bases = v => k => r => inv(bases(v)(k)(r)),
vecs = [{x:1,y:0},{x:-1,y:0},{x:0,y:-1}],

pap = n => (n>0 ? [-n,n] : [0]).map(k => 
    new Circle3P(...vecs.map(v => new FPoint(pap_bases(v)(k), [r])))),

rad = n => r => (1-r.v)*r.v/((n*n*(1-r.v)*(1-r.v)+r.v)),
int_rad = n => new FQuantity(rad(n), [r]),
int_rads = Array.from({length: 10}, (x, i) => i).map(int_rad),
int_c = n => k => new FPoint(r => {
    const {x,y} = bases({x:1,y:0})(k)(r);
    const rd = rad(n)(r)/(1/r.v-1);
    return {x: (x+2-1/r.v)*rd-1, y: y*rd}
}, [r]),
int = n => k => new CirclePR(int_c(n)(k), int_rads[n]),
intt = n => Array.from({length: 2*n-1}, (x, i) => i+1-n).map(int(n));

const w = ['w900','w800','w700','w600','w500','w400','w300','w200','w100'];
const rg = [8,7,6,5,4,3,2,1,0];

rg.forEach(i => wp.append(pap(i), {"fill": color.lightblue[w[i]]+'80'}));
rg.forEach(i => wp.append(intt(i), {"stroke": color.lime[w[i]], "stroke-width": 3}));
rg.forEach(i => wp.append(pap(i), {"stroke": color.blue[w[i]]}));

wp.append([c,e], {"stroke": color.black});
wp.append(d, {"fill": color.white});

wp.end();