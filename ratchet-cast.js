

//diameter 7.8
//width ratchet 3.9
//length 18.3
//height 12.4

function out(size) {
  return size - 0.2
}

var radius = out(7.8)/2
var height = 12.4+2
var width = out(3.9)
var length = out(18.3)
var gap = 1.6

function Ratchet(_) {
  return _.CSG.cylinder({
    start: [0, 0, 0],
    end: [0, 0, height],
    radius: radius
  }).union(
    _.CSG.cube({
      corner1: [0,0,0],
      corner2: [width, length - radius, height]
    })
  )
}

var space = 10, Z = 1
module.exports = function (_) {
  return _.CSG.cube({
    corner1: [0,0,-2],
    corner1: [50,40,-5],
  }).translate([-10, -10, 0])
    .union(Ratchet(_).translate([space*3, 0,Z]))
    .union(Ratchet(_).rotateZ(180).translate([3+space*2, 20 ,Z]))
    .union(Ratchet(_).translate([space*1, 0,Z]))
    .union(Ratchet(_).rotateZ(180).translate([3, 20,Z]))

//don't cast gap, so easier to extract mould. can just cut it with a saw, anyway.
//gap for the spring, measured the gap, then position by eye.
//  .subtract(_.CSG.cube({
//    corner1: [3.5, -length, height/2 - gap/2],
//    corner2: [-20, length, height/2 + gap/2],
//  }).rotateZ(20))

  //decrease height by 1.022 to get correct height
//  .scale([1,1,1/1.022])
}











