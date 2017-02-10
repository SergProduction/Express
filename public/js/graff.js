var style = `
.wrap{
    border: 1px solid #000;
    overflow: hidden;
}
.test{
  background: #c55
}
.logs{
  color: #a00
}
`;

d3.select('head').append('style').text(style)

var body = d3.select('body')

body.append('button').text('reset zoom').on('click', resetted)

var log = body.append('div')
    .classed('logs', true)
    .text('log')

var wrap = body.append('div')
    .style('width','500px')
    .style('height','500px')
    .classed('wrap', true)
     
var div = wrap.append('div')
    .classed('test', true)
    .text('test')

div.style('width','100px')
  .style('height','100px')

var zoom = d3.zoom()
    .scaleExtent([1,2])
    .translateExtent([ [-400, -400], [500, 500] ])
    .on('zoom', zoomed)

wrap.call(zoom)

function zoomed(){
  var {k,x,y} = d3.event.transform
  div.style("transform", `translate(${x}px,${y}px) scale(${k})` );
  log.text(`x:${x} | y:${y} | k:${k}`)
  //d3.event.target.translateExtent
}

function resetted() {
  wrap.transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity);
}