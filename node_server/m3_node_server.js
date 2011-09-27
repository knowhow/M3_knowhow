
var express = require('express');
var nmDbEngine = 'sqlite3';
var m3_db = require('./m3_nodedb_' + nmDbEngine);
var util = require('util');


var app = express.createServer(
	// express.logger();
);

app.configure(function(){
	app.use(app.router);
	app.use(express.errorHandler({
		dumpExceptions: true, showStack: true
	}));
});

app.use(express.bodyParser());

m3_db.connect( function(error) {
	if (error) throw error;
});

app.on('close', function(errno) {
	m3_db.disconnect( function(errno) {});
});

// example of parameters
//app.get('/pomnozi/:a/:b', function(req, res, next) {
	//res.send({ a: req.params.a, b: req.params.b, result: req.params.a * req.params.b });
//});


app.get('/articles', function(req, res, next) {
	m3_db.getArticles(function(err, art_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( art_data );
		};
	});
});

app.get('/article_description/:article_id', function(req, res, next) {
	m3_db.getArticleDescById( req.params.article_id, function(err, image_desc){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( image_desc );
		};
	});
});

app.get('/article_image/:article_id', function(req, res, next) {
	m3_db.getArticleImageById( req.params.article_id, function(err, image_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.writeHead(200, {'Content-Type': 'image/jpeg' });	
			res.end(image_data);
			//res.send( image_data,  {'Content-Type':'image/jpeg'} );
		};
	});
});


// ## params

app.get('/params/:device_id', function(req, res, next) {
	m3_db.getParamByDeviceId( req.params.device_id, function(err, par_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( par_data );
		};
	});
});


// ## Customers

app.get('/customers', function(req, res, next) {
	m3_db.getCustomers(function(err, cust_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( cust_data );
		};
	});
});


// ## Users

app.get('/users', function(req, res, next) {
	m3_db.getUsers(function(err, u_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( u_data );
		};
	});
});


app.listen(8080);

