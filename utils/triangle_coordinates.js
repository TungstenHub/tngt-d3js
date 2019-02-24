(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

/** Point */
class Point {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
}

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
    return {x:(q*B.x+r*C.x)/(q+r),
            y:(q*B.y+r*C.y)/(q+r)};
}


exports.from_bar_coords = from_bar_coords;
exports.get_bar_coords = get_bar_coords;
exports.cevian_int = cevian_int;

Object.defineProperty(exports, '__esModule', { value: true });

})));