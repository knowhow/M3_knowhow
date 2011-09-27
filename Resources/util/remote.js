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

// Main remote methode's. Here are the logic of http request's, send's, etc...

// This is the unique namespace for remote method's
var boRemote = {};

// Adding synchro into namespace...
boRemote.get = {};
boRemote.put = {};


// open initialization form
boRemote.formInit = function() {
	
	// create window
	var s_win = Ti.UI.createWindow({
		title:'Inicijalizacija...',
		backgroundColor:'black',
		top:0,
		bottom:0
	});

	// create label server 
	var lbl_server = Ti.UI.createLabel({
		color:'white',
		text:'nije podešeno...',
		left:'25%',
		top:'3%',
		font:{fontSize:'6pt'}
	});
	
	// create btn set server
	var btn_set_server = Ti.UI.createButton({
		title:'Server',
		top:'2%',
		left:'2%',
		width:'23%',
		height:'10%'
	});

	// create btn init...
	var btn_init = Ti.UI.createButton({
		title:'Uzmi podatke',
		top:'12%',
		left:'2%',
		width:'40%',
		height:'10%'
	});
	
	// create label info 
	var lbl_info = Ti.UI.createLabel({
		color:'white',
		text:'Rezultati inicijalizacije:',
		left:'4%',
		top:'22%',
		font:{fontSize:'7pt'}
	});
		
	// create label info 
	var lbl_i_params = Ti.UI.createLabel({
		text:"-",
		color:'white',
		left:'7%',
		top:'28%',
		font:{fontSize:'7pt'}
	});
	
	// create label info 
	var lbl_i_articles = Ti.UI.createLabel({
		text:"-",
		color:'white',
		left:'7%',
		top:'33%',
		font:{fontSize:'7pt'}
	});

	// create label info 
	var lbl_i_images = Ti.UI.createLabel({
		text:"-",
		color:'white',
		left:'7%',
		top:'38%',
		font:{fontSize:'7pt'}
	});	

	// create label customers 
	var lbl_i_cust = Ti.UI.createLabel({
		text:"-",
		color:'white',
		left:'7%',
		top:'43%',
		font:{fontSize:'7pt'}
	});	
	
	// create label customers 
	var lbl_i_users = Ti.UI.createLabel({
		text:"-",
		color:'white',
		left:'7%',
		top:'48%',
		font:{fontSize:'7pt'}
	});	

	
	// create btn init...
	var btn_save = Ti.UI.createButton({
		title:'Snimi',
		bottom:'1%',
		right:'2%',
		width:'35%',
		height:'10%'
	});	

	// create btn init...
	var btn_cancel = Ti.UI.createButton({
		title:'Odustani',
		bottom:'1%',
		left:'2%',
		width:'35%',
		height:'10%'
	});	
	
	// read global variables and set to lables...
	if(Ti.App.par_server_url != undefined && Ti.App.par_server_url != null && Ti.App.par_server_url != ""){
		lbl_server.text = Ti.App.par_server_url;
	};
	
	// add controls to window 's_win'
	s_win.add(lbl_server);
	s_win.add(btn_set_server);
	s_win.add(lbl_info);
	s_win.add(lbl_i_articles);
	s_win.add(lbl_i_params);
	s_win.add(lbl_i_images);
	s_win.add(lbl_i_cust);
	s_win.add(lbl_i_users);
	s_win.add(btn_init);
	s_win.add(btn_save);
	s_win.add(btn_cancel);
	
	// event listeners of 's_win' controls
	
	// btn_set_server listener
	btn_set_server.addEventListener("click", function(){
		var tmp_frm = boUtilForms.getStrValue();
		tmp_frm.addEventListener("close", function(){
			lbl_server.text = tmp_frm.item_value;
			Ti.App.par_server_url = tmp_frm.item_value;
			Ti.App.Properties.setString("par_server_url", tmp_frm.item_value);
		});
	});
	
	// btn_init listener
	btn_init.addEventListener("click", function(){
		
		// synchronize articles
		boRemote.get.synhroArticles();
		
		Ti.App.addEventListener("articlesSynchronized", function(e){
			
			if(e.result == 0){
				lbl_i_articles.text = "- artikli : nije uspjelo !!!";
				return;
			};
			
			// set label value
			lbl_i_articles.text = "- artikli init ok -> " + e.count;
		
			// run synchronize of the images
			boRemote.get.synhroArticleImages();
			
			var images_cnt = 0;
		
			// listen for event save image
			Ti.App.addEventListener("articlesImageSaved", function(e){
				
				images_cnt = images_cnt + e.count;
				
				lbl_i_images.text = "- download slika -> " + images_cnt.toString();
			
			});
			
		});
		
		
		// synchronize params
		boRemote.get.synhroParams();
		Ti.App.addEventListener("paramsSynchronized", function(e){
			if(e.result == 0){
				lbl_i_params.text = "- parametri: nije uspjelo !!!";
				return;
			};
			
			// set label value
			lbl_i_params.text = "- parametri init ok -> " + e.count;
		});	
		
		// synchronize customers
		boRemote.get.synhroCustomers();
		Ti.App.addEventListener("customersSynchronized", function(e){
			if(e.result == 0){
				lbl_i_cust.text = "- partneri: nije uspjelo !!!";
				return;
			};
			
			// set label value
			lbl_i_cust.text = "- partneri init ok -> " + e.count;
		});
		
		// synchronize customers
		boRemote.get.synhroUsers();
		Ti.App.addEventListener("usersSynchronized", function(e){
			if(e.result == 0){
				lbl_i_users.text = "- users: nije uspjelo !!!";
				return;
			};
			
			// set label value
			lbl_i_users.text = "- users init ok -> " + e.count;
		});
		
		
	});
	
	// set params
	btn_save.addEventListener("click", function(){
		boParams.setParams();
		s_win.close();
	});
	
	// cancel 
	btn_cancel.addEventListener("click", function(){
		s_win.close();
	});
	
	// open 's_win' window
	s_win.open();
	
	// return 's_win' for listening event 'close'
	return s_win;
	
};


