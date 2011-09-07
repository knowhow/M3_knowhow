boCodes.Customers.customerForm = function(){
		
	var win = Ti.UI.createWindow({
		backgroundColor:"#FFFFFF",
		title:"lista narudzbi"
	});
		
	var btn = Ti.UI.createButton({
		title:"Zatvori",
		height:"auto",
		width:80,
		bottom:10
	});

	win.add(btn);

	btn.addEventListener("click", function(){
		win.close();
	});

	win.open();
};
