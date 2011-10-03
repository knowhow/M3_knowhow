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

// ## Purchase module

// Set global namespace for this module.

M3.Purchase = {};


// list purchase method
M3.Purchase.listPurchase = function() {
	
	var current_purchase_no = 0;
	var current_purchase_date = Date();
	var current_purchase_valid = 0;
	var current_purchase_cust_id = 0;
	var current_purchase_doc_total = 0;
	
	// get data from table
	var d_data = M3.DB.getPurchasesData(Ti.App.current_logged_user_id);
	
	// create components
	var p_win = Ti.UI.createWindow({
		backgroundColor:"#FFFFFF",
		title:"Lista narudžbi:"
	});
		
	var p_bottom_view = Ti.UI.createView({
		backgroundColor:"black",
		bottom:0,
		height:'12%'
	});
	
	var p_btn_close = Ti.UI.createButton({
		title:"<",
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'10pt'},
		left:'1%',
		width:'15%',
		height:'80%',
		bottom:'5%'
	});
	
	var p_tbl_view = Ti.UI.createTableView({
		headerTitle:"Lista narudžbi za '" + Ti.App.current_logged_user + "'",
		allowsSelection:true,
		bottom:'10%'
	});

	// set empty data to table view component
	// reseting...
	p_tbl_view.setData([]);
	
	// set the table contents, all customers
	p_tbl_view.setData( _refresh_purchase_data( d_data ) );

	// options dialog 
	var dlg_opt = {
		options:['Pogledaj detalje', 'Poništi', 'Aktiviraj', 'Brisi'],
		destructive:1,
		cancel:2,
		title:'Opcije:'
	};

	var win_dlg_opt = Titanium.UI.createOptionDialog(dlg_opt);

	win_dlg_opt.addEventListener('click',function(e)
	{
		
		switch(e.index)
		{
			// view details
			case 0:
				
				// get items data
				var items_data = M3.DB.getPurchaseItemsData(current_purchase_no);
				// get customer data
				var cust_data = M3.DB.getCustomerArrayById(current_purchase_cust_id);
				
				// open purchase preview form
				// cust_data, items_data, doc_no, doc_date, doc_valid
  				var prevForm = M3.Preview.PO.getPurchaseOrderPreview(cust_data, items_data, current_purchase_no, current_purchase_date, current_purchase_valid, current_purchase_doc_total, current_purchase_notes );
  				
  				prevForm.addEventListener("close", function(){
  				});
  				
  				break;
  			
  			// cancels the active purchase
  			case 1:
  			
  				// cancel purchase
  				M3.DB.cancelPurchase(current_purchase_no);
  				// refresh table view
  				d_data = M3.DB.getPurchasesData(Ti.App.current_logged_user_id);
  				p_tbl_view.setData(_refresh_purchase_data(d_data));
  				break;
  				
  			// activate canceled purchase
  			case 2:
  			
  				// activate purchase
  				M3.DB.activatePurchase(current_purchase_no);
  				// refresh table view
  				d_data = M3.DB.getPurchasesData(Ti.App.current_logged_user_id);
  				p_tbl_view.setData(_refresh_purchase_data(d_data));
  				break;
  			
  			// delete purchase
			case 3:
			
				var alertDialog = Ti.UI.createAlertDialog({
            		title:'Pitanje',
            		message:'Izbrisati narudžbu iz baze ?',
            		buttonNames:['Da','Ne'],
            		cancel:1
        		});
 
        		alertDialog.addEventListener('click', function(e){
            		
            		if (e.index == 1) {
                		
                		return;
            		};
				
					// delete record from purchases
					M3.DB.deleteFromPurchases(current_purchase_no);
  					// refresh table view
  					d_data = M3.DB.getPurchasesData(Ti.App.current_logged_user_id);
  					p_tbl_view.setData(_refresh_purchase_data(d_data));
  					
  					return;
  				});
  				
  				alertDialog.show();
		};
	
	});
	
	// tableview on click show options dialog
	p_tbl_view.addEventListener("click", function(e){
		
		current_purchase_no = d_data[e.source.objIndex].doc_no;
		current_purchase_date = M3.Util.DateT.getCurrentDate( d_data[e.source.objIndex].doc_date);
		current_purchase_valid = d_data[e.source.objIndex].doc_valid;
		current_purchase_cust_id = d_data[e.source.objIndex].cust_id;
		current_purchase_doc_total = d_data[e.source.objIndex].doc_total;
		current_purchase_notes = d_data[e.source.objIndex].doc_notes;

		win_dlg_opt.show();
	});


	p_bottom_view.add(p_btn_close);

	p_win.add(p_tbl_view);
	p_win.add(p_bottom_view);

	p_btn_close.addEventListener("click", function(){
		p_win.close();
	});

	p_win.open();

};


