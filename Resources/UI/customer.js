
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


// get customer on ordering form
boCodes.Customers.getPurchaseCustomer = function( c_data ){
		
	var btn_height = 70;
	
	var cp_win = Ti.UI.createWindow({
		backgroundColor:"#FFFFFF",
		title:"Odaberi partnera"
	});
	
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
		top:90
	});
	
	
	cp_top_view.add(cp_lbl_loc);

	cp_bottom_view.add(cp_close_btn);
	cp_bottom_view.add(cp_gps_btn);
	cp_bottom_view.add(cp_man_btn);
	
	cp_win.add(cp_top_view);
	cp_win.add(cp_tbl_view);
	cp_win.add(cp_bottom_view);

	// main window 
	//cp_win.addEventListener("dblclick", function(){
		//cp_win.purchase_abort = false;
		//cp_win.close();
	//});
	
	// tbl view dbl click 
	cp_tbl_view.addEventListener("dblclick", function(e){
		
		if (e.source.objName) {
			var result = [];
			result.push( c_data[e.source.objIndex] );
			Ti.App.customer_data = result;
		
			cp_win.purchase_abort = false;
			cp_win.close();
		};
	});

	// close btn
	cp_close_btn.addEventListener("click", function(){
		cp_win.purchase_abort = true;
		cp_win.close();
	});
	
	// manual run
	cp_man_btn.addEventListener("click", function(){
		
		var tbl_data = _refresh_tbl_data( c_data );
		//alert(JSON.stringify(customer_data.customers));
		//alert(customer_data.customers.length);
		cp_tbl_view.setData( tbl_data );
		
	});
	
	cp_gps_btn.addEventListener("click", function(){
		
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
            	var ret_data = _refresh_tbl_data( dist_data );
				
				cp_tbl_view.setData( ret_data );
            	

        	};
        	
        	if (tic == 200){
        		clearInterval(timer);
        		cp_win.remove(pb);
        		cp_lbl_loc.text = "Nisam uspio pronaći lokaciju, pokušajte ručno!"
        	};
        	                    
		},200);			  
	
	});	
	
	

	cp_win.open();
	
	return cp_win;

};


function _refresh_tbl_data( c_data ) {
		
	var tbl_data = [];
	for(var i=0; i < c_data.length; i++){
					
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
           	height:40,
           	width:420,
           	left:1,
           	objIndex:i,
           	objName:"view-desc"
        });
        
    	var thisLabelDesc = Ti.UI.createLabel({
           	color:"black",
           	top:1,
           	left:5,
           	font:{fontSize:26,fontWeight:'bold'},
           	objIndex:i,
           	objName:"lbl-desc",
           	textAlign:"left",
           	text:boUtil.str.rPad( c_data[i].desc + ", " + c_data[i].city, 20),
           	touchEnabled:false
        });
        	
        thisView.add(thisLabelDesc);
        thisRow.add(thisView);	
		
		tbl_data.push(thisRow);
	};
	
	return tbl_data;
};

