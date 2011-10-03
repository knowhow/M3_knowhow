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

M3.Main = {};

// main window of application
M3.Main.mainWindow = function() {
		
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
	var data_init = Titanium.UI.createButton({  
       	title:'Inicijalizacija',  
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
       	top:'90%',    
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
	win_main.add(data_init);
	win_main.add(preferences);
	win_main.add(close_btn);
	
	win_main.open();
			
	// customer list event handler
	close_btn.addEventListener('click',function(e){  
    	win_main.close();
	});  	
	
	// customer list event handler
	customer_list.addEventListener('click',function(e){  
    	M3.Customers.customerList();
	});  	
	
	// list purchase event handler
	list_purchase.addEventListener('click',function(e){  
    	M3.Purchase.listPurchase();
	});
		
	// where am i event handler
	where_am_i.addEventListener('click',function(e){  
   		M3.Geo.geoForm();
	});  
	
	// preferences event handler
	preferences.addEventListener('click',function(e){  
   		var par_form = M3.Params.paramsForm();
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
   			oDb = M3.DB.openDB();
   			
   		});
 
        alertDialog.show();

	});  	
	
	// currently delete all purchases
	send_db.addEventListener("click", function(){
		
		var alertDialog = Ti.UI.createAlertDialog({
            title:'Pitanje',
            message:'Da li zaista želite poslati podatke ?',
            buttonNames:['Da','Ne'],
            cancel:1
        });
 
        alertDialog.addEventListener('click', function(e)
        {
            if (e.index == 1) {
                return;
            }
  			
  			M3.Remote.Post.synhroCustomers();
  			
  			Ti.App.addEventListener("customersPosted", function(e){
  			
  				Ti.App.removeEventListener("customersPosted");
  				
  				M3.Remote.Post.synhroPurchases();
  
  				Ti.App.addEventListener("purchasePosted", function(e){
  					Ti.App.removeEventListener("purchasePosted");
  				});
  				
  			});
  			
			//M3.DB.deleteAllPurchases();
	
        });
 
        alertDialog.show();
		
	});
	
	// initialization btn event listener
	data_init.addEventListener("click", function(){
		
		// open form init 
		var frm_init = M3.Remote.formInit();
		
		frm_init.addEventListener("close", function(){
			// on close...
		});
		
	});

	
};
	



	
