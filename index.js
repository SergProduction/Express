var express = require('express')
var favicon = require('serve-favicon')
var app = express()

app.set('view engine', 'pug')

app.set('views', './views')

app.locals.require = require;

app.use(favicon(__dirname + '/favicon.ico'));

app.use(express.static('public'));

//app.get('env') == 'developmet'

app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  res.send('ID:',req.params.id)
  //next();
});

app.use((req, res, next) => {
  let view;
  if( req.path )
    view = req.path.match(/[^/]+/g)
  if( view )
    view = view.join('/')
  //if( /\/$/.test(view) )
  //  view = view + 'index'
  else
    view = 'index'
  console.log('view',view)
  res.render(view, (err, html) => {
    if( err ){
      //console.log( err )
      res.status(404).render('notFound');
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

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
