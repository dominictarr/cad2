
var A = 0.1, B = -0, C = 0

function f (x) {
  return (3*Math.pow(x, 2)/25 - 3*x/5 + 10)
}

module.exports = function (_) {
  var CSG = _.CSG

  var points = []
  for(var x = -100; x <= 100; x ++)
    points.push([x, f(x)]) //A*Math.pow(x, 2) + B*x + C])

  return CSG.Polygon.createFromPoints(points, null, CSG.Plane.fromPoints.apply(null, points)).extrude(new CSG.Vector3D(0,0,1))
}

