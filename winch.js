

module.exports = function (_) {

  function o(size) {
    return size - 0.2
  }
  function i(size) {
    return size + 0.2
  }

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
    cube(i(17.8), 25),
    cube(i(17.8), 25).rotateZ(45),
    cone(i(17.8)*Math.sqrt(2), 6.4),
    cyl(i(12.8)*Math.sqrt(2), 5).translate([0,0,20]),
    cyl(i(12), 31),
    cyl(i(7), 50),
  ])

  return M = union([
    cyl(o(56.8), 4),
    cyl(o(53.9), 5.9),
    cyl(o(53.9), 16.3).intersect(box),

    union([
      cyl(o(44.5), 30.1)
        .intersect(box2.union(box3)),
      cyl(o(31.4), 30.1),
      cyl(o(44.5), 17.9).intersect(box)
    ])
      .subtract(
        union([
        cyl(i(7.8), 130.7)
          .translate([0,(o(25.3)+o(7.8)+0.5)/2, 0]),
        cyl(i(7.8), 130.7)
          .translate([0,-(o(25.3)+o(7.8)+0.5)/2, 0])
        ]).rotateZ(-5)
      )
    ,
    cyl(o(25.3), 50.2).subtract(hex)
  ])
  .subtract(handle)
}



























