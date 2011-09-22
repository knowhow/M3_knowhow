var boDb = {};	

/*
 * USERS DB methods
 */
	
boDb.getUsersDataJSON = function() {
	var acc = JSON.parse('{"userdata":[{"id":"1","name":"vsasa","pwd":"11"},{"id":"2","name":"bjasko","pwd":"22"},{"id":"3","name":"hernad","pwd":"33"}]}');
	return acc;
};


/*
 * PARAMS methods
 */
boDb.getParamsDataJSON = function() {
	var par = JSON.parse('{"params":[{"device_id":"1"}]}');
	return par;
};


// return device id from params
boDb.getDeviceId = function() {
	var dev = boDb.getParamsDataJSON();
	var dev_id = dev.params[0].device_id;
	return dev_id ;
};


/*
 * ARTICLES DB methods
 */


// insert data into articles
boDb.insertIntoArticles = function( article_data ) {
	
	// insert into table articles
	var _id;
	var _desc;
	var _price;
	var _pict;
	
	for (var i=0; i < article_data.length; i++) {
		
		_id = article_data[i].id;
		_desc = article_data[i].desc;
		_price = Number(article_data[i].price);
		_pict = article_data[i].pict;
	
		oDb.execute('INSERT INTO articles (id, desc, price, pict) VALUES(?,?,?,?)', _id, _desc, _price, _pict );
	  
	};
     
};


// get article data from db
boDb.getArticleData = function(){
	
	var aData = [];
	var rows = oDb.execute('SELECT * FROM articles ORDER BY id');
	
	while (rows.isValidRow()) {
  		aData.push({ 
  			id: rows.fieldByName('id'), 
  			desc: rows.fieldByName('desc'), 
  			price: rows.fieldByName('price'), 
  			pict: rows.fieldByName('pict') 
  			});

		rows.next();
	};
	rows.close();
	
	return aData;
};


// get article count
boDb.getArticleCount = function(){
	var row = oDb.execute('SELECT COUNT(*) AS cnt FROM articles');
	var res = row.fieldByName('cnt');
	return res;
};

// get article desc from db
boDb.getArticleDescById = function( article_id ){
	var row = oDb.execute('SELECT * FROM articles WHERE id = ?', article_id);
	var res = row.fieldByName('desc');
	return res;
};


// get article array from db
boDb.getArticleArrayById = function( article_id ){
	var row = oDb.execute('SELECT * FROM articles WHERE id = ?', article_id);
	var res = [{ id: row.fieldByName('id') ,desc: row.fieldByName('desc'), price: row.fieldByName('price'), pict: row.fieldByName('pict') }];
	return res;
};


// delete article from db
boDb.deleteArticleById = function( article_id ){
	oDb.execute('DELETE FROM articles WHERE id = ?', article_id);
};

// delete article from db
boDb.deleteArticles = function(){
	oDb.execute('DELETE FROM articles');
};



/*
 * CUSTOMERS DB methods
 */

// insert data into customers
boDb.insertIntoCustomers = function( cust_data ) {
	
	//var oDb = boDb.openDB();
	// insert into table customers
	var _desc;
	var _addr;
	var _city;
	var _pcode;
	var _tel1;
	var _tel2;
	var _lon;
	var _lat;
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
	
	//oDb.close();
     
};


// insert data into customers
boDb.updateCustomers = function( cust_data ) {

	//var oDb = boDb.openDB();
	var _desc;
	var _addr;
	var _city;
	var _pcode;
	var _tel1;
	var _tel2;
	var _lon;
	var _lat;
	var _user_id = Ti.App.current_logged_user_id;
	
	for (var i=0; i < cust_data.length; i++) {
	
		// insert into table customers
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
	
	//oDb.close();
     
};



// get customer data from db
boDb.getCustomerData = function( _user_id ){
	//var oDb = boDb.openDB();
	//alert(_user_id);
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
	//oDb.close();
	
	return aData;
};


// get customer desc from db
boDb.getCustomerById = function( customer_id ){
	//var oDb = boDb.openDB();
	var row = oDb.execute('SELECT * FROM customers WHERE id = ?', customer_id);
	var res = row.fieldByName('desc');
	//oDb.close();
	return res;
};


// get customer desc from db
boDb.getCustomerArrayById = function( customer_id ){
	//var oDb = boDb.openDB();
	var row = oDb.execute('SELECT * FROM customers WHERE id = ?', customer_id);
	var res = [{ id: row.fieldByName('id') ,desc: row.fieldByName('desc'), city: row.fieldByName('city'), postcode: row.fieldByName('postcode'), addr: row.fieldByName('addr'), lat: row.fieldByName('lat'), lon: row.fieldByName('lon') }];
	//oDb.close();
	return res;
};


/*
 * PURCHASE DB methods
 */

// get purchases from db
boDb.getPurcasesData = function( _user_id ){
	//var oDb = boDb.openDB();
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
  			doc_notes: rows.fieldByName('doc_notes')
  			});

		rows.next();
	};
	rows.close();
	//oDb.close();
	
	return aData;
};


