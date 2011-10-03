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

//## Main params module

// Set's the main namespace for params module
M3.Params = {};

// Get params function
M3.Params.getParams = function() {
	
	// global params read from Ti.App.Properties
	Ti.App.par_server_url = Ti.App.Properties.getString("par_server_url");
	Ti.App.par_default_radius = Ti.App.Properties.getDouble('par_default_radius');
	Ti.App.par_use_radius = Ti.App.Properties.getString('par_use_gps');
	
	// Global params read from API call's
	Ti.App.current_device_id = Ti.Platform.id;
	Ti.App.current_device_maddr = Ti.Platform.macaddress;
	Ti.App.current_images_dir = Ti.Filesystem.applicationDataDirectory;
	
};


// Set params function
M3.Params.setParams = function() {
	
	var par_data = boDb.getParamsData();
	var _par_name;
	var _par_value;
	
	// Set's the parameters from table 'params'
	// Loop through params data and read params
	for (var i=0; i < par_data.length; i++) {
		
		_par_name = par_data[i].param_name;
		_par_value = par_data[i].param_value;
		
		// Check param name and set
		switch (_par_name)
		{
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
	
	// Set's the global parameters
	Ti.App.Properties.setString("par_server_url", Ti.App.par_server_url );
	
};


// Param's form
// Open's the form and show available params
M3.Params.paramsForm = function() {
		
	// Create window
	var s_win = Ti.UI.createWindow({
		title:'Postavke...',
		backgroundColor:'black',
		top:0,
		bottom:0
	});

	// Create scroll component
	var scrl = Ti.UI.createScrollView({
		top:'7%',
		bottom:'10%'
	});
	
	// Create label info 
	var lbl_info = Ti.UI.createLabel({
		color:'white',
		text:'Trenutne postavke aplikacije',
		left:'4%',
		top:'3%',
		font:{fontSize:'7pt'}
	});
	
	// Create label params
	// Into this label we put the info about params setting the text value of label
	var lbl_params = Ti.UI.createLabel({
		color:'white',
		text:'-',
		left:'7%',
		width:'100%',
		top:'10%',
		font:{fontSize:'6pt'}
	});
	
	// Create button close
	var btn_close = Ti.UI.createButton({
		title:'Odustani',
		bottom:'1%',
		left:'2%',
		width:'35%',
		height:'10%'
	});	
	
	// Get params from db
	var par_data = boDb.getParamsData();
	var _txt = ""; 
	
	// loop through params and set into the '_txt'
	for (var i=0; i < par_data.length; i++) {
		_txt += 'Ti.App.' + par_data[i].param_name + ' : ' + par_data[i].param_value + M3.Util.Str.newRow();
	};
	
	// set's the label text with result's from db
	lbl_params.text = _txt;
	
	// add controls to window 's_win'
	scrl.add(lbl_params);
	s_win.add(lbl_info);
	s_win.add(scrl);
	s_win.add(btn_close);
	
	// Button 'close' eventListener
	btn_close.addEventListener("click", function(){
		s_win.close();
	});
	
	// open 's_win' window
	s_win.open();
	
	// return 's_win' for listening event 'close'
	return s_win;
	
};
