import {Vector} from "../basic_objects/vector.js";

/**
 * Retraction of a point into a triangle
 */
function inside_triangle(p, [a,b,c]) {
    const
    ab = new Vector(b.x-a.x, b.y-a.y),
    bc = new Vector(c.x-b.x, c.y-b.y),
    ca = new Vector(a.x-c.x, a.y-c.y),
    n_ab = new Vector(-b.y+a.y, b.x-a.x),
    n_bc = new Vector(-c.y+b.y, c.x-b.x),
    n_ca = new Vector(-a.y+c.y, a.x-c.x),
    ap = new Vector(p.x-a.x, p.y-a.y),
    bp = new Vector(p.x-b.x, p.y-b.y),
    cp = new Vector(p.x-c.x, p.y-c.y),
    inside_ab = n_ab.dot(ap) * n_ab.dot(ca) <= 0,
    inside_bc = n_bc.dot(bp) * n_bc.dot(ab) <= 0,
    inside_ca = n_ca.dot(cp) * n_ca.dot(bc) <= 0,
    abap = ab.dot(ap),
    bcbp = bc.dot(bp),
    cacp = ca.dot(cp),
    abab = ab.dot(ab),
    bcbc = bc.dot(bc),
    caca = ca.dot(ca),
    projects_on_ab = 0 <= abap && abap <= abab,
    projects_on_bc = 0 <= bcbp && bcbp <= bcbc,
    projects_on_ca = 0 <= cacp && cacp <= caca;
    
    if (projects_on_ab && !inside_ab) {
        const t = abap/abab;
        return {x:a.x+t*ab.x ,y:a.y+t*ab.y}
    } else if (projects_on_bc && !inside_bc) {
        const t = bcbp/bcbc;
        return {x:b.x+t*bc.x ,y:b.y+t*bc.y}
    } else if (projects_on_ca && !inside_ca) {
        const t = cacp/caca;
        return {x:c.x+t*ca.x ,y:c.y+t*ca.y}
    } else if (cacp > caca && abap < 0) {
        return a
    } else if (abap > abab && bcbp < 0) {
        return b
    } else if (bcbp > bcbc && cacp < 0) {
        return c
    } else {
        return p
    }
}

export {
    inside_triangle
};