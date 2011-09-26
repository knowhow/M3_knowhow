var article_data_JSON = '[{"id":"3013","desc":"Drina MP Sarajevska","price":"18.803","pict":"3013.jpg"},'+
	'{"id":"3014","desc":"Drina TP lights","price":"21.368","pict":"3014.jpg"},' +
	'{"id":"3015","desc":"Drina TP jedina","price":"21.368","pict":"3015.jpg"},' +
	'{"id":"3016","desc":"Drina TP super lights","price":"21.368","pict":"3016.jpg"},' +
	'{"id":"3017","desc":"Tigra MP soft","price":"18.803","pict":"3017.jpg"},' +
	'{"id":"3018","desc":"Aura extra","price":"25.641","pict":"3018.jpg"},' +
	'{"id":"3019","desc":"Aura lights","price":"25.641","pict":"3019.jpg"},' +
	'{"id":"3024","desc":"Aura super lights","price":"25.641","pict":"3024.jpg"},' +
	'{"id":"3057","desc":"Osam (8)","price":"21.368","pict":"3057.jpg"},' +
	'{"id":"3070","desc":"Drina jedina zlatna","price":"21.368","pict":"3070.jpg"},' +
	'{"id":"3076","desc":"Code","price":"18.803","pict":"3076.jpg"},' +
	'{"id":"3091","desc":"Royal blue","price":"21.368","pict":"3091.jpg"},' +
	'{"id":"3092","desc":"Royal lights","price":"21.368","pict":"3092.jpg"},' +
	'{"id":"3095","desc":"Code red","price":"21.368","pict":"3095.jpg"}]';

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

app.get('/articlesJSON', function(req, res, next) {
	res.send( article_data_JSON );
});

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




app.listen(8080);

