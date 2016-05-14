var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3005);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
   var qParams = [];
   for (var p in req.query) {
      qParams.push({'name': p, 'value': req.query[p]});
   }
   var context = {};
   context.type = 'GET';
   context.queryList = qParams;
   res.render('get', context);
});

app.post('/', function(req,res) {
   var qParams = [];
   for (var p in req.query) {
      qParams.push({'name': p, 'value': req.query[p]});
   }
   var bParams = [];
   for (var p in req.body) {
      bParams.push({'name': p, 'value': req.body[p]});
   }
   var context = {};
   context.type = 'POST';
   context.queryList = qParams;
   context.bodyList = bParams;
   res.render('post', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