// open initialization form
boRemote.formUsersInit = function() {
	
	// create window
	var s_win = Ti.UI.createWindow({
		title:'Inicijalizacija...',
		backgroundColor:'black',
		top:0,
		bottom:0
	});

	// create label server 
	var lbl_server = Ti.UI.createLabel({
		color:'white',
		text:'nije podešeno...',
		left:'25%',
		top:'3%',
		font:{fontSize:'6pt'}
	});
	
	// create btn set server
	var btn_set_server = Ti.UI.createButton({
		title:'Server',
		top:'2%',
		left:'2%',
		width:'23%',
		height:'10%'
	});

	// create btn init...
	var btn_init = Ti.UI.createButton({
		title:'Uzmi podatke',
		top:'12%',
		left:'2%',
		width:'40%',
		height:'10%'
	});
	
	// create label info 
	var lbl_info = Ti.UI.createLabel({
		color:'white',
		text:'Rezultati inicijalizacije:',
		left:'4%',
		top:'22%',
		font:{fontSize:'7pt'}
	});
			
	// create label customers 
	var lbl_i_users = Ti.UI.createLabel({
		text:"-",
		color:'white',
		left:'7%',
		top:'27%',
		font:{fontSize:'7pt'}
	});	

	
	// create btn init...
	var btn_save = Ti.UI.createButton({
		title:'Snimi',
		bottom:'1%',
		right:'2%',
		width:'35%',
		height:'10%'
	});	

	// create btn init...
	var btn_cancel = Ti.UI.createButton({
		title:'Odustani',
		bottom:'1%',
		left:'2%',
		width:'35%',
		height:'10%'
	});	
	
	// read global variables and set to lables...
	if(Ti.App.par_server_url != undefined && Ti.App.par_server_url != null && Ti.App.par_server_url != ""){
		lbl_server.text = Ti.App.par_server_url;
	};
	
	// add controls to window 's_win'
	s_win.add(lbl_server);
	s_win.add(btn_set_server);
	s_win.add(lbl_info);
	s_win.add(lbl_i_users);
	s_win.add(btn_init);
	s_win.add(btn_save);
	s_win.add(btn_cancel);
	
	// event listeners of 's_win' controls
	
	// btn_set_server listener
	btn_set_server.addEventListener("click", function(){
		var tmp_frm = boUtilForms.getStrValue();
		tmp_frm.addEventListener("close", function(){
			lbl_server.text = tmp_frm.item_value;
			Ti.App.par_server_url = tmp_frm.item_value;
			Ti.App.Properties.setString("par_server_url", tmp_frm.item_value);
		});
	});
	
	// btn_init listener
	btn_init.addEventListener("click", function(){
		
		// synchronize users
		boRemote.get.synhroUsers();
		Ti.App.addEventListener("usersSynchronized", function(e){
			if(e.result == 0){
				lbl_i_users.text = "- users: nije uspjelo !!!";
				return;
			};
			
			// set label value
			lbl_i_users.text = "- users init ok -> " + e.count;
		});
		
	});
	
	// set params
	btn_save.addEventListener("click", function(){
		boParams.setParams();
		s_win.close();
	});
	
	// cancel 
	btn_cancel.addEventListener("click", function(){
		s_win.close();
	});
	
	// open 's_win' window
	s_win.open();
	
	// return 's_win' for listening event 'close'
	return s_win;
	
};



