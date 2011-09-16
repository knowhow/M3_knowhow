var boDb = {};	

/*
 * USERS DB methods
 */

// get users data from db
boDb.getUsersData = function( oDb ){
	var aData = [];
	var rows = oDb.execute('SELECT * FROM users');
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

	
boDb.getUsersDataJSON = function() {
	var acc = JSON.parse('{"userdata":[{"id":"1","name":"vsasa","pwd":"11"},{"id":"2","name":"bjasko","pwd":"22"},{"id":"3","name":"hernad","pwd":"33"}]}');
	return acc;
};


/*
 * ARTICLES DB methods
 */

// get articles data from db
boDb.getArticlesData = function( oDb ){
	var aData = [];
	var rows = oDb.execute('SELECT * FROM articles');
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


// get articles data JSON
boDb.getArticlesDataJSON = function() {
	var art = JSON.parse('{"articles":[{"id":"3013","desc":"Drina MP Sarajevska","price":"18.803","pict":"3013.jpg"},'+
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
		'{"id":"3095","desc":"Code red","price":"21.368","pict":"3095.jpg"},' +
		'{"id":"3096","desc":"Code sky","price":"0","pict":"3096.jpg"}]}' );
	return art;
};


// get article desc from JSON
boDb.getArticleDescByIdJSON = function( article_id ){
	var data = boDb.getArticlesDataJSON();
	for (var i=0; i < data.articles.length; i++) {
	  if(data.articles[i].id == article_id){
	  	return data.articles[i].desc;
	  };
	};
	return "";
};

/*
 * CUSTOMERS DB methods
 */

// insert data into customers
boDb.insertIntoCustomers = function( oDb, cust_data ) {
	
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
		_lon = cust_data[i].lon;
		_lat = cust_data[i].lat;
	
		oDb.execute('INSERT INTO customers (desc, addr, city, postcode, tel1, tel2, lon, lat, user_id) VALUES(?,?,?,?,?,?,?,?,?)', _desc, _addr, _city, _pcode, _tel1, _tel2, _lon, _lat, _user_id );
	  
	};
     
};


// insert data into customers
boDb.updateCustomers = function( oDb, cust_data ) {

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
		_lon = cust_data[0].lon;
		_lat = cust_data[0].lat;
	
		oDb.execute('UPDATE customers SET desc = ?, addr = ?, city = ?, postcode = ?, tel1 = ?, tel2 = ?, lon = ?, lat = ?, user_id = ? WHERE id = ?', _desc, _addr, _city, _pcode, _tel1, _tel2, _lon, _lat, _user_id, _id );
	
	};
     
};



