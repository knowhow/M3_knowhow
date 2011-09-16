var boCodes = {};

// articles namespace
boCodes.Articles = {};
// customers namespace
boCodes.Customers = {};

boCodes.Users = {};
	
// get articles from db
boCodes.Articles.getArticles = function() {
	return boDb.getArticlesDataJSON()
};		
	
// get article matrix based on article JSON data
boCodes.Articles.getArticleMatrix = function( article_data ) {
	return boCodes.Matrix.getMatrix( article_data, "artikli" );
};

// get customers from DB
boCodes.Customers.getCustomers = function(){
	var main_db = boDb.openDB();
	var cust_data = boDb.getCustomerData( main_db );
	main_db.close();
	return cust_data;
};

// get customers from JSON
boCodes.Customers.getCustomersJSON = function() {
	
	var data = boDb.getCustomersDataJSON()
	var ret = [];
	
	for(var i=0; i < data.customers.length ; i++){
	
		if (data.customers[i].user == Ti.App.current_logged_user ){
			ret.push( data.customers[i] );
		}; 
	};
	
	return ret;
};

// get customers by distance
boCodes.Customers.getCustomersInRadius = function( lon, lat, radius ) {
	
	var data = boDb.getCustomersDataJSON()
	var ret = [];
	var dist = 0;
	
	if(lon == null){return ret};
	
	if(radius==null){radius = 300};
	
	for(var i=0; i < data.customers.length ; i++){
	
		if (data.customers[i].user == Ti.App.current_logged_user ){
			
			// calculate distance
			dist = boGeo.calcGeoDistance( data.customers[i].lon, data.customers[i].lat, lon, lat );
			// round to 3 decimals
			dist = Math.round(dist*1000)/1000;
			
			// convert to meters and push data if exist
			if (dist * 1000 < radius ){
				ret.push( data.customers[i] );	
			};
		}; 
	};
	
	return ret;
};
	
// get customer form...
boCodes.Customers.getCustomerForm = function() {
	return boCodes.Customers.customerForm();
};

// get users data...
boCodes.Users.getUsersData = function() {
	return boDb.getUsersDataJSON();
};


