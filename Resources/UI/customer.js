
// new customer, update existing customer
boCodes.Customers.customerForm = function(){
		
	var cf_win = Ti.UI.createWindow({
		backgroundColor:"#FFFFFF",
		title:"partneri"
	});
		
	var cf_btn_close = Ti.UI.createButton({
		title:"Zatvori",
		height:"auto",
		width:80,
		bottom:10
	});

	cf_win.add(cf_btn_close);

	cf_btn_close.addEventListener("click", function(){
		cf_win.close();
	});

	cf_win.open();
};


// customer list 
boCodes.Customers.customerList = function() {
		
	// reset global data
	Ti.App.purchased_data = [];
	Ti.App.document_data = [];
	Ti.App.customer_data = [];
	
	// get customers from JSON
	var cust_data = boCodes.Customers.getCustomers();
	// open the get customer form
	var customer_win = boCodes.Customers.getPurchaseCustomer( cust_data );
			
};



// get customer on ordering form
boCodes.Customers.getPurchaseCustomer = function( c_data ){
		
	var btn_height = 70;
	
	var cp_win = Ti.UI.createWindow({
		backgroundColor:"#FFFFFF",
		//navBarHidden:false,
		title:"Odaberi partnera"
	});
	
	/*
	 * problem with menu and addEventListener("close") ?????
	 * because of that I curently turn off this option
	 */
	
	//cp_win.activity.onCreateOptionsMenu = function(e) {
		//var menu = e.menu;
		//var m_close = menu.add({ title : 'Vrati se nazad' });
		//var m_all_cust = menu.add({ title : 'Svi partneri' });
		
		//m_close.setIcon(Titanium.Android.R.drawable.ic_menu_close_clear_cancel);
		//m_all_cust.setIcon(Titanium.Android.R.drawable.btn_star);
	
		// close menu option
		//m_close.addEventListener('click', function(e) {
			// turn off the GPS system
			//Titanium.Geolocation.removeEventListener('location', geoLocationCallback);
			// close window

			//cp_win.close();
		//});
		
		// refresh menu option
		//m_all_cust.addEventListener('click', function(e) {
			//cp_tbl_view.setData( _refresh_tbl_data( c_data, longitude, latitude ) );
		//});
		
	//};
	
	var cp_top_view = Ti.UI.createView({
		backgroundColor:"black",
		top:1,
		height:90
	});
	
	var cp_bottom_view = Ti.UI.createView({
		backgroundColor:"black",
		bottom:0,
		height:90
	});
	
	var cp_lbl_loc = Ti.UI.createLabel({
		text:"gps lokacija...",
		color:"white",
		borderRadius:5,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:18},
		textAlign:"left",
		left:5,
		top:5
	});

	var cp_close_btn = Ti.UI.createButton({
		title:"Poništi",
		height:btn_height,
		left:5,
		width:150,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:26},
		bottom:5
	});

	// get customers by gps research...
	var cp_gps_btn = Ti.UI.createButton({
		title:"GPS",
		height:btn_height,
		right:160,
		width:150,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:26},
		bottom:5
	});

	// get customers manualy...
	var cp_man_btn = Ti.UI.createButton({
		title:"Ručno",
		height:btn_height,
		right:5,
		width:150,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:26},
		bottom:5
	});

	// search table
	var searchBar = Ti.UI.createSearchBar({value:""});	
	
	// table view of this form
	var cp_tbl_view = Ti.UI.createTableView({
		headerTitle:"Lista partnera za '" + Ti.App.current_logged_user + "'",
		allowsSelection:true,
		search:searchBar,
		top:90,
		bottom:90
	});
	
	// set the table contents, all customers
	cp_tbl_view.setData( _refresh_tbl_data( c_data, longitude, latitude ) );
	
	
	cp_top_view.add(cp_lbl_loc);

	cp_bottom_view.add(cp_close_btn);
	cp_bottom_view.add(cp_gps_btn);
	cp_bottom_view.add(cp_man_btn);
	
	cp_win.add(cp_top_view);
	cp_win.add(cp_tbl_view);
	cp_win.add(cp_bottom_view);
	
	// tbl view dbl click 
	cp_tbl_view.addEventListener("dblclick", function(e){
		
		if (e.source.objName) {
			// turn off gps system
			Ti.Geolocation.removeEventListener( 'location', geoLocationCallback );
			// set global customer data for purchase
			var result = [];
			result.push( c_data[e.source.objIndex] );
			Ti.App.customer_data = result;

			// open purchase
			boPurchase.newPurchase();
			
			// close customer list
			cp_win.close();
			
		};
	});

	// close btn
	cp_close_btn.addEventListener("click", function(){
		Ti.Geolocation.removeEventListener( 'location', geoLocationCallback );
		cp_win.close();
	});
	
	// manual run
	cp_man_btn.addEventListener("click", function(){
		
		var tbl_data = _refresh_tbl_data( c_data, longitude, latitude );
		//alert(JSON.stringify(customer_data.customers));
		//alert(customer_data.customers.length);
		cp_tbl_view.setData( tbl_data );
		
	});
	
	cp_gps_btn.addEventListener("click", function(){
		
		
		var pb = Ti.UI.createProgressBar({
    		width:250,
    		min:0,
    		max:200,
    		value:0,
    		color:'blue',
    		message:'tražim lokaciju',
    		font:{fontSize:14, fontWeight:'bold'},
    		style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
		});
		
		cp_win.add(pb);
		
		
		var tic = 0;
 
		var timer = setInterval(function() {
    		
    		tic++;
    		pb.value = tic;
    			
    		if( tic == 50 && longitude != null ) {
        		
				pb.value = 200;
            	cp_win.remove(pb);
            	cp_top_view.backgroundColor = "blue";
				//alert("pronasao: " + longitude + ", " + latitude);	 
            	clearInterval(timer);
            	
            	// calculate distance and fill table view
            	var dist_data = boCodes.Customers.getCustomersInRadius( longitude, latitude );
            	var ret_data = _refresh_tbl_data( dist_data, longitude, latitude );
				
				cp_tbl_view.setData( ret_data );
				//Ti.Geolocation.removeEventListener( 'location', geoLocationCallback );
            	

        	};
        	
        	if (tic == 200){
        		clearInterval(timer);
        		cp_win.remove(pb);
        		cp_lbl_loc.text = "Nisam uspio pronaći lokaciju, pokušajte ručno!";
        		//Ti.Geolocation.removeEventListener( 'location', geoLocationCallback );
        	};
        	                    
		},200);			  
	
	});	
	
	// first start service - because of bug!
	boGeo.getCurrentLocation();
	// second instance
	boGeo.getCurrentLocation();
		
	var text = "";
	var latitude = null;
	var longitude = null;
		
	// listen for coords
	// we have: e.coords
	Ti.App.addEventListener("get_geo_coordinates_ready",function(e){
			
		if (!e.success || e.error){
				
			latitude = null;
			longitude = null;
				
			cp_lbl_loc.text = "";
			
			text = "Greška: " + e.error.message + boUtil.str.newRow(); 
			text += "'kod': " + e.error.code + boUtil.str.newRow();
			
			cp_lbl_loc.text = text;
			cp_top_view.backgroundColor = "red";	
		}
		else
		{
				
			latitude = e.coords.latitude;
			longitude = e.coords.longitude;
				
			cp_lbl_loc.text = "";
			
			text = "Gps info:" + boUtil.str.newRow();
			text += "lat: " + e.coords.latitude; 
			text += ", lon: " + e.coords.longitude + boUtil.str.newRow();
			text += "preciznost: " + e.coords.accuracy;
						
			cp_lbl_loc.text = text;
			cp_top_view.backgroundColor = "black";
		};
			
	});	
		

	cp_win.open();
	
	return cp_win;

};


