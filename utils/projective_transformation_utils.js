function get_projective_transformation(start_points, end_points){
  // documented from 
  // https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript

  // extracting coordinates
  let sx0 = start_points[0].x;
  let sy0 = start_points[0].y;
  let sx1 = start_points[1].x;
  let sy1 = start_points[1].y;
  let sx2 = start_points[2].x;
  let sy2 = start_points[2].y;
  let sx3 = start_points[3].x;
  let sy3 = start_points[3].y;
  let ex0 = end_points[0].x;
  let ey0 = end_points[0].y;
  let ex1 = end_points[1].x;
  let ey1 = end_points[1].y;
  let ex2 = end_points[2].x;
  let ey2 = end_points[2].y;
  let ex3 = end_points[3].x;
  let ey3 = end_points[3].y;

  let v1 = math.multiply(math.inv(math.matrix([[1,1,1],[sx0,sx1,sx2],[sy0,sy1,sy2]])), math.matrix([1,sx3,sy3]));
  let diagv1 = math.diag(v1);
  let A = math.multiply(math.matrix([[1,1,1],[sx0,sx1,sx2],[sy0,sy1,sy2]]), diagv1);

  let v2 = math.multiply(math.inv(math.matrix([[1,1,1],[ex0,ex1,ex2],[ey0,ey1,ey2]])), math.matrix([1,ex3,ey3]));
  let diagv2 = math.diag(v2);
  let B = math.multiply(math.matrix([[1,1,1],[ex0,ex1,ex2],[ey0,ey1,ey2]]), diagv2);

  return math.multiply(B,math.inv(A))
}

function direct_transform(matrix, point){
  let v = [1,point.x,point.y];
  let w = math.multiply(matrix,v);
  return {x:w.subset(math.index(1))/w.subset(math.index(0)),y:w.subset(math.index(2))/w.subset(math.index(0))}
}

export {
  get_projective_transformation,
  direct_transform,
};