boCodes.Matrix = {};
	
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
		var labels = [];
		var views = [];
		var purchase_data = [];

		var cellIndex = 0;
		//var r_height = 0;
		
		// count m_data items...
		var dataIndex = 1;
 
		for (var y=0; y<yGrid; y++){
			
			if (dataIndex > m_data.articles.length){
    				break;
    		};	
    			
    		var thisRow = Ti.UI.createTableViewRow({
        			className: "grid",
        			layout: "horizontal",
        			height: cellHeight+(2*ySpacer),
        			backgroundSelectedColor:"red"
    		});
    		
    		for (var x=0; x<xGrid; x++){
		
				if (dataIndex > m_data.articles.length){
    				break;
    			};
    			
        		var thisView = Ti.UI.createView({
            		objName:"grid-art-view",
            		objIndex:cellIndex.toString(),
            		//focusable:true,
            		left: ySpacer,
            		height: cellHeight,
            		width: cellWidth
       			});
       			
       			// find background image if exist... 
       			if(m_data.articles[cellIndex].pict != ''){
       				
       				//var thisFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + '/img/', m_data.articles[cellIndex].pict);
       				thisView.backgroundImage = 'img/' + m_data.articles[cellIndex].pict;
       			}
       			else
       			{
       				thisView.backgroundImage = null;
       			};
 
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
            		article_id:m_data.articles[cellIndex].id,
            		article_desc:m_data.articles[cellIndex].desc,
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
            		text:boUtil.str.rPad( m_data.articles[cellIndex].desc, 20),
            		touchEnabled:false
        		});
        		
        		thisView.add(thisLabel);
        		thisView.add(thisLabelDescription);
        		
        		thisRow.add(thisView);
    
    			// push label info into labels[]
        		labels.push(thisLabel);	
        		labelsDesc.push(thisLabelDescription);
        		
        		views.push(thisView);
        		
        		//r_height += thisView.height + 5;
        		
 				// push article data into data[]
        		data.push( {article_id: m_data.articles[cellIndex].id, article_desc:m_data.articles[cellIndex].desc, article_quantity:0} );
 
         		cellIndex++;
        		dataIndex++;
       			
       			//Ti.API.info("dataIndex: " + dataIndex.toString() + " length : " + m_data.articles.length );
            			
    		};
    		
    		//thisRow.height = r_height;
    		tableData.push(thisRow);
    		
    		if (dataIndex > m_data.articles.length){
    			break;
    		};
		};
	
		// table view
		var tableview = Ti.UI.createTableView({
    		data:tableData,
    		top:0,
    		height:5000,
    		//bottom:'20%'
		});
		
		scrl.add(tableview);
 		
 		// on click item, set current index of item, show description
		tableview.addEventListener("click", function(e){
    		
			// selected item...
			// show info at the bottom of screen
			
			if(e.source.objName){
				
				//alert(e.source.objIndex + "-" + labelsDesc.length);
				
				var m_ob_desc = m_data.articles[e.source.objIndex].desc;
				var m_ob_id = m_data.articles[e.source.objIndex].id;
				
				// set current item
				currentItem = e.source.objIndex;
				
				item_set_focus( currentItem, labels, labelsDesc );
				
				// show item on desc label
				dv_label.text = m_ob_id + " - " + m_ob_desc;
				
			};
			
		});
 
 		// double tap - increase amount of items
		tableview.addEventListener("dblclick", function(e){
			
			// increase number
   			
   			//labels[e.source.objIndex].text = (parseInt(labels[e.source.objIndex].text) + 1).toString();
   			//data[e.source.objIndex].article_quantity = parseInt(labels[e.source.objIndex].text);
		
			var man = boCodes.Matrix.getItemManualValue();
			man.addEventListener("close", function(){
				
				labels[e.source.objIndex].text = man.item_value;
				data[e.source.objIndex].article_quantity = parseInt(man.item_value);
			
			});
			
		});
  
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
        	height:'100%',
        	width:'20%',  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'20pt'}  
 		});
 		
 		// minus button
 		var control_minus_button = Ti.UI.createButton({
 			title:'-',  
       		left:'2%',    
        	height:'100%',
        	width:'20%',  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'20pt'}  
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



var item_set_focus = function( index, label_qt, label_desc ) {
	
	// set label quantity
	label_qt[index].font = {fontSize:'16pt',fontWeight:'bold'};
	label_qt[index].left = '10%';
	
	// set label desc
	label_desc[index].backgroundColor = 'red';
	label_desc[index].color = 'white';
	
	for (var i=0; i < label_qt.length; i++) {
		if (i != index ){
			label_qt[i].font = {fontSize:'10pt',fontWeight:'bold'};
			label_qt[i].left = '10%';
			
			label_desc[i].backgroundColor = 'gray';
			label_desc[i].color = 'white';
		};
	};
};


