express = require('express');
var path = require('path');

var app = express();
app.use(express.static('public'));
app.set('port', 3000);

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/views/mainPage.html'));
});

app.get('/intro', function(req,res) {
	res.sendFile(path.join(__dirname + '/views/APIIntro.html'));
});

app.get('/get-key', function(req,res) {
	res.sendFile(path.join(__dirname + '/views/getAPIKey.html'));
});

app.get('/browser-request', function(req,res) {
	res.sendFile(path.join(__dirname + '/views/browserRequest.html'));
});

app.get('/server-request', function(req,res) {
	res.sendFile(path.join(__dirname + '/views/serverRequest.html'));
});

app.get('/game-info', function(req, res) {
	res.sendFile(path.join(__dirname+ '/views/getGameInfo.html'));
});

app.get('/game-icon', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/getIcon.html'));
});

app.get('/end', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/final.html'));
});

app.listen(app.get('port'), function() {
	console.log('Express started on ' + app.get('port'));
});
