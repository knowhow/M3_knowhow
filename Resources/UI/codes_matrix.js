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

// ## Code's matrix module
// This module has basic method's for representing data into matrix form in tableView component. 

// Set the global namespace for this module.

M3.Codes.Matrix = {};

// Module specific global variables
var current_item_index = null;
var last_item_index = null;
	
// Open's the form with matrix look of the tableView component
// * **m_data** - matrix data
// * **m_title** - title for this window

M3.Codes.Matrix.getMatrix = function( m_data, m_title ) {
		
		var m_win = Ti.UI.createWindow({
			backgroundColor:"white",
			title:m_title
		});
		
		var scrl = Ti.UI.createScrollView({
			top:0,
			bottom:'12%'
		});

		var cellWidth = M3.Util.MathModule.getControlPostitionWidth(40);
		var cellHeight = M3.Util.MathModule.getControlPostitionWidth(45);
		var xSpacer = M3.Util.MathModule.getControlPostitionWidth(1);
		var ySpacer = M3.Util.MathModule.getControlPostitionWidth(5);
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
 
 				// create component's for the matrix view
 				
 				var thisImage = Ti.UI.createImageView({
 					image:Ti.App.current_images_dir + m_data[cellIndex].image_name,
 					opacity:1.0,
 					objIndex:cellIndex.toString(),
            		objName:"it-img",
 					top:'5%',
 					left:'48%',
 					width:M3.Util.MathModule.getControlPostitionWidth(20),
 					height:M3.Util.MathModule.getControlPostitionHeight(16)
 				});
 
 				// Main label, contain's main variables such as `article_id` or `article_quantity` etc...
 				// This variables will be used later in code.
 				
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
            		text:M3.Util.Str.rPad( m_data[cellIndex].desc, 20),
            		touchEnabled:false
        		});
        		
        		// add components to the Row
        		thisView.add(thisImage);
        		thisView.add(thisLabel);
        		thisView.add(thisLabelDescription);
        		thisRow.add(thisView);
    
    			// push data for later use of cell's
    			labels.push(thisLabel);	
        		labelsDesc.push(thisLabelDescription);
        		views.push(thisView);
        		images.push(thisImage);
 				data.push( {article_id: m_data[cellIndex].id, article_desc:m_data[cellIndex].desc, article_quantity:0} );
 
         		cellIndex++;
        		dataIndex++;
       						
    		};
    		
    		tableData.push(thisRow);
    		
    		if (dataIndex > m_data.length){
    			break;
    		};
		};
	
		// create table view
		var tableview = Ti.UI.createTableView({
    		data:tableData,
    		top:0,
    		// I set the height to 2000 because of scroll component
    		height:2000
		});
		
		scrl.add(tableview);
 		
 		// on click item, set current index of item, show description
		tableview.addEventListener("click", function(e){
    		
			// selected item...
			// show info at the bottom of screen
			
			if(e.source.objName){
				
				var m_ob_desc = m_data[e.source.objIndex].desc;
				var m_ob_id = m_data[e.source.objIndex].id;
				
				currentItem = e.source.objIndex;
				
				last_item_index = current_item_index;
				current_item_index = currentItem;
				
				item_set_focus( labels, labelsDesc, images );
				
				dv_label.text = m_ob_id + " - " + m_ob_desc;
				
			};
			
		});
 				
		var tStart;
		tableview.addEventListener('touchstart', function(e) {
    		tStart = new Date();
		});
	
		tableview.addEventListener('touchend', function(e) {
    		var tEnd = new Date();
    		if (tEnd.getTime() - tStart.getTime() > 800) {
           		_enter_value_manualy(e);
    		};
		});
  
  		var _enter_value_manualy = function(e){
			var man = M3.StdForms.getNumValue(Number(labels[e.source.objIndex].text));
			man.addEventListener("close", function(){
				if(man.item_value != null && man.item_value != undefined){
					labels[e.source.objIndex].text = man.item_value;
					data[e.source.objIndex].article_quantity = parseFloat(man.item_value);
				};
			});
    		
  		};
  
 		var desc_view = Ti.UI.createView({
 			height:'8%',
 			bottom:'12%',
 			backgroundColor:"black"
 		});
 
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

  		var controls_view = Ti.UI.createView({
 			bottom:0,
 			height:'12%',
 			backgroundColor:"black"
 		});

 		var control_button = Ti.UI.createButton({
 			title:'Potvrdi',  
       		left:'30%',    
        	height:'90%',
        	width:'40%',
        	bottom:'5%',  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
 		});
 	
 		var control_plus_button = Ti.UI.createButton({
 			title:'+',  
       		right:'2%',    
        	height:'90%',
        	width:'20%',  
        	bottom:'5%',
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'12pt'}  
 		});
 		
 		var control_minus_button = Ti.UI.createButton({
 			title:'-',  
       		left:'2%',    
        	height:'90%',
        	width:'20%',
        	bottom:'5%',  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'12pt'}  
 		});
 	
 	
 		control_button.addEventListener('click',function(e){  
    		Ti.App.fireEvent('purchaseAccept');
    		Ti.App.purchased_data = data;
    		m_win.close();
    		return m_win;
		});
		
		control_minus_button.addEventListener('click',function(e){ 
			if(parseInt(labels[currentItem].text) > 0 ){ 
    			labels[currentItem].text = (parseFloat(labels[currentItem].text) - 1).toString();
    			data[currentItem].article_quantity = parseInt(labels[currentItem].text);
    		}
		});
 		
 		control_plus_button.addEventListener('click',function(e){
    		labels[currentItem].text = (parseFloat(labels[currentItem].text) + 1).toString();
    		data[currentItem].article_quantity = parseInt(labels[currentItem].text);
		});

 		desc_view.add(dv_label);
 		
 		controls_view.add(control_button);
 		controls_view.add(control_minus_button);
 		controls_view.add(control_plus_button);
 	
 		m_win.add(scrl);
		m_win.add(desc_view);
		m_win.add(controls_view);
		m_win.open();
		
		return m_win;
		
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


