
var naca = require('../naca')

module.exports = function (_) {

  CSG = _.CSG

  function poly (points) {
    return CSG.Polygon.createFromPoints(points, null, CSG.Plane.fromPoints.apply(null, points))
  }

  var points = []
  var width = 12, t = 0.20, N=50
  for(var i = 0; i <= N; i++) {
    var x = i/N
    points.push([x*width, naca(t, x)*width, 0])
  }
  points.push([0, 0, 0])

  return poly(points)
    .extrude(new CSG.Vector3D(0,0, 65), 1)
    .rotate([0,0,0], [1,0,0], 90)
//    .subtract(
//      CSG.cube({
//        corner1: [6, 1.2, -1],
//        corner2: [7, 0, 2],
//      })
//    )
    .unionForNonIntersecting(
     CSG.cube({
        corner1:
          [0, 0, 0],
        corner2:
          [12, 10, 1.2]
      })
      .subtract(
        CSG.cube({
          corner1: [0, 0.6, 0],
          corner2: [6, 10, 1.2]
        })
      )
      .subtract(
        CSG.cube({
          corner1: [6, 1.2, -1],
          corner2: [6+0.3, 0.6, 2],
        })
      )
    )
}









