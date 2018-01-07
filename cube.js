

module.exports = function (_) {
  return M = _.CSG.cylinder({center: [0,0,0], size: 20, resolution: 6}).scale([20,20,20]).union(_.CSG.cylinder({
    center: [0,0,0], size: 1
  }).scale([1,100,1]))
}
