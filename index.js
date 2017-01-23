var express = require('express')
var app = express()
var port = Number(process.env.PORT || 8080);

app.set('view engine', 'pug')

app.set('views', './views')

app.get('/', function(req, res) {
  res.render('index')
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
