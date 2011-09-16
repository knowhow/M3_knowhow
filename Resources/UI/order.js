var boOrder = {};

boOrder.items = {};
	
boOrder.items.getPurchasePreview = function( cust_data, items_data, document_no, doc_date, doc_valid, doc_total ) {
			
	// create window
	var ordWin = Ti.UI.createWindow({
		backgroundColor:"white",
		title:"Pregled narudžbe"
	});		
	
	// create table view to show data
	var ord_tbl_view = Ti.UI.createTableView({
		headerTitle:'Lista artikala:',
		maxRowHeight:20,
		backgroundColor:'#4080c0',
		font:{fontFamily:'Helvetica',fontWeight:'bold',fontSize:'2pt'},
		top:'20%',
		bottom:'20%'
	});
		
	// label document
	var ord_lbl_document = Ti.UI.createLabel({
		text:'Dokument: xxxx',
		top:'2%',
		left:'2%',
		color:'black',
		font:{fontFamily:'Helvetica',fontWeight:'normal',fontSize:'7pt'}
	});
	
	// label customer
	var ord_lbl_customer = Ti.UI.createLabel({
		text:'Partner: xxxx',
		top:'8%',
		left:'2%',
		color:'black',
		width:'90%',
		font:{fontFamily:'Helvetica',fontWeight:'normal',fontSize:'6pt'}
	});
	

	if(document_no != null){
		ordWin.title = 'Pregled narudžbe broj: ' + document_no;
		ord_lbl_document.text = 'Dokument: ' + document_no + ', datum: ' + doc_date;
	};

	if(cust_data != null && cust_data[0].id != null){
		ord_lbl_customer.text = 'Partner: ' + cust_data[0].id + ' - ' + cust_data[0].desc + ', ' + cust_data[0].addr;
	};
	
	
	// show items on orders window
		
	// data: items_data
	// items_data.article_id
	// items_data.article_desc
	// items_data.article_quantity
	
	var tbl_data = [];
	var countItems = 1;
	var totalQt = 0;
		
	var _item_no;
	var _art_id;
	var _art_desc;
	var _art_qt;

	
	for(var i=0; i < items_data.length; i++){
    	
    	_item_no = countItems;
    	
    	if(items_data[i].doc_item_no != null){
    		_item_no = items_data[i].doc_item_no; 
    	};
    	
    	_item_no = _item_no.toString();
    	   
        _art_id = items_data[i].article_id;
   	    _art_qt = items_data[i].article_quantity;
    	_art_desc = items_data[i].article_desc;
    	
    	if(_art_desc == null){
    		_art_desc = boDb.getArticleDescByIdJSON( _art_id );
    	};   
    	    
    	//alert(JSON.stringify(items_data));
   	    // show only ones with qt > 0
   	    if(parseInt(_art_qt) > 0) {
   			tbl_data.push( { title: boUtil.str.rPad(_item_no, 3) + ") " + boUtil.str.rPad(_art_desc,20) + " x " + _art_qt } );
   			countItems++ ;
   	    };
    	
    	totalQt += _art_qt;
   	};
   	
   	ord_tbl_view.setData(tbl_data);
		
	
	if(doc_total == null){
		doc_total = totalQt;
	};
	
	// label total
	var ord_lbl_doc_total = Ti.UI.createLabel({
		text:'Total: ' + doc_total,
		top:'80.5%',
		left:'50%',
		color:'black',
		font:{fontFamily:'Helvetica',fontWeight:'bold',fontSize:'10pt'}
	});
	
	// controls view - button controls, plus, minus, accept
  	var controls_view = Ti.UI.createView({
 		bottom:0,
 		height:'12%',
 		backgroundColor:"black"
 	});

	// accept button
 	var ctrl_ok_button = Ti.UI.createButton({
 		title:'Potvrdi',  
     	right:'2%',
       	width:'35%',    
        height:'80%',  
        bottom:'5%',
        borderRadius:1,  
        font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
 	});
		
	// accept button
 	var ctrl_cancel_button = Ti.UI.createButton({
 		title:'< Ponisti',  
    	left:'2%',
       	width:'35%',    
        height:'80%',
        bottom:'5%',  
        borderRadius:1,  
        font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
 	});
		
		
	controls_view.add(ctrl_cancel_button);
	controls_view.add(ctrl_ok_button);
	
	ordWin.add(ord_lbl_customer);
	ordWin.add(ord_lbl_document);
	ordWin.add(ord_lbl_doc_total);
	
	ordWin.add(ord_tbl_view);
	
	ordWin.add(controls_view);

	ordWin.open();
	
	if(document_no != null){
		controls_view.remove(ctrl_ok_button);
		ctrl_cancel_button.title = "<";
	};
	
	// control accept button event
 	ctrl_ok_button.addEventListener('click',function(e){  
    	ordWin.close();
    	ordWin.accepted = 1;
	});
		
	// control accept button event
 	ctrl_cancel_button.addEventListener('click',function(e){  
    	ordWin.close();	
    	ordWin.accepted = 0;
	});		
		
	return ordWin;
};
		
