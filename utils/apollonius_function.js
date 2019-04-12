import {FPoint} from "../basic_objects/point.js";
import {FQuantity} from "../basic_objects/quantity.js";
import {CirclePR} from "../basic_objects/circle.js";

const apollonius = function(c1,c2,c3,s1,s2,s3) {
    let a = 2*(c1.p.x-c2.p.x);
    let b = 2*(c1.p.y-c2.p.y);
    let c = 2*(s1*c1.r-s2*c2.r);
    let d = (c1.p.x*c1.p.x+c1.p.y*c1.p.y-c1.r*c1.r)-(c2.p.x*c2.p.x+c2.p.y*c2.p.y-c2.r*c2.r);
    let aa = 2*(c1.p.x-c3.p.x);
    let bb = 2*(c1.p.y-c3.p.y);
    let cc = 2*(s1*c1.r-s3*c3.r);
    let dd = (c1.p.x*c1.p.x+c1.p.y*c1.p.y-c1.r*c1.r)-(c3.p.x*c3.p.x+c3.p.y*c3.p.y-c3.r*c3.r);
    let P = (b*cc-bb*c)/(a*bb-b*aa);
    let Q = (bb*d-b*dd)/(a*bb-b*aa);
    let R = (aa*c-a*cc)/(a*bb-b*aa);
    let S = (a*dd-aa*d)/(a*bb-b*aa);
    let A = Q-c1.p.x;
    let B = S-c1.p.y;
    let Z = -s1*c1.r;
    if (Math.pow(A*P+B*R+Z,2)-(P*P+R*R-1)*(A*A+B*B-Z*Z) >= 0) {
        let r = (-A*P-B*R-Z+Math.sqrt(Math.pow(A*P+B*R+Z,2)-(P*P+R*R-1)*(A*A+B*B-Z*Z)))/(P*P+R*R-1);
        return {p:{x:P*r+Q, y:R*r+S},r:Math.abs(r)};
    } else return {p:{x:50, y:0},r:0};
};

const apollonius_factory = function(c1,c2,c3,s1,s2,s3) {
    const 
    d = new FPoint(
        (c1,c2,c3) => apollonius(c1,c2,c3,s1,s2,s3).p,
        [c1,c2,c3]
    ),
    r = new FQuantity(
        (c1,c2,c3) => apollonius(c1,c2,c3,s1,s2,s3).r,
        [c1,c2,c3]
    );
    return new CirclePR(d,r);
}

export {apollonius, apollonius_factory};