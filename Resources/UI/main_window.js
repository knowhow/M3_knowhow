// main window of application
var mainWindow = function() {
		
	var win_main = Ti.UI.createWindow({
		backgroundColor:'#a0c0ff',
		title:'Narudzbe : glavni menij'
	});
	
		
	var info = Titanium.UI.createLabel({  
       	color:'black',
       	top:'1%',  
       	left:'5%',
       	text:"Odaberite zeljenu opciju:",
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'6pt'}  
	});  
		
	// btn new... 
	var customer_list = Titanium.UI.createButton({  
       	title:'Partneri',  
       	left:'2%',
       	right:'2%',
       	top:'6%',  
       	height:'10%',  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
	});  

	// btn list...
	var list_purchase = Titanium.UI.createButton({  
       	title:'Lista narudzbi',  
       	left:'2%',
       	right:'2%',
       	top:'16%',    
       	height:'10%',  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
	});  
		
	// btn geo...
	var where_am_i = Titanium.UI.createButton({  
       	title:'Gdje sam ja ?',  
       	left:'2%',
       	right:'2%',
       	top:'26%',    
       	height:'10%',  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
	});  
	
	// btn geo...
	var delete_db = Titanium.UI.createButton({  
       	title:'Obrisi db (debug)',  
       	left:'2%',
       	right:'2%',
       	top:'36%',    
       	height:'10%',  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
	});  
	
	// send to server...
	var send_db = Titanium.UI.createButton({  
       	title:'Pošalji podatke na server',  
       	left:'2%',
       	right:'2%',
       	top:'46%',    
       	height:'10%',  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}
	});  
	
	// get data from server...
	var get_data = Titanium.UI.createButton({  
       	title:'Uzmi podatke sa servera',  
       	left:'2%',
       	right:'2%',
       	top:'56%',    
       	height:'10%',  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}
	});  
	
	// preferences...
	var preferences = Titanium.UI.createButton({  
       	title:'Postavke',  
       	width:'35%',
       	right:'2%',
       	top:'76%',    
       	height:'10%',  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}
	});  
	
	// send to server...
	var close_btn = Titanium.UI.createButton({  
       	title:'Log out',  
       	left:'2%',
       	width:'35%',
       	top:'90%',    
       	height:'10%',  
       	borderRadius:1,  
       	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}
	});  
	
	win_main.add(info);
	win_main.add(customer_list);
	win_main.add(list_purchase);
	win_main.add(where_am_i);
	win_main.add(delete_db);
	win_main.add(send_db);
	win_main.add(get_data);
	win_main.add(preferences);
	win_main.add(close_btn);
	
	win_main.open();
			
	// customer list event handler
	close_btn.addEventListener('click',function(e){  
    	win_main.close();
	});  	
	
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
	
	// preferences event handler
	preferences.addEventListener('click',function(e){  
   		//Ti.UI.Android.openPreferences();
		var test_win = Ti.UI.createWindow({
			title:"slika",
			top:0,
			bottom:0,
			backgroundColor:"red"
		});	
		
		var b_field = boDb.getArticleImageById('3013');
		
		var test_img = Ti.UI.createImageView({
			top:0,
			bottom:50,
			left:10,
			right:10
		});
		
		alert(b_field);
		test_img.image = b_field;
		
		test_win.add(test_img);
		test_win.open();
	
	});  	

	// remove completely db
	delete_db.addEventListener('click',function(e){  
   		
   		var alertDialog = Ti.UI.createAlertDialog({
            title:'Pitanje',
            message:'Da li zaista želite ukloniti bazu ?',
            buttonNames:['Da','Ne'],
            cancel:1
        });
 
        alertDialog.addEventListener('click', function(e)
        {
            if (e.index == 1) {
                return;
            };

   			oDb.close();
   			oDb.remove();
   			oDb = boDb.openDB();
   			
   		});
 
        alertDialog.show();

	});  	
	
	// currently delete all purchases
	send_db.addEventListener("click", function(){
		
		var alertDialog = Ti.UI.createAlertDialog({
            title:'Pitanje',
            message:'Da li zaista želite izbrisati podatke ?',
            buttonNames:['Da','Ne'],
            cancel:1
        });
 
        alertDialog.addEventListener('click', function(e)
        {
            if (e.index == 1) {
                return;
            }
  
			boDb.deleteAllPurchases();
	
        });
 
        alertDialog.show();
		
	});
	
	get_data.addEventListener("click", function(){
		
		// first synchronize articles
		boRemote.synchro.synhroArticles();
		
		// listen for event ok
		Titanium.addEventListener('articlesSynchronized', function(){
			boRemote.synchro.synhroArticleImages();
		});
	
		Titanium.addEventListener('articleImagesSynchronized', function(){
			// do something after images synchronized...
		});
	});

	
};
	



	
