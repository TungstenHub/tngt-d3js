import {WorkPlane} from "../utils/init_canvas.js";

import {FPoint} from "../basic_objects/point.js";
import {Slider} from "../basic_objects/quantity.js";

import {mdColor as color} from "../utils/material_color.js";

const
wp = WorkPlane.with("#numerical_flowers", 150, 0, 0.2),

a = new Slider(0.0, 1.0, 0, 1.85, 5, 0.618),

flower = n => a => {
    const k = 0.1*Math.sqrt(n);
    return {
        x:k*Math.cos(2*Math.PI*a.v*n), 
        y:k*Math.sin(2*Math.PI*a.v*n)
    }
},

seeds = Array(200).fill().map((x,i) => new FPoint(flower(i),[a]));

wp.append(a, {"fill": color.amber.w500});
wp.append(seeds, {"fill": color.blue.w500, "r":4});

wp.end();