
// customer list 
boCodes.Customers.customerList = function() {
		
	// reset global data
	Ti.App.purchased_data = [];
	Ti.App.document_data = [];
	Ti.App.customer_data = [];
	Ti.App.current_longitude = null;
	Ti.App.current_latitude = null;
	Ti.App.current_customer_id = null;
	Ti.App.current_customer_data = null;
	
	// open the get customer form
	var customer_win = boCodes.Customers.getPurchaseCustomer();
			
};



// get customer on ordering form
boCodes.Customers.getPurchaseCustomer = function(){
		
	var c_data = boCodes.Customers.getCustomers();
	
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
		top:0,
		height:'10%'
	});
	
	var cp_bottom_view = Ti.UI.createView({
		backgroundColor:"black",
		bottom:0,
		height:'12%'
	});
	
	var cp_lbl_loc = Ti.UI.createLabel({
		text:"gps lokacija...",
		color:"white",
		borderRadius:5,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'4pt'},
		textAlign:"left",
		left:'1%',
		top:'1.5%'
	});

	var cp_close_btn = Ti.UI.createButton({
		title:"<",
		left:'1%',
		width:'15%',
		height:'80%',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'10pt'},
		bottom:'5%'
	});

	// get customers by gps research...
	var cp_gps_btn = Ti.UI.createButton({
		title:"GPS...",
		left:'35%',
		width:'30%',
		height:'80%',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'},
		bottom:'5%'
	});

	// options...
	var cp_opt_btn = Ti.UI.createButton({
		title:"Opcije",
		right:'1%',
		width:'30%',
		height:'80%',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'},
		bottom:'5%'
	});

	// search table
	var searchBar = Ti.UI.createSearchBar({
		value:"",
		left:'1%'
	});	
	
	searchBar.addEventListener("return", function(){
		searchBar.blur();
	});

	
	// table view of this form
	var cp_tbl_view = Ti.UI.createTableView({
		headerTitle:"Lista partnera za '" + Ti.App.current_logged_user + "'",
		backgroundColor:'white',
		allowsSelection:true,
		search:searchBar,
		top:'10%',
		bottom:'12%',
		//maxRowHeight:120
	});
	
	// options dialog 
	var dlg_opt = {
		options:['Novi partner', 'Ispravi partnera', 'Osvježi tabelu'],
		destructive:1,
		cancel:2,
		title:'Opcije:'
	};

	// create dialog
	var win_dlg_opt = Titanium.UI.createOptionDialog(dlg_opt);

	// add event listener
	win_dlg_opt.addEventListener('click',function(e)
	{
		
		switch(e.index)
		{
			case 0:
  				// new customer
  				boCodes.Customers.newCustomer();
  				break;
			case 1:
				// edit customer
				boCodes.Customers.editCustomer();
				break;
			case 2:
				// refresh table
				c_data = boCodes.Customers.getCustomers();
				//alert(JSON.stringify(c_data));
				cp_tbl_view.setData( _refresh_cust_data( c_data, Ti.App.current_longitude, Ti.App.current_latitude ) );
				break;
		};
	
	});
	
	// listen for edited event
	Ti.App.addEventListener("customerEdited", function(){
		c_data = boCodes.Customers.getCustomers();
		cp_tbl_view.setData( _refresh_cust_data( c_data, Ti.App.current_longitude, Ti.App.current_latitude ) );
	});
		
	cp_top_view.add(cp_lbl_loc);

	cp_bottom_view.add(cp_close_btn);
	cp_bottom_view.add(cp_gps_btn);
	cp_bottom_view.add(cp_opt_btn);
	
	cp_win.add(cp_top_view);
	cp_win.add(cp_tbl_view);
	cp_win.add(cp_bottom_view);
	
	// click on table
	cp_tbl_view.addEventListener("click", function(e){
		
		if (e.source.objName) {
			// set current id
			Ti.App.current_customer_id = c_data[e.source.objIndex].id;
			
			// set current data array
			var curr_data = [];
			curr_data.push(c_data[e.source.objIndex]);
			Ti.App.current_customer_data = curr_data;
			
		};
		
	});
	
	// tbl view dbl click 
	cp_tbl_view.addEventListener("dblclick", function(e){
		
		if (e.source.objName) {
			// turn off gps system
			Ti.Geolocation.removeEventListener( 'location', geoLocationCallback );
			// set global customer data for purchase
			var result = [];
			result.push( c_data[e.source.objIndex] );
			Ti.App.customer_data = result;
			// set current id
			Ti.App.current_customer_id = c_data[e.source.objIndex].id;
			Ti.App.current_customer_data = result;

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
	
	// options
	cp_opt_btn.addEventListener("click", function(){
		// open options
		win_dlg_opt.show();		
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
    			
    		if( tic == 50 && Ti.App.current_longitude != null ) {
        		
				pb.value = 200;
            	cp_win.remove(pb);
            	cp_top_view.backgroundColor = "blue";
				//alert("pronasao: " + longitude + ", " + latitude);	 
            	clearInterval(timer);
            	
            	// calculate distance and fill table view
            	c_data = boCodes.Customers.getCustomersInRadius( Ti.App.current_longitude, Ti.App.current_latitude );
				cp_tbl_view.setData( _refresh_cust_data( c_data, Ti.App.current_longitude, Ti.App.current_latitude ) );
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
		
	// listen for coords
	// we have: e.coords
	Ti.App.addEventListener("get_geo_coordinates_ready",function(e){
			
		if (!e.success || e.error){
				
			Ti.App.current_latitude = null;
			Ti.App.current_longitude = null;
				
			cp_lbl_loc.text = "";
			
			text = "Greška: " + e.error.message + boUtil.str.newRow(); 
			text += "'kod': " + e.error.code + boUtil.str.newRow();
			
			cp_lbl_loc.text = text;
			cp_top_view.backgroundColor = "red";	
		}
		else
		{
				
			Ti.App.current_latitude = e.coords.latitude;
			Ti.App.current_longitude = e.coords.longitude;
				
			cp_lbl_loc.text = "";
			
			text = "Gps info:" + boUtil.str.newRow();
			text += "lat: " + Ti.App.current_latitude; 
			text += ", lon: " + Ti.App.current_longitude + boUtil.str.newRow();
			text += "preciznost: " + e.coords.accuracy;
						
			cp_lbl_loc.text = text;
			cp_top_view.backgroundColor = "black";
		};
		
		// set the table contents, all customers
		cp_tbl_view.setData( _refresh_cust_data( c_data, Ti.App.current_longitude, Ti.App.current_latitude ) );
			
	});	
	
	// set current data array
	//var st_data = [];
	//st_data.push(c_data[0]);
	//Ti.App.current_customer_data = st_data;
	
	cp_win.open();
	
	return cp_win;

};


function _refresh_cust_data( c_data, lon, lat ) {
		
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
        	height:boUtil.math.getControlPostitionHeight(11),
        	title:c_data[i].desc, 
        	width:Ti.Platform.displayCaps.platformWidth,
        	left:1,
        	right:1
    	});
    		
    	var thisView = Ti.UI.createView({
           	//backgroundColor:"white",
           	top:'.5%',
           	//height:'250%',
           	backgroundColor:'white',
           	height:boUtil.math.getControlPostitionHeight(11),
           	width:'100%',
           	left:'1%',
           	objIndex:i,
           	objName:"view-desc"
        });
        
    	var thisLabelCust = Ti.UI.createLabel({
           	color:"#4169E1",
           	top:'.5%',
           	left:'1%',
           	width:'90%',
           	font:{fontSize:'8pt',fontWeight:'bold'},
           	objIndex:i,
           	objName:"lbl-cust",
           	textAlign:"left",
           	text:c_data[i].desc,
           	touchEnabled:false
        });

    	var thisLabelDesc = Ti.UI.createLabel({
           	color:"black",
           	top:'47%',
           	left:'1%',
           	width:'80%',
           	font:{fontSize:'5pt',fontWeight:'normal'},
           	objIndex:i,
           	objName:"lbl-desc",
           	textAlign:"left",
           	text:c_data[i].addr + ", " + c_data[i].postcode + " - " + c_data[i].city,
           	touchEnabled:false
        });

    	var thisLabelDist = Ti.UI.createLabel({
           	color:"#32CD32",
           	top:'45%',
           	left:'80%',
           	font:{fontSize:'4pt',fontWeight:'bold'},
           	objIndex:i,
           	objName:"lbl-desc",
           	textAlign:"left",
           	text:dst + " km",
           	touchEnabled:false
        });


        thisView.add(thisLabelCust);
        thisView.add(thisLabelDesc);
        thisView.add(thisLabelDist);
        thisRow.add(thisView);	
		
		tbl_data.push(thisRow);
	};
	
	return tbl_data;
};


// customer edit form
boCodes.Customers.customerForm = function( cust_data ) {
	
	// window
	var c_win = Ti.UI.createWindow({
		backgroundColor:"black",
		title:"Unos novog partnera...",
		// this is my variable
		canceled:false
	});
	
	if(cust_data != null){
		c_win.title = "Ispravka podataka, partner: " + cust_data[0].id.toString();
	};
		
	// views
	var c_scroll_view = Ti.UI.createScrollView({
		contentWidth:Ti.Platform.displayCaps.platformWidth,
		top:0,
		bottom:'12%',
		showVerticalScrollIndicator:true
	});
	
	var c_view_main = Ti.UI.createView({
		backgroundColor:'white',
		borderRadius:10,
		width:'97%',
		height:'2000',
		top:'.5%',
		left:'1%'
	});


	// description
	var l_desc = Ti.UI.createLabel({
		text:'Naziv partnera:',
		color:'black',
		left:'3%',
		top:'.5%'
	});

	var c_desc = Ti.UI.createTextField({
		left:'2%',
		width:'90%',
		height:'3%',
		top:'2%'
	});
	
	// address
	var l_addr = Ti.UI.createLabel({
		text:'Adresa:',
		color:'black',
		left:'3%',
		top:'5%'		
	});
	
	var c_addr = Ti.UI.createTextField({
		left:'2%',
		width:'90%',
		height:'3%',
		top:'6.5%'
	});

	// city
	var l_city = Ti.UI.createLabel({
		text:'Grad:',
		color:'black',
		left:'3%',
		top:'9.5%'		
	});
	
	var c_city = Ti.UI.createTextField({
		left:'2%',
		width:'50%',
		height:'3%',
		top:'11%'
	});

	// postcode
	var l_pcode = Ti.UI.createLabel({
		text:'Poštanski broj:',
		color:'black',
		left:'53%',
		top:'9.5%'		
	});
	
	var c_pcode = Ti.UI.createTextField({
		left:'53%',
		width:'30%',
		height:'3%',
		top:'11%'
	});

	// telephone
	var l_tel1 = Ti.UI.createLabel({
		text:'Telefon:',
		color:'black',
		left:'3%',
		top:'14%'		
	});
	
	var c_tel1 = Ti.UI.createTextField({
		left:'2%',
		width:'45%',
		height:'3%',
		top:'15.5%'
	});

	// telephone
	var l_tel2 = Ti.UI.createLabel({
		text:'Mobitel:',
		color:'black',
		left:'53%',
		top:'14%'		
	});
	
	var c_tel2 = Ti.UI.createTextField({
		left:'53%',
		width:'45%',
		height:'3%',
		top:'15.5%'
	});
	
	var c_view_additional = Ti.UI.createView({
		backgroundColor:'gray',
		borderRadius:10,
		width:'97%',
		height:'10%',
		top:'19%',
		left:'2%'
	});	

	// latitude longitude
	var c_location_btn = Ti.UI.createButton({
		title:'Setuj lokaciju',
		height:'30%',
		width:'40%',
		left:'3%',
		top:'60%'		
	});

	// latitude longitude
	var l_lon = Ti.UI.createLabel({
		text:'Longitude:',
		color:'black',
		left:'3%',
		top:'1%'		
	});
	
	var c_lon = Ti.UI.createTextField({
		left:'2%',
		width:'45%',
		height:'28%',
		top:'23%'
	});

	var l_lat = Ti.UI.createLabel({
		text:'Latitude:',
		color:'black',
		left:'53%',
		top:'1%'		
	});
	
	var c_lat = Ti.UI.createTextField({
		left:'50%',
		width:'45%',
		height:'28%',
		top:'23%'
	});

	// buttons
	var c_btn_close = Ti.UI.createButton({
		title:"Zatvori",
		left:'2%',
		width:'30%',
		height:'10%',
		bottom:'1%'
	});

	var c_btn_save = Ti.UI.createButton({
		title:"Snimi",
		right:'2%',
		width:'30%',
		height:'10%',
		bottom:'1%'
	});	
	
	
	// add controls to form
	c_view_main.add(l_desc);
	c_view_main.add(c_desc);
	
	c_view_main.add(c_addr);
	c_view_main.add(l_addr);

	c_view_main.add(c_city);
	c_view_main.add(l_city);

	c_view_main.add(c_pcode);
	c_view_main.add(l_pcode);

	c_view_main.add(c_tel1);
	c_view_main.add(l_tel1);

	c_view_main.add(c_tel2);
	c_view_main.add(l_tel2);
	
	c_view_additional.add(l_lon);
	c_view_additional.add(c_lon);

	c_view_additional.add(l_lat);
	c_view_additional.add(c_lat);
	
	c_view_additional.add(c_location_btn);
	
	c_view_main.add(c_view_additional);

	c_scroll_view.add(c_view_main);
	
	c_win.add(c_scroll_view);
	
	c_win.add(c_btn_close);
	c_win.add(c_btn_save);
	
	// close button event
	c_btn_close.addEventListener("click", function(){
		c_win.canceled = true;
		c_win.close();
	});
	
	// save button
	c_btn_save.addEventListener("click", function(){
			// check data if... if...
			var _c_id = 0;
			if(cust_data != null){
				_c_id = cust_data[0].id;
			};
			// add data to current_data
			Ti.App.customer_data = [{ id: _c_id, desc: c_desc.value, addr: c_addr.value, city: c_city.value, pcode: c_pcode.value, tel1: c_tel1.value, tel2: c_tel2.value, lon: Number(c_lon.value), lat: Number(c_lat.value) }];
			// close the window
			c_win.close();
	});
	
	c_location_btn.addEventListener("click", function(){
		
		if(Ti.App.current_longitude != null){
			c_lat.value = Ti.App.current_latitude.toString();
			c_lon.value = Ti.App.current_longitude.toString();
			c_btn_save.focus();
		}
		else
		{
			c_lat.value = "?????";
			c_lon.value = "?????";
			c_view_additional.backgroundColor = "red";
		};
	});
	
	// set text manipulation
	c_desc.addEventListener("return", function(){
		c_desc.blur();
		c_addr.focus();
	});
	
	c_addr.addEventListener("return", function(){
		c_addr.blur();
		c_city.focus();
	});

	c_city.addEventListener("return", function(){
		c_city.blur();
		if(c_city.value != ''){
			c_pcode.value = boCodes.Postal.getPostCode( c_city.value );
			c_tel1.focus();
		}
		else
		{
			c_pcode.focus();
		};
	});
	
	c_pcode.addEventListener("return", function(){
		c_pcode.blur();
		c_tel1.focus();
	});
	
	c_tel1.addEventListener("return", function(){
		c_tel1.blur();
		c_tel2.focus();
	});
	
	c_tel2.addEventListener("return", function(){
		c_tel2.blur();
		c_location_btn.focus();
	});	
	
	c_lon.addEventListener("return", function(){
		c_lon.blur();
		c_lat.focus();
	});
	
	c_lat.addEventListener("return", function(){
		c_lat.blur();
		c_btn_save.focus();
	});
	
	
	// fill customer data
	if(cust_data != null){
		// set text fields
		c_desc.value = cust_data[0].desc;
		c_addr.value = cust_data[0].addr;
		c_city.value = cust_data[0].city;
		c_pcode.value = cust_data[0].postcode;
		c_tel1.value = cust_data[0].tel1;
		c_tel2.value = cust_data[0].tel2;
		c_lon.value = cust_data[0].lon;
		c_lat.value = cust_data[0].lat;
		
	};
	
	
	c_win.open();
	
	return c_win;
};

// new customer form
boCodes.Customers.newCustomer = function(){
	
	var frm = boCodes.Customers.customerForm();
	
	frm.addEventListener("close", function() {
		if(frm.canceled == false && Ti.App.customer_data != null){
			var main_db = boDb.openDB();
			boDb.insertIntoCustomers( main_db, Ti.App.customer_data );
			main_db.close();
			
			Ti.App.fireEvent("customerEdited");

		};
		
	});
};

// edit customer form
boCodes.Customers.editCustomer = function(){
	
	if(Ti.App.current_customer_data == null ){
		alert("Selektujte partnera u tabeli !");
		return;
	};
	
	// get current customer
	var frm = boCodes.Customers.customerForm( Ti.App.current_customer_data );
	
	frm.addEventListener("close", function() {
	
		if(frm.canceled == false && Ti.App.customer_data != null){
			var main_db = boDb.openDB();
			boDb.updateCustomers( main_db, Ti.App.customer_data );
			main_db.close();
			
			Ti.App.fireEvent("customerEdited");
		};
	});
	
};

