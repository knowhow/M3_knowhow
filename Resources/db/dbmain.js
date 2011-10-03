/* 
 * This file is part of the knowhow ERP, a free and open source 
 * Enterprise Resource Planning software suite,
 * Copyright (c) 2010-2011 by bring.out doo Sarajevo.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including knowhow-specific Exhibits)
 * is available in the file LICENSE_CPAL_bring.out_knowhow.md located at the 
 * root directory of this source code archive.
 * By using this software, you agree to be bound by its terms.
 */

// ## This is the main db module of app


// Set's the global namespace for db module
M3.DB = {};	

/*
 * USERS DB methods
 */
	
// insert data into table 'users'
// 'u_data' is JSON object or array object
M3.DB.insertIntoUsers = function( u_data ) {
	
	var _name;
	var _pwd;
	
	for (var i=0; i < u_data.length; i++) {
		
		_name = u_data[i].name;
		_pwd = u_data[i].pwd;
		
		oDb.execute('INSERT INTO users (name, pwd) VALUES(?,?)', _name, _pwd );
	  
	};
     
};

// get all users data from db into JSON object
M3.DB.getUsersData = function(){
	
	var aData = [];
	var rows = oDb.execute('SELECT * FROM users ORDER BY id');
	
	while (rows.isValidRow()) {
  		aData.push({ 
  			id: rows.fieldByName('id'), 
  			name: rows.fieldByName('name'), 
  			pwd: rows.fieldByName('pwd') 
  			});

		rows.next();
	};
	rows.close();
	
	return aData;
};


// get users count 
M3.DB.getUsersCount = function(){
	var row = oDb.execute('SELECT COUNT(*) AS cnt FROM users');
	var res = row.fieldByName('cnt');
	return res;
};


// get user name from table 'users' by given 'u_id'
M3.DB.getUserNameById = function( u_id ){
	var row = oDb.execute('SELECT name FROM users WHERE id = ?', u_id);
	var res = row.fieldByName('name');
	return res;
};


// get users array from table 'users' by given 'u_id'
M3.DB.getUserArrayById = function( u_id ){
	var row = oDb.execute('SELECT * FROM users WHERE id = ?', u_id);
	var res = [{ id: row.fieldByName('id'), name: row.fieldByName('name'), pwd: row.fieldByName('pwd') }];
	return res;
};

// delete user by 'u_id' from table 'users'
M3.DB.deleteUserById = function( u_id ){
	oDb.execute('DELETE FROM users WHERE id = ?', u_id);
};

// delete all users from table 'users'
M3.DB.deleteUsers = function(){
	oDb.execute('DELETE FROM users');
};



/*
 * PARAMS methods
 */

// insert data into tale 'params'
// 'p_data' is JSON object or array object
M3.DB.insertIntoParams = function( p_data ) {
	
	var _device_id;
	var _param_name;
	var _param_value;
	
	for (var i=0; i < p_data.length; i++) {
		
		_device_id = p_data[i].device_id;
		_param_name = p_data[i].param_name;
		_param_value = p_data[i].param_value;
		
		oDb.execute('INSERT INTO params (device_id, param_name, param_value) VALUES(?,?,?)', _device_id, _param_name, _param_value );
	  
	};
     
};


// Get all params data from table 'params'
// The result aData is JSON object
M3.DB.getParamsData = function(){
	
	var aData = [];
	var rows = oDb.execute('SELECT * FROM params ORDER BY id');
	
	while (rows.isValidRow()) {
  		aData.push({ 
  			device_id: rows.fieldByName('device_id'), 
  			param_name: rows.fieldByName('param_name'), 
  			param_value: rows.fieldByName('param_value') 
  			});

		rows.next();
	};
	rows.close();
	
	return aData;
};


// Get params count
M3.DB.getParamsCount = function(){
	var row = oDb.execute('SELECT COUNT(*) AS cnt FROM params');
	var res = row.fieldByName('cnt');
	return res;
};


// Get param value from table 'params' by given 'dev_id' (device id) and 'p_name' (param name)
M3.DB.getParamValueById = function( dev_id, p_name ){
	var row = oDb.execute('SELECT param_value FROM params WHERE device_id = ? AND param_name = ?', dev_id, p_name);
	var res = row.fieldByName('param_value');
	return res;
};


// Delete all params from table 'params'
M3.DB.deleteParams = function(){
	oDb.execute('DELETE FROM params');
};


/*
 * ARTICLES DB methods
 */

