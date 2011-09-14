var boDb = {};	

/*
 * USERS DB methods
 */

// get users data from db
boDb.getUsersData = function( oDb ){
	var aData = [];
	var rows = oDb.execute('SELECT * FROM ' + table);
	while (rows.isValidRow()) {
  		aData.push({ 
  			title: rows.fieldByName('name'), hasChild:true,
  			id: rows.fieldByName('id'), 
  			jmbg: rows.fieldByName('jmbg'), 
  			koef: rows.fieldByName('koef'), 
  			color:'green' 
  			});

		rows.next();
	};
	rows.close();
	
	return aData;
};

	
boDb.getUsersDataJSON = function() {
	var acc = JSON.parse('{"userdata":[{"name":"vsasa","pwd":"11"},{"name":"bjasko","pwd":"22"},{"name":"hernad","pwd":"33"}]}');
	return acc;
};


/*
 * ARTICLES DB methods
 */

// get articles data from db
boDb.getArticlesData = function( oDb ){
	var aData = [];
	var rows = oDb.execute('SELECT * FROM ' + table);
	while (rows.isValidRow()) {
  		aData.push({ 
  			title: rows.fieldByName('name'), hasChild:true,
  			id: rows.fieldByName('id'), 
  			jmbg: rows.fieldByName('jmbg'), 
  			koef: rows.fieldByName('koef'), 
  			color:'green' 
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


/*
 * CUSTOMERS DB methods
 */

// get customer data from db
boDb.getCustomerData = function( oDb ){
	var aData = [];
	var rows = oDb.execute('SELECT * FROM ' + table);
	while (rows.isValidRow()) {
  		aData.push({ 
  			title: rows.fieldByName('name'), hasChild:true,
  			id: rows.fieldByName('id'), 
  			jmbg: rows.fieldByName('jmbg'), 
  			koef: rows.fieldByName('koef'), 
  			color:'green' 
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
		rows = oDb.execute('SELECT * FROM purchases WHERE customer_id <> "" AND purchase_valid = ?', valid);
	}
	else
	{
		rows = oDb.execute('SELECT * FROM purchases WHERE customer_id <> ""');		
	};
	
	while (rows.isValidRow()) {
  		aData.push({ 
  			purchase_no: rows.fieldByName('purchase_no'), 
  			date: rows.fieldByName('date'), 
  			cust_id: rows.fieldByName('customer_id'), 
  			purchase_valid: rows.fieldByName('purchase_valid')
  			});

		rows.next();
	};
	rows.close();
	
	return aData;
};


// get purchase items data from db
boDb.getPurchaseItemsData = function( oDb, purchase_no ){
	var aData = [];
	var rows = oDb.execute('SELECT * FROM purchase_items WHERE purchase_no = ?', purchase_no);
	while (rows.isValidRow()) {
  		aData.push({ 
  			purchase_item_no: rows.fieldByName('purchase_item_no'), 
  			article_id: rows.fieldByName('article_id'), 
  			quantity: rows.fieldByName('quantity') 
  			});

		rows.next();
	};
	rows.close();
	
	return aData;
};

// get sum of purchase
boDb.getSumOfPurchase = function( oDb, p_no ){
	var row = oDb.execute('SELECT items_total FROM purchases WHERE purchase_no = ?', p_no);
	return Number(row.fieldByName('items_total'));
};


// insert data into purchases
boDb.insertIntoPurchases = function( oDb, cust_id, p_valid, items_data ) {
	
	// insert into table purchases
	var _p_date = Date();
	var _cust_id = cust_id;
	var _p_valid = p_valid;
	
	oDb.execute('INSERT INTO purchases (date, customer_id, purchase_valid, items_total) VALUES(?,?,?,?)', _p_date, _cust_id, _p_valid, 0 );
 	
 	var p_last = oDb.execute("SELECT * FROM purchases ORDER BY purchase_no DESC LIMIT 1");
	
	// get the inserted purchase_no
	var _p_no = Number( p_last.fieldByName('purchase_no')); 
	
	// close queries
	p_last.close();
	
	var _p_item_no = 0;
	var _art_id = "";
	var _quantity = 0;
	var _total = 0;
	
    // now insert into purchase_items
    for (var i=0; i < items_data.length; i++) {
    	// add to item counter
    	_p_item_no++;
    	_art_id = items_data[i].article_id;
    	_quantity = items_data[i].article_quantity;
    	_total += _quantity;
    	// insert item
		oDb.execute('INSERT INTO purchase_items (purchase_no, purchase_item_no, article_id, quantity) VALUES(?,?,?,?)', _p_no, _p_item_no, _art_id, _quantity );
    }; 
    
    // update total in purchases
    oDb.execute('UPDATE purchases SET items_total = ? WHERE purchase_no = ?', _total, _p_no);
    
};


/*
 * MAIN DB methods
 */

// create and open db
boDb.openDB = function() {
	
	var db = Titanium.Database.open('purchase');
	
	// purchases
	//
	// purchase_no INT
	// date DATE
	// customer_id TEXT
	// purchase_valid INT
	db.execute('CREATE TABLE IF NOT EXISTS purchases (purchase_no INTEGER PRIMARY KEY, date DATE, customer_id TEXT, purchase_valid INT, items_total REAL)');
	
	// purchase_items
	// 
	// purchase_no INT
	// purchase_item_no INT
	// artcle_id TEXT
	// quantity REAL
	
	db.execute('CREATE TABLE IF NOT EXISTS purchase_items (purchase_no INT, purchase_item_no INT, article_id TEXT, quantity REAL)');
	
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
	db.execute('CREATE TABLE IF NOT EXISTS customers (id TEXT, desc TEXT, addr TEXT, city TEXT, postcode TEXT, user TEXT, lon REAL, lat REAL)'); 
	
	return db;
};


// alter main db
boDb.alterDB = function(oDb){
	return null;
};



boDb.insertIntoTable = function( oDb ) {

db.execute('INSERT INTO bringout (name, jmbg, koef) VALUES(?,?,?)', _name, _jmbg, _koef );
   
};
