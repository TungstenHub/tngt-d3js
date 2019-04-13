import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint} from "../basic_objects/point.js";
import {CirclePP} from "../basic_objects/circle.js";

import {apollonius_factory} from "../utils/apollonius_function.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#circles_apollonius", 150),

a1 = new DPoint(0.9,0.1),
b1 = new DPoint(a1.x,a1.y+0.25),
c1 = new CirclePP(a1,b1),

a2 = new DPoint(0.1,1.0),
b2 = new DPoint(a2.x,a2.y+0.4),
c2 = new CirclePP(a2,b2),

a3 = new DPoint(-0.5,-0.7),
b3 = new DPoint(a3.x,a3.y+1.1),
c3 = new CirclePP(a3,b3),

c_ppp = apollonius_factory(c1,c2,c3, 1, 1, 1),
c_ppm = apollonius_factory(c1,c2,c3, 1, 1,-1),
c_pmp = apollonius_factory(c1,c2,c3, 1,-1, 1),
c_pmm = apollonius_factory(c1,c2,c3, 1,-1,-1),
c_mpp = apollonius_factory(c1,c2,c3,-1, 1, 1),
c_mpm = apollonius_factory(c1,c2,c3,-1, 1,-1),
c_mmp = apollonius_factory(c1,c2,c3,-1,-1, 1),
c_mmm = apollonius_factory(c1,c2,c3,-1,-1,-1);

wp.append([c_mpp,c_pmm],{"stroke-width": 3, "stroke": color.indigo.w500});
wp.append([c_pmp,c_mpm],{"stroke-width": 3, "stroke": color.teal.w500});
wp.append([c_ppm,c_mmp],{"stroke-width": 3, "stroke": color.deeporange.w500});
wp.append([c_ppp,c_mmm],{"stroke-width": 3, "stroke": color.pink.w500});

wp.append([c1,c2,c3],{"stroke-width": 4, "stroke": color.blue.w500, "fill": color.blue.w200 + '80'});

wp.append([b1,b2,b3], {"fill": color.yellow.w100});
wp.append([a1,a2,a3], {"fill": color.blue.w800});

wp.end();