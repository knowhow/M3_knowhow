// set namespace	
boMobileAppLib.Login = {};
	
// generate login form and check user credentials
boMobileAppLib.Login.LoginForm = function() {
		
	var login = false;
	// get defined username
	var _user_name = "";
	var login_data = boCodes.Users.getUsersData();
	
	if( Ti.App.Properties.hasProperty( "lastLoggedUser") ) {
    	_user_name = Ti.App.Properties.getString("lastLoggedUser");
	};
		
	// create login window
	var login_window = Ti.UI.createWindow({
   		//tabBarHidden:true,
   		backgroundColor:"white",
   		title:'Prijava'
	});
		
	var l_username = Ti.UI.createLabel({
		color:'gray',
		text:'Korisničko ime:',
		left:'5%',
		top:'2%'
	});
		
	// create username input
	var username = Ti.UI.createTextField({  
       	color:'#336699',  
        top:'8%',  
        left:'5%',
        right:'5%',
        //value:"vsasa",  
        height:'11%',  
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,  
        returnKeyType:Ti.UI.RETURNKEY_DEFAULT,  
        borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  
		
	login_window.add(l_username);
	login_window.add(username); 

	var l_password = Ti.UI.createLabel({
		color:'gray',
		text:'Lozinka:',
		left:'5%',
		top:'20%'
	});

		
	var password = Ti.UI.createTextField({  
        color:'#336699',  
        top:'25%',  
        left:'5%',
        right:'5%', 
        //value:"11", 
        height:'11%',
        passwordMask:true,  
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  
		
	login_window.add(l_password);  
	login_window.add(password);  
      
	var loginBtn = Titanium.UI.createButton({  
        title:'Prijava',  
        top:'40%',  
        width:'40%',  
        height:'10%',
        right:'5%',  
        borderRadius:1,  
        font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
	});  

	var closeBtn = Titanium.UI.createButton({  
        title:'Odustani',  
        top:'40%',  
        width:'40%',  
        height:'10%',
        left:'5%',  
        borderRadius:1,  
        font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'8pt'}  
	});  

	login_window.add(loginBtn);  
	login_window.add(closeBtn);  

	// view panel version...
	var v_version = Ti.UI.createView({
		backgroundColor:'#60a0ff',
		top:'85%',
		left:'5%',
		right:'5%',
		height:'10%',
		borderColor:'blue',
		borderWidth:1,
		borderRadius:10
	});
	
	// version info
	var l_version = Ti.UI.createLabel({
		color:'white',
		text:'Verzija: ' + Ti.App.version + ', © www.bring.out.ba',
		left:'5%',
		top:'30%',
		font:{fontSize:'6pt',fontWeight:'bold'},
		opacity:0.2
	});

	v_version.add(l_version);
	
	login_window.add(v_version);
	
	// if username exist, go to pwd 
	if( _user_name != '' ){
		username.value = _user_name;
		username.blur();	
		password.focus();
	};
		
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
	
	closeBtn.addEventListener('click',function(){  
   		login_window.close();
   		Ti.App.fireEvent('logincanceled');
   	});
	
				
	loginBtn.addEventListener('click',function(e){  
    		
    	if (username.value != '' && password.value != ''){  
        
        	for(var i=0; i < login_data.length; i++){
    	    
    	   		if ( login_data[i].name == username.value && login_data[i].pwd == password.value) { 
    	   				
    	   			Ti.App.fireEvent('loggedin');
    	   			// set global variable...
    	   			Ti.App.current_logged_user = username.value;
    	   			Ti.App.current_logged_user_id = Number(login_data[i].id);
    	   			Ti.App.Properties.setString("lastLoggedUser", username.value );
    	   			username.blur();
    	   			password.blur();
    	   			return;
    	   			
    	   		};
    		};
    		alert("Ime i lozinka nisu ispravni!");    	
    		Ti.App.fireEvent('loggedout');
    		return;
    	}  
    	else  
    	{  
        	alert("Polje ime i lozinka moraju biti popunjeni!");  
        	Ti.App.fireEvent('loggedout');
        	return;
    	}  
	}); 
	
	var u_cnt = boDb.getUsersCount();
	// check if login_data empty
	if ( u_cnt == 0 ) {
		// init users
		var u_init = boRemote.formUsersInit();
		u_init.addEventListener("close", function(){
			login_data = boCodes.Users.getUsersData();
		});
	}; 	
		
};
		    
