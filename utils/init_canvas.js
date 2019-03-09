(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

/**
 * 
 * @param {svg} svg - initial svg d3.select(".···")
 * @param {number} radius - scaling factor
 * @param {number} off_x - units to displace in the x-axis
 * @param {number} off_y - units to displace in the y-axis
 * @return {Object[]} list [width, height, x, y], where x and y are scaling functions
 */
function init_canvas(svg, radius, off_x = 0, off_y = 0){
    let width = +svg.attr("width");
    let height = +svg.attr("height");
    let x = d3.scaleLinear().domain([off_x, off_x+width/(2*radius)]).range([width/2, width]);
    let y = d3.scaleLinear().domain([off_y, off_y+height/(2*radius)]).range([height/2, 0]);
    return [width, height, x, y]
}

exports.init_canvas = init_canvas;

Object.defineProperty(exports, '__esModule', { value: true });

})));