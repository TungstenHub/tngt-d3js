/**
 * Let P, Q, O be three points, and A, B be the circles
 * centered at P, Q passing through O
 * Then A and B intersect at this another point
 */
function int_pair(P,Q,O) {
    const a = P.x-O.x;
    const b = P.y-O.y;
    const c = Q.x-O.x;
    const d = Q.y-O.y;
    const t = 2*(a*d-b*c)/((a-c)*(a-c)+(b-d)*(b-d));
    return {x: O.x + t*(d-b), y: O.y + t*(a-c)}
}

export {
    int_pair
};