// Synchronize users, main function 
boRemote.get.synhroUsers = function() {
	
	var data;
	var server_url = Ti.App.par_server_url;
	// url to send request
	var url = server_url + '/users';
	
	// create http client
	var xhr = Ti.Network.createHTTPClient();
		
	xhr.onload = function()
	{	
		// retrieve data into JSON object	
 		data = JSON.parse(this.responseText);	
		
		if(data != null){

			// remove all articles from db
			boDb.deleteUsers();
		
			// insert data into db
			boDb.insertIntoUsers(data);
		
			// check for data inserted with server data
			var cnt = boDb.getUsersCount();
		
			// DEBUG msg
			if( cnt == data.length ){
				// fire event and run 'boRemote.synchro.synhroArticleImages()'
				Ti.App.fireEvent("usersSynchronized", { result:1, count:cnt.toString() });
			}
			else
			{
				Ti.App.fireEvent("usersSynchronized", { result:0, count:0 });
			};						
		};
   	};
		
	xhr.open('GET', url);
	xhr.send();

};


// Synchronize customers, main function 
boRemote.put.synhroCustomers = function() {
	
	var data = boCodes.Customers.getCustomers();
	var server_url = Ti.App.par_server_url;
	// url to send request
	var url = server_url + '/customers/update';
	
	alert(url);
	// create http client
	var xhr = Ti.Network.createHTTPClient();
		
	xhr.onload = function()
	{	
		Ti.App.info(this.readyState);
    	Ti.App.info(this.responseText);
   	};
		
	//xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
	xhr.open('POST', url);
	xhr.send(data);

};


// Synchronize customers, main function 
boRemote.get.synhroCustomers = function() {
	
	var data;
	var server_url = Ti.App.par_server_url;
	// url to send request
	var url = server_url + '/customers';
	
	// create http client
	var xhr = Ti.Network.createHTTPClient();
		
	xhr.onload = function()
	{	
		// retrieve data into JSON object	
 		data = JSON.parse(this.responseText);	
		
		if(data != null){

			// remove all articles from db
			boDb.deleteCustomers();
		
			// insert data into db
			boDb.insertIntoCustomers(data);
		
			// check for data inserted with server data
			var cnt = boDb.getCustomersCount();
		
			// DEBUG msg
			if( cnt == data.length ){
				// fire event and run 'boRemote.synchro.synhroArticleImages()'
				Ti.App.fireEvent("customersSynchronized", { result:1, count:cnt.toString() });
			}
			else
			{
				Ti.App.fireEvent("customersSynchronized", { result:0, count:0 });
			};						
		};
   	};
		
	xhr.open('GET', url);
	xhr.send();

};


