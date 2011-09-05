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
	
		win_main.add(info);
		win_main.add(new_purchase);
		win_main.add(list_purchase);
		
		win_main.open();
		
		// new purchase event handler
		new_purchase.addEventListener('click',function(e){  
    		boPurchase.addPurchase();
		});  	
	
		// list purchase event handler
		list_purchase.addEventListener('click',function(e){  
    		boPurchase.listPurchase();
		});  	
	
	};
	
	// new purchase method
	boPurchase.addPurchase = function() {
		
		// get articles from JSON
		var a_data = boCodes.Articles.getArticles();
		
		// send JSON to matrix and return data 
		boCodes.Articles.getArticleMatrix( a_data );
		
		// listen to fire event
		Ti.App.addEventListener('purchaseAccept',function(){
   			// go to purchace accepting form...		
   			// read global variable...
    		var p_data = Ti.App.purchased_data;
   			// open form
    		boOrder.items.getOrderItems( p_data );
    		//Ti.App.fireEvent('purchaseAccept',{id:'0'});
    		Ti.App.removeEventListener('purchaseAccept',function(){});
    		
		});
		
		// listen to fire event
		Ti.App.addEventListener('purchaseAccepted',function(){
   			// store to db...
   			alert("Narudzba prihvacena, saljemo podatke u db!");
   			Ti.App.removeEventListener('purchaseAccepted',function(){});
    		return;
   			
		});
		
		// empty purchased data for security reasons
		Ti.App.purchased_data = [];
	};

	// list purchase method
	boPurchase.listPurchase = function() {
		alert("list documents");
	};
	
	boPurchase.savePurchase = function( purchase_data ) {
		// save purchase data tu db...
		alert("save purchase to db");
	};
	

})();
