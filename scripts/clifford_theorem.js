import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint} from "../basic_objects/point.js";
import {Circle3P, CirclePP} from "../basic_objects/circle.js";

import {mdColor as color} from "../utils/material_color.js";
import {int_pair} from "../utils/circle_utils.js";

const
wp = WorkPlane.with("#clifford_theorem", 100),

o = new DPoint(-0.5,0),

a = new DPoint(-1,-1),
b = new DPoint(-1, 1),
c = new DPoint( 1,-1),
d = new DPoint( 1, 1),

iab = new FPoint(int_pair, [a,b,o]),
iac = new FPoint(int_pair, [a,c,o]),
iad = new FPoint(int_pair, [a,d,o]),
ibc = new FPoint(int_pair, [b,c,o]),
ibd = new FPoint(int_pair, [b,d,o]),
icd = new FPoint(int_pair, [c,d,o]),

c_a = new CirclePP(a,o),
c_b = new CirclePP(b,o),
c_c = new CirclePP(c,o),
c_d = new CirclePP(d,o),

c_abc = new Circle3P(iab,iac,ibc),
c_abd = new Circle3P(iab,iad,ibd),
c_acd = new Circle3P(iac,iad,icd),
c_bcd = new Circle3P(ibc,ibd,icd),

o_abc = c_abc.center(),
o_abd = c_abd.center(),

m = new FPoint(int_pair, [o_abc,o_abd,iab]);

wp.append([c_a,c_b,c_c,c_d], {"stroke": color.blue.w800});
wp.append([c_abc,c_abd,c_acd,c_bcd], {"stroke": color.blue.w200});
wp.append(o, {"fill": color.white});
wp.append(m, {"fill": color.pink.w800,"stroke": color.white,'stroke-width': 2});
wp.append([iab,iac,iad,ibc,ibd,icd], {"fill": color.blue.w500});
wp.append([a,b,c,d], {"fill": color.blue.w800});

wp.end();