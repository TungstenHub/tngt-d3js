
/** Point */
class Point {
    constructor (x, y) {
        this.x = x
        this.y = y
    }

    static with(x, y) {
        return new Point(x, y);
    }
}

/**
 * Distance between points
 * @param {Point} A 
 * @param {Point} B
 * @return {number} 
 */
function dist(A, B){
    var dx = A.x - B.x;
    var dy = A.y - B.y;
    return Math.sqrt(dx*dx + dy*dy);
}

export {Point, dist}