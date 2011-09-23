var util = require('util');
var sqlite3 = require('sqlite3');

sqlite3.verbose();

var db = undefined;

// connect db
exports.connect = function(callback){
	db = new sqlite3.Database('m3-database.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err) {
		if(err){
			utils.log('FAIL on creating database ' + err);
			callback(err);
		}
		else
		{
			callback(null);			
		};
	});
};

// disconnect db
exports.disconnect = function(callback) {
	callback(null);
};

// get articles
exports.getArticles = function(callback) {
	util.log(' get all articles...');
	db.all('SELECT id, desc, price, image_name FROM articles', callback);
};


// get article row by id
exports.getArticleById = function(_id, callback) {
	var didOne = false;
	db.each('SELECT id, desc, price, image_name FROM articles WHERE id = ?', [ _id ], function(err, row) {
		if (err) {
			util.log('FAIL to retrieve row ' + err);
			callback(err, null);
		}
		else
		{
			if (!didOne) {
				util.log(' get article arr by id: ' + _id);
				callback(null, row);
				didOne = true;
			};
		};
	});
};

// get article row by id
exports.getArticleDescById = function(_id, callback) {
	var didOne = false;
	db.each('SELECT desc FROM articles WHERE id = ?', [ _id ], function(err, row) {
		if (err) {
			util.log('FAIL to retrieve row ' + err);
			callback(err, null);
		}
		else
		{
			if (!didOne) {
				util.log(' get article desc by id: ' + _id);
				callback(null, row['desc']);
				didOne = true;
			};
		};
	});
};

// get article image data by id
exports.getArticleImageById = function(_id, callback) {
	var didOne = false;
	db.each('SELECT image_data FROM articles WHERE id = ?', [ _id ], function(err, row) {
		if (err) {
			util.log('FAIL to retrieve row ' + err);
			callback(err, null);
		}
		else
		{
			if (!didOne) {
				util.log(' get article image data by id: ' + _id);
				callback(null, row['image_data']);
				didOne = true;
			};
		};
	});
};


