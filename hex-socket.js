function outer(size) {
  return size - 0.2
}

function inner(size) {
  return size + 0.2
}

module.exports = function (_) {
  var Hex = require('./hex').create(_)

  function cyl (width, height) {
    return _.CSG.cylinder({
      start: [0,0,0],
      end: [0,0,height],
      radius: width/2,
      resolution: 180
    })
  }

  return cyl(outer(25.4), 20)
  .subtract(Hex({
    radius: inner(12.7/2),
    start: [0,0,-10],
    end: [0,0,30]
  }))
}
