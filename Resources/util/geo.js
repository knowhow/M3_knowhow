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
		
		var text = "";
		// first start service - because of bug!
		boGeo.getCurrentLocation();
		// second instance
		boGeo.getCurrentLocation();
		
		// listen for coords
		// we have: e.coords
		Ti.App.addEventListener("get_geo_coordinates_ready",function(e){
			
			if (!e.success || e.error){
				
				text = "Error:" + boUtil.str.newRow();
				text += e.error.message + boUtil.str.newRow(); 
				text += "Error code: " + e.error.code + boUtil.str.newRow();
				g_lbl.text = text;
			}
			else
			{
				text = "Pozicija:" + boUtil.str.newRow();
				text = "lat: " + e.coords.latitude + boUtil.str.newRow(); 
				text += "lon: " + e.coords.longitude + boUtil.str.newRow();
				text += "acc: " + e.coords.accuracy;
				g_lbl.text = text;				
			};
			
		});
				  
	});
		
	g_win.open();
		
};
	
// geo callback function
var geoLocationCallback = function(e){	
	Ti.App.fireEvent("get_geo_coordinates_ready", e);
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
			Ti.App.fireEvent("get_geo_coordinates_ready", e);
			return;
		}
		else
		{
			Ti.App.fireEvent("get_geo_coordinates_ready", e);
		};
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
	 	

