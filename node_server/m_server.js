var express = require('express');

var app = express.createServer(
	// express.logger();
);

app.configure(function(){
	app.use(app.router);
	app.use(express.errorHandler({
		dumpExceptions: true, showStack: true
	}));
});

app.get('/', function(req, res, next) {
  	res.send('sabiranje...');
});

app.get('/kvadrat/:a', function(req, res, next) {
	res.send({ a: req.params.a, result: req.params.a * req.params.a });
});

app.get('/pomnozi/:a/:b', function(req, res, next) {
	res.send({ a: req.params.a, b: req.params.b, result: req.params.a * req.params.b });
});

app.get('/articles', function(req, res, next) {
	res.send([{ id: '1', desc: 'test 1' }, {id: '2', desc: 'test 2'}]);
});


app.listen(3002);

