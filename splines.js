var bspline = require('b-spline');
 
var points = [
  [ 0.0, -5],
  [-5, -5],
 
  [-5,  0.0],
  [-5,  5],
 
  [ 0.0,  5],
  [ 5,  5],
 
  [ 5,  0.0],
  [ 5, -5],
  [ 0.0, -5]  // P0 
]
 
// Here the curve is called non-uniform as the knots  
// are not equally spaced 
 
var knots = [
  0, 0, 0, 1/4, 1/4, 1/2, 1/2, 3/4, 3/4, 1, 1, 1
];
 
var degree = 2;

module.exports = function (_) {
  var CSG = _.CSG
  var stations = []
  for(var i = 0; i <= 20; i++) {
    var w = Math.pow(2, (i/7) - 1) / 2;
    // and rational as its control points have varying weights 
    var weights = [
      1, w, 1, w, 1, w, 1, w, 1
    ]

    var out = []
    for(var t=0; t<1; t+=0.01) {
      out.push(bspline(t, degree, points, knots, weights))
    }
    stations.push(CSG.Polygon.createFromPoints(out, null, CSG.Plane.fromPoints.apply(null, out)))
  }
  var Stations = require('./stations')(_)
  return Stations(stations)
}















