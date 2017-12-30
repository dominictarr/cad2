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
  }), 1, 0.5)
})

console.log('chines', JSON.stringify(chines))

var stations2 = chines[0].map(function (e, i) {
  return chines.map(function (chine, j) {
    return chine[i]//.concat(stations[0][j][2])
  })
})

var CSG = require('@jscad/csg').CSG

function rainbowByNormal (shape) {
  shape.polygons.forEach(function (p) {
    var n = p.plane.normal
    p.shared = new CSG.Polygon.Shared([(n.x+1)/2,(n.y+1)/2,(n.z+1)/2, 0.5])
    //[Math.random(),Math.random(),Math.random(), 0.5])
  })
  return shape
}

function eachPair (set, iter) {
  for(var i = 0; i < set.length; i += 2)
    iter(set[(i-1+set.length)%set.length], set[i], i)
}

function polygonByVertice (shape) {
  var index = {}
  shape.polygons.forEach(function (poly) {
    poly.vertices.forEach(function (vertex) {
      var id = vertex.getTag() //[a.toString(), b.toString()].sort().join(':')
      if(!index[id]) index[id] = [poly]
      else index[id].push(poly)
    })
  })
  return index
}

function rainbowByPanel (shape, bend) {
  console.log(polygonByVertice(shape))
  bend = bend || 0.9
  var index = polygonByVertice(shape)

  function addToSide(p, shared) {
    if(p.shared.color) return
    p.shared = shared
    p.vertices.forEach(function (v) {
      index[v.getTag()].forEach(function (poly) {
        if(poly.plane.normal.dot(p.plane.normal) < bend) return
        addToSide(poly, shared)
      })
    })
  }

  //only the best colors
  var colors = [
    new CSG.Polygon.Shared([0,0,1, 0.5]),
    new CSG.Polygon.Shared([0,1,0, 0.5]),
    new CSG.Polygon.Shared([1,0,0, 0.5]),
    new CSG.Polygon.Shared([0,1,1, 0.5]),
    new CSG.Polygon.Shared([1,1,0, 0.5]),
    new CSG.Polygon.Shared([1,0,1, 0.5])
]

  shape.polygons.forEach(function (poly) {
    if(poly.shared.color) return
    addToSide(poly, colors.shift())
  })

  return shape
}

console.log(JSON.stringify(stations2))
//console.log(JSON.stringify(o))

//take a line of points, and snap to Y dimension in steps of `size`

//var aligned = m.snapY(o, 2)

module.exports = function (_) {
  function poly (out) {
    return _.CSG.Polygon.createFromPoints(out) //, null, _.CSG.Plane.fromPoints.apply(null, out.slice().reverse()))
  }
//  return M = rainbowByNormal(require('./stations')(_)(stations2.map(poly)))
  return M = rainbowByPanel(require('./stations')(_)(stations2.map(poly)))
}

