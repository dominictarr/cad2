

module.exports = function (_) {

  var points = [
    [0, -7.5], [0, 7.5],
    [50, 25], [50, -25]
  ]

  return (
    CSG.Polygon.createFromPoints(points, null, CSG.Plane.fromPoints.apply(null, points))
    .extrude(new CSG.Vector3D(0,0,10))
    .union(
      _.CSG.cylinder({center: [0,0,0], size: 5})
        .scale([10,10,10])
        .rotate(90, [1,0,0])
    )
  )

//  return _.Polygon.createFromPoints(
  return M = _.CSG.cylinder({center: [0,0,0], size: 20}).scale([20,20,20])
}


