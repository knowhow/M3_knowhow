// main window of application
var mainWindow = function() {
		
	var win_main = Ti.UI.createWindow({
		backgroundColor:'#87CEFA',
		title:'Narudzbe'
	});
	
		
	var info = Titanium.UI.createLabel({  
       	color:'#000000',
       	width:"auto",
       	top:6,  
       	left:10,
       	text:"Odaberite zeljenu opciju:",
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:26}  
	});  
		
	// btn new... 
	var customer_list = Titanium.UI.createButton({  
       	title:'Partneri',  
       	left:3,
       	right:3,
       	top:40,  
       	height:80,  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:30}  
	});  

	// btn list...
	var list_purchase = Titanium.UI.createButton({  
       	title:'Lista narudzbi',  
       	left:3,
       	right:3,
       	top:120,    
       	height:80,  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:30}  
	});  
		
	// btn geo...
	var where_am_i = Titanium.UI.createButton({  
       	title:'Gdje sam ja ?',  
       	left:3,
       	right:3,
       	top:200,    
       	height:80,  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:30}  
	});  
	
	// btn geo...
	var delete_db = Titanium.UI.createButton({  
       	title:'Obrisi db',  
       	left:3,
       	right:3,
       	top:280,    
       	height:80,  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:30}  
	});  
	
	win_main.add(info);
	win_main.add(customer_list);
	win_main.add(list_purchase);
	win_main.add(where_am_i);
	win_main.add(delete_db);
	
	win_main.open();
		
	// customer list event handler
	customer_list.addEventListener('click',function(e){  
    	boCodes.Customers.customerList();
	});  	
	
	// list purchase event handler
	list_purchase.addEventListener('click',function(e){  
    	boPurchase.listPurchase();
	});
		
	// where am i event handler
	where_am_i.addEventListener('click',function(e){  
   		boGeo.geoForm();
	});  	

	// delete db
	delete_db.addEventListener('click',function(e){  
   		var db = boDb.openDB();
   		db.close();
   		db.remove();
	});  	

	
};
	



	