function _refresh_purchase_data(data) {
		
	var tbl_data = [];
	
	for(var i=0; i < data.length; i++){
				
		// customer array	
		var c_arr = M3.DB.getCustomerArrayById( data[i].cust_id );
		
		var thisRow = Ti.UI.createTableViewRow({
        	className:"item",
        	objIndex:i,
        	objName:"grid-item",
        	layout: "horizontal",
        	height:"auto",
        	width:Ti.Platform.displayCaps.platformWidth,
        	left:1,
        	right:1
    	});
    		
    	var thisView = Ti.UI.createView({
           	top:'1%',
           	height:M3.Util.MathModule.getControlPostitionHeight(11),
           	right:'.2%',
           	left:'.2%',
           	width:'100%',
           	objIndex:i,
           	objName:"view-desc"
        });
        
        var thisImage = Ti.UI.createImageView({
        	image:'img/check_ok.png',
        	height:M3.Util.MathModule.getControlPostitionWidth(10),
        	width:M3.Util.MathModule.getControlPostitionWidth(10),
        	left:'87%',
        	top:'5%'
        });
        
    	var thisLabelPurch = Ti.UI.createLabel({
           	color:"#4169E1",
           	top:1,
           	left:'2%',
           	width:'80%',
           	font:{fontSize:'8pt',fontWeight:'bold'},
           	objIndex:i,
           	objName:"lbl-cust",
           	textAlign:"left",
           	text:data[i].doc_no + " - " + c_arr[0].desc,
           	touchEnabled:false
        });
        

    	var thisLabelDesc = Ti.UI.createLabel({
           	color:"black",
           	top:'50%',
           	left:'2%',
           	font:{fontSize:'5pt',fontWeight:'normal'},
           	objIndex:i,
           	objName:"lbl-desc",
           	textAlign:"left",
           	text:M3.Util.DateT.getCurrentDate(data[i].doc_date) + ", " + c_arr[0].addr + ", total: " + data[i].items_total ,
           	touchEnabled:false
        });
		
        // if purch not valid
        if(data[i].doc_valid == 0){
        	thisLabelPurch.color = "red";
        	thisImage.image = 'img/check_cancel.png';
        };

        
        thisView.add(thisLabelPurch);
        thisView.add(thisLabelDesc);
        thisView.add(thisImage);
        
        thisRow.add(thisView);	
		
		tbl_data.push(thisRow);
	};
	
	return tbl_data;
};



// new purchase
M3.Purchase.newPurchaseOrder = function() {
		
	// get articles from table
	var art_data = M3.Codes.Articles.getArticles();
	// customer data from global variable
	var _cust_result = Ti.App.customer_data;
	// send 'art_data' to matrix form and return purchased data 
	var matrix_win = M3.Codes.Articles.getArticleMatrix( art_data );
				
	// listen to event close and continue
	matrix_win.addEventListener('close',function(e){
   			
   		// go to purchace accepting form...		
   		// read global variable...
    	var purch_data = Ti.App.purchased_data;
   			
   		// get the final order report form...
   		var detail_win = M3.Preview.PO.getPurchaseOrderPreview( _cust_result, purch_data );
    		
		detail_win.addEventListener('close',function(e){
   			
   			// store to db...
   			var cust_id = Number(_cust_result[0].id);   
   			var user_id = Ti.App.current_logged_user_id;
   			var doc_notes = detail_win.notes;
   							
   			M3.DB.insertIntoPurchases(user_id, cust_id, e.source.accepted, doc_notes, purch_data);
   				
   			if(e.source.accepted == 1){
   				alert("Narudzba uspješno ažurirana!");	   			
   			} 
  			else
   			{
   				alert("Narudzba odbijena !!!");
   			};
   					
		});
	});
	
};
