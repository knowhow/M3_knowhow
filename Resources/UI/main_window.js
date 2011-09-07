var boPurchase = {};
var activity = Ti.Android.currentActivity;

(function() {
		
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
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20}  
		});  
		
		// btn new... 
		var new_purchase = Titanium.UI.createButton({  
        	title:'Nova narudzba',  
        	left:3,
        	right:3,
        	top:40,  
        	height:80,  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:22}  
		});  

		// btn list...
		var list_purchase = Titanium.UI.createButton({  
        	title:'Lista narudzbi',  
        	left:3,
        	right:3,
        	top:120,    
        	height:80,  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:22}  
		});  
		
		// btn geo...
		var where_am_i = Titanium.UI.createButton({  
        	title:'Gdje sam ja ?',  
        	left:3,
        	right:3,
        	top:200,    
        	height:80,  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:22}  
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
		
		// get articles from JSON
		var a_data = boCodes.Articles.getArticles();
		// send JSON to matrix and return data 
		var matrix_win = boCodes.Articles.getArticleMatrix( a_data );
				
		// listen to event close and continue
		matrix_win.addEventListener('close',function(e){
   			
   			// go to purchace accepting form...		
   			// read global variable...
    		var p_data = Ti.App.purchased_data;
   			
   			var detail_win = boOrder.items.getOrderItems( p_data );
    		
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
		
		
		// empty purchased data for security reasons
		//Ti.App.purchased_data = [];
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
	

})();
