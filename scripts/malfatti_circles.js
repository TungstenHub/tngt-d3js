import {WorkPlane} from "../utils/init_canvas.js";

import {FQuantity} from "../basic_objects/quantity.js";
import {Point, DPoint, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {LinePP} from "../basic_objects/line.js";
import {CirclePR} from "../basic_objects/circle.js";

import {incenter_coords, incenter_radius} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";
import { VectorPP, FVector } from "../basic_objects/vector.js";

const
wp = WorkPlane.with("#malfatti_circles", 100),

a = new DPoint(0,2),
b = new DPoint(-2.5,-2),
c = new DPoint(2.5,-1),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

i = new FPoint(incenter_coords, [a,b,c]),

a_cev = new PolyLine([a,i]),
b_cev = new PolyLine([b,i]),
c_cev = new PolyLine([c,i]),

rad = new FQuantity(incenter_radius, [a,b,c]),

i_a = new FPoint(incenter_coords, [i,b,c]),
i_b = new FPoint(incenter_coords, [a,i,c]),
i_c = new FPoint(incenter_coords, [a,b,i]),

r_a = new FQuantity(incenter_radius, [i,b,c]),
r_b = new FQuantity(incenter_radius, [a,i,c]),
r_c = new FQuantity(incenter_radius, [a,b,i]),

ic_a = new CirclePR(i_a,r_a),
ic_b = new CirclePR(i_b,r_b),
ic_c = new CirclePR(i_c,r_c),

l_bc = new LinePP(i_b,i_c),
l_ca = new LinePP(i_c,i_a),
l_ab = new LinePP(i_a,i_b),

x = new LinePP(FPoint.reflect_in_line(a, l_bc), FPoint.reflect_in_line(i, l_bc)),
y = new LinePP(FPoint.reflect_in_line(b, l_ca), FPoint.reflect_in_line(i, l_ca)),
z = new LinePP(FPoint.reflect_in_line(c, l_ab), FPoint.reflect_in_line(i, l_ab)),

da = new FQuantity(Point.dist, [b,c]),
db = new FQuantity(Point.dist, [c,a]),
dc = new FQuantity(Point.dist, [a,b]),
d = new FQuantity(Point.dist, [i,a]),
e = new FQuantity(Point.dist, [i,b]),
f = new FQuantity(Point.dist, [i,c]),
s = new FQuantity((a,b,c)=>(a.v+b.v+c.v)/2, [da,db,dc]),

malf_rad = (s,l,r,d,e,f) => {console.log(); return r.v*(s.v-r.v+d.v-e.v-f.v)/(2*(s.v-l.v))},

mr1 = new FQuantity(malf_rad, [s,da,rad,d,e,f]),
mr2 = new FQuantity(malf_rad, [s,db,rad,e,f,d]),
mr3 = new FQuantity(malf_rad, [s,dc,rad,f,d,e]),

div = (a,b)=>a.v/b.v,

mc1 = FPoint.add_vector(a, FVector.multiply(new VectorPP(a,i), new FQuantity(div,[mr1,rad]))),
mc2 = FPoint.add_vector(b, FVector.multiply(new VectorPP(b,i), new FQuantity(div,[mr2,rad]))),
mc3 = FPoint.add_vector(c, FVector.multiply(new VectorPP(c,i), new FQuantity(div,[mr3,rad]))),

m1 = new CirclePR(mc1, mr1),
m2 = new CirclePR(mc2, mr2),
m3 = new CirclePR(mc3, mr3);

wp.append(inn_t, {"fill": color.blue.w100});
wp.append([a_cev,b_cev,c_cev], {"stroke": color.amber.w500, "stroke-width": 2});
wp.append(t, {"stroke": color.blue.w500});
wp.append([ic_a, ic_b, ic_c], {"stroke": color.amber.w800, "stroke-width": 3});
wp.append([x,y,z], {"stroke": color.purple.w500, "stroke-width": 2});
wp.append([m1, m2, m3], {"stroke": color.pink.w500});
wp.append([a,b,c], {"fill": color.blue.w800, "stroke-width": 2});

wp.end();
