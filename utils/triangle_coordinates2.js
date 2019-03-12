import {Point} from "./basic_objects2.js";

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
    return Point.with((p*A.x+q*B.x+r*C.x)/(p+q+r),
                      (p*A.y+q*B.y+r*C.y)/(p+q+r));
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

/**
 * Intersection of cevian AD with side BC
 * @param {Point} A - triangle vertex
 * @param {Point} B - triangle vertex
 * @param {Point} C - triangle vertex
 * @param {Point} D - anchor
 * @return {Point} - intersection
 */
function cevian_int(A, B, C, D){
    let [, q, r] = get_bar_coords(A, B, C, D);
    return Point.with((q*B.x+r*C.x)/(q+r),
                      (q*B.y+r*C.y)/(q+r));
}

export {from_bar_coords, get_bar_coords, cevian_int};