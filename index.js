var csg = require('@jscad/csg')
var path = require('path')
var container = document.createElement('div')
function resize () {
  container.style.height = (window.innerHeight - 4)+'px'
  container.style.width = (window.innerWidth - 4)+'px'
}
document.body.style.margin = '0px'

CSG = csg.CSG
CAG = csg.CAG

window.onresize = resize
resize()

document.body.appendChild(container)

var v = require('jscad-viewer')(container, {})

var model = require(path.resolve(process.cwd(), process.argv[2]))(csg)
v.setCsg(model)




