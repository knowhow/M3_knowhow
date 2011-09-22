boCodes.Matrix = {};

var current_item_index = null;
var last_item_index = null;
	
boCodes.Matrix.getMatrix = function( m_data, m_title ) {
		
		var m_win = Ti.UI.createWindow({
			backgroundColor:"white",
			//modal:true,
			title:m_title
		});
		
		var scrl = Ti.UI.createScrollView({
			top:0,
			bottom:'12%'
		});
		
		// w: 25
		// h: 30
		var cellWidth = boUtil.math.getControlPostitionWidth(40);
		var cellHeight = boUtil.math.getControlPostitionWidth(45);
		var xSpacer = boUtil.math.getControlPostitionWidth(1);
		var ySpacer = boUtil.math.getControlPostitionWidth(5);
		var xGrid = 2;
		var yGrid = 100;
		var currentItem = 0;
 
		var tableData = [];
		var data = [];
		var labelsDesc = [];
		var images = [];
		var labels = [];
		var views = [];
		var purchase_data = [];

		var cellIndex = 0;
		//var r_height = 0;
		
		// count m_data items...
		var dataIndex = 1;
 
		for (var y=0; y<yGrid; y++){
			
			if (dataIndex > m_data.length){
    				break;
    		};	
    			
    		var thisRow = Ti.UI.createTableViewRow({
        			className: "grid",
        			layout: "horizontal",
        			height: cellHeight+(2*ySpacer),
        			backgroundSelectedColor:"red"
    		});
    		
    		for (var x=0; x<xGrid; x++){
		
				if (dataIndex > m_data.length){
    				break;
    			};
    			
        		var thisView = Ti.UI.createView({
            		objName:"grid-art-view",
            		objIndex:cellIndex.toString(),
            		left: ySpacer,
            		height: cellHeight,
            		width: cellWidth
       			});
 
 				// image show
 				var thisImage = Ti.UI.createImageView({
 					image:'img/' + m_data[cellIndex].pict,
 					opacity:1.0,
 					objIndex:cellIndex.toString(),
            		objName:"it-img",
 					top:'5%',
 					left:'48%',
 					width:boUtil.math.getControlPostitionWidth(20),
 					height:boUtil.math.getControlPostitionHeight(16)
 				});
 
 				// main label - count items
        		var thisLabel = Ti.UI.createLabel({
            		color:"red",
            		top:'5%',
            		left:'10%',
            		font:{fontSize:'10pt',fontWeight:'bold'},
            		objIndex:cellIndex.toString(),
            		objName:"lbl",
            		textAlign:"left",
            		text:"0",
            		article_id:m_data[cellIndex].id,
            		article_desc:m_data[cellIndex].desc,
            		article_quantity:0,		
            		touchEnabled:false
        		});
        		
				// description item label into view 
        		var thisLabelDescription = Ti.UI.createLabel({
            		color:"white",
            		top:'75%',
            		left:'10%',
            		height:'23%',
            		width:'85%',
            		backgroundColor:'gray',
            		font:{fontSize:'4pt',fontWeight:'bold'},
            		objIndex:cellIndex.toString(),
            		objName:"lbl-it-desc",
            		textAlign:"left",
            		text:boUtil.str.rPad( m_data[cellIndex].desc, 20),
            		touchEnabled:false
        		});
        		
        		thisView.add(thisImage);
        		thisView.add(thisLabel);
        		thisView.add(thisLabelDescription);
        		
        		thisRow.add(thisView);
    
    			// push label info into labels[]
        		labels.push(thisLabel);	
        		labelsDesc.push(thisLabelDescription);
        		
        		views.push(thisView);
        		
        		images.push(thisImage);
        		
        		//r_height += thisView.height + 5;
        		
 				// push article data into data[]
        		data.push( {article_id: m_data[cellIndex].id, article_desc:m_data[cellIndex].desc, article_quantity:0} );
 
         		cellIndex++;
        		dataIndex++;
       			
       			//Ti.API.info("dataIndex: " + dataIndex.toString() + " length : " + m_data.length );
            			
    		};
    		
    		//thisRow.height = r_height;
    		tableData.push(thisRow);
    		
    		if (dataIndex > m_data.length){
    			break;
    		};
		};
	
		// table view
		var tableview = Ti.UI.createTableView({
    		data:tableData,
    		top:0,
    		height:2000,
    		//bottom:'20%'
		});
		
		scrl.add(tableview);
 		
 		// on click item, set current index of item, show description
		tableview.addEventListener("click", function(e){
    		
			// selected item...
			// show info at the bottom of screen
			
			if(e.source.objName){
				
				//alert(e.source.objIndex + "-" + labelsDesc.length);
				
				var m_ob_desc = m_data[e.source.objIndex].desc;
				var m_ob_id = m_data[e.source.objIndex].id;
				
				// set current item
				currentItem = e.source.objIndex;
				
				last_item_index = current_item_index;
				current_item_index = currentItem;
				
				item_set_focus( labels, labelsDesc, images );
				
				// show item on desc label
				dv_label.text = m_ob_id + " - " + m_ob_desc;
				
			};
			
		});
 
 		// double tap - increase amount of items
		tableview.addEventListener("dblclick", function(e){
			// doing something on doubel click						
		});
				
		var tStart;
		tableview.addEventListener('touchstart', function(e) {
    	//Ti.API.info("touchstart fired");
    		tStart = new Date();
		});
	
		tableview.addEventListener('touchend', function(e) {
    		//Ti.API.info("touchend fired");
    		var tEnd = new Date();
    		if (tEnd.getTime() - tStart.getTime() > 800) {
        		// show options dialog
           		_enter_value_manualy(e);
    		};
		});
  
  		var _enter_value_manualy = function(e){
  			var man = boCodes.Matrix.getItemManualValue();
			man.addEventListener("close", function(){
				labels[e.source.objIndex].text = man.item_value;
				data[e.source.objIndex].article_quantity = parseInt(man.item_value);
			});
    		
  		};
  
  		// description view - show item properties
 		var desc_view = Ti.UI.createView({
 			height:'8%',
 			bottom:'12%',
 			backgroundColor:"black"
 		});
 
		// description view description label
		var dv_label = Ti.UI.createLabel({
			text:"kliknite na jedan od artikala",
			textAlign:"left",
			wordWrap:"auto",
			left:'3%',
			color:"white",
            font:{fontSize:'7pt',fontWeight:'bold'},
            objName:"lbl-desc",
            touchEnabled:false
		});

		// controls view - button controls, plus, minus, accept
  		var controls_view = Ti.UI.createView({
 			bottom:0,
 			height:'12%',
 			backgroundColor:"black"
 		});

		// accept button
 		var control_button = Ti.UI.createButton({
 			title:'Potvrdi',  
       		left:'30%',    
        	height:'90%',
        	width:'40%',
        	bottom:'5%',  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
 		});
 	
 		// plus button
 		var control_plus_button = Ti.UI.createButton({
 			title:'+',  
       		right:'2%',    
        	height:'90%',
        	width:'20%',  
        	bottom:'5%',
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'12pt'}  
 		});
 		
 		// minus button
 		var control_minus_button = Ti.UI.createButton({
 			title:'-',  
       		left:'2%',    
        	height:'90%',
        	width:'20%',
        	bottom:'5%',  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'12pt'}  
 		});
 	
 	
 		// control accept button event
 		control_button.addEventListener('click',function(e){  
    		Ti.App.fireEvent('purchaseAccept');
    		// set global variable purchased data...
    		Ti.App.purchased_data = data;
    		m_win.close();
    		return m_win;
		});
		
		// minus items events
		control_minus_button.addEventListener('click',function(e){ 
			if(parseInt(labels[currentItem].text) > 0 ){ 
    			labels[currentItem].text = (parseInt(labels[currentItem].text) - 1).toString();
    			data[currentItem].article_quantity = parseInt(labels[currentItem].text);
    		}
		});
 		
 		// plus items events
 		control_plus_button.addEventListener('click',function(e){
    		labels[currentItem].text = (parseInt(labels[currentItem].text) + 1).toString();
    		data[currentItem].article_quantity = parseInt(labels[currentItem].text);
		});

		// android back function
		m_win.addEventListener('android:back',function(e){
    		m_win.close();
 		});
 		
 		// add to desc view...
 		desc_view.add(dv_label);
 		
 		// add to bottom view
 		controls_view.add(control_button);
 		controls_view.add(control_minus_button);
 		controls_view.add(control_plus_button);
 	
 		// add to m_win (main window)
		m_win.add(scrl);
		m_win.add(desc_view);
		m_win.add(controls_view);
		m_win.open();
		
		return m_win;
		
};

