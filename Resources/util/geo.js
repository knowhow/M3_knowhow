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

// ## Main GEO module
// In this module we use special Titanium GPS method's for Android app.

// Set the global namespace for this module.
M3.Geo = {};

// Global GPS module variables
var location_data;
var location_error = "";
var location_added = false;

// Open's the form with test geolocation functions.
// This form is used for testing GPS functinality.
// It uses main GPS method's as we used in **customes.js**
//
// Example of GPS usage:
// 		var frm = M3.Geo.geoForm();
// 		frm.addEventListener("close", function(){
//			M3.Geo.turnOffGps();
//		})

M3.Geo.geoForm = function() {
		
	// Create controls
	var g_win = Ti.UI.createWindow({
		backgroundColor:"#FFFFFF",
		title:"trenutna lokacija"
	});
		
	var g_lbl = Ti.UI.createLabel({
		text:"geo location info",
		color:"black",
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:30},
		textAlign:"left",
		top:10,
		left:10
	});
		
	var g_l_btn = Ti.UI.createButton({
		title:"Daj lokaciju",
		left:3,
		width:200,
		height:80,
		bottom:5
	});
		
	var g_c_btn = Ti.UI.createButton({
		title:"Zatvori",
		right:3,
		width:200,
		height:80,
		bottom:5
	});
		
	// and add controls to the **g_win**
	g_win.add(g_lbl);
	g_win.add(g_l_btn);
	g_win.add(g_c_btn);
		 			
	g_c_btn.addEventListener("click", function(){
		// turn off the gps system
		M3.Geo.turnOffGps();
		// close the window
		g_win.close();
	});
		
	
	g_l_btn.addEventListener("click", function(){
		
		// turn on the gps system
		M3.Geo.turnOnGps();
		
		var text = "";
		
		// testing location
		//		ZENICA coordinates:
		//		Latitude : 43.915886 North
		//		Longitude : 17.679076 East
		
		var zenica_lat = 44.204231500625;
		var zenica_lon = 17.905032634735;
		
		// listen for coords
		Ti.App.addEventListener("get_geo_coordinates_ready",function(e){
			
			if (!e.success || e.error){
				g_lbl.text = "";
			
				text = "Error:" + M3.Util.Str.newRow();
			
				text += e.error.message + M3.Util.Str.newRow(); 
				text += "Error code: " + e.error.code + M3.Util.Str.newRow();
			
				g_lbl.text = text;	
			}
			else
			{
				g_lbl.text = "";
			
				text = "Pozicija:" + M3.Util.Str.newRow();
				text += "lat: " + e.coords.latitude + M3.Util.Str.newRow(); 
				text += "lon: " + e.coords.longitude + M3.Util.Str.newRow();
				text += "acc: " + e.coords.accuracy + M3.Util.Str.newRow();
				
				text += "Udaljenost od Zenice:" + M3.Util.Str.newRow();
				text += Math.round( M3.Geo.calcGeoDistance(e.coords.latitude, e.coords.longitude, zenica_lat, zenica_lon ) * 1000) / 1000;
				
				g_lbl.text = text;
			};
			
		});				  
	});
		
	g_win.open();
		
};
	
// geo callback function
var geoLocationCallback = function(cb){	
	Ti.App.fireEvent("get_geo_coordinates_ready", cb);
};
	
	
// Get current location based on geolocation

M3.Geo.getCurrentLocation = function() {
      	
    // Check if service enabled first
    if(Ti.Geolocation.locationServicesEnabled == false){
    	alert("Geo services are turned off !");
    	return;
    };
    	
    // Set's the main parameters
    Ti.Geolocation.preferredProvider = "gps";
    Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.distanceFilter = 10;
   
	Ti.Geolocation.getCurrentPosition(function(cp){
		if (!cp.success || cp.error)
		{
			Ti.App.fireEvent("get_geo_coordinates_ready", cp);
			return;
		};
		Ti.App.fireEvent("get_geo_coordinates_ready", cp);
	});
    	  
	Ti.Geolocation.addEventListener( 'location', geoLocationCallback );
	location_added = true;
	
	Ti.Android.currentActivity.addEventListener('pause', function(e) {
		if (location_added) {
			Titanium.Geolocation.removeEventListener('location', geoLocationCallback);
			location_added = false;
		}
	});
	Ti.Android.currentActivity.addEventListener('destroy', function(e) {
		if (location_added) {
			Titanium.Geolocation.removeEventListener('location', geoLocationCallback);
			location_added = false;
		}
	});
	Ti.Android.currentActivity.addEventListener('resume', function(e) {
		if (!location_added) {
			Titanium.Geolocation.addEventListener('location', geoLocationCallback);
			location_added = true;
		}
	});

};
	 	
// Calculate distance between two 'lon' and 'lat' variables
// Return value is in kilometers "K"

M3.Geo.calcGeoDistance = function(lat1, lon1, lat2, lon2, unit) {
	
	// this is the part of special formula for calculating distance based on earth diameter etc...
	var radlat1 = Math.PI * lat1/180;
  	var radlat2 = Math.PI * lat2/180;
  	var radlon1 = Math.PI * lon1/180;
  	var radlon2 = Math.PI * lon2/180;
  	var theta = lon1-lon2;
  	var radtheta = Math.PI * theta/180;
  	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  
  	dist = Math.acos(dist);
  	dist = dist * 180/Math.PI;
  	dist = dist * 60 * 1.1515;
  
  	// default unit will be "K" - kilometers
  	if(unit == null){
  		unit = "K";
  	};
  
  	if(unit == "K"){
     dist = dist * 1.609344;
    };
    
    // I have no idea what is "N" (I grabbed this function from titanium comunity)
  	if(unit == "N") {
    	dist = dist * 0.8684;
    };
	
	return dist;
};

// Show the MAP based on current user location and customer location
// This function uses Google-API

M3.Geo.showMap = function( lat, lon, customer_lat, customer_lon ){
	
	// create components
	var m_win = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Mapa'
	});
	
	var my_curr_position = Titanium.Map.createAnnotation({
		latitude:Number(lat),
		longitude:Number(lon),
		title:"Trenutna pozicija",
		subtitle:'-',
		pincolor:"orange",
		animate:true,
		myid:1 
	});
	
	var customer_position = Titanium.Map.createAnnotation({
		latitude:Number(customer_lat),
		longitude:Number(customer_lon),
		title:"Pozicija partnera",
		subtitle:'-',
		pincolor:"blue",
		animate:true,
		myid:2 
	});

	
	var mapview = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        region: {latitude: Number(lat), longitude: Number(lon), latitudeDelta:0.01, longitudeDelta:0.01},
        animate:true,
        regionFit:true,
        userLocation:true,
        top:0,
		bottom:'12%',
        annotations:[my_curr_position, customer_position]
    });
    
    var close_btn = Ti.UI.createButton({
    	bottom:'1%',
    	height:'10%',
    	left:'30%',
    	right:'30%',
    	title:'Zatvori'
    });
	
	// add components to the current window    
    m_win.add(close_btn);
    m_win.add(mapview);
    mapview.selectAnnotation(my_curr_position);

    
    close_btn.addEventListener("click", function(){
    	m_win.close();
    });
    
    m_win.open();
    
    return m_win;
    
};

// Turn off gps system

M3.Geo.turnOffGps = function() {
	Ti.Geolocation.removeEventListener( 'location', geoLocationCallback );
};

// Turn on gps system
// Because of bug with GPS functions in Android, this function must be called twice

M3.Geo.turnOnGps = function() {
	M3.Geo.getCurrentLocation();
	M3.Geo.getCurrentLocation();
};
