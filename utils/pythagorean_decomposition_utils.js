const snapToUpperSemicircle = (p, _) => {
    if (p.y <= 0) {
        if (p.x < 0) return {x:-1, y:0};
        else return {x:1, y:0};
    } else {
        const l = Math.sqrt(p.x*p.x + p.y*p.y);
        return {x:p.x/l, y:p.y/l};
    } 
}

const snapToUpperQuarter = (p, _) => {
    if (p.x <= 0 || p.y <= 0) {
        if (p.x < p.y) return {x:0, y:1};
        else return {x:1, y:0};
    } else {
        const l = Math.sqrt(p.x*p.x + p.y*p.y);
        return {x:p.x/l, y:p.y/l};
    } 
}

export {snapToUpperSemicircle, snapToUpperQuarter};