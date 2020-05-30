import {WorkPlane} from "../utils/init_canvas.js";

import {Point, DPoint, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {CircleDiam, Arc3P} from "../basic_objects/circle.js";
import {LinePP, Line} from "../basic_objects/line.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#square_projective_quadrilateral", 100),

a = new Point(0,0),
b = new DPoint(-1, -1),
c = new DPoint(-0.7, -1.6),
d = new DPoint(-0.1, -1.284),

t = new PolyLine([a,b,c,d,a]),

o = FPoint.int_ab_cd(a,c,b,d),
p = FPoint.int_ab_cd(a,b,c,d),
q = FPoint.int_ab_cd(b,c,d,a),
f = new LinePP(p,q),
g = Line.parallel(a,f),

h = FPoint.int_lines(new LinePP(c,d), g),
k = FPoint.int_lines(new LinePP(b,c), g),
s = FPoint.int_lines(new LinePP(b,d), g),

m = FPoint.midp(a,h),
n = FPoint.midp(a,k),

[o1, o2] = FPoint.int_circles(new CircleDiam(a,s), new CircleDiam(m,n)),

oo = new FPoint(
    (o,o1,o2) => Point.dist(o,o1) >= Point.dist(o,o2) ? o1 : o2,
    [o,o1,o2]
),

u = new Arc3P(a,oo,s),
v = new Arc3P(m,oo,n),

cc = FPoint.reflect_over_point(a,oo),
bb = FPoint.int_ab_cd(s,oo,k,cc),
dd = FPoint.int_ab_cd(s,oo,h,cc),

tt = new PolyLine([a,bb,cc,dd,a]),

pab = new PolyLine([p,FPoint.midp(a,b)]),
qad = new PolyLine([q,FPoint.midp(a,d)]),
ph = new PolyLine([p,FPoint.midp(c,d),h]),
qk = new PolyLine([q,FPoint.midp(c,b),k]),
pm = new PolyLine([p,m]),
qn = new PolyLine([q,n]),
bsd = new PolyLine([b,s,d]),
ca = new PolyLine([c,a]),

mab = FPoint.midp(a,bb),
mcb = FPoint.midp(cc,bb),
mad = FPoint.midp(a,dd),
mcd = FPoint.midp(cc,dd),

hccdd = new PolyLine([mcd,h]),
kccbb = new PolyLine([mcb,k]),
oom = new PolyLine([mcb,m,mad]),
oon = new PolyLine([mab,n,mcd]),
bbsdd = new PolyLine([bb,s,dd]),
cca = new PolyLine([cc,a]),

xab = FPoint.midp(a,mab),
xba = FPoint.midp(bb,mab),
xcb = FPoint.midp(cc,mcb),
xbc = FPoint.midp(bb,mcb),
xad = FPoint.midp(a,mad),
xda = FPoint.midp(dd,mad),
xcd = FPoint.midp(cc,mcd),
xdc = FPoint.midp(dd,mcd),

gabdc = FPoint.midp(a,n),
gbacd = FPoint.midp(n,k),
gadbc = FPoint.midp(a,m),
gdacb = FPoint.midp(m,h),

yab = FPoint.int_ab_cd(gabdc,q,a,b),
yba = FPoint.int_ab_cd(gbacd,q,b,a),
ycb = FPoint.int_ab_cd(gdacb,p,c,b),
ybc = FPoint.int_ab_cd(gadbc,p,b,c),
yad = FPoint.int_ab_cd(gadbc,p,a,d),
yda = FPoint.int_ab_cd(gdacb,p,d,a),
ycd = FPoint.int_ab_cd(gbacd,q,c,d),
ydc = FPoint.int_ab_cd(gabdc,q,d,c),

xabxdc = new PolyLine([xab,xdc]),
xbaxcd = new PolyLine([xba,xcd]),
xadxbc = new PolyLine([xad,xbc]),
xdaxcb = new PolyLine([xda,xcb]),

yabydc = new PolyLine([yab,ydc]),
ybaycd = new PolyLine([yba,ycd]),
yadybc = new PolyLine([yad,ybc]),
ydaycb = new PolyLine([yda,ycb]);

wp.append([yabydc,ybaycd,yadybc,ydaycb], {"stroke": color.green.w500+'80', "stroke-width": 2});
wp.append([xabxdc,xbaxcd,xadxbc,xdaxcb], {"stroke": color.orange.w500+'80', "stroke-width": 2});
wp.append([pab,qad,ph,qk,pm,qn,bsd,ca], {"stroke": color.green.w500, "stroke-width": 2});
wp.append([hccdd,kccbb,oom,oon,bbsdd,cca], {"stroke": color.orange.w500, "stroke-width": 2});
wp.append(t, {"stroke": color.blue.w500});
wp.append(tt, {"stroke": color.pink.w500});
wp.append(f, {"stroke": color.teal.w500, "stroke-width": 3});
wp.append(g, {"stroke": color.lime.w500, "stroke-width": 3});
wp.append([u,v], {"stroke": color.amber.w500, "stroke-width": 4});
wp.append([p,q], {"fill": color.teal.w800, "r":5});
wp.append([h,k,s,m,n], {"fill": color.lime.w800, "r":5});
wp.append(oo, {"fill": color.orange.w800, "r":6});
wp.append(o, {"fill": color.green.w800, "r":6});
wp.append([bb,cc,dd], {"fill": color.pink.w800});
wp.append([a,b,c,d], {"fill": color.blue.w800});

wp.end();