// Insert data into table 'articles'
// 'article_data' is JSON object or array object
M3.DB.insertIntoArticles = function( article_data ) {
	
	var _id;
	var _desc;
	var _price;
	var _image_name;
	var _image_data;
	
	for (var i=0; i < article_data.length; i++) {
		
		_id = article_data[i].id;
		_desc = article_data[i].desc;
		_price = Number(article_data[i].price);
		_image_name = article_data[i].image_name;
		_image_data = article_data[i].image_data;
	
		oDb.execute('INSERT INTO articles (id, desc, price, image_name, image_data) VALUES(?,?,?,?,?)', _id, _desc, _price, _image_name, _image_data );
	  
	};
     
};


// Update article image by given '_art_id' (article id) and '_image_data' (binary data of the image)
M3.DB.updateArticleImage = function( _art_id, _image_data ) {
	//alert(_image_data);
	//_image_data = "X'" + _image_data + "'";
	oDb.execute('UPDATE articles SET image_data = ? WHERE id = ?', _image_data, _art_id );
};


// Get article's data from table 'articles' ordered by field ID
M3.DB.getArticleData = function(){
	
	var aData = [];
	var rows = oDb.execute('SELECT * FROM articles ORDER BY id');
	
	while (rows.isValidRow()) {
  		aData.push({ 
  			id: rows.fieldByName('id'), 
  			desc: rows.fieldByName('desc'), 
  			price: rows.fieldByName('price'), 
  			image_name: rows.fieldByName('image_name'), 
  			image_data: rows.fieldByName('image_data')
  			});

		rows.next();
	};
	rows.close();
	
	return aData;
};


// Get article's count
M3.DB.getArticleCount = function(){
	var row = oDb.execute('SELECT COUNT(*) AS cnt FROM articles');
	var res = row.fieldByName('cnt');
	return res;
};


// Get article desc from table 'articles' by given 'article_id'
M3.DB.getArticleDescById = function( article_id ){
	var row = oDb.execute('SELECT desc FROM articles WHERE id = ?', article_id);
	var res = row.fieldByName('desc');
	return res;
};


// Get article array from table 'articles' by given 'article_id'
M3.DB.getArticleArrayById = function( article_id ){
	var row = oDb.execute('SELECT * FROM articles WHERE id = ?', article_id);
	var res = [{ id: row.fieldByName('id') ,desc: row.fieldByName('desc'), price: row.fieldByName('price'), pict: row.fieldByName('image_name') }];
	return res;
};

// Get article field 'image_data' from table 'articles' by given 'article_id' 
M3.DB.getArticleImageById = function( article_id ){
	var row = oDb.execute('SELECT image_data FROM articles WHERE id = ?', article_id);
	var res = row.field(0);
	return res;
};


// Delete article from table 'articles' by given 'article_id'
M3.DB.deleteArticleById = function( article_id ){
	oDb.execute('DELETE FROM articles WHERE id = ?', article_id);
};

// Delete all article's from table 'articles'
M3.DB.deleteArticles = function(){
	oDb.execute('DELETE FROM articles');
};



/*
 * CUSTOMERS DB methods
 */

// Insert data into customers.
// 'cust_data' is JSON object or array object
M3.DB.insertIntoCustomers = function( cust_data ) {
	
	var _desc;
	var _addr;
	var _city;
	var _pcode;
	var _tel1;
	var _tel2;
	var _lon;
	var _lat;
	// get the 'id' of the last logged user
	var _user_id = Ti.App.current_logged_user_id;
	
	for (var i=0; i < cust_data.length; i++) {
		
		_desc = cust_data[i].desc;
		_addr = cust_data[i].addr;
		_city = cust_data[i].city;
		_pcode = cust_data[i].pcode;
		_tel1 = cust_data[i].tel1;
		_tel2 = cust_data[i].tel2;
		_lon = Number(cust_data[i].lon);
		_lat = Number(cust_data[i].lat);
	
		oDb.execute('INSERT INTO customers (desc, addr, city, postcode, tel1, tel2, lon, lat, user_id) VALUES(?,?,?,?,?,?,?,?,?)', _desc, _addr, _city, _pcode, _tel1, _tel2, _lon, _lat, _user_id );
	  
	};
	 
};


// Update table 'customers' by given 'cust_data'.
// 'cust_data' is JSON object or array object
M3.DB.updateCustomers = function( cust_data ) {

	var _desc;
	var _addr;
	var _city;
	var _pcode;
	var _tel1;
	var _tel2;
	var _lon;
	var _lat;
	// get the 'user_id' by the last logged user
	var _user_id = Ti.App.current_logged_user_id;
	
	for (var i=0; i < cust_data.length; i++) {
		
		_id = cust_data[0].id;
		_desc = cust_data[0].desc;
		_addr = cust_data[0].addr;
		_city = cust_data[0].city;
		_pcode = cust_data[0].pcode;
		_tel1 = cust_data[0].tel1;
		_tel2 = cust_data[0].tel2;
		_lon = Number(cust_data[0].lon);
		_lat = Number(cust_data[0].lat);
	
		oDb.execute('UPDATE customers SET desc = ?, addr = ?, city = ?, postcode = ?, tel1 = ?, tel2 = ?, lon = ?, lat = ?, user_id = ? WHERE id = ?', _desc, _addr, _city, _pcode, _tel1, _tel2, _lon, _lat, _user_id, _id );
	
	};
     
};