function _refresh_tbl_data( c_data, lon, lat ) {
		
	var tbl_data = [];
	var dst = 0;
	
	for(var i=0; i < c_data.length; i++){
		
		// calculate distance for every customer
		dst = 0;
		if( c_data[i].lat != 0 && c_data[i].lat != null && lon != null ){
			
			dst = boGeo.calcGeoDistance( c_data[i].lon, c_data[i].lat, lon, lat );
			dst = Math.round( dst * 1000 ) / 1000;
			
		};
		
					
		var thisRow = Ti.UI.createTableViewRow({
        	className: "item",
        	objIndex:i,
        	objName:"grid-item",
        	layout: "horizontal",
        	height:"auto",
        	left:1,
        	right:1
    	});
    		
    	var thisView = Ti.UI.createView({
           	//backgroundColor:"white",
           	top:3,
           	height:100,
           	width:420,
           	left:1,
           	objIndex:i,
           	objName:"view-desc"
        });
        
    	var thisLabelCust = Ti.UI.createLabel({
           	color:"black",
           	top:1,
           	left:5,
           	font:{fontSize:26,fontWeight:'bold'},
           	objIndex:i,
           	objName:"lbl-cust",
           	textAlign:"left",
           	text:c_data[i].desc,
           	touchEnabled:false
        });

    	var thisLabelDesc = Ti.UI.createLabel({
           	color:"black",
           	top:50,
           	left:5,
           	font:{fontSize:20,fontWeight:'bold'},
           	objIndex:i,
           	objName:"lbl-desc",
           	textAlign:"left",
           	text:c_data[i].addr + ", " + c_data[i].postcode + " - " + c_data[i].city + ", udalj: " + dst + " km",
           	touchEnabled:false
        });


        thisView.add(thisLabelCust);
        thisView.add(thisLabelDesc);
        thisRow.add(thisView);	
		
		tbl_data.push(thisRow);
	};
	
	return tbl_data;
};

