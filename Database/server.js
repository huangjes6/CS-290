var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// Handler for workout tracker database table
app.get('/reset-table', function(req, res, next) {
	var context = {};
	mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err) {
         	var createString = "CREATE TABLE workouts(" +
        	"id INT PRIMARY KEY AUTO_INCREMENT," +
        	"name VARCHAR(255) NOT NULL," +
        	"reps INT," +
        	"weight INT," +
        	"units BOOLEAN," +
	        "date DATE)";
	       mysql. pool.query(createString, function(err, rows, fields) {
			if(err) {
				next(err);
				return;
			}
			context.results = "Table reset";
			res.render('home', context);
        	});
	});
});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res) {
	var context = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		context.results = rows;
		console.log(rows);
		res.render('home', context);
	});
});

/*
app.get('/get', function(req, res, next) {
	var context = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
	context.results = JSON.stringify(rows);
	console.log(context.results);
	res.send(context);
	});
});*/

app.get('/insert', function(req, res) {
	var context = {};
	mysql.pool.query('INSERT INTO workouts(name, reps, weight, units, date) VALUES (?, ?, ?, ?, ?)', [req.query.name, req.query.reps, req.query.weight, req.query.units, req.query.date, req.query.id], function(err, rows) {
		if(err) {
			next(err);
			return;
		}
		context.results = rows.insertId;
		var results = JSON.stringify(context);
		res.send( results);
	});
});

app.get('/delete', function(req, res) {
	var context = {};
	mysql.pool.query('DELETE FROM workouts WHERE id = ?', [req.query.id], function(err, results) {
		if(err) {
			next(err);
			return;
		}
	});
});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(req, res) {
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on port 3000');
});
