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

// ## The main customers module


// set's the global space for this module
M3.Customers = {};


// Get customer list
M3.Customers.customerList = function() {
		
	// reset global data
	Ti.App.purchased_data = null;
	Ti.App.document_data = null;
	Ti.App.customer_data = null;
	Ti.App.current_longitude = null;
	Ti.App.current_latitude = null;
	Ti.App.current_customer_id = null;
	Ti.App.current_customer_data = null;
	Ti.App.current_customer_lan = null;
	Ti.App.current_customer_lon = null;
	Ti.App.current_customer_tel_1 = null;
	Ti.App.current_customer_tel_2 = null;
	
	// open the customer form
	var customer_win = null;
	customer_win = M3.Customers.customersForm();
			
};



// Open's the main customer form with active customers.
// Activate the GPS system for searching.
// Set's the main options for new Purchase, editing etc...
M3.Customers.customersForm = function(){
		
	// get customers data
	var c_data = M3.Codes.Customers.getCustomers(Ti.App.current_logged_user_id);
	
	// create window and other components
	var cp_win = Ti.UI.createWindow({
		backgroundColor:"#FFFFFF",
		title:"Odaberi partnera"
	});
	
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

	var cp_gps_btn = Ti.UI.createButton({
		title:"GPS...",
		left:'35%',
		width:'30%',
		height:'80%',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'},
		bottom:'5%'
	});

	var cp_opt_btn = Ti.UI.createButton({
		title:"Opcije",
		right:'1%',
		width:'30%',
		height:'80%',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'},
		bottom:'5%'
	});

	// sarch box of the table component
	var searchBar = Ti.UI.createSearchBar({
		value:"",
		left:'1%'
	});	
	
	// when we call return in search box close the keyboard if it's up
	searchBar.addEventListener("return", function(){
		searchBar.blur();
	});

	// main table view of this window
	var cp_tbl_view = Ti.UI.createTableView({
		headerTitle:"Lista partnera za '" + Ti.App.current_logged_user + "'",
		backgroundColor:'white',
		allowsSelection:true,
		search:searchBar,
		top:'10%',
		bottom:'12%'
	});
	
	// main options dialog 
	var dlg_opt_1 = {
		options:['Napravi narudžbu','Pozovi partnera', 'Ispravi partnera', 'Prikaži na mapi', 'Otkaži'],
		destructive:1,
		cancel:2,
		title:'Opcije:',
		e_object:null
	};
	
	// additional options dialog
	var dlg_opt_2 = {
		options:['Novi partner', 'Osvježi tabelu','Otkaži'],
		destructive:1,
		cancel:2,
		title:'Opcije:'
	};

	// create dialog's
	var win_dlg_opt_1 = Titanium.UI.createOptionDialog(dlg_opt_1);
	var win_dlg_opt_2 = Titanium.UI.createOptionDialog(dlg_opt_2);
	
	
	// add event listener for main dialog
	win_dlg_opt_1.addEventListener('click',function(e)
	{
		
		switch(e.index)
		{
			case 0:
				// add new purchase order
				_addNewPurchaseOrder( win_dlg_opt_1.e_object );	
				break;
			case 1:
				// call the customer
				M3.Customers.callCustomer(Ti.App.current_customer_data);
  				break;
			case 2:
				// edit customer
				M3.Customers.editCustomer();
				break;
			case 3:
				// show the map
				var map_w = M3.Geo.showMap( Ti.App.current_latitude, Ti.App.current_longitude, Ti.App.current_customer_lat, Ti.App.current_customer_lon );
				map_w.addEventListener("close", function(){
				});
				break;
			case 4:
				break;
			
		};
	
	});
	
	// add event listener for second dialog
	win_dlg_opt_2.addEventListener('click',function(e)
	{
		switch(e.index)
		{
			case 0:
				// add new customer
  				M3.Customers.newCustomer();
  				break;
			case 1:
  				// refresh table view component
				// set 'c_data' again from table
				c_data = M3.Codes.Customers.getCustomers(Ti.App.current_logged_user_id);
				// refresh tableview component with new data
				cp_tbl_view.setData( _refresh_cust_data( c_data, Ti.App.current_longitude, Ti.App.current_latitude ) );
				break;
			case 2:
				break;
		};
	});
	
	
	// listen for edited event
	Ti.App.addEventListener("customerEdited", function(){
		// get customer data again
		c_data = M3.Codes.Customers.getCustomers(Ti.App.current_logged_user_id);
		// refresh tableview component with new data
		cp_tbl_view.setData( _refresh_cust_data( c_data, Ti.App.current_longitude, Ti.App.current_latitude ) );
	});
		
	// add controls to view and window
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
			// set current id, lot, lat, tel's...
			Ti.App.current_customer_id = c_data[e.source.objIndex].id;
			Ti.App.current_customer_lat = c_data[e.source.objIndex].lat;
			Ti.App.current_customer_lon = c_data[e.source.objIndex].lon;
			Ti.App.current_customer_tel_1 = c_data[e.source.objIndex].tel1;
			Ti.App.current_customer_tel_2 = c_data[e.source.objIndex].tel2;
			// set current customer data into array
			// this array will be used later in app
			var curr_data = [];
			curr_data.push(c_data[e.source.objIndex]);
			Ti.App.current_customer_data = curr_data;
			
		};
		
	});
	
	// local function for adding new purchase
	var _addNewPurchaseOrder = function(e){
		
		if (e.source.objName) {
			
			// close the keyboard if it's up
			searchBar.blur();
			
			// turn off gps system
			M3.Geo.turnOffGps();
			
			// set global customer data for purchase
			var result = [];
			result.push( c_data[e.source.objIndex] );
			Ti.App.customer_data = result;
			
			// set current customer id
			Ti.App.current_customer_id = c_data[e.source.objIndex].id;
			Ti.App.current_customer_data = result;

			// open new purchase form
			M3.Purchase.newPurchaseOrder();
			
			// close customer list
			cp_win.close();
			
		};
	};
		
	
	// add touchstart and touchend eventlistener
	var tStart;
	cp_tbl_view.addEventListener('touchstart', function(e) {
    	
    	if (e.source.objName) {
			// set current id
			Ti.App.current_customer_id = c_data[e.source.objIndex].id;
			Ti.App.current_customer_lat = c_data[e.source.objIndex].lat;
			Ti.App.current_customer_lon = c_data[e.source.objIndex].lon;
			Ti.App.current_customer_tel_1 = c_data[e.source.objIndex].tel1;
			Ti.App.current_customer_tel_2 = c_data[e.source.objIndex].tel2;
			// set current data array
			var curr_data = [];
			curr_data.push(c_data[e.source.objIndex]);
			Ti.App.current_customer_data = curr_data;	
		};
		
    	tStart = new Date();
	});
	
	cp_tbl_view.addEventListener('touchend', function(e) {
    	//Ti.API.info("touchend fired");
    	var tEnd = new Date();
    	if (tEnd.getTime() - tStart.getTime() > 700) {
        	// show options dialog
            win_dlg_opt_1.e_object = e;
            win_dlg_opt_1.show();
    	};
	});
	

	// close button event listener
	cp_close_btn.addEventListener("click", function(){
		clearInterval(upd_timer);
		Ti.Geolocation.removeEventListener( 'location', geoLocationCallback );
		Ti.App.removeEventListener("customerEdited", function(){});
		cp_win.close();
	});
	
	// options dialog event listener
	cp_opt_btn.addEventListener("click", function(){
		// open options
		win_dlg_opt_2.show();		
	});
	
	// GPS button event listener
	cp_gps_btn.addEventListener("click", function(){
		
		// create progress bar component
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
		
		// add progress bar to the window
		cp_win.add(pb);
			
		var tic = 0;
 
 		// try to find customer by current GPS coordinates in table 'customers'
		var timer = setInterval(function() {
    		
    		tic++;
    		pb.value = tic;
    			
    		if( tic == 20 && Ti.App.current_longitude != null ) {
        		
				pb.value = 200;
            	cp_win.remove(pb);
            	cp_top_view.backgroundColor = "blue";
				
            	clearInterval(timer);
            	
            	// calculate distance and fill table view
            	c_data = M3.Codes.Customers.getCustomersInRadius( Ti.App.current_longitude, Ti.App.current_latitude );
				cp_tbl_view.setData( _refresh_cust_data( c_data, Ti.App.current_longitude, Ti.App.current_latitude ) );
				
        	};
        	
        	if (tic == 200){
        		clearInterval(timer);
        		cp_win.remove(pb);
        		cp_lbl_loc.text = "Nisam uspio pronaći lokaciju, pokušajte ručno!";
        	};
        	                    
		},200);			  
	
	});	
	
	// turn on GPS system
	M3.Geo.turnOnGps();
	
	var text = "";
		
	// listen for coords
	// we have: e.coords
	Ti.App.addEventListener("get_geo_coordinates_ready",function(e){
			
		if (!e.success || e.error){
				
			Ti.App.current_latitude = null;
			Ti.App.current_longitude = null;
				
			cp_lbl_loc.text = "";
			
			text = "Greška: " + e.error.message + M3.Util.Str.newRow(); 
			text += "'kod': " + e.error.code + M3.Util.Str.newRow();
			
			cp_lbl_loc.text = text;
			cp_top_view.backgroundColor = "red";	
		}
		else
		{
				
			Ti.App.current_latitude = e.coords.latitude;
			Ti.App.current_longitude = e.coords.longitude;
				
			cp_lbl_loc.text = "";
			
			text = "Gps info:" + M3.Util.Str.newRow();
			text += "lat: " + Ti.App.current_latitude; 
			text += ", lon: " + Ti.App.current_longitude + M3.Util.Str.newRow();
			text += "preciznost: " + e.coords.accuracy;
						
			cp_lbl_loc.text = text;
			cp_top_view.backgroundColor = "black";
		};
				
			
	});	
	
	// wait for gps location to refresh database
	var t_time = 0;
	var end_time = 50;
	var upd_timer = setInterval(function() {
		t_time++;
		if(t_time == end_time){
			// set the table contents, all customers
			clearInterval(upd_timer);
			cp_tbl_view.setData( _refresh_cust_data( c_data, Ti.App.current_longitude, Ti.App.current_latitude ) );
		};
	},end_time);
	
	// open the window
	cp_win.open();
	
	return cp_win;

};

