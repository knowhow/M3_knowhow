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
		
	g_c_btn.addEventListener("click", function(){
		Ti.Geolocation.removeEventListener( 'location', geoLocationCallback );
		g_win.close();
	});
		
	g_l_btn.addEventListener("click", function(){
		// first start service - because of bug!
		boGeo.getCurrentLocation();
		// second instance
		boGeo.getCurrentLocation();
		
		// listen for coords
		// we have: e.coords
		Ti.App.addEventListener("get_geo_coordinates",function(e){
			var text = "lat: " + e.latitude + boUtil.str.newRow() 
			text += "lon: " + e.longitude + boUtil.str.newRow();
			text += "acc: " + e.accurate
			g_lbl.text = text;
		});

		// listen for errors
		// we have: e.error
		Ti.App.addEventListener("get_geo_coordinates_errors",function(e){
			g_lbl.text = "greška: " + JSON.stringify(e.error);
		});
				  
	});
		
	g_win.open();
		
};
	
// geo callback function
var geoLocationCallback = function(e){	
	if (!e.success || e.error)
	{
		Ti.App.fireEvent("get_geo_coordinates_errors", e.error);
		return;
	};
	Ti.App.fireEvent("get_geo_coordinates", e.coords);
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
   
	Ti.Geolocation.getCurrentPosition(function(e){
		if (!e.success || e.error)
		{
			Ti.App.fireEvent("get_geo_coordinates_errors", e.error);
			return;
		};

		Ti.App.fireEvent("get_geo_coordinates", e.coords);
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

