
function o (s) {
  return s  - 0.2
}
function i (s) {
  return s  + 0.2
}

module.exports = function (_) {
  function pulley () {
    var rope_diameter = o(6);
    var pulley_diameter = o(28)
    var width = o(9.5) //rope_diameter * 1.2
    var axel_diameter = i(8)
    var clearance = 0.5

    var half_width = (width)/2 - clearance

    return (
      _.CAG.rectangle({corner1: [pulley_diameter/2, half_width], corner2: [0, -half_width]})
        .subtract(
          _.CAG.circle({radius: rope_diameter/2}).translate([pulley_diameter/2, 0])
        )
        .rotateExtrude({resolution: 90})
    //    .extrude([0,0,0.1])
      .union(
        _.CSG.cylinder({
          radius: axel_diameter,
          start: [0, 0, -width/2],
          end: [0, 0, width/2]
        })
      )
      .subtract(
        _.CSG.cylinder({
          radius: axel_diameter/2,
          start: [0, 0, -pulley_diameter],
          end: [0, 0, pulley_diameter]
        })
      )
    )
  }


  return pulley().scale([1,1,1/1.022])
}





