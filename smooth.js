var CSG = require('@jscad/csg')
var m = require('./midpoint')

var Cardinal = require('cardinal-spline-js')
var stations = [
  [
    [0,0,1],
    [1,0,2],
    [2,0,5],
    [0,0,5]
  ],
  [
    [0, 10, 0],
    [5, 10, 1],
    [6, 10, 4],
    [0, 10, 4],
  ],
  [
    [0, 20, 0.5],
    [2, 20, 1.5],
    [3, 20, 4.5],
    [0, 20, 4.5]
  ]
]

var smooth = require('./midpoint').smooth

var chines = stations[0].map(function (_chine, i) {
  return smooth(stations.map(function (station) {
    return station[i]
  }), 1, 0.75)
})

console.log('chines', JSON.stringify(chines))

var stations2 = chines[0].map(function (e, i) {
  return chines.map(function (chine, j) {
    return chine[i]//.concat(stations[0][j][2])
  })
})


console.log(JSON.stringify(stations2))
//console.log(JSON.stringify(o))

//take a line of points, and snap to Y dimension in steps of `size`

//var aligned = m.snapY(o, 2)

module.exports = function (_) {
  function poly (out) {
    console.log('OUT', JSON.stringify(out))
    return _.CSG.Polygon.createFromPoints(out) //, null, _.CSG.Plane.fromPoints.apply(null, out.slice().reverse()))
  }
  return M = require('./stations')(_)(stations2.map(poly))

  window.csg = _
  var model = poly(m.snapY(o, 2)).extrude(new _.CSG.Vector3D(0,0,1)).union(
    poly(m.snapY(o2, 2)).extrude(new _.CSG.Vector3D(0,0,1)).translate(new _.CSG.Vector3D(0,0,3))
  )
  window.M = model
  return model
}