// get purchase items data from db
boDb.getPurchaseItemsData = function( purchase_no ){
	//var oDb = boDb.openDB();
	var aData = [];
	var rows = oDb.execute('SELECT * FROM doc_items WHERE doc_no = ?', purchase_no);
	while (rows.isValidRow()) {
  		aData.push({ 
  			doc_item_no: rows.fieldByName('doc_item_no'), 
  			article_id: rows.fieldByName('art_id'), 
  			article_quantity: rows.fieldByName('quantity') 
  			});

		rows.next();
	};
	rows.close();
	//oDb.close();
	return aData;
};


// cancel purchase
boDb.cancelPurchase = function( p_no ){
	//var oDb = boDb.openDB();
	oDb.execute('UPDATE docs SET doc_valid = 0 WHERE doc_no = ?', p_no);
	//oDb.close();
};

// activate purchase
boDb.activatePurchase = function( p_no ){
	//var oDb = boDb.openDB();
	oDb.execute('UPDATE docs SET doc_valid = 1 WHERE doc_no = ?', p_no);
	//oDb.close();
};


// delete purchase
boDb.deleteFromPurchases = function( p_no ){
	//var oDb = boDb.openDB();
	oDb.execute('DELETE FROM docs WHERE doc_no = ?', p_no);
	oDb.execute('DELETE FROM doc_items WHERE doc_no = ?', p_no);	
	//oDb.close();
};

// delete purchase
boDb.deleteAllPurchases = function(){
	//var oDb = boDb.openDB();
	oDb.execute('DELETE FROM docs');
	oDb.execute('DELETE FROM doc_items');	
	//oDb.close();
};


// insert data into purchases
boDb.insertIntoPurchases = function( user_id, cust_id, d_valid, d_notes, items_data ) {
	
	//var oDb = boDb.openDB();
	var tmp_qt = 0;
	// check data
	for (var x=0; x < items_data.length; x++) {
		tmp_qt += items_data[x].article_quantity;
	};
	
	if(tmp_qt == 0){
		alert("Nema stavki za ažuriranje!");
		//oDb.close();
		return;
	};
	
	// insert into table purchases
	var _d_date = Date();
	var _cust_id = cust_id;
	var _d_valid = d_valid;
	var _d_notes = d_notes;
	var _user_id = user_id;
	
	oDb.execute('INSERT INTO docs (doc_date, cust_id, doc_valid, user_id, doc_notes) VALUES(?,?,?,?,?)', _d_date, _cust_id, _d_valid, _user_id, _d_notes );
 	
 	var d_last = oDb.execute("SELECT * FROM docs ORDER BY doc_no DESC LIMIT 1");
	
	// get the inserted purchase_no
	var _d_no = Number( d_last.fieldByName('doc_no')); 
	
	// close queries
	d_last.close();
	
	var _d_item_no = 0;
	var _art_id = "";
	var _quantity = 0;
	var _total = 0;
	
    // now insert into purchase_items
    for (var i=0; i < items_data.length; i++) {
    	
    	_art_id = items_data[i].article_id;
    	_quantity = items_data[i].article_quantity;
    	_total += _quantity;
    	
    	// only if quantity <> 0
    	if(_quantity != 0){
    		// add to item counter
    		_d_item_no++;
    		// insert item
			oDb.execute('INSERT INTO doc_items (doc_no, doc_item_no, art_id, quantity) VALUES(?,?,?,?)', _d_no, _d_item_no, _art_id, _quantity );
		};
    }; 
    
    // update total in purchases
    oDb.execute('UPDATE docs SET items_total = ? WHERE doc_no = ?', _total, _d_no);
    //oDb.close();
};


/*
 * MAIN DB methods
 */

// create and open db
boDb.openDB = function() {
	
	var db = Titanium.Database.open('purchase');
	
	// docs
	//
	// doc_no INT
	// doc_date DATE
	// cust_id TEXT
	// doc_valid INT
	// user_id INT
	// items_total REAL
	db.execute('CREATE TABLE IF NOT EXISTS docs (doc_no INTEGER PRIMARY KEY, doc_date DATE, cust_id INT, doc_valid INT, items_total REAL, user_id INT, doc_notes TEXT)');
	
	// doc_items
	// 
	// doc_no INT
	// doc_item_no INT
	// art_id TEXT
	// quantity REAL
	
	db.execute('CREATE TABLE IF NOT EXISTS doc_items (doc_no INT, doc_item_no INT, art_id TEXT, quantity REAL)');
	
	// customers
	//
	// id INT
	// desc TEXT
	// addr TEXT
	// city TEXT
	// postcode TEXT
	// user TEXT
	// lat REAL
	// lon REAL
	db.execute('CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY, desc TEXT, addr TEXT, city TEXT, postcode TEXT, tel1 TEXT, tel2 TEXT, user_id INT, lon REAL, lat REAL)'); 
	
	
	// articles
	//
	// id TEXT
	// desc TEXT
	// price REAL
	// pict TEXT
	// pict_data BLOB
	db.execute('CREATE TABLE IF NOT EXISTS articles (id TEXT, desc TEXT, price REAL, pict TEXT, pict_data BLOB)'); 
	
	return db;
};


// alter main db
boDb.alterDB = function(oDb){
	return null;
};


