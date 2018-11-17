

module.exports = function (_) {

  function union (shapes) {
    return shapes.reduce(function (a, b) {
      return a.union(b)
    })
  }

  function cone (r, h) {
    return _.CAG
      .fromPoints([[0,0,0], [0, h, 0], [r/2, 0, 0]])
      .rotateExtrude()
  }

  function cyl (width, height) {
    return _.CSG.cylinder({
      start: [0,0,0],
      end: [0,0,height],
      radius: width/2,
      resolution: 180
    })
  }

  var box = _.CSG.cube({
    corner1: [-10, 50, 0],
    corner2: [10, -50, 100],
  })

  var box2 = _.CSG.cube({
    corner1: [-10, 0, 0],
    corner2: [0, -50, 100],
  })
  var box3 = _.CSG.cube({
    corner1: [0, 50, 0],
    corner2: [10, 0, 100],
  })

  var hex = _.CSG.cylinder({
      start: [0,0,50.2-15.3],
      end: [0,0, 55],
      resolution: 6,
      //i think radius is measured across the points
      radius: 14.4/2 //across the points
//      radius: 12.7/2 //across the flats
  })

  function cube (w, h) {
    return _.CSG.cube({
      corner1: [-w/2,-w/2,0],
      corner2: [w/2,w/2,h],
    })
  }

  var handle = union([
    cube(12.8, 25),
    cube(12.8, 25).rotateZ(45),
    cone(12.8*Math.sqrt(2), 6.4),
    cyl(12.8*Math.sqrt(2), 5).translate([0,0,20]),
    cyl(12, 31),
    cyl(7, 50),
  ])

//  return cyl(56.8, 12)
//    .subtract(
//      cone(56.8*2, 4).rotateX(180).translate([0,0,12+2])
//    )

//  return handle

  return M = union([
    cyl(56.8, 4),
    cyl(53.9, 5.9),
    cyl(53.9, 16.3).intersect(box),

    union([
      cyl(44.5, 30.1)
        .intersect(box2.union(box3)),
      cyl(31.4, 30.1),
      cyl(44.5, 17.9).intersect(box)
    ])
      .subtract(
        union([
        cyl(7.8, 130.7)
          .translate([0,(25.3+7.8)/2, 0]),
        cyl(7.8, 130.7)
          .translate([0,-(25.3+7.8)/2, 0])
        ]).rotateZ(-5)
      )
    ,
    cyl(25.3, 50.2).subtract(hex)
  ])
//  .union(handle)
  .subtract(handle)
}
















































