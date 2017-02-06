const fs = require('fs')

const process = require('child_process')

const compile = (socketEmit) => {
  //res.send('stdout: ')

  const webpack = process.spawn('npm', ['run','build'])

  console.log('socketEmit',socketEmit)

  webpack.stdout.on('data', (data) => {
    socketEmit('compile', data)
    console.log('stdout: ' + data)
  })

}

module.exports = compile