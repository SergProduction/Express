var width = document.documentElement.clientWidth - 100,
    height = document.documentElement.clientHeight - 100;
// массив точек для создания пути

var data = [
    {x: 80, y: 100},{x: 120, y: 100},
    {x: 240, y: 200},{x: 280, y: 200}
];

var paths = [];

var addNodeButt = d3.select("body").append('button')
  .text('add Node')

var nodeNameInput = d3.select("body").append('input')
  .attr('type','text')
  .attr('placeholder','name Node')

d3.select("body").append('br')

var svg = d3.select("body").append("svg");

svg.attr("height", height)
    .attr("width", width)
    .style('border','1px solid #ddd')

// функция, создающая по массиву точек линии
var line = d3.line()
    .x( d => d.x )
    .y( d => d.y )
    .curve(d3.curveCatmullRom.alpha(1))

addNodeButt.on('click', function(data, i){
  addNode()
})

function addNode(){

  var nodeName = nodeNameInput.property('value')
  nodeNameInput.property('value', '')
  
  paths.push({id: nodeName})

  var fo = svg.append('foreignObject')
      .attr('x', 20)
      .attr('y', 20)
      .attr('width', 120)
      .attr('height', 200)
      .attr('class', 'Node')

  var body = fo.append('xhtml:body')

  var head = body.append('div')
      .classed('node-head', true)

  head.call(
      d3.drag()
      .subject(differencePosition)
      .container( () => svg.node() )
      .filter( () => d3.event.target == head.node() )
      .on('start', moveNode)
    )

  function differencePosition(){
    var x = parseInt( fo.attr('x') )
    var y = parseInt( fo.attr('y') )
    return {x,y}
  }

  function moveNode(){
    console.log(d3.event)
    var {x, y} = d3.event.subject
    var x1 = ( d3.event.x - x );
    var y1 = ( d3.event.y - y );
    
      id = paths.findIndex( el => el.id == nodeName )

      if( paths[ id ].sigin ){
        var parentId = paths[ id ].sigin;
        parentId = paths.findIndex( el => el.id == parentId )
        var data = paths[ parentId ].data;

        var d2x = data[ 2 ].x - d3.event.x
        var d2y = data[ 2 ].y - d3.event.y
        var d3x = data[ 3 ].x - d3.event.x
        var d3y = data[ 3 ].y - d3.event.y

      }
      if( paths[ id ].data ){
        var data = paths[ id ].data

        var d0x = data[ 0 ].x - d3.event.x
        var d0y = data[ 0 ].y - d3.event.y
        var d1x = data[ 1 ].x - d3.event.x
        var d1y = data[ 1 ].y - d3.event.y
      }

    d3.event.on('drag', () => {
      var x2 = x1 + d3.event.x
      var y2 = y1 + d3.event.y
      fo.attr('x', x2 )
        .attr('y', y2 )

      if( paths[ id ].sigin ){
        var parentId = paths[ id ].sigin;
        parentId = paths.findIndex( el => el.id == parentId )
        var data = paths[ parentId ].data;

        data[ 2 ] = {x: d2x + d3.event.x, y: d2y + d3.event.y}
        data[ 3 ] = {x: d3x + d3.event.x, y: d3y + d3.event.y}

        var path = paths[ parentId ].path
        path.attr('d', line(data) )
      }
      if( paths[ id ].data ){
        var data = paths[ id ].data

        data[ 0 ] = {x: d0x + d3.event.x, y: d0y + d3.event.y}
        data[ 1 ] = {x: d1x + d3.event.x, y: d1y + d3.event.y}

        var path = paths[ id ].path
        path.attr('d', line(data) )
      }
    });
  }
  head.text( nodeName )
  
  var sigin = head.append('span')
      .classed('glyphicon glyphicon-log-in', true)
      .attr('data-in',nodeName)
      .style('float','left')
      .style('margin','3px 5px 0 0');


  var add = head.append('span')
      .classed('glyphicon glyphicon-plus-sign', true)
      .style('color', '#fff')
      .style('margin', '5px')
      .style('float', 'right')

  var input = body.append('input')
      .attr('type', 'text')
      .attr('placeholder','name line')
      .style('width', '100%')
      .style('border-width', '0 0 1px 0')
      .style('padding', '0 5px')

  add.on('click', () => {
    if( !input.property('value') ) return

    var li = ul.append('li')
      .text(input.property('value'))

    input.property('value', '')

    var addCurve = li.append('span')
      .classed('glyphicon glyphicon-log-out', true)
      .style('float','right')
      .style('margin-top','3px');

    addCurve.call(d3.drag()
      .container( () => svg.node() )
      .on('start', newConnect ))

    function newConnect(){
      var data = [
        {
          x: d3.event.x,
          y: d3.event.y
        },
        {
          x: d3.event.x + 40,
          y: d3.event.y
        },
        {
          x: d3.event.x + 40,
          y: d3.event.y
        },
        {
          x: d3.event.x + 40,
          y: d3.event.y
        }]

      id = paths.findIndex((el) => el.id == nodeName)

      paths[ id ].data = data

      var active = svg.append('path')
            .attr('d', line(data) )

      d3.event.on('drag', () => {

        data[ 2 ] = {x: d3.event.x - 40, y: d3.event.y}
        data[ 3 ] = {x: d3.event.x, y: d3.event.y}

        active.attr('d', line(data) )

      })

      d3.event.on('end', () => {
        var data;
        var source = d3.select( d3.event.sourceEvent.target )
        if( source.attr('data-in') ){
          var child = paths.findIndex( el => el.id == source.attr('data-in') )
          paths[ child ].sigin = nodeName
          paths[ id ].path = active
        }
        else{
          delete paths[ id ].data
          active.remove()
        }
      })
    }

  })

  var ul = body.append('ul')
}