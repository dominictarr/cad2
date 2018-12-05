
module.exports = function (_) {
  function pulley () {
    var rope_diameter = 5;
    var pulley_diameter = 28
    var width = 9.5 //rope_diameter * 1.2
    var axel_diameter = 8

    var half_width = (width)/2

    return (
      _.CAG.rectangle({corner1: [pulley_diameter/2, half_width], corner2: [0, -half_width]})
        .subtract(
          _.CAG.circle({radius: rope_diameter/2}).translate([pulley_diameter/2, 0])
        )
        .rotateExtrude({resolution: 90})
    //    .extrude([0,0,0.1])
      .subtract(
        _.CSG.cylinder({
          radius: axel_diameter/2,
          start: [0, 0, -pulley_diameter/2],
          end: [0, 0, pulley_diameter/2]
        })
      )
    )
  }


  return pulley()
}




