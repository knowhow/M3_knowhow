(function(){
	
	boCodes.Matrix = {};
	
	boCodes.Matrix.getMatrix = function( m_data, m_title ) {
		
		var m_win = Ti.UI.createWindow({
			backgroundColor:"white",
			title:m_title
		});
		
		var cellWidth = 130;
		var cellHeight = 130;
		var xSpacer = 10;
		var ySpacer = 10;
		var xGrid = 4;
		var yGrid = 3;
 
		var tableData = [];
		var labels = [];

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
		var dataIndex = 0;
 
		for (var y=0; y<yGrid; y++){
    		
    		if (dataIndex > m_data.length){
    			break;
    		};
    		
    		var thisRow = Ti.UI.createTableViewRow({
        			className: "grid",
        			layout: "horizontal",
        			height: cellHeight+(2*ySpacer),
        			selectedBackgroundColor:"red"
    		});
    		
    		for (var x=0; x<xGrid; x++){
        		
        		var thisView = Ti.UI.createView({
            		objName:"grid-art-view",
            		//backgroundImage: //m_data[cellIndex.toString()].pict,
            		objIndex:cellIndex.toString(),
            		backgroundColor: colorSet[colorSetIndex],
            		left: ySpacer,
            		height: cellHeight,
            		width: cellWidth
       		});
 
        	var thisLabel = Ti.UI.createLabel({
            	color:"black",
            	font:{fontSize:48,fontWeight:'bold'},
            	objIndex:cellIndex.toString(),
            	objName:"lbl",
            	text:"0",
            	sifra:cellIndex.toString(),
            	touchEnabled:false
        	});
        
        	thisView.add(thisLabel);
        	thisRow.add(thisView);
        	cellIndex++;
        	dataIndex++;
       	 	colorSetIndex++;
        	labels.push(thisLabel);
 
        	if( colorSetIndex === colorSet.length ){
            	colorSetIndex = 0;
       		 }
    	}
    	tableData.push(thisRow);
	}
	
	var tableview = Ti.UI.createTableView({
    	data:tableData
	});
 
	tableview.addEventListener("click", function(e){
    	if(e.source.objName){
        	Ti.API.info("---> " + e.source.objName+e.source.objIndex + " was clicked!");
        	Ti.API.info("- data --> " + m_data.length + " " + m_data[1].id);
        	Ti.API.info("- lbl --> " + labels[e.source.objIndex].sifra );
    	}
	});
 
	tableview.addEventListener("dblclick", function(e){
    	//alert( labels[e.source.objIndex].objName+labels[e.source.objIndex].objIndex );
   		labels[e.source.objIndex].text = (parseInt(labels[e.source.objIndex].text) + 1).toString();
	});
 
 	var bottom_view = Ti.UI.createView({
 		top:500,
 		backgroundColor:"black"
 	});
 
 	var bv_button = Ti.UI.createButton({
 		title:'Potvrdi',  
        left:3,
        right:3,    
        height:80,  
        borderRadius:1,  
        font:{fontFamily:'Arial',fontWeight:'bold',fontSize:22}  
 	});
 	
 	bv_button.addEventListener('click',function(e){  
    		m_win.close();
    		return labels;
	});
 
 	bottom_view.add(bv_button);
 	
	m_win.add(tableview);
	m_win.add(bottom_view);
	m_win.open();
		
	};
	
})();
