import {Element} from "./element.js";
import {FPoint} from "./point.js";

/** Complex */
class Complex extends Element {
    constructor (x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    insertInto(wp, attrs={}) {
        this.as_point().insertInto(wp, attrs)
    }

    as_point() {
        return new FPoint(c => c, [this])
    }

    ////

    add(other) {
        return new FComplex(
            (a,b) => {return {x: a.x + b.x, y: a.y + b.y}}, 
            [this,other]
        )
    }

    mul(other) {
        return new FComplex(
            (a,b) => {return {x: a.x*b.x - a.y*b.y, y: a.x*b.y + a.y*b.x}}, 
            [this,other]
        )
    }

}

/** Functional Complex */
class FComplex extends Complex {
    constructor (f, array) {
        super(f(...array).x, f(...array).y);
        this.f = f;
        this.array = array;
        for (let e of array) {
            e.dependents.push(this);
        }
    }

    update() {
        this.x = this.f(...this.array).x;
        this.y = this.f(...this.array).y;
    }

    static of(point) {
        return new FComplex(p => p, [point]);
    }

}

/** Functional Complex */
class PComplex extends FComplex {
    constructor (p) {
        super(p => p, [p]);
    }

    insertInto(wp, attrs={}) {
        this.array[0].insertInto(wp, attrs)
    }

}

export{
    Complex,
    FComplex,
    PComplex
}