var boPurchase = {};


// list purchase method
boPurchase.listPurchase = function() {
	//alert("list documents");
	boCodes.Customers.getCustomerForm();
};
	
boPurchase.savePurchase = function( purchase_data ) {
	// save purchase data tu db...
	alert("save purchase to db");
};


// new purchase
boPurchase.newPurchase = function() {
		
	// document data
	var doc_data = Ti.App.document_data;
	doc_data.push( { doc_no:520 } );
	 
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
	
};