// local function for refreshing data in tableview component
function _refresh_cust_data( tbl_data, lon, lat ) {
		
	var ret_data = [];
	var dst = 0;
	
	for(var i=0; i < tbl_data.length; i++){
		
		// calculate distance for every customer
		dst = 0;
		if( tbl_data[i].lat != 0 && tbl_data[i].lat != null && lon != null ){
			
			dst = M3.Geo.calcGeoDistance( tbl_data[i].lon, tbl_data[i].lat, lon, lat );
			dst = Math.round( dst * 1000 ) / 1000;
			
		};
							
		var thisRow = Ti.UI.createTableViewRow({
        	className: "item",
        	objIndex:i,
        	objName:"grid-item",
        	layout: "horizontal",
        	height:M3.Util.MathModule.getControlPostitionHeight(11),
        	title:tbl_data[i].desc, 
        	width:Ti.Platform.displayCaps.platformWidth,
        	left:1,
        	right:1
    	});
    		
    	var thisView = Ti.UI.createView({
           	//backgroundColor:"white",
           	top:'.5%',
           	//height:'250%',
           	backgroundColor:'white',
           	height:M3.Util.MathModule.getControlPostitionHeight(11),
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
           	text:tbl_data[i].desc,
           	touchEnabled:false
        });

    	var thisLabelDesc = Ti.UI.createLabel({
           	color:"black",
           	top:'47%',
           	left:'1%',
           	width:'75%',
           	font:{fontSize:'5pt',fontWeight:'normal'},
           	objIndex:i,
           	objName:"lbl-desc",
           	textAlign:"left",
           	text:tbl_data[i].addr + ", " + tbl_data[i].postcode + " - " + tbl_data[i].city,
           	touchEnabled:false
        });

    	var thisLabelDist = Ti.UI.createLabel({
           	color:"#32CD32",
           	top:'35%',
           	left:'75%',
           	font:{fontSize:'6pt',fontWeight:'bold'},
           	objIndex:i,
           	objName:"lbl-desc",
           	textAlign:"left",
           	text:'distanca: ' + M3.Util.Str.newRow() + dst,
           	touchEnabled:false
        });


        thisView.add(thisLabelCust);
        thisView.add(thisLabelDesc);
        thisView.add(thisLabelDist);
        thisRow.add(thisView);	
		
		ret_data.push(thisRow);
	};
	
	return ret_data;
};


