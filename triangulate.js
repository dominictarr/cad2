function toDegrees (rad) {
  return rad*180/Math.PI
}

function dist (a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
}

//given two 2d points and two distances, return a point.
//this has some floating point errors, probably better ways
//to do with without sin/cos/tan?
function triangulate(a, da, b, db) {
  var c = dist(a, b)
  var cos =  (da*da + c*c - db*db)/(2*da*c)
  var angle = Math.acos(cos)
  var cos2 =  (db*db + c*c - da*da)/(2*db*c)
  var angle2 = Math.acos(cos2)
  var _angle = Math.atan( (a[1]-b[1]) / (a[0]-b[0]) )
  var _angle2 = Math.atan( (b[1]-a[1]) / (b[0]-a[0]) )

//  console.log('ANGLE', toDegrees(angle), toDegrees(_angle),
//    Math.sin(angle+_angle),
//    Math.cos(angle+_angle),
//    da
//
//  )
  console.log('angle', toDegrees(_angle), toDegrees(_angle2))
  var x = [
    a[0] + Math.sin(angle+_angle)*da,
    a[1] + Math.cos(angle+_angle)*da
  ]
  var x2 = [
    b[0] + Math.sin(angle2+_angle2)*db,
    b[1] + Math.cos(angle2+_angle2)*db
  ]
  console.log(x, x2)


  console.log('dist a', da - dist(a, x))
  console.log('dist b', db - dist(b, x))
  if(angle2 < angle) return x2
  return x
}

//console.log(dist([0,0], [1,-1]))

//console.log(triangulate([0,0], 1, [1,1], 1))
//console.log(triangulate([0,0], 5, [3,0], 4))

//should be [-1, 1], or [1, 1]
console.log('T', triangulate([0,0], 1.414, [0,1], 1))
//should be [-1, 0] or [1, 0]
console.log('T', triangulate([0,0], 1, [0,1], 1.414))

//return

exports.triangulate = triangulate

exports.develop = function (polygon, developed) {
  var a, b
  //given
  //developed is a map of vertices already layed out
  //first find a known edge: two vertices already developed.
  for(var k in polygon.vertices) {
    var v = polygon.vertices[k]
    if(!a && developed[vertexId(v)])
      a = v
    else if(!b && developed[vertexId(v)])
      b = v
  }
  if(!a && !b) throw new Error('could not develop polygon, do not have two matching vertices')

  //calculate distance between a and b
//  console.log(a, b)
  var d = a.pos.distanceTo(b.pos)
  var vertices = []
  for(var k in polygon.vertices) {
    var v = polygon.vertices[k]
    if(developed[vertexId(v)]) //either a or b
      vertices.push(developed[vertexId(v)])
    else {
      var _v = triangulate(developed[vertexId(a)], a.pos.distanceTo(v.pos), developed[vertexId(b)], b.pos.distanceTo(v.pos))
      console.log("VERTICE", _v, a.pos.distanceTo(v.pos), b.pos.distanceTo(v.pos))
      vertices.push(_v)
      if(!developed[vertexId(v)])
        developed[vertexId(v)] = _v
    }
  }
  return vertices
}

var CSG = require('@jscad/csg').CSG

var square = {vertices: [
  new CSG.Vector3D(0, 0, 0),
  new CSG.Vector3D(0, 3, 0),
  new CSG.Vector3D(4, 3, 0),
//  new CSG.Vector3D(10, 0, 0)
].map(function (e, i) {
  e = new CSG.Vertex(e)
  e.tag = i+1
  return e
})}

//console.log(exports.develop(square, {1: [0,2], 2:[0, 5]}))

var c = CSG.cube({center: [0,0,0], size: 2})
console.log(c)
var d = {} //: [0,0], 2:[2, 0]}
d[vertexId(c.polygons[0].vertices[0])] = [0,0]
d[vertexId(c.polygons[0].vertices[1])] = [0,2]

console.log(d)

function vertexId(e) {
  e = e.pos || e
  return [e.x,e.y,e.z].join(',')
}

function sideId (poly) {
  return poly.vertices.map(vertexId).join(':')
}

function findUndevelopedPoly(shape, sides, developed) {
  for(var i = 0; i < shape.polygons.length; i++) {
    var poly = shape.polygons[i]
    if(!sides[sideId(poly)]) {
      var n = 0
      for(var j = 0; j < poly.vertices.length; j++) {
        if(developed[vertexId(poly.vertices[j])]) n++
      }

      console.log(n)
      if(n >= 2) return poly
    }
  }
//  throw new Error('could not find a polygon to develop')
}


var sides = {}
var side = findUndevelopedPoly(c, sides, d)
while(side) {
  sides[sideId(side)] = exports.develop(side, d)
//  console.log('so far', sides, d)
  side = findUndevelopedPoly(c, sides, d)
}

console.log('SIDES', sides, d)

//return
module.exports = function (_) {
  //return c
  sd = Object.keys(sides).map(function (k) {
    var side = sides[k].map(function (v) {
      console.log(v)
      return v
//      return new _.CSG.Vector2D(v[0], v[1])
    })
    return _.CSG
      .Polygon.createFromPoints(side, null, CSG.Plane.fromPoints.apply(null, side.slice().reverse()))
      .extrude(new CSG.Vector3D(0,0,1))
  })//.slice(0, 1)
  console.log('SIDES', sd)
  return sd[0]
//  .reduce(function (a, b) {
//    console.log('union', a)
//    return a.union(b)
//  })
}








