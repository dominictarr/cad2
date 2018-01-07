function mirror (station) {
  if(!station) return
  var side = station.slice().concat(
      station.slice().reverse().map(function (e) {
        return [e[0], e[1], -e[2]]
      })
    )
  return side
  return side.concat(side.slice().reverse().map(function (e) {
    return [-e[0], e[1], e[2]]
  })).slice(0, 7)
}

var smooth = require('./midpoint').smooth

function smoothing (stations, step) {
  step = step || 10
  var chines = stations[0].map(function (_chine, i) {
    return smooth(stations.map(function (station) { return station[i] }), step, 0.5)
  })

  return chines[0].map(function (e, i) {
    return chines.map(function (chine, j) { return chine[i] })
  })
}

var inverse = [
  [[0,-220, 2],[2, -220, 2]],
  [[0,-80, 2],[2, -80, 2]],
  [[0, -40, 2], [2, -40, 1]],
  [[0, -10, 2], [3.5, -10, 0.5]],
  [[0, 80, 0.6], [2, 80, 0.5]],
]
.map(mirror).filter(Boolean)

var stations = [
  [[0, -60, 1], [1, -60, 1]],
  [[0, -40, 2], [2, -40, 1]],
  [[0, -10, 2], [3.5, -10, 0.5]],
//  [[0, 40, 1], [4.5, 40, 0.5]],
  //[[0, 60, 0.75], [4.5, 60, 0.5]],
  [[0, 70, 0.6], [4.5, 70, 0.5]],
  [[0, 80, 0.6], [1, 80, 0.5]],
]
.map(mirror).filter(Boolean)

module.exports = function (_) {

  function tab (y) {
    return _.CSG.
      cube({center:[0, 0, 0]})
        .scale([4.5,2,0.5])
    //  .union(_.CSG.cube({center: [0, 0, 0]}).scale([1,2,2.25]).translate({x: 3.5, y:0, z:0}))
    //  .union(_.CSG.cube({center: [0, 0, 0]}).scale([1,2,2.25]).translate({x: -3.5, y:0, z:0}))
        .translate({x:0, y:y,z:0})
  }

  function tab2 (y) {
    return _.CSG.
      cube({center:[0, 0, 0]})
        .scale([2.5,3,0.5])
//      .union(_.CSG.cube({center: [0, 0, 0]}).scale([1,2,2.25]).translate({x: 3.5, y:0, z:0}))
  //    .union(_.CSG.cube({center: [0, 0, 0]}).scale([1,2,2.25]).translate({x: -3.5, y:0, z:0}))
        .translate({x:0, y:y-1,z:0})
  }


  function sides (y) {
    return _.CSG.
      _.CSG.cube({center: [0, 0, 0]}).scale([1,100,2.25])
        .translate({x: 3.5, y:0, z:0})
      .union(
        _.CSG.cube({center: [0, 0, 0]}).scale([1,100,2.25])
        .translate({x: -3.5, y:0, z:0}))
        .translate({x:0, y:y-1,z:0})
  }



  var Stations = require('./stations')(_)

  function poly (out) {
    return _.CSG.Polygon.createFromPoints(out)
  }
//  var s = stations.map(poly)

  function toBlade (stations) {
    var smoothed = smoothing(stations, 1).map(poly)

    var wedge = Stations(smoothed).scale({x:-1, y:1, z:1})
      .union(Stations(smoothed))

     return wedge.scale({x:1, y:0.625,z:1}).translate([0,8,0])
  }

    var loom =
      _.CSG.cylinder({radius: 2, resolution: 24})
        .scale({x:1, y: 55, z: 1})
        .translate({x:0, y:-91, z: 0})
        .union(
          _.CSG.cylinder({radius: 1.5, resolution: 24})
          .scale({x:1, y: 20, z: 1})
          .translate({x:0, y:-140, z: 0})
        )
        .translate([0,40,0])

    loom = loom.intersect(toBlade(inverse))

    var blade = toBlade(stations)

  var oar = blade.union(loom)
    .union(tab2(62))
    .union(tab(-40))
    .union(tab(-80))
    .union(tab(-122))
    .translate([0,30,0])
    //.union(tab(-120))

    //ground
    .union(
      _.CSG.cube({side: 0.5}).scale({x:9/2,y:180/2, z: 2.25/2}).translate([0,0,-1.125])
    )
    //side rails
    .union(
      _.CSG.cube({side: 1}).scale([0.5, 50, 2.25]) .translate([4,-40,0])
    )
    .union(
      _.CSG.cube({side: 1}).scale([0.5, 50, 2.25]) .translate([-4,-40,0])
    )

//    .union(sides(10))

  require('fs').writeFileSync(
    'oar.stla',
    require('@jscad/stl-serializer').serialize(oar, {binary: false})[0]
  )

  var raw = Buffer.concat(require('@jscad/stl-serializer').serialize(oar).map(function (a) { return new Buffer(a) }))

  require('fs').writeFileSync('oar.stl', raw)

  return oar
}



