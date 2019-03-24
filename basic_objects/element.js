class Element {
    constructor () {
        this.dependents = [];
        this.phys = null;
        this.default_attrs = {};
        this.wp = null;
    }

    insertInto(wp, attrs) {
        this.wp = wp;
        let new_attrs = Object.assign({}, this.default_attrs, attrs);
        for (let key in new_attrs) {
            this.phys.attr(key, new_attrs[key]);
        }
        this.phys.data([this]);
        this.draw();
    }

    /**
     * Update inner data when prior objects have already been updated
     */
    update() {}

    /**
     * Draw the physical representation
     */
    draw() {}

    update_total() {
        this.update();
        if (this.phys != null) this.draw();
        for (let dep of this.dependents) {
            dep.update_total();
        }
    }
}

export{Element}