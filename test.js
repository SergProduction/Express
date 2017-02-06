process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', function (chunk) {
  console.log('chunk: ', chunk)

  if( chunk == 'end' )
    process.destroy()
})

process.stdin.on('end', function () {
  console.log('--- END ---')
})