// get item manual value...
boCodes.Matrix.getItemManualValue = function( curr_value ){
	
	var mv_win = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'unesi iznos',
		height:'40%',
		width:'85%',
		top:'5%',
		borderRadius:10,
		borderColor:'gray',
		borderWidth:5
	});
	
	var mv_lbl = Ti.UI.createLabel({
		text:'Unesi željenu vrijednost:',
		top:'12%',
		color:'black',
		left:'12%',
		font:{fontSize:'8pt', fontWeight:'bold'}	
	});
	
	var mv_text = Ti.UI.createTextField({
		top:'35%',
		left:'10%',
		right:'10%',
		height:'25%',
		keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
	});
	
	var btn_ok = Ti.UI.createButton({
		top:'70%',
		left:'10%',
		width:'30%',
		height:'25%',
		title:'Uredu'
	});
	
	var btn_cancel = Ti.UI.createButton({
		top:'70%',
		right:'10%',
		width:'30%',
		height:'25%',
		title:'Odustani'
	});
	
	mv_win.add(mv_lbl);
	mv_win.add(mv_text);
	mv_win.add(btn_ok);
	mv_win.add(btn_cancel);
	
	mv_text.addEventListener("return", function(){
		mv_text.blur();
		btn_ok.focus();
	});
	
	btn_ok.addEventListener("click", function(){
		mv_text.blur();
		if(mv_text.value != ''){
			mv_win.item_value = mv_text.value;
		};
		mv_win.close();
	});

	btn_cancel.addEventListener("click", function(){
		mv_win.item_value = '0';
		mv_text.blur();
		mv_win.close();
	});
	
	mv_text.focus();
	mv_win.open();
	
	return mv_win;
};



// set item focus variables
var item_set_focus = function( label_qt, label_desc, images_view ) {
	
	// set focused...
	label_qt[current_item_index].font = {fontSize:'16pt',fontWeight:'bold'};
	label_qt[current_item_index].left = '10%';
	
	label_desc[current_item_index].backgroundColor = 'red';
	label_desc[current_item_index].color = 'white';
	
	images_view[current_item_index].opacity = '0.5';
	
	// set defocused...
	if( last_item_index != null ){
		
		label_qt[last_item_index].font = {fontSize:'10pt',fontWeight:'bold'};
		label_qt[last_item_index].left = '10%';
			
		label_desc[last_item_index].backgroundColor = 'gray';
		label_desc[last_item_index].color = 'white';
			
		images_view[last_item_index].opacity = '1.0';
	};

};


