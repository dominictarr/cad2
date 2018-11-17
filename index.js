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

var opts = require('minimist')(process.argv.slice(2))

var v = new (require('jscad-viewer'))(container, opts)

var model = require(path.resolve(process.cwd(), process.argv[2]))(csg)
V = v
v.setCsg(model)

//var base64 = v.canvas.toDataURL('image/png')
//require('fs').writeFileSync('output.png', new Buffer(base64.substring(base64.indexOf(',')+1), 'base64'))


var data = require('@jscad/stl-serializer').serialize(model)
require('fs').writeFileSync('output.stl', (Buffer.concat(data.map(function (ab) {
  return Buffer.from(ab)
}))))
//console.log(Buffer.concat(.map(Buffer.from) ))

//require('fs').writeFileSync('output.stl',
//  require('@jscad/stl-serializer')(model)
//)

