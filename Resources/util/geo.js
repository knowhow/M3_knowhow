var boGeo = {};
var location_data;
var location_error = "";
var location_added = false;

boGeo.geoForm = function() {
		
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
		
	g_win.add(g_lbl);
	g_win.add(g_l_btn);
	g_win.add(g_c_btn);
		
	// android back function
	g_win.addEventListener('android:back',function(e){
    	g_win.close();
 	});
 			
	g_c_btn.addEventListener("click", function(){
		Ti.Geolocation.removeEventListener( 'location', geoLocationCallback );
		g_win.close();
	});
		
	g_l_btn.addEventListener("click", function(){
		
		// first start service - because of bug!
		boGeo.getCurrentLocation();
		// second instance
		boGeo.getCurrentLocation();
		
		var text = "";
		
		//
		//ZENICA
		//Latitude : 43.915886 North
		//Longitude : 17.679076 East
		
		var zenica_lat = 44.204231500625;
		var zenica_lon = 17.905032634735;
		// listen for coords
		// we have: e.coords
		Ti.App.addEventListener("get_geo_coordinates_ready",function(e){
			
			if (!e.success || e.error){
				g_lbl.text = "";
			
				text = "Error:" + boUtil.str.newRow();
			
				text += e.error.message + boUtil.str.newRow(); 
				text += "Error code: " + e.error.code + boUtil.str.newRow();
			
				g_lbl.text = text;	
			}
			else
			{
				g_lbl.text = "";
			
				text = "Pozicija:" + boUtil.str.newRow();
				text += "lat: " + e.coords.latitude + boUtil.str.newRow(); 
				text += "lon: " + e.coords.longitude + boUtil.str.newRow();
				text += "acc: " + e.coords.accuracy + boUtil.str.newRow();
				
				text += "Udaljenost od Zenice:" + boUtil.str.newRow();
				text += Math.round( boGeo.calcGeoDistance(e.coords.latitude, e.coords.longitude, zenica_lat, zenica_lon ) * 1000) / 1000;
				
				g_lbl.text = text;
			};
			
		});				  
	});
		
	g_win.open();
		
};
	
// geo callback function
// force update e
var geoLocationCallback = function(cb){	
	//if (!cb.success || cb.error){
		//Ti.App.fireEvent("get_geo_coordinates_error", cb);
		//return;
	//};
	Ti.App.fireEvent("get_geo_coordinates_ready", cb);
};
	
	
// get current location based on geolocation
boGeo.getCurrentLocation = function() {
      	
    if(Ti.Geolocation.locationServicesEnabled == false){
    	alert("Geo services are turned off !");
    	return;
    };
    	
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
		if (locationAdded) {
			Titanium.Geolocation.removeEventListener('location', locationCallback);
			location_added = false;
		}
	});
	Ti.Android.currentActivity.addEventListener('destroy', function(e) {
		if (locationAdded) {
			Titanium.Geolocation.removeEventListener('location', locationCallback);
			location_added = false;
		}
	});
	Ti.Android.currentActivity.addEventListener('resume', function(e) {
		if (!locationAdded) {
			Titanium.Geolocation.addEventListener('location', locationCallback);
			location_added = true;
		}
	});

};
	 	
// calculate distance between two long and latitude variables
// return value is in kilometers "K"
// what is "N" ?
// return value must be rounded because is eg. 50.231322213
boGeo.calcGeoDistance = function(lat1, lon1, lat2, lon2, unit) {
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
  
  	if(unit == null){
  		unit = "K";
  	};
  
  	if(unit == "K"){
     dist = dist * 1.609344;
    };
    
  	if(unit == "N") {
    	dist = dist * 0.8684;
    };
	
	return dist;
};


