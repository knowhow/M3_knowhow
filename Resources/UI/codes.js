var boCodes = {};

// articles namespace
boCodes.Articles = {};
// customers namespace
boCodes.Customers = {};

boCodes.Users = {};

boCodes.Postal = {};


// get postal code by city
boCodes.Postal.getPostCode = function(city) {
	
	switch (city.toLowerCase())
	{
	
		case 'zenica':
			return '72000';
		case 'sarajevo':
			return '71000';
	
	};
		
};


// get articles from db
boCodes.Articles.getArticles = function() {
	return boDb.getArticleData();
};	
	
// get article matrix based on article JSON data
boCodes.Articles.getArticleMatrix = function( article_data ) {
	return boCodes.Matrix.getMatrix( article_data, "Artikli" );
};

// get customers from DB
boCodes.Customers.getCustomers = function(){
	var cust_data = boDb.getCustomerData( Ti.App.current_logged_user_id );
	return cust_data;
};



// get customers by distance
boCodes.Customers.getCustomersInRadius = function( lon, lat, radius ) {
	
	var data = boDb.getCustomerData();
	var ret = [];
	var dist = 0;
	
	if(lon == null){
		return ret;
	};
	
	if(radius==null){
		radius = 20;
	};
	
	for(var i=0; i < data.length ; i++){
	
		if (data[i].user_id == Ti.App.current_logged_user_id ){
			
			// calculate distance
			dist = boGeo.calcGeoDistance( data[i].lon, data[i].lat, lon, lat );
			// round to 3 decimals
			dist = Math.round(dist*1000)/1000;
			// convert to meters and push data if exist
			if ((dist * 1000) < radius ){
				ret.push( data[i] );	
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


