var m = require('./midpoint')

var points = [
  [0,0,3],
  [3,10,0],
  [0,20,1]
]

module.exports = function (_) {
  var s = m.smooth(points)
  return _.CSG.Polygon.createFromPoints(s, null,
    _.CSG.Plane.fromPoints.apply(null, s.slice().reverse())
  ).extrude(new _.CSG.Vector3D(0,0,1))
}







