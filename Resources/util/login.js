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

// ## Login module

// Set the global namespace for this module	
M3.Login = {};


// Show's the main login form and check user credentials
M3.Login.loginForm = function() {
		
	// init variables
	var login = false;
	var _user_name = "";
	
	// get users data into 'login_data' JSON object
	var login_data = M3.Codes.Users.getUsersData();
	
	// check if last logged user is saved, so use this name on login form
	if( Ti.App.Properties.hasProperty("par_last_logged_user") ) {
    	_user_name = Ti.App.Properties.getString("par_last_logged_user");
	};
		
	// create window
	var login_window = Ti.UI.createWindow({
   		backgroundColor:"white",
   		title:'Prijava'
	});
		
	// lable username
	var l_username = Ti.UI.createLabel({
		color:'gray',
		text:'Korisničko ime:',
		left:'5%',
		top:'2%'
	});
		
	// create username textField
	var username = Ti.UI.createTextField({  
       	color:'#336699',  
        top:'8%',  
        left:'5%',
        right:'5%',
        height:'11%',  
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,  
        returnKeyType:Ti.UI.RETURNKEY_DEFAULT,  
        borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  
		
	// add controls to 'login_window'
	login_window.add(l_username);
	login_window.add(username); 

	// label password
	var l_password = Ti.UI.createLabel({
		color:'gray',
		text:'Lozinka:',
		left:'5%',
		top:'20%'
	});

	// create password textField
	// this field has passwordMask = true
	var password = Ti.UI.createTextField({  
        color:'#336699',  
        top:'25%',  
        left:'5%',
        right:'5%', 
        height:'11%',
        passwordMask:true,  
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  
	
	// add controls to 'login_window'
	login_window.add(l_password);  
	login_window.add(password);  
      
    // create button 'Login'
	var loginBtn = Titanium.UI.createButton({  
        title:'Prijava',  
        top:'40%',  
        width:'40%',  
        height:'10%',
        right:'5%',  
        borderRadius:1,  
        font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
	});  

	// create button 'cancel'
	var closeBtn = Titanium.UI.createButton({  
        title:'Odustani',  
        top:'40%',  
        width:'40%',  
        height:'10%',
        left:'5%',  
        borderRadius:1,  
        font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
	});  

	// add button's to 'login_window'
	login_window.add(loginBtn);  
	login_window.add(closeBtn);  


	// create view component with version information
	var v_version = Ti.UI.createView({
		backgroundColor:'#60a0ff',
		top:'83%',
		left:'5%',
		right:'5%',
		height:'15%',
		borderColor:'blue',
		borderWidth:1,
		borderRadius:10
	});
	
	// create label version info
	var l_version = Ti.UI.createLabel({
		color:'white',
		text:'Verzija: ' + Ti.App.version + ', © www.bring.out.ba' + M3.Util.Str.newRow() + Ti.App.current_device_id + '/' + Ti.App.current_device_maddr,
		left:'5%',
		top:'20%',
		font:{fontSize:'6pt',fontWeight:'bold'},
		opacity:0.2
	});

	// add label to view component
	v_version.add(l_version);
	
	// add view to the 'login_window'
	login_window.add(v_version);
	
	// if username exist just go to pwd 
	if( _user_name != '' ){
		username.value = _user_name;
		username.blur();	
		password.focus();
	};
		
	// open's the login form window
	login_window.open();
		
	// username text blur and focus to password
	username.addEventListener('return', function()
	{
  		username.blur();
  		password.focus();
  		
	});
		
	// password text blur and focus on button
	password.addEventListener('return', function()
	{
  		password.blur();
  		loginBtn.focus();
	});
		
	// when open window go to pwd if username allready exist!
	login_window.addEventListener('open', function() {
    	if(_user_name != ''){
			username.blur();	
			password.focus();
		};
	});
	
	// close button event listener
	// it fire's event 'logincanceled'
	closeBtn.addEventListener('click',function(){  
   		login_window.close();
   		Ti.App.fireEvent('logincanceled');
   	});
	
				
	// button 'Login' eventListener
	loginBtn.addEventListener('click',function(e){  
    		
    	// check for blank values
    	if (username.value != '' && password.value != ''){  
        
        	// loop through 'login_data' and check for right username & pwd combination
        	for(var i=0; i < login_data.length; i++){
    	    
    	   		if ( login_data[i].name == username.value && login_data[i].pwd == password.value) { 
    	   				
    	   			// fireup event 'loggedin' because I found the right record
    	   			Ti.App.fireEvent('loggedin');
    	   			
    	   			// set global variables...
    	   			Ti.App.current_logged_user = username.value;
    	   			Ti.App.current_logged_user_id = Number(login_data[i].id);
    	   			Ti.App.Properties.setString("par_last_logged_user", username.value );
    	   			
    	   			// close keyboard if it's up
    	   			username.blur();
    	   			password.blur();
    	   			
    	   			return;
    	   			
    	   		};
    		};
    		
    		alert("Ime i lozinka nisu ispravni!");    	
    		// fireup event 'loggedout' because I can't find right record in 'login_data'
    		Ti.App.fireEvent('loggedout');
    		
    		return;
    	}  
    	else  
    	{  
        	alert("Polje ime i lozinka moraju biti popunjeni!");  
        	// fields are blank
        	Ti.App.fireEvent('loggedout');
        	return;
    	}  
	}); 
	
	// check count of users data in table 'users'
	var u_cnt = M3.DB.getUsersCount();
	
	// if there is no data in table 'users' we must synchronize data with server
	if ( u_cnt == 0 ) {
		
		// open's init form
		var u_init = M3.Remote.formUsersInit();
		// listen for event close
		u_init.addEventListener("close", function(){
			// when form close's fill 'login_data' with users from table again
			login_data = M3.Codes.Users.getUsersData();
		});
	}; 	
		
};
		    
