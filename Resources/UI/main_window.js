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
       	title:'Obrisi db',  
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
	
	win_main.add(info);
	win_main.add(customer_list);
	win_main.add(list_purchase);
	win_main.add(where_am_i);
	win_main.add(delete_db);
	win_main.add(send_db);
	
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
            }

   			var db = boDb.openDB();
   			db.close();
   			db.remove();
   			
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

	
};
	



	