// Get customer data from table 'customers' by given '_user_id'
// 'aData' is JSON object
M3.DB.getCustomerData = function( _user_id ){
	
	var aData = [];
	var rows = oDb.execute('SELECT * FROM customers WHERE user_id = ? ORDER BY desc', _user_id);
	while (rows.isValidRow()) {
  		aData.push({ 
  			id: rows.fieldByName('id'), 
  			desc: rows.fieldByName('desc'), 
  			addr: rows.fieldByName('addr'), 
  			city: rows.fieldByName('city'), 
  			postcode: rows.fieldByName('postcode'),   			
  			tel1: rows.fieldByName('tel1'), 
  			tel2: rows.fieldByName('tel2'),
  			user_id: rows.fieldByName('user_id'),   			
  			lon: rows.fieldByName('lon'), 
  			lat: rows.fieldByName('lat')
  			});

		rows.next();
	};
	rows.close();
	
	return aData;
};


// Get customer desc from table 'customers' by given '_cust_id'
M3.DB.getCustomerById = function( _cust_id ){
	var row = oDb.execute('SELECT * FROM customers WHERE id = ?', _cust_id);
	var res = row.fieldByName('desc');
	return res;
};


// Get customer array from table 'customers' by given '_cust_id'
M3.DB.getCustomerArrayById = function( _cust_id ){
	var row = oDb.execute('SELECT * FROM customers WHERE id = ?', _cust_id);
	var res = [{ id: row.fieldByName('id') ,desc: row.fieldByName('desc'), city: row.fieldByName('city'), postcode: row.fieldByName('postcode'), addr: row.fieldByName('addr'), lat: row.fieldByName('lat'), lon: row.fieldByName('lon') }];
	return res;
};


// Get customers count
M3.DB.getCustomersCount = function(){
	var row = oDb.execute('SELECT COUNT(*) AS cnt FROM customers');
	var res = row.fieldByName('cnt');
	return res;
};


// Delete all customers from table 'customers'
M3.DB.deleteCustomers = function(){
	oDb.execute('DELETE FROM customers');
};


/*
 * PURCHASE DB methods
 */

// Get doc's data from table 'docs' by given '_user_id' (all doc's for the user)
// 'aData' is JSON object
M3.DB.getPurchasesData = function( _user_id ){
	
	var aData = [];
	var rows;
	
	rows = oDb.execute('SELECT * FROM docs WHERE cust_id <> 0 AND user_id = ?', Number(_user_id));		
	
	while (rows.isValidRow()) {
  		aData.push({ 
  			doc_no: rows.fieldByName('doc_no'), 
  			doc_date: rows.fieldByName('doc_date'), 
  			cust_id: rows.fieldByName('cust_id'), 
  			user_id: rows.fieldByName('user_id'),
  			items_total: rows.fieldByName('items_total'),
  			doc_valid: rows.fieldByName('doc_valid'),
  			doc_notes: rows.fieldByName('doc_notes'),
  			// items will be another JSON array of items_data items
  			items: M3.DB.getPurchaseItemsData(rows.fieldByName('doc_no'))
  			});

		rows.next();
	};
	rows.close();
	
	return aData;
};


// Get purchase items data from table 'doc_items' by given '_doc_no' (doc_no)
// 'aData' is JSON object
M3.DB.getPurchaseItemsData = function( _doc_no ){
	
	var aData = [];
	var rows = oDb.execute('SELECT * FROM doc_items WHERE doc_no = ?', _doc_no);
	while (rows.isValidRow()) {
  		aData.push({ 
  			doc_no: rows.fieldByName('doc_no'),
  			doc_item_no: rows.fieldByName('doc_item_no'), 
  			article_id: rows.fieldByName('art_id'), 
  			article_quantity: rows.fieldByName('quantity') 
  			});

		rows.next();
	};
	rows.close();
	return aData;
};


// Cancel document procedure, set's the status of document to 'doc_valid = 0' where doc_no is '_doc_no' 
M3.DB.cancelPurchase = function( _doc_no ){
	oDb.execute('UPDATE docs SET doc_valid = 0 WHERE doc_no = ?', _doc_no);
};

