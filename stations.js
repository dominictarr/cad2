

var stations = [
//  [[0, 0], [0,1], [1, 2]],
//  [[0, 0], [0,2], [1, 3]],
  [[0, 0], [0.5, 1.5], [1.5, 1.5], [2, 0]],
  [[0, 0], [0, 2], [2, 2], [2, 0]],
  [[0, 0], [0.5, 1.5], [1.5, 1.5], [2, 0]]
]

module.exports = function (_) {
  CSG = _.CSG

  function poly (points) {
    return CSG.Polygon.createFromPoints(points, null, CSG.Plane.fromPoints.apply(null, points))
  }

  return function fromStations(stations) {
//    stations = stations.map(poly)
    STATIONS = stations
    console.log(stations)
    var bottom = stations[0]
//    return bottom.extrude(new CSG.Vector3D(0,0,1))
    
    return bottom.solidFromSlices({
      numslices: stations.length,
      callback: function (t, slice) {
        return stations[slice]//.translate([0,0,t*10])
      }
    })
  }

  return fromStations(stations)
//  return _.CSG.sphere({center: [0,0,0], radius: 10, resolution: 100})
}

