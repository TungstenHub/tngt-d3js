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

    static conj = a => {return {x: a.x, y: -a.y}}
    static add = (a,b) => {return {x: a.x + b.x, y: a.y + b.y}}
    static sub = (a,b) => {return {x: a.x - b.x, y: a.y - b.y}}
    static mul = (a,b) => {return {x: a.x*b.x - a.y*b.y, y: a.x*b.y + a.y*b.x}}

    static div = (a,b) => {
        let d = b.x*b.x + b.y*b.y; 
        return {x: (a.x*b.x + a.y*b.y)/d, y: (-a.x*b.y + a.y*b.x)/d}}

    static pow = (a,n) => {
        let u = {x: 1, y: 0}
        for (let i=0; i<n; i++) {
            u = Complex.mul(u,a)
        }
        return u
    }

    ////

    conj() {
        return new FComplex(
            Complex.conj, 
            [this]
        )
    }

    add(other) {
        return new FComplex(
            Complex.add, 
            [this,other]
        )
    }

    sub(other) {
        return new FComplex(
            Complex.sub, 
            [this,other]
        )
    }

    mul(other) {
        return new FComplex(
            Complex.mul, 
            [this,other]
        )
    }

    div(other) {
        return new FComplex(
            Complex.div, 
            [this,other]
        )
    }

    pow(n) {
        return new FComplex(
            a => Complex.pow(a,n), 
            [this]
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