
function create (_) {
  return function (opts) {

    function side (flat_radius) {
      return 2  * (flat_radius / Math.sqrt(3))
    }
    var _opts = Object.assign({
    }, opts, {radius: side(opts.radius || 10), resolution: 6})
    console.log(_opts)
    return  _.CSG.cylinder(_opts)
    return  _.CSG.cylinder()

  }
}

function out (size) {
  return size - 0.2
}

module.exports = function (_) {

  var Hex = create(_)
  return Hex({
    radius: out(12.7/2),
    start: [0,0,0],
    end: [0,0,20],
  })
}

module.exports.create = create






