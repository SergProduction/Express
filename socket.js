const ConvertTerm = require('ansi-to-html');
const convert = new ConvertTerm({newline: true});
//console.log(convert.toHtml(test));

const spawn = require('child_process')

function newProcess(data, callback, option){
      let [main, ...arg ] = data.match(/\S+/g);

      const childProcess = spawn.spawn(main, arg, option)
      
      childProcess.stdout.on('data', data => {
        data = data.toString('utf8')
        callback('stdout', convert.toHtml(data))
        // console.log('stdout: ', data)
      })
      childProcess.stderr.on('data', (data) => {
        data = data.toString('utf8')
        callback('stderr', convert.toHtml(data) )
        // console.log(`stderr: ${data}`);
      })
      childProcess.on('close', (code) => {
        callback('close', data )
        // console.log(`child process exited with code ${code}`);
      })
      childProcess.on('disconnect', (code) => {
        callback('disconnect', data )
        //console.log(`child process exited with code ${code}`);
      })
      childProcess.on('error', (data) => {
        callback('error', data )
        //console.log(`child process exited with code ${code}`);
      });
      childProcess.on('exit', (code, sig) => {
        callback('exit', {code, sig} )
        //console.log(`child process exited with code ${code}`);
      });

      return childProcess
}

const socket = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('webpack', (data) => {
      //process.env.NODE_ENV ='production';
      let killWebpack = newProcess('webpack --progress --colors --NODE_ENV=production', (type, data) => {
        socket.emit('webpack res', {type, data} )
      }, {cwd: '/var/www/back.gibrid24.ru/assets/'})
    })

    socket.on('webpack --watch', (data) => {
      let webpack = newProcess('webpack --progress --colors --watch', (type, data) => {
        socket.emit('webpack res', {type, data} )
      }, {cwd: '/var/www/back.gibrid24.ru/assets/'})

      socket.on('webpack --watch kill', (data) => {
        webpack.kill('SIGINT')
      }, {cwd: '/var/www/back.gibrid24.ru/assets/'})
    })

    socket.on('gulp', (data) => {
      let gulp = newProcess('./gulp js --NODE_ENV=production', (type, data) => {
        socket.emit('gulp res', {type, data} )
      }, {cwd: '/var/www/back.gibrid24.ru/assets/templates/os2013/common/node_modules/.bin/'})
    })

    socket.on('gulp --watch', (data) => {
      let gulp = newProcess('./gulp js:watch', (type, data) => {
        socket.emit('gulp res', {type, data} )
      }, {cwd: '/var/www/back.gibrid24.ru/assets/templates/os2013/common/node_modules/.bin/'})

      socket.on('gulp --watch kill', (data) => {
        gulp.kill('SIGINT')
      })
    })

    socket.on('gulp polyfil', (data) => {
      let killGulpPolyfil = newProcess('./gulp js:ie', (type, data) => {
        socket.emit('gulp res', {type, data} )
      }, {cwd: '/var/www/back.gibrid24.ru/assets/templates/os2013/common/node_modules/.bin/'})
    })

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  })
}

module.exports = socket