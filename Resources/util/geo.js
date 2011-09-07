var boGeo = {};

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
		top:500
	});
		
	var g_c_btn = Ti.UI.createButton({
		title:"Zatvori",
		right:3,
		width:200,
		height:80,
		top:500
	});
		
	g_win.add(g_lbl);
	g_win.add(g_l_btn);
	g_win.add(g_c_btn);
		
	g_c_btn.addEventListener("click", function(){
		Ti.Geolocation.removeEventListener( 'location', geoLocationCallback );
		g_win.close();
	});
		
	g_l_btn.addEventListener("click", function(){
		var loc = boGeo.getCurrentLocation();
		g_lbl.text = "lat: " + loc.lat + boUtil.str.newRow() + "lon: " + loc.lon + boUtil.str.newRow(2) + Ti.App.curr_location;  

	});
		
	g_win.open();
		
};
	
	
var geoLocationCallback = function(e){
			
	if (!e.success || e.error)
	{
		Ti.App.curr_location = JSON.stringify(e.error);
		Ti.API.info("error 2: " + Ti.App.curr_location);
		return res;
	}
		
	var longitude = e.coords.longitude + 0;
	var latitude = e.coords.latitude + 0;
			
	location = {lat: latitude, lon: longitude};
			
	Ti.App.curr_location = 'long: ' + longitude + boUtil.str.newRow() + 'lat: ' + latitude;
	Ti.API.info("callback: " + Ti.App.curr_location);
	
	setTimeout(function(){},100);

};
	
// get current location based on geolocation
boGeo.getCurrentLocation = function() {
      	
    var location = {lat: 0, lon: 0};
      	
    if(Ti.Geolocation.locationServicesEnabled==false){
    	alert("Geo services are turned off !");
    	return location;
    };
    	
    Ti.Geolocation.preferredProvider = "gps";
    Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.distanceFilter = 1;
   
	Ti.Geolocation.getCurrentPosition(function(e){
		if (!e.success || e.error)
		{
			Ti.App.curr_location = JSON.stringify(e.error);
			Ti.API.info("error 1: " + Ti.App.curr_location);
			return location;
		}

		var longitude = e.coords.longitude + 0;
		var latitude = e.coords.latitude + 0;
			
		//result = {lat: latitude, lon: longitude};	
		Ti.App.curr_location = 'long: ' + longitude + boUtil.str.newRow() + 'lat: ' + latitude;
		Ti.API.info("currPosition: " + Ti.App.curr_location);
	});
    	  
	Ti.Geolocation.addEventListener( 'location', geoLocationCallback );
		
	return location;
};
	 	

function translateGeoErrorCode(code) {
	if (code == null) {
		return null;
	}
	switch (code) {
		case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
			return "Location unknown";
		case Ti.Geolocation.ERROR_DENIED:
			return "Access denied";
		case Ti.Geolocation.ERROR_NETWORK:
			return "Network error";
		case Ti.Geolocation.ERROR_HEADING_FAILURE:
			return "Failure to detect heading";
		case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
			return "Region monitoring access denied";
		case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
			return "Region monitoring access failure";
		case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
			return "Region monitoring setup delayed";
	}
};

