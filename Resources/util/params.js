var boParams = {};


boParams.getParams = function() {
	
	// **global variables**
	Ti.App.current_logged_user = "";
	Ti.App.current_logged_user_id = 0;
	Ti.App.current_device_id = 0;
	Ti.App.current_device_id = Ti.Platform.id;
	Ti.App.current_device_maddr = Ti.Platform.macaddress;
	Ti.App.current_images_dir = Ti.Filesystem.applicationDataDirectory;
	
	Ti.App.current_server_url = Ti.App.Properties.getString("current_server_url");
	
};


boParams.setParams = function() {
	
	Ti.App.Properties.setString("current_server_url", Ti.App.current_server_url );

};

// open params form
boParams.paramsForm = function() {
		
	// create window
	var s_win = Ti.UI.createWindow({
		title:'Postavke...',
		backgroundColor:'black',
		top:0,
		bottom:0
	});

	var scrl = Ti.UI.createScrollView({
		top:'7%',
		bottom:'10%'
	});
	// create label info 
	var lbl_info = Ti.UI.createLabel({
		color:'white',
		text:'Trenutne postavke aplikacije',
		left:'4%',
		top:'3%',
		font:{fontSize:'7pt'}
	});
	
	// create label params
	var lbl_params = Ti.UI.createLabel({
		color:'white',
		text:'-',
		left:'10%',
		top:'10%',
		font:{fontSize:'6pt'}
	});
	
	// create btn init...
	var btn_close = Ti.UI.createButton({
		title:'Odustani',
		bottom:'1%',
		left:'2%',
		width:'35%',
		height:'10%'
	});	
	
	lbl_params.text = "par 1: 11111111111" + boUtil.str.newRow(2) + "par 2: 2222222222222" + boUtil.str.newRow(2) + "par 3: 3333333333333" + boUtil.str.newRow(2);
	
	// add controls to window 's_win'
	scrl.add(lbl_params);
	
	s_win.add(lbl_info);
	s_win.add(scrl);
	s_win.add(btn_close);
	
	// cancel 
	btn_close.addEventListener("click", function(){
		s_win.close();
	});
	
	// open 's_win' window
	s_win.open();
	
	// return 's_win' for listening event 'close'
	return s_win;
	
	
};
