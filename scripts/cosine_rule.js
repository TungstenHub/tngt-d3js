import {WorkPlane} from "../utils/init_canvas.js";

import {DPoint, Point, FPoint} from "../basic_objects/point.js";
import {PolyLine} from "../basic_objects/polyline.js";
import {ActionButton} from "../basic_objects/button.js";
import {Text} from "../basic_objects/text.js";

import {orthocenter_coords} from "../utils/triangle_coordinates.js";
import {mdColor as color} from "../utils/material_color.js";
import { Quantity } from "../basic_objects/quantity.js";
import { VectorPP, FVector } from "../basic_objects/vector.js";

const
wp = WorkPlane.with("#cosine_rule", 300),

rand_coord = () => {
    let x, y;
    for (;;) {
        x = 2*Math.random() - 1;
        y = 2*Math.random() - 1;
        if (x*x + y*y < 1) return [x, y]
    }
},

a = new DPoint(...rand_coord()),
b = new DPoint(...rand_coord()),
c = new DPoint(...rand_coord()),

t = new PolyLine([a,b,c,a]),
inn_t = new PolyLine([a,b,c,a]),

// h = new FPoint(orthocenter_coords, [a,b,c]),
// p = FPoint.int_ab_cd(a,h,b,c),
// q = FPoint.int_ab_cd(b,h,c,a),
// r = FPoint.int_ab_cd(c,h,a,b),

// a_cev = new PolyLine([a,p]),
// b_cev = new PolyLine([b,q]),
// c_cev = new PolyLine([c,r]),

// a_cev_aux = new PolyLine([a,h]),
// b_cev_aux = new PolyLine([b,h]),
// c_cev_aux = new PolyLine([c,h]),

ab = new VectorPP(a,b),
bc = new VectorPP(b,c),
ca = new VectorPP(c,a),

mid_b = FPoint.midp(a,c),
vb = FVector.perp(ca),
b_side = new Text(FPoint.add_vector(mid_b,vb), new Quantity(`b=10.5º`)),

reload = new ActionButton([0,0],'reload', () => {
    a.set_coords(...rand_coord());
    b.set_coords(...rand_coord());
    c.set_coords(...rand_coord());
    a.setVisible(true);
}),
solution = new ActionButton([1,0],'light', ()=>a.toggleVisible());

wp.append(inn_t, {"fill": color.blue.w100});

// wp.append([a_cev,b_cev,c_cev], {"stroke": color.deeppurple.w500});

// wp.append([a_cev_aux,b_cev_aux,c_cev_aux], {
//     "stroke": color.deeppurple.w500,
//     "stroke-width": 4.5, 
//     "stroke-dasharray": ("10, 10")
// });

wp.append(t, {"stroke": color.blue.w500});

// wp.append(h, {"fill": color.deeppurple.w800});

wp.append(b_side, {"fill": color.blue.w800});

wp.append([a,b,c], {"fill": color.blue.w800});

wp.append(reload, {"fill": color.blue.w800});
wp.append(solution, {"fill": color.amber.w800});

wp.end();