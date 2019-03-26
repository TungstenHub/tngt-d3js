import {Element} from "./element.js";

/** Quantity */
class Quantity extends Element {
    constructor (v) {
        super();
        this.v = v;
    }

    static with(v) {
        return new Quantity(v);
    }

    insertInto(wp, attrs) {
        throw new Error('Quantities cannot be represented in a SVG');
    }
}

/** Functional Quantity */
class FQuantity extends Quantity {
    constructor (f, array) {
        super(f(...array));
        this.f = f;
        this.array = array;
        for (let e of array) {
            e.dependents.push(this);
        }
    }

    update() {
        this.v = this.f(...this.array);
    }
}

class Time extends Quantity {
    constructor (lapse) {
        super(0);
        this.lapse = lapse
        this.sInt = setInterval(() => {
            this.v++;
            this.update_total();
        }, lapse);
    }

    clear() {clearInterval(this.sInt);}

}

export{Quantity, FQuantity, Time}