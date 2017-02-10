
addEventListener('load', start )
addEventListener('resize', updadeSizeDocument )

function updadeSizeDocument(){
  d3.select('.canvas').style('height', document.documentElement.clientHeight + 'px')
}

let canvas, svg;

const createId = i =>
  ((i * 1e14 + Date.now()) * Math.pow(36, 10)).toString(36)

const addNode = (canvas, nodeDef) => {

  const node = canvas.append('div')
    .classed('node', true)
    .classed(`class-${nodeDef.type}`, !!nodeDef.type)
    .style('top', `${nodeDef.position.top || 20}px`)
    .style('left', `${nodeDef.position.left || 20}px`)

  const header = node.append('div')
    .classed('node-header', true)
    .text(nodeDef.name)

  const content = node.append('div').classed('node-content', true)
  const left = content.append('div').classed('node-panel panel-left', true)
  const right = content.append('div').classed('node-panel panel-right', true)

  const inputs = nodeDef.inputs.map(row => createRow(left, row))
  const outputs = nodeDef.outputs.map(row => createRow(right, row, true))

  return { node, inputs, outputs, header, definition: nodeDef }
}

function start(){
  updadeSizeDocument()

  d3.select('.panel-control')
    .select('button')
    .on('click', () => {
      console.log('as')
      var textarea = d3.select('.input-code').select('textarea')
      var newAst = ast.babylon.parse( textarea.property('value'), {allowImportExportEverywhere: true} )
      console.log( newAst )
  })

  canvas = d3.select('.canvas');
  svg = canvas.append('svg');

}

function testCode(){
  var text = `
  var text = 'i am string'
  let arr = [1,'e1']

  function test( name ){
    return 'your name: ' + name
  }

  test( 'test' )
  `;
  d3.select('.input-code').select('textarea').property('value', text)
}