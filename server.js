const express = require('express')
const app = express()

const socket = require('./socket')

const favicon = require('serve-favicon')
const compile = require('./api/compile')



app.set('view engine', 'pug')

app.set('views', './views')

app.locals.require = require;

app.use(favicon(__dirname + '/favicon.ico'));

app.use(express.static('public'));

app.get('/api', compile)

//app.get('env') == 'developmet'

app.use((req, res, next) => {
  let view;
  if( req.path )
    view = req.path.slice(1)
  else
    view = 'index'
  console.log('view',view)
  res.render(view, (err, html) => {
    if( err ){
      console.log( err )
      res.status(404).send(err);
      //res.status(404).render('notFound');
    }
    else{
      res.send(html);
    }
    next()
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const server = app.listen(8080, () => {
  console.log('Listening on port 80');
});

socket(server)