var boPurchase = {};


// list purchase method
boPurchase.listPurchase = function() {
	
	var current_purchase_no = 0;
	var main_db = boDb.openDB();
	var p_data = boDb.getPurcasesData( main_db );
	
	var p_win = Ti.UI.createWindow({
		backgroundColor:"#FFFFFF",
		title:"Lista narudžbi:"
	});
		
	var p_btn_close = Ti.UI.createButton({
		title:"Zatvori",
		height:"auto",
		left:'2%',
		width:'20%',
		height:'10%',
		bottom:'1%'
	});
	
	var p_tbl_view = Ti.UI.createTableView({
		headerTitle:"Lista narudžbi za '" + Ti.App.current_logged_user + "'",
		allowsSelection:true,
		bottom:'10%'
	});

	// set the table contents, all customers
	p_tbl_view.setData( _refresh_purchase_data( p_data ) );

	// options dialog 
	var dlg_opt = {
		options:['Pogledaj detalje', 'Brisi'],
		destructive:1,
		cancel:2,
		title:'Opcije:'
	};

	// create dialog
	var win_dlg_opt = Titanium.UI.createOptionDialog(dlg_opt);

	// add event listener
	win_dlg_opt.addEventListener('click',function(e)
	{
		
		switch(e.index)
		{
			case 0:
  				alert("vidi detalje narudžbe");
  				break;
			case 1:
				boDb.deleteFromPurchases(main_db, current_purchase_no);
  				p_data = boDb.getPurcasesData(main_db);
  				p_tbl_view.setData(_refresh_purchase_data(p_data));
  				break;
		};
	
	});
	
	// tableview on click show options dialog
	p_tbl_view.addEventListener("click", function(e){
		current_purchase_no = p_data[e.source.objIndex].purchase_no;
		win_dlg_opt.show();
	});



	p_win.add(p_tbl_view);
	p_win.add(p_btn_close);

	p_btn_close.addEventListener("click", function(){
		main_db.close();
		p_win.close();
	});

	p_win.open();

};


function _refresh_purchase_data(data) {
	
	var main_db = boDb.openDB();
		
	var tbl_data = [];
	
	for(var i=0; i < data.length; i++){
				
		// customer array	
		var c_arr = boDb.getCustomerArrayByIdJSON(data[i].cust_id);
		
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
           	height:100,
           	width:420,
           	left:1,
           	objIndex:i,
           	objName:"view-desc"
        });
        
    	var thisLabelPurch = Ti.UI.createLabel({
           	color:"black",
           	top:1,
           	left:5,
           	font:{fontSize:26,fontWeight:'bold'},
           	objIndex:i,
           	objName:"lbl-cust",
           	textAlign:"left",
           	text:data[i].purchase_no + " - " + c_arr[0].desc,
           	touchEnabled:false
        });
        

    	var thisLabelDesc = Ti.UI.createLabel({
           	color:"black",
           	top:50,
           	left:5,
           	font:{fontSize:20,fontWeight:'bold'},
           	objIndex:i,
           	objName:"lbl-desc",
           	textAlign:"left",
           	text:boUtil.date.getCurrentDate(data[i].date) + ", " + c_arr[0].addr + ", total: " + boDb.getSumOfPurchase(main_db, data[i].purchase_no ) ,
           	touchEnabled:false
        });

        // if purch not valid
        if(data[i].purchase_valid == 0){
        	thisLabelPurch.color = "red";
        	thisLabelPurch.text += " (odbačena !!!)";
        };

        thisView.add(thisLabelPurch);
        thisView.add(thisLabelDesc);
        thisRow.add(thisView);	
		
		tbl_data.push(thisRow);
	};
	
	main_db.close();
	return tbl_data;
};



// new purchase
boPurchase.newPurchase = function() {
		
	// get articles from JSON
	var art_data = boCodes.Articles.getArticles();
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
   		var detail_win = boOrder.items.getOrderItems( _cust_result, purch_data );
    		
		detail_win.addEventListener('close',function(e){
   			
   			// store to db...
   			var main_db = boDb.openDB();
   			var cust_id = _cust_result[0].id;   
   							
   			boDb.insertIntoPurchases(main_db, cust_id, e.source.accepted, purch_data);
   			
   			main_db.close();
   				
   			if(e.source.accepted == 1){
   				alert("Narudzba prihvacena, snimljeno u db!");	   			
   			} 
  			else
   			{
   				alert("Narudzba odbijena !!! Snimljeno kao valid = 0");
   			};
   					
		});
	});
	
};