// Activate document procedure, set's the status of document to 'doc_valid = 1' where doc_no is '_doc_no' 
M3.DB.activatePurchase = function( _doc_no ){
	oDb.execute('UPDATE docs SET doc_valid = 1 WHERE doc_no = ?', _doc_no);
};


// Delete document from table's 'docs' and 'doc_items' by given '_doc_no'
M3.DB.deleteFromPurchases = function( _doc_no ){
	oDb.execute('DELETE FROM docs WHERE doc_no = ?', _doc_no);
	oDb.execute('DELETE FROM doc_items WHERE doc_no = ?', _doc_no);	
};

// Delete all data from tables 'docs' and 'doc_items'
M3.DB.deleteAllPurchases = function(){
	oDb.execute('DELETE FROM docs');
	oDb.execute('DELETE FROM doc_items');	
};


// Insert data into tables 'docs' and 'doc_items'
// * 'user_id' last logged user id
// * 'cust_id' customer id
// * 'd_valid' document valid 0 or 1
// * 'd_notes' document notes
// * 'items_data' JSON object of article items
M3.DB.insertIntoPurchases = function( user_id, cust_id, d_valid, d_notes, items_data ) {
	
	var tmp_qt = 0;
	
	// First check data
	for (var x=0; x < items_data.length; x++) {
		tmp_qt += items_data[x].article_quantity;
	};
	
	// If there is no data in items, no need to insert data into tables 'docs' and 'doc_items'
	if(tmp_qt == 0){
		alert("Nema stavki za ažuriranje!");
		return;
	};
	
	// 'doc_date' will be current date
	var _d_date = Date();
	var _cust_id = cust_id;
	var _d_valid = d_valid;
	var _d_notes = d_notes;
	var _user_id = user_id;
	
	// insert data into main table 'docs'
	oDb.execute('INSERT INTO docs (doc_date, cust_id, doc_valid, user_id, doc_notes) VALUES(?,?,?,?,?)', _d_date, _cust_id, _d_valid, _user_id, _d_notes );
 	
 	// return the 'doc_no' value because of PRIMARY KEY
 	var d_last = oDb.execute("SELECT * FROM docs ORDER BY doc_no DESC LIMIT 1");
	var _d_no = Number( d_last.fieldByName('doc_no')); 
	
	// close queries
	d_last.close();
	
	var _d_item_no = 0;
	var _art_id = "";
	var _quantity = 0;
	var _total = 0;
	
    // now insert into doc_items, loop through the 'items_data'
    for (var i=0; i < items_data.length; i++) {
    	
    	_art_id = items_data[i].article_id;
    	_quantity = items_data[i].article_quantity;
    	_total += _quantity;
    	
    	// only if quantity <> 0
    	if(_quantity != 0){
    		// add to item counter
    		_d_item_no++;
    		// insert item data
			oDb.execute('INSERT INTO doc_items (doc_no, doc_item_no, art_id, quantity) VALUES(?,?,?,?)', _d_no, _d_item_no, _art_id, _quantity );
		};
    }; 
    
    // update total in table 'docs'
    oDb.execute('UPDATE docs SET items_total = ? WHERE doc_no = ?', _total, _d_no);
 
};


/*
 * MAIN DB methods
 */

// create and open db
M3.DB.openDB = function() {
	
	var db = Titanium.Database.open('purchase');
	
	// table 'docs'
	db.execute('CREATE TABLE IF NOT EXISTS docs (doc_no INTEGER PRIMARY KEY, doc_date DATE, cust_id INT, doc_valid INT, items_total REAL, user_id INT, doc_notes TEXT)');
	
	// table 'doc_items'
	db.execute('CREATE TABLE IF NOT EXISTS doc_items (doc_no INT, doc_item_no INT, art_id TEXT, quantity REAL)');
	
	// table 'customers'
	db.execute('CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY, desc TEXT, addr TEXT, city TEXT, postcode TEXT, tel1 TEXT, tel2 TEXT, user_id INT, lon REAL, lat REAL)'); 
	
	// table 'articles'
	db.execute('CREATE TABLE IF NOT EXISTS articles (id TEXT, desc TEXT, price REAL, image_name TEXT, image_data BLOB)'); 
	
	// table 'params'
	db.execute('CREATE TABLE IF NOT EXISTS params (id INTEGER PRIMARY KEY, device_id TEXT, param_name TEXT, param_value TEXT)'); 
	
	// table 'params'
	db.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, pwd TEXT)'); 

	return db;
};


// alter main db
M3.DB.alterDB = function(oDb){
	return null;
};


