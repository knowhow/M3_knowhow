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
			Ti.Geolocation.removeEventListener( 'location', locationCallback );
			g_win.close();
		});
		
		g_l_btn.addEventListener("click", function(){
			boGeo.getCurrentLocation();
			g_lbl.text = Ti.App.curr_location;  

		});
		
		g_win.open();
		
	};
	
	
	var locationCallback = function(e){
			
			if (!e.success || e.error)
			{
				Ti.App.curr_location = e.code.toString();
				return;
			}

			var longitude = e.coords.longitude;
			var latitude = e.coords.latitude;
			
			Ti.App.curr_location = 'long: ' + longitude + newRow + 'lat: ' + latitude;
			
			setTimeout(function(){},100);

    };
	
	// get current location based on geolocation
	boGeo.getCurrentLocation = function() {
      	
      	var newRow = "\n";
      	
    	if(Ti.Geolocation.locationServicesEnabled==false){
    		alert("Geo services are turned off !");
    		//var settingsIntent = Ti.Android.createIntent({
              //  action: 'android.settings.LOCATION_SOURCE_SETTINGS'
            //});
            //activity.startActivity(settingsIntent);
    		
    	};
    	
    	Ti.Geolocation.preferredProvider = "gps";
    	Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    	Ti.Geolocation.distanceFilter = 1;
   
		Ti.Geolocation.getCurrentPosition(function(e){
			if (!e.success || e.error)
			{
				alert('error ' + JSON.stringify(e.error));
				return;
			}

			var longitude = e.coords.longitude;
			var latitude = e.coords.latitude;
			Ti.App.curr_location = 'long: ' + longitude + newRow + 'lat: ' + latitude;
		});
    	  
		Ti.Geolocation.addEventListener( 'location', locationCallback );
		
	};
	 	