// get customer data from db
boDb.getCustomerData = function( oDb ){
	var aData = [];
	var rows = oDb.execute('SELECT * FROM customers ORDER BY desc');
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


// get customer desc from db
boDb.getCustomerById = function( oDb, customer_id ){
	var row = oDb.execute('SELECT * FROM customers WHERE id = ?', customer_id);
	return row.fieldByName('desc');
};


// get customer desc from JSON
boDb.getCustomerByIdJSON = function( customer_id ){
	var data = boDb.getCustomersDataJSON();
	for (var i=0; i < data.customers.length; i++) {
	  if(data.customers[i].id == customer_id){
	  	return data.customers[i].desc;
	  };
	};
	return "";
};

// get customer desc from db
boDb.getCustomerArrayById = function( oDb, customer_id ){
	var row = oDb.execute('SELECT * FROM customers WHERE id = ?', customer_id);
	return [{ id: row.fieldByName('id') ,desc: row.fieldByName('desc'), city: row.fieldByName('city'), postcode: row.fieldByName('postcode'), addr: row.fieldByName('addr'), lat: row.fieldByName('lat'), lon: row.fieldByName('lon') }];
};


// get customer desc from JSON
boDb.getCustomerArrayByIdJSON = function( customer_id ){
	var data = boDb.getCustomersDataJSON();
	for (var i=0; i < data.customers.length; i++) {
	  if(data.customers[i].id == customer_id){
	  	return [{ desc: data.customers[i].desc, city: data.customers[i].city, postcode: data.customers[i].postcode, addr: data.customers[i].addr, lat: data.customers[i].lat, lon: data.customers[i].lon }];
	  };
	};
	return "";
};


// get customer data JSON
boDb.getCustomersDataJSON = function() {
	var cust = JSON.parse(
		'{"customers":[{"id":"1","desc":"Firma A","addr":"Ulica 1","city":"Zenica","postcode":"72000","tel":"032000000","user":"vsasa","lat":"44.20408666133","lon":"17.90695884"},'+
		'{"id":"2","desc":"Firma B","addr":"Ulica 2","city":"Zenica","postcode":"72000","tel":"032100000","user":"vsasa","lat":"43.915886","lon":"17.679076"},' +
		'{"id":"3","desc":"Firma C","addr":"Ulica 3","city":"Sarajevo","postcode":"71000","tel":"032110000","user":"vsasa","lat":"43.915886","lon":"17.679076"},' +
		'{"id":"4","desc":"Firma D","addr":"Ulica 4","city":"Sarajevo","postcode":"71000","tel":"032111000","user":"hernad","lat":"43.915886","lon":"17.679076"},' +
		'{"id":"5","desc":"Firma E","addr":"Ulica 5","city":"Sarajevo","postcode":"71000","tel":"032220000","user":"vsasa","lat":"43.915886","lon":"17.679076"},' +
		'{"id":"6","desc":"Firma F","addr":"Ulica 6","city":"Konjic","postcode":"75000","tel":"032555000","user":"vsasa","lat":"43.915886","lon":"17.679076"}]}' );
	return cust;
};


/*
 * PURCHASE DB methods
 */

// get purchases from db
boDb.getPurcasesData = function( oDb, valid ){
	var aData = [];
	var rows;
	
	if(valid != null){
		rows = oDb.execute('SELECT * FROM docs WHERE cust_id <> "" AND doc_valid = ?', valid);
	}
	else
	{
		rows = oDb.execute('SELECT * FROM docs WHERE cust_id <> ""');		
	};
	
	while (rows.isValidRow()) {
  		aData.push({ 
  			doc_no: rows.fieldByName('doc_no'), 
  			doc_date: rows.fieldByName('doc_date'), 
  			cust_id: rows.fieldByName('cust_id'), 
  			user_id: rows.fieldByName('user_id'),
  			items_total: rows.fieldByName('items_total'),
  			doc_valid: rows.fieldByName('doc_valid')
  			});

		rows.next();
	};
	rows.close();
	
	return aData;
};


// get purchase items data from db
boDb.getPurchaseItemsData = function( oDb, purchase_no ){
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
	
	return aData;
};


// cancel purchase
boDb.cancelPurchase = function( oDb, p_no ){
	oDb.execute('UPDATE docs SET doc_valid = 0 WHERE doc_no = ?', p_no);
};

// activate purchase
boDb.activatePurchase = function( oDb, p_no ){
	oDb.execute('UPDATE docs SET doc_valid = 1 WHERE doc_no = ?', p_no);
};


// delete purchase
boDb.deleteFromPurchases = function( oDb, p_no ){
	oDb.execute('DELETE FROM docs WHERE doc_no = ?', p_no);
	oDb.execute('DELETE FROM doc_items WHERE doc_no = ?', p_no);	
};

// delete purchase
boDb.deleteAllPurchases = function( oDb ){
	oDb.execute('DELETE ALL FROM docs');
	oDb.execute('DELETE ALL FROM doc_items');	
};


// insert data into purchases
boDb.insertIntoPurchases = function( oDb, user_id, cust_id, d_valid, items_data ) {
	
	var tmp_qt = 0;
	// check data
	for (var x=0; x < items_data.length; x++) {
		tmp_qt += items_data[x].article_quantity;
	};
	
	if(tmp_qt == 0){
		alert("Nema stavki za ažuriranje!");
		return;
	};
	
	// insert into table purchases
	var _d_date = Date();
	var _cust_id = cust_id;
	var _d_valid = d_valid;
	var _user_id = user_id;
	
	oDb.execute('INSERT INTO docs (doc_date, cust_id, doc_valid, user_id) VALUES(?,?,?,?)', _d_date, _cust_id, _d_valid, _user_id );
 	
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
    	
    	// add to item counter
    	_d_item_no++;
    	_art_id = items_data[i].article_id;
    	_quantity = items_data[i].article_quantity;
    	_total += _quantity;
    	
    	// only if quantity <> 0
    	if(_quantity != 0){
    		// insert item
			oDb.execute('INSERT INTO doc_items (doc_no, doc_item_no, art_id, quantity) VALUES(?,?,?,?)', _d_no, _d_item_no, _art_id, _quantity );
		};
    }; 
    
    // update total in purchases
    oDb.execute('UPDATE docs SET items_total = ? WHERE doc_no = ?', _total, _d_no);
    
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
	db.execute('CREATE TABLE IF NOT EXISTS docs (doc_no INTEGER PRIMARY KEY, doc_date DATE, cust_id INT, doc_valid INT, items_total REAL, user_id INT)');
	
	// doc_items
	// 
	// doc_no INT
	// doc_item_no INT
	// art_id TEXT
	// quantity REAL
	
	db.execute('CREATE TABLE IF NOT EXISTS doc_items (doc_no INT, doc_item_no INT, art_id TEXT, quantity REAL)');
	
	// customers
	//
	// id TEXT
	// desc TEXT
	// addr TEXT
	// city TEXT
	// postcode TEXT
	// user TEXT
	// lat REAL
	// lon REAL
	db.execute('CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY, desc TEXT, addr TEXT, city TEXT, postcode TEXT, tel1 TEXT, tel2 TEXT, user_id INT, lon REAL, lat REAL)'); 
	
	return db;
};


// alter main db
boDb.alterDB = function(oDb){
	return null;
};


