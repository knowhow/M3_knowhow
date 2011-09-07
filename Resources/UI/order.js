var boOrder = {};
var newRow = "\n";

boOrder.items = {};
	
boOrder.items.getOrderItems = function(items_data) {
		
	var line = "----------------------------------------------";
		
	// create window
	var ordWin = Ti.UI.createWindow({
		backgroundColor:"white",
		//modal:true,
		title:"trenutna narudzba"
	});		
		
	// show items on orders window
		
	// data: items_data
	// items_data.article_id
	// items_data.article_desc
	// items_data.article_quantity
		
	var totalQt = 0;
	var countItems = 1;
	var orderItemsList = "";
	var partnerId = "xxxxxx";
	var documentNo = 1;
	var documentDate = boUtil.date.getCurrentDate();
		
	// document data:
	orderItemsList += "Dokument broj: " + documentNo + ",    datum: " + documentDate + newRow + newRow;
	// partner data:
	orderItemsList += "Partner: " + partnerId + newRow;
	orderItemsList += line + newRow;
		
	orderItemsList += "Stavke narudzbe:" + newRow + newRow;
		
	for(var i=0; i < items_data.length; i++){
    	    
        var item_desc = items_data[i].article_desc;
        var item_id = items_data[i].article_id;
   	    var item_qt = items_data[i].article_quantity;
    	    
   	    // show only ones with qt > 0
   	    if(parseInt(item_qt) > 0) {
   			orderItemsList += countItems.toString() + ") " + item_id + " - " + boUtil.str.rPad(item_desc,30,'.') + " " + item_qt + newRow; 	
   	    	countItems++ ;
   	    };
    	    
   	    totalQt += parseInt(item_qt);
    	    
   	};
	
	orderItemsList += line + newRow;
	orderItemsList += "Ukupna kolicina: " + totalQt.toString() + newRow;
	orderItemsList += line + newRow;
	
		
	var ordLabel = Ti.UI.createLabel({
		text:orderItemsList,
		top:5,
		left:5,
		color:"black",
		font:{fontSize:16,fontWeight:'normal',fontFamily:'monospace'},
		wordWrap:"true"
	});
		
	// controls view - button controls, plus, minus, accept
  	var controls_view = Ti.UI.createView({
 		top:600,
 		backgroundColor:"black"
 	});

	// accept button
 	var ctrl_ok_button = Ti.UI.createButton({
 		title:'Potvrdi',  
     	left:10,
       	width:200,    
        height:80,  
        borderRadius:1,  
        font:{fontFamily:'Arial',fontWeight:'bold',fontSize:22}  
 	});
		
	// accept button
 	var ctrl_cancel_button = Ti.UI.createButton({
 		title:'Ponisti',  
    	right:10,
       	width:200,    
        height:80,  
        borderRadius:1,  
        font:{fontFamily:'Arial',fontWeight:'bold',fontSize:22}  
 	});
		
		
	controls_view.add(ctrl_cancel_button);
	controls_view.add(ctrl_ok_button);
	ordWin.add(controls_view);
	ordWin.add(ordLabel);
	ordWin.open();
	
	// control accept button event
 	ctrl_ok_button.addEventListener('click',function(e){  
    	ordWin.close();
    	ordWin.accepted = 1;
    	return ordWin;
	});
		
	// control accept button event
 	ctrl_cancel_button.addEventListener('click',function(e){  
    	ordWin.close();	
    	ordWin.accepted = 0;
    	return ordWin;
	});		
		
	return ordWin;
};
		
