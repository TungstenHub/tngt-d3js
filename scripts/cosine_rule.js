import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, FPoint, Point} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {ActionButton} from "../basic_objects/button.js";
import {AngleQPR} from "../basic_objects/angle.js";
import {Quantity, FQuantity} from "../basic_objects/quantity.js";
import {Text} from "../basic_objects/text.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#cosine_rule", 225, 0, -0.1),

scale = new Quantity(1+9*Math.random()),

rotZ = a => ([x,y,z]) => {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return [c*x - s*y, s*x + c*y, z];
},
rotX = a => ([x,y,z]) => {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return [x, c*y + s*z, -s*y + c*z];
},
rd = () => {
    const a1 = 2*Math.PI*Math.random();
    const a2 = 1.4*Math.random();
    const a3 = 2*Math.PI*Math.random();
    const t = p => rotZ(a3)(rotX(a2)(rotZ(a1)(p)));
    return [[1,0,0],[-0.5,Math.sqrt(3)/2,0],[-0.5,-Math.sqrt(3)/2,0]]
           .map(t).map(([x,y,z]) => [x,y]);
},
rd0 = rd(),

a = new DPoint(...rd0[0]),
b = new DPoint(...rd0[1]),
c = new DPoint(...rd0[2]),
alpha = new AngleQPR(c,a,b),

t = new PolyLine([c,a,b]),
inn_t = new PolyLine([a,b,c,a]),
l = new PolyLine([b,c]),

side_anchor = d => (p,q,r) => {
    const mx = (q.x+r.x) / 2;
    const my = (q.y+r.y) / 2;
    let vx = r.y-q.y;
    let vy = -r.x+q.x;
    const s = Math.sqrt(vx*vx + vy*vy);
    if ((p.x-q.x)*vx + (p.y-q.y)*vy > 0) { vx = -vx; vy = -vy; }
    return {x: mx+d*vx/s, y: my+d*vy/s};
},

sa = new FPoint(side_anchor(0.3), [a,b,c]),
sb = new FPoint(side_anchor(0.3), [b,c,a]),
sc = new FPoint(side_anchor(0.3), [c,a,b]),

angle_anchor = d => (p,q,r) => {
    const a = Math.atan2(q.y-p.y,q.x-p.x);
    const b = Math.atan2(r.y-p.y,r.x-p.x);
    const c = (a+b)/2 + (Math.abs(a-b) > Math.PI ? 0 : Math.PI);
    // 1.2 is correction for long labels
    return {x: 1.2*p.x+d*Math.cos(c), y: p.y+d*Math.sin(c)};
},

aa = new FPoint(angle_anchor(0.2), [a,b,c]),

x2 = a => a.toFixed(2),

value = (p,q,s) => (Math.sqrt((q.x-p.x)**2 + (q.y-p.y)**2)*s.v),
label = l => d => `${l} = ${x2(d.v)}`,

va = new FQuantity(value,[b,c,scale]),
vb = new FQuantity(value,[c,a,scale]),
vc = new FQuantity(value,[a,b,scale]),
vx = new FQuantity((a,b,c) => 
    x2(Math.acos((b.v**2+c.v**2-a.v**2)/(2*b.v*c.v))*180/Math.PI) + 'º'
,[va,vb,vc]),

tx = new Text(sa, new Quantity("a = ?")),
ta = new Text(sa, new FQuantity(label('a'),[va])),
tb = new Text(sb, new FQuantity(label('b'),[vb])),
tc = new Text(sc, new FQuantity(label('c'),[vc])),
th = new Text(aa, new FQuantity(x => `α = ${x.v}`,[vx])),

e0 = (a,b,c,x) => 'a² = b² + c² - 2 b c cos α',
e1 = (a,b,c,x) => `\xa0\xa0\xa0= ${x2(b)}² + ${x2(c)}² - 2 × ${x2(b)} × ${x2(c)} × cos(${x})`,
e2 = (a,b,c,x) => `\xa0\xa0\xa0= ${x2(a*a)}`,
e3 = (a,b,c,x) => `=> a = ${x2(a)}`,

expl = [e0,e1,e2,e3].map((f,i) => new Text(new Point(-2.05,-1.13-0.1*i), 
    new FQuantity((a,b,c,x) => f(a.v,b.v,c.v,x.v),[va,vb,vc,vx])));

wp.append(inn_t, {"fill": color.lightblue.w100});
wp.append(alpha, {"fill": color.lightblue.w300,"in_r": 40,"ex_r": 44});
wp.append(l, {"stroke": color.green.a700});
wp.append(t, {"stroke": color.lightblue.w500});

wp.append([ta,tb,tc,th], {
    "fill": color.lightblue.w900, "font-weight": "bold",
    "font-size": "21px", "font-family": "source code pro", 
});
wp.append([tx], {
    "fill": color.green.a700, "font-weight": "bold",
    "font-size": "21px", "font-family": "source code pro", 
});
wp.append(expl, {"fill": 'black', "font-weight": "bold", "text-anchor": "start",
    "font-size": "18px", "font-family": "source code pro"});
wp.append([a,b,c], {"fill": color.lightblue.w800});

wp.append(new ActionButton(
    [0,0],
    'reload', 
    () => {
        scale.setValue(1+9*Math.random());
        let nrd = rd();
        a.setCoords(...nrd[0]);
        b.setCoords(...nrd[1]);
        c.setCoords(...nrd[2]);
        tx.setVisible(true);
        ta.setVisible(false);
        expl.forEach(e => e.setVisible(false));
    }), 
    {"fill": color.blue.w800}
);

wp.append(new ActionButton(
    [1,0],
    'question', 
    () => { 
        tx.toggleVisible(); 
        ta.toggleVisible(); 
        expl.forEach(e => e.toggleVisible(false));
    }), 
    {"fill": color.green.w800}
);

ta.setVisible(false);
expl.forEach(e => e.setVisible(false));

wp.end();