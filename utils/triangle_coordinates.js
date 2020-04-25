import {Point} from "../basic_objects/point.js";

/**
 * Returns a point from its barycentric coordinates
 * @param {Point} A - triangle vertex
 * @param {Point} B - triangle vertex
 * @param {Point} C - triangle vertex
 * @param {number[]} bar - barycentric coordinates
 * @return {Point} - anchor
 */
function from_bar_coords(A, B, C, bar){
    let [p, q, r] = bar;
    return {x:(p*A.x+q*B.x+r*C.x)/(p+q+r),
            y:(p*A.y+q*B.y+r*C.y)/(p+q+r)};
}

/**
 * Returns the barycentric coordinates of a given point
 * @param {Point} A - triangle vertex
 * @param {Point} B - triangle vertex
 * @param {Point} C - triangle vertex
 * @param {Point} D - anchor
 * @return {number[]} - barycentric coordinates
 */
function get_bar_coords(A, B, C, D){
    let l1 = (B.y-C.y)*(D.x-C.x) - (B.x-C.x)*(D.y-C.y);
    let l2 = (C.y-A.y)*(D.x-C.x) - (C.x-A.x)*(D.y-C.y);
    let l  = (B.y-C.y)*(A.x-C.x) - (B.x-C.x)*(A.y-C.y);
    return [l1/l, l2/l, 1-(l1+l2)/l];
}

function centroid_coords(A, B, C) {
    const bar = [1,1,1];
    return from_bar_coords(A,B,C,bar);
}

function incenter_coords(A, B, C) {
    const bar = [Point.dist(B,C),Point.dist(C,A),Point.dist(A,B)];
    return from_bar_coords(A,B,C,bar);
}

function incenter_radius(A, B, C){
    return Math.abs(
        - A.y*B.x + A.x*B.y 
        + A.y*C.x - B.y*C.x 
        - A.x*C.y + B.x*C.y
        )/(Point.dist(A,B)+Point.dist(B,C)+Point.dist(C,A))
}

function excenter_coords(A, B, C) {
    const bar = [-Point.dist(B,C),Point.dist(C,A),Point.dist(A,B)];
    return from_bar_coords(A,B,C,bar);
}

function excenter_radius(A, B, C){
    return Math.abs(
        - A.y*B.x + A.x*B.y 
        + A.y*C.x - B.y*C.x 
        - A.x*C.y + B.x*C.y
        )/(Point.dist(A,B)-Point.dist(B,C)+Point.dist(C,A))
}

function circumcenter_coords(A, B, C){
    const a = Point.dist(B,C);
    const b = Point.dist(C,A);
    const c = Point.dist(A,B);
    const aa = a*a*(a*a-b*b-c*c);
    const bb = b*b*(b*b-c*c-a*a);
    const cc = c*c*(c*c-a*a-b*b);
    const bar = [aa, bb, cc];
    return from_bar_coords(A,B,C,bar);
}

function circumcenter_radius(A, B, C){
    return (Point.dist(A,B)*Point.dist(B,C)*Point.dist(C,A))/
    (2*Math.abs(-A.y*B.x + A.x*B.y + A.y*C.x - B.y*C.x - A.x*C.y + B.x*C.y));
}

function orthocenter_coords(A, B, C) {
    const a = Point.dist(B,C);
    const b = Point.dist(C,A);
    const c = Point.dist(A,B);
    const aa = (a*a+b*b-c*c)*(a*a-b*b+c*c);
    const bb = (b*b+c*c-a*a)*(b*b-c*c+a*a);
    const cc = (c*c+a*a-b*b)*(c*c-a*a+b*b);
    const bar = [aa, bb, cc];
    return from_bar_coords(A,B,C,bar);
}

function gergonne_coords(A, B, C) {
    const a = Point.dist(B,C);
    const b = Point.dist(C,A);
    const c = Point.dist(A,B);
    const aa = b+c-a;
    const bb = c+a-b;
    const cc = a+b-c;
    const bar = [bb*cc, cc*aa, aa*bb];
    return from_bar_coords(A,B,C,bar);
}

function isotomic_conjugate(A, B, C, D) {
    const [p,q,r] = get_bar_coords(A,B,C,D);
    const bar = [q*r, r*p, p*q];
    return from_bar_coords(A,B,C,bar);
}

export {
    from_bar_coords, 
    get_bar_coords, 
    centroid_coords,
    incenter_coords,
    incenter_radius,
    excenter_coords,
    excenter_radius,
    circumcenter_coords,
    circumcenter_radius,
    orthocenter_coords,
    gergonne_coords,
    isotomic_conjugate
};