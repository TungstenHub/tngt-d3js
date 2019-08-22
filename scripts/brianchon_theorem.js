import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, DPointOnConic, FPoint} from "../basic_objects/point.js";
import {Conic5P} from "../basic_objects/conic.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {Line, LinePP} from "../basic_objects/line.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#brianchon_theorem", 200),

a = new DPoint(-0.7,0.7),
b = new DPoint(0.5,0.9),
c = new DPoint(1,0.4),
d = new DPoint(0.5,-0.9),
e = new DPoint(-0.5,-0.95),

q = new Conic5P(a,b,c,d,e),

f = new DPointOnConic(-1,0.1,q),

ta = Line.polar_conic(a,q),
tb = Line.polar_conic(b,q),
tc = Line.polar_conic(c,q),
td = Line.polar_conic(d,q),
te = Line.polar_conic(e,q),
tf = Line.polar_conic(f,q),

pab = FPoint.int_lines(ta,tb),
pbc = FPoint.int_lines(tb,tc),
pcd = FPoint.int_lines(tc,td),
pde = FPoint.int_lines(td,te),
pef = FPoint.int_lines(te,tf),
pfa = FPoint.int_lines(tf,ta),

t = new PolyLine([pab,pbc,pcd,pde,pef,pfa,pab]),

t1 = new LinePP(pab,pde),
t2 = new LinePP(pbc,pef),
t3 = new LinePP(pcd,pfa),

tt1 = new PolyLine([pab,pde]),
tt2 = new PolyLine([pbc,pef]),
tt3 = new PolyLine([pcd,pfa]),

p = FPoint.int_lines(t1,t2),

pab_aux = new PolyLine([p,pab]),
pbc_aux = new PolyLine([p,pbc]),
pcd_aux = new PolyLine([p,pcd]),
pde_aux = new PolyLine([p,pde]),
pef_aux = new PolyLine([p,pef]),
pfa_aux = new PolyLine([p,pfa]),

ma = FPoint.midp(pfa,pab),
mb = FPoint.midp(pab,pbc),
mc = FPoint.midp(pbc,pcd),
md = FPoint.midp(pcd,pde),
me = FPoint.midp(pde,pef),
mf = FPoint.midp(pef,pfa),

ma_aux = new PolyLine([a,ma]),
mb_aux = new PolyLine([b,mb]),
mc_aux = new PolyLine([c,mc]),
md_aux = new PolyLine([d,md]),
me_aux = new PolyLine([e,me]),
mf_aux = new PolyLine([f,mf]);

wp.append([
    ma_aux,
    mb_aux,
    mc_aux,
    md_aux,
    me_aux,
    mf_aux
], {
    "stroke": color.orange.w500, 
    "stroke-width": 3, 
    "stroke-dasharray": ("10, 10") 
});
wp.append([
    pab_aux,
    pbc_aux,
    pcd_aux,
    pde_aux,
    pef_aux,
    pfa_aux
], {
    "stroke": color.red.w800, 
    "stroke-width": 3, 
    "stroke-dasharray": ("10, 10") 
});
wp.append(t, {"stroke": color.orange.w500});
wp.append(q, {"stroke": color.blue.w500});
wp.append([tt1,tt2,tt3], {"stroke": color.red.w800});
wp.append([pab,pbc,pcd,pde,pef,pfa], {"fill": color.orange.w800});
wp.append(p, {"fill": color.red.w900});
wp.append([a,b,c,d,e], {"fill": color.blue.w800});
wp.append(f, {"fill": color.teal.w800});

wp.end();