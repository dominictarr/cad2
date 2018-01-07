

var CSG = require('@jscad/csg')
var m = require('./midpoint')

var Cardinal = require('cardinal-spline-js')
var stations = [
  [
    [0,0,1],
    [4.5,0,0.7],
    [4.5,0,-0.7],
    [0,0,-1]
  ],
  [
    [0,  60 , 1.5],
    [4.5,60 , 0.7],
    [4.5,60 ,-0.7],
    [0,  60 ,-1.5]
  ],
  [
    [0, 90, 2],
    [2, 90, 0.25],
    [2, 90, 0.25],
    [0, 90, -2],
  ],
  [
    [1, 120, 0],
    [1, 120, -0.1],
    [1, 120, -0.1],
    [1, 120, 0]
  ]
]

var smooth = require('./midpoint').smooth

var chines = stations[0].map(function (_chine, i) {
  return smooth(stations.map(function (station) {
    return station[i]
  }), 10, 0.5)
})

console.log('chines', JSON.stringify(chines))

var stations2 = chines[0].map(function (e, i) {
  return chines.map(function (chine, j) {
    return chine[i]//.concat(stations[0][j][2])
  })
})

module.exports = function (_) {
  function poly (out) {
    return _.CSG.Polygon.createFromPoints(out) //, null, _.CSG.Plane.fromPoints.apply(null, out.slice().reverse()))
  }
  var blade = require('./stations')(_)(stations.map(poly))
  var handle = _.CSG.cylinder({size: 1, length: 100}).scale({x: 2, y:100, z: 2})
  return blade

//  var blade = _.CSG.cube({}).scale({x:9, y: 60, z: 4})
//  return handle.union(blade)
//  return blade.union(handle)
}

