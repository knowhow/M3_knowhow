boCodes.Customers.customerForm = function(){
		
	var win = Ti.UI.createWindow({
		backgroundColor:"#FFFFFF"
	});
		
	var lbl = Ti.UI.createLabel({
		text:"",
		backgroundColor:"black",
		top:10
	});
		
	var btn = Ti.UI.createButton({
		title:"daj lokaciju",
		height:"auto",
		top:300
	});
		
	win.add(lbl);
	win.add(btn);

	win.open();
};
