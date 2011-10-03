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

// ## Code's module


// Set the global namespace for this module
M3.Codes = {};

// Set's articles namespace
M3.Codes.Articles = {};

// Set's customers namespace
M3.Codes.Customers = {};

// Set's users namespace
M3.Codes.Users = {};

// Set's other namespace
M3.Codes.Other = {};


// Get the postal code by given city as '_c_name'
M3.Codes.Other.getPostCode = function(_c_name) {
	
	switch (_c_name.toLowerCase())
	{
		case 'zenica':
			return '72000';
		case 'sarajevo':
			return '71000';
		default:
			return '';
	};
		
};


// Get articles from db
M3.Codes.Articles.getArticles = function() {
	return M3.DB.getArticleData();
};	
	
// Get article matrix form by given 'article_data'
M3.Codes.Articles.getArticleMatrix = function( article_data ) {
	return M3.Codes.Matrix.getMatrix( article_data, "Artikli" );
};

// Get customers from db by last logged user id
M3.Codes.Customers.getCustomers = function(){
	return M3.DB.getCustomerData( Ti.App.current_logged_user_id );
};

// Get customers by calculating distance
M3.Codes.Customers.getCustomersInRadius = function( lon, lat, radius ) {
	
	// get the main JSON object with customer data
	var data = M3.DB.getCustomerData();
	var ret = [];
	var dist = 0;
	
	// check if longitude exist
	if(lon == null){
		return ret;
	};
	
	// if radius is not defined use default by params
	if(radius==null){
		radius = Ti.App.par_default_radius;
	};
	
	// loop through params data JSON and calculate the distance
	for(var i=0; i < data.length ; i++){
	
		// check for 'user_id'
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
	
	// returned value
	return ret;
};
	
// Get customer's form...
M3.Codes.Customers.getCustomerForm = function() {
	return M3.Codes.Customers.customerForm();
};

// Get users data...
M3.Codes.Users.getUsersData = function() {
	return M3.DB.getUsersData();
};


