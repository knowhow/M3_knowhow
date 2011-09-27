var boParams = {};


boParams.getParams = function() {
	
	// **global params read from params db**
	Ti.App.current_logged_user = "";
	Ti.App.current_logged_user_id = 0;
	
	Ti.App.par_server_url = Ti.App.Properties.getString("par_server_url");
	Ti.App.par_default_radius = Ti.App.Properties.getDouble('par_default_radius');
	Ti.App.par_use_radius = Ti.App.Properties.getString('par_use_gps');
	
	// global params for device
	Ti.App.current_device_id = Ti.Platform.id;
	Ti.App.current_device_maddr = Ti.Platform.macaddress;
	Ti.App.current_images_dir = Ti.Filesystem.applicationDataDirectory;
	
};


boParams.setParams = function() {
	
	var par_data = boDb.getParamsData();
	var _par_name;
	var _par_value;
	
	// check params by params_data
	for (var i=0; i < par_data.length; i++) {
		
		_par_name = par_data[i].param_name;
		_par_value = par_data[i].param_value;
		
		switch (_par_name)
		{
			// check and set params
			case 'par_default_radius':
				Ti.App.par_default_radius = Number(_par_value);
				Ti.App.Properties.setDouble('par_default_radius', Number(_par_value));
				break;
			case 'par_use_gps':
				Ti.App.par_use_radius = _par_value;
				Ti.App.Properties.setString('par_use_gps', _par_value);
				break;
		};  
	};
	
	// device params
	Ti.App.Properties.setString("par_server_url", Ti.App.par_server_url );
	
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
		left:'7%',
		width:'100%',
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
	
	var par_data = boDb.getParamsData();
	var _txt = ""; 
	
	for (var i=0; i < par_data.length; i++) {
		_txt += 'Ti.App.' + par_data[i].param_name + ' : ' + par_data[i].param_value + boUtil.str.newRow();
	};
	
	lbl_params.text = _txt;
	
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