// Customer edit form.
// This form will be used for new or edit existing customer.
// If no 'cust_data' is represent - New customer form open's.
M3.Customers.customerForm = function( cust_data ) {
	
	// window
	var c_win = Ti.UI.createWindow({
		backgroundColor:"black",
		title:"Unos novog partnera...",
		// this is local variable
		canceled:false
	});
	
	if(cust_data != null){
		c_win.title = "Ispravka podataka, partner: " + cust_data[0].id.toString() + ', uid: ' + cust_data[0].user_id.toString();
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
		top:'11%',
		keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
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
		top:'15.5%',
		keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
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
		top:'15.5%',
		keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
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
			c_view_additional.backgroundColor = '#60a0ff';
			Ti.Media.vibrate();
			c_btn_save.focus();
		}
		else
		{
			c_lat.value = "0";
			c_lon.value = "0";
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
			c_pcode.value = M3.Codes.Other.getPostCode( c_city.value );
			c_tel1.focus();
		}
		else
		{
			c_pcode.focus();
		};
	});
	
	c_pcode.addEventListener("focus", function(){
		if(c_city.value != ''){
			c_pcode.value = M3.Codes.Other.getPostCode( c_city.value );
		};
	});
	
	c_pcode.addEventListener("click", function(){
		if(c_city.value != ''){
			c_pcode.value = M3.Codes.Other.getPostCode( c_city.value );
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
M3.Customers.newCustomer = function(){
	
	var frm = M3.Customers.customerForm();
	
	frm.addEventListener("close", function() {
		if(frm.canceled == false && Ti.App.customer_data != null){

			M3.DB.insertIntoCustomers(Ti.App.customer_data );
			
			Ti.App.fireEvent("customerEdited");

		};
		
	});
};

// edit customer form
M3.Customers.editCustomer = function(){
	
	if(Ti.App.current_customer_data == null ){
		alert("Selektujte partnera u tabeli !");
		return;
	};
	
	// get current customer
	var frm = M3.Customers.customerForm( Ti.App.current_customer_data );
	
	frm.addEventListener("close", function() {
	
		if(frm.canceled == false && Ti.App.customer_data != null){
			
			M3.DB.updateCustomers(Ti.App.customer_data );
			
			
			Ti.App.fireEvent("customerEdited");
		};
	});
	
};

// call customer
M3.Customers.callCustomer = function( _cust_data ){
	
	var telephones = [];
	var _tel1 = _cust_data[0].tel1;
	var _tel2 = _cust_data[0].tel2;
	
	if(_tel1 != null && _tel1 != ''){
		telephones.push(_tel1);	
	};
	
	if(_tel2 != null && _tel2 != ''){
		telephones.push(_tel2);	
	};
	
	if(telephones.length > 0){
		telephones.push('Odustani');
	}
	else
	{
		alert('Partner nema niti jednog telefona!');
		return;	
	};
	
		// options dialog 2 
	var tel_options = {
		options:telephones,
		destructive:1,
		cancel:2,
		title:'Pozovi partnera:'
	};

	// create dialog
	var win_tel_1 = Titanium.UI.createOptionDialog(tel_options);
	
	win_tel_1.addEventListener("click", function(e){
		if(tel_options.options[e.index] == 'Odustani'){
			return;
		};
		Ti.Platform.openURL('tel:' + tel_options.options[e.index]);
	});
		
	win_tel_1.show();
	
};
