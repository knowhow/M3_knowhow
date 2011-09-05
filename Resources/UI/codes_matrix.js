(function(){
	
	boCodes.Matrix = {};
	
	boCodes.Matrix.getMatrix = function( m_data, m_title ) {
		
		var m_win = Ti.UI.createWindow({
			backgroundColor:"white",
			title:m_title
		});
		
		var cellWidth = 130;
		var cellHeight = 150;
		var xSpacer = 10;
		var ySpacer = 10;
		var xGrid = 3;
		var yGrid = 100;
		var currentItem = 0;
 
		var tableData = [];
		var labelsDesc = [];
		var purchase_data = [];

		var colorSet = [
                "#D44646",
                "#46D463",
                "#46D4BE",
                "#C2D446",
                "#D446D5",
                "#4575D5",
                "#E39127",
                "#879181",
                "#E291D4"
              ];
 
		var colorSetIndex = 0;
		var cellIndex = 0;
		
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
        			selectedBackgroundColor:"red"
    		});
    		
    		for (var x=0; x<xGrid; x++){
        
        		if (dataIndex > m_data.articles.length){
    				break;
    			};
		
        		var thisView = Ti.UI.createView({
            		objName:"grid-art-view",
            		objIndex:cellIndex.toString(),
            		backgroundColor: colorSet[colorSetIndex],
            		left: ySpacer,
            		height: cellHeight,
            		width: cellWidth
       			});
       			
       			// find background image if exist... 
       			if(m_data.articles[cellIndex].pict != ''){
       				
       				var thisFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + '/img/', m_data.articles[cellIndex].pict);
       				thisView.backgroundImage = 'img/' + m_data.articles[cellIndex].pict;
       			};
 
 				// main label - count items
        		var thisLabel = Ti.UI.createLabel({
            		color:"black",
            		top:10,
            		left:60,
            		font:{fontSize:48,fontWeight:'bold'},
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
            		color:"black",
            		top:120,
            		left:5,
            		font:{fontSize:14,fontWeight:'bold'},
            		objIndex:cellIndex.toString(),
            		objName:"lbl-it-desc",
            		textAlign:"left",
            		text:m_data.articles[cellIndex].desc,
            		touchEnabled:false
        		});
        		
        		
        		thisView.add(thisLabel);
        		thisView.add(thisLabelDescription);
        		thisRow.add(thisView);
        		cellIndex++;
        		dataIndex++;
       	 		colorSetIndex++;
        		purchase_data.push(thisLabel);
 
        		if( colorSetIndex === colorSet.length ){
            		colorSetIndex = 0;
       			}
       			
       			//Ti.API.info("dataIndex: " + dataIndex.toString() + " length : " + m_data.articles.length );
            			
    		}
    		tableData.push(thisRow);
		}
	
		// table view
		var tableview = Ti.UI.createTableView({
    		data:tableData
		});
 
 
 		// on click item, set current index of item, show description
		tableview.addEventListener("click", function(e){
    		
    		// debug info...
    		//if(e.source.objName){
        		//Ti.API.info("---> " + e.source.objName+e.source.objIndex + " was clicked!");
        		//Ti.API.info("- data --> " + m_data.articles.length + " " + m_data.articles[e.source.objIndex].id);
        		//Ti.API.info("- lbl --> " + labels[e.source.objIndex].sifra );
    		//}
			
			// selected item...
			// show info at the bottom of screen
			
			if(e.source.objName){
				
				var m_ob_desc = m_data.articles[e.source.objIndex].desc;
				var m_ob_id = m_data.articles[e.source.objIndex].id;
				
				// set current item
				currentItem = e.source.objIndex;
			
				// show item on desc label
				dv_label.text = m_ob_id + " - " + m_ob_desc;
				
			};
			
		});
 
 		// double tap - increase amount of items
		tableview.addEventListener("dblclick", function(e){
			// increase number
   			purchase_data[e.source.objIndex].text = (parseInt(purchase_data[e.source.objIndex].text) + 1).toString();
   			purchase_data[e.source.objIndex].article_quantity = parseInt(purchase_data[e.source.objIndex].text);
		});
  
  		// description view - show item properties
 		var desc_view = Ti.UI.createView({
 			top:550,
 			bottom:100,
 			backgroundColor:"black"
 		});
 
		// description view description label
		var dv_label = Ti.UI.createLabel({
			text:"kliknite na jedan od artikala",
			textAlign:"left",
			wordWrap:"auto",
			left:10,
			color:"white",
            font:{fontSize:22,fontWeight:'bold'},
            objName:"lbl-desc",
            touchEnabled:false
		});

		// controls view - button controls, plus, minus, accept
  		var controls_view = Ti.UI.createView({
 			top:600,
 			backgroundColor:"black"
 		});

		// accept button
 		var control_button = Ti.UI.createButton({
 			title:'Potvrdi',  
       		left:100,
       		right:100,    
        	height:80,  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:22}  
 		});
 	
 		// plus button
 		var control_plus_button = Ti.UI.createButton({
 			title:'+',  
       		left:3,    
        	height:80,
        	width:100,  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:48}  
 		});
 		
 		// minus button
 		var control_minus_button = Ti.UI.createButton({
 			title:'-',  
       		right:3,    
        	height:80,
        	width:100,  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:48}  
 		});
 	
 	
 		// control accept button event
 		control_button.addEventListener('click',function(e){  
    		Ti.App.fireEvent('purchaseAccept');
    		m_win.close();
    		// set global variable purchased data...
    		Ti.App.purchased_data = purchase_data;
		});
		
		// minus items events
		control_minus_button.addEventListener('click',function(e){ 
			if(parseInt(labels[currentItem].text) > 0 ){ 
    			purchase_data[currentItem].text = (parseInt(purchase_data[currentItem].text) - 1).toString();
    			purchase_data[currentItem].article_quantity = parseInt(purchase_data[currentItem].text);
    		}
		});
 		
 		// plus items events
 		control_plus_button.addEventListener('click',function(e){
    		purchase_data[currentItem].text = (parseInt(purchase_data[currentItem].text) + 1).toString();
    		purchase_data[currentItem].article_quantity = parseInt(purchase_data[currentItem].text);
		});
 
 		// add to desc view...
 		desc_view.add(dv_label);
 		
 		// add to bottom view
 		controls_view.add(control_button);
 		controls_view.add(control_minus_button);
 		controls_view.add(control_plus_button);
 	
 		// add to m_win (main window)
		m_win.add(tableview);
		m_win.add(desc_view);
		m_win.add(controls_view);
		m_win.open();
		
		
		};
	
})();
