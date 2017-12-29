var Cardinal = require('cardinal-spline-js')

function midpointY (a, b, y) {
  if(y < a[1] || y > b[1]) throw new Error('out of bounds in y axis')
  var _y = b[1] - a[1]
  var m = _y/(y-a[1])
  return [a[0] + (b[0]-a[0])/m, y]
}

function midpointX (a, b, x) {
  if(x < a[0] || x > b[0]) throw new Error('out of bounds in x axis')
  var _x = b[0] - a[0]
  var m = _x/(y-a[0])
  return [x, a[1] + (b[1]-a[1])/m]
}

exports.midpointX = midpointX
exports.midpointY = midpointY

function snap (points, size, dimension) {
  dimension = 1
  var output = [], max = points[0][dimension]
  for(var i = 1; i < points.length; i ++)
    while(max <= points[i][dimension]) {
      output.push(midpointY(points[i-1], points[i], max))
      max += size
    }

  return output
}

exports.snapY = snap

function smooth2D (points, tension, sides) {
  tension = tension || 0.5
  sides = sides || 3
  var p = Cardinal.getCurvePoints(points.reduce(function (a, b) {
      return a.concat(b)
    }), tension, sides)

  var o = []
  for(var i = 0; i < p.length; i+=2)
    o.push([p[i],p[i+1]])

  return o
}

var m = require('./midpoint')

function smooth (points, step, tension) {
  step = step || 1
  var smoothX = m.snapY(smooth2D(points.map(function (e) {
    return [e[0],e[1]]
  }), tension), step)
  var smoothZ = m.snapY(smooth2D(points.map(function (e) {
    return [e[2],e[1]]
  }), tension), step)

  return smoothX.map(function (e, i) {
    return [e[0],e[1], smoothZ[i][0]]
  })
}

exports.smooth = smooth
