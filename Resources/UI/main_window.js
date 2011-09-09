var boPurchase = {};
var activity = Ti.Android.currentActivity;
		
boPurchase.mainWindow = function() {
		
	var win_main = Ti.UI.createWindow({
		backgroundColor:'#87CEFA',
		title:'Narudzbe',
		activity : {
			onCreateOptionsMenu : function(e) {
				var menu = e.menu;
				var m1 = menu.add({ title : 'Zatvori aplikaciju' });
				m1.setIcon(Titanium.Android.R.drawable.ic_menu_close_clear_cancel);
				m1.addEventListener('click', function(e) {
					Ti.UI.currentWindow.close();
				});
			}
		}

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
	var new_purchase = Titanium.UI.createButton({  
       	title:'Nova narudzba',  
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
	
	win_main.add(info);
	win_main.add(new_purchase);
	win_main.add(list_purchase);
	win_main.add(where_am_i);
		
	win_main.open();
		
	// new purchase event handler
	new_purchase.addEventListener('click',function(e){  
    	boPurchase.addPurchase();
	});  	
	
	// list purchase event handler
	list_purchase.addEventListener('click',function(e){  
    	boPurchase.listPurchase();
	});
		
	// where am i event handler
	where_am_i.addEventListener('click',function(e){  
   		boGeo.geoForm();
	});  	
	
};
	
// new purchase method
boPurchase.addPurchase = function() {
		
	// reset data
	Ti.App.purchased_data = [];
	Ti.App.document_data = [];
	Ti.App.customer_data = [];

	// document data
	var doc_data = Ti.App.document_data;
	doc_data.push( { doc_no:520 } );
	 
	// get articles from JSON
	var art_data = boCodes.Articles.getArticles();
	// get customers from JSON
	var cust_data = boCodes.Customers.getCustomers();
	// open the get customer form
	var customer_win = boCodes.Customers.getPurchaseCustomer( cust_data );
	
	// listen for event close on customer form
	customer_win.addEventListener('close', function(e){
		
		if(customer_win.purchase_abort == true){
			return;
		};
		// customer data
		var _cust_result = Ti.App.customer_data;
		// send JSON to matrix and return data 
		var matrix_win = boCodes.Articles.getArticleMatrix( art_data );
				
		// listen to event close and continue
		matrix_win.addEventListener('close',function(e){
   			
   			// go to purchace accepting form...		
   			// read global variable...
    		var purch_data = Ti.App.purchased_data;
   			
   			// get the final order report form...
   			var detail_win = boOrder.items.getOrderItems( doc_data, _cust_result, purch_data );
    		
	    	detail_win.addEventListener('close',function(e){
   				// store to db...
   				if(e.source.accepted == 1){
   					alert("Narudzba prihvacena, saljemo podatke u db!");
   				} 
   				else
   				{
   					alert("Narudzba odbijena !!!");
   				};
   					
			});
		});
	});			
};

// list purchase method
boPurchase.listPurchase = function() {
	//alert("list documents");
	boCodes.Customers.getCustomerForm();
};
	
boPurchase.savePurchase = function( purchase_data ) {
	// save purchase data tu db...
	alert("save purchase to db");
};
	