// Synchronize customers, main function 
boRemote.get.synhroParams = function() {
	
	var data;
	var server_url = Ti.App.par_server_url;
	// url to send request
	var url = server_url + '/params/1';
	
	// create http client
	var xhr = Ti.Network.createHTTPClient();
		
	xhr.onload = function()
	{	
		// retrieve data into JSON object	
 		data = JSON.parse(this.responseText);	
		
		if(data != null){

			// remove all articles from db
			boDb.deleteParams();
		
			// insert data into db
			boDb.insertIntoParams(data);
		
			// check for data inserted with server data
			var cnt = boDb.getParamsCount();
		
			// DEBUG msg
			if( cnt == data.length ){
				// fire event and run 'boRemote.synchro.synhroArticleImages()'
				Ti.App.fireEvent("paramsSynchronized", { result:1, count:cnt.toString() });
			}
			else
			{
				Ti.App.fireEvent("paramsSynchronized", { result:0, count:0 });
			};						
		};
   	};
		
	xhr.open('GET', url);
	xhr.send();

};


// Synchronize articles, main function 
boRemote.get.synhroArticles = function() {
	
	var data;
	var server_url = Ti.App.par_server_url;
	// url to send request
	var url = server_url + '/articles';
	
	// create http client
	var xhr = Ti.Network.createHTTPClient();
		
	xhr.onload = function()
	{	
		// retrieve data into JSON object	
 		data = JSON.parse(this.responseText);	
		
		if(data != null){

			// remove all articles from db
			boDb.deleteArticles();
		
			// insert data into db
			boDb.insertIntoArticles(data);
		
			// check for data inserted with server data
			var cnt = boDb.getArticleCount();
		
			// DEBUG msg
			if( cnt == data.length ){
				// fire event and run 'boRemote.synchro.synhroArticleImages()'
				Ti.App.fireEvent("articlesSynchronized", { result:1, count:cnt.toString() });
			}
			else
			{
				Ti.App.fireEvent("articlesSynchronized", { result:0, count:0 });
			};						
		};
   	};
		
	xhr.open('GET', url);
	xhr.send();

};


// Synchronize images from http server...
boRemote.get.synhroArticleImages = function() {
	
	// Get article JSON
	var art_data = boCodes.Articles.getArticles();
	
	var server_url = Ti.App.par_server_url;
	// per example: http://localhost:3333/article_pict/3013
	var _url = server_url + '/article_image/';
	var _srv_url;
	var _id;
	
	// Simply loop through the article data
	for (var i=0; i < art_data.length; i++) {

		// { _id }
		// This will be an article id variable
		_id = art_data[i].id;
	
		// { _srv_url } 
		// This will be a complete server url for creating http server and get request
		_srv_url = _url + _id;	  
		
		// save image to local storage of the phone
		boRemote.synchro.saveImageToDevice( _id, _srv_url );
	};
			
};


// Get image from http server and update into local table "articles"
boRemote.get.saveImageIntoTable = function( _article_id, _url ) {

	// Create http server
	var xhr = Ti.Network.createHTTPClient();
	var data;
	
	xhr.onload = function()
	{		
 		// Retrieve data from http server
 		data = this.responseData;
 			
 		// Debug info
 		//Ti.API.info("->" + _article_id + " data: " + Ti.Utils.base64encode(data));
 			
 		if (data != null) {
 			// Update data into blob field of local table "articles"
 			boDb.updateArticleImage( _article_id, data ); 
 		};
 			   	
   	};
		
	xhr.open('GET', _url);
	xhr.send();	
	
};


// Get image from http server and save to local storage of android device
boRemote.get.saveImageToDevice = function( _article_id, _url ) {

	// Create http server
	var xhr = Ti.Network.createHTTPClient();
	var data;
	
	xhr.onload = function()
	{		
 		// Retrieve data from http server
 		data = this.responseData;
 					
 		if (data != null) {
 		
 			var s_file = Ti.Filesystem.getFile(Ti.App.current_images_dir, _article_id + '.jpg');
 			
 			// Create file only if not exist
 			if(!s_file.exist){
 				s_file.write(data);
 				Ti.App.fireEvent("articlesImageSaved", { result: 1, count: 1 });
 			};
 			
 			// debug info
 			//Ti.API.info("->" + _article_id + " data: " + data + " size: " + s_file.size );
  
 		};					
   	};
		
	xhr.open('GET', _url);
	xhr.send();	
	
};
