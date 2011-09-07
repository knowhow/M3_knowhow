(function() {
	
	// set namespace	
	boMobileAppLib.Login = {};
	
	// get username from properties
	boMobileAppLib.Login.getUserName = function() {
		var username = Ti.App.Properties.getString("login_username", "");
		return username;
	};
	
	// set username in properties
	boMobileAppLib.Login.setUserName = function( u_name ) {
		Ti.App.Properties.setString("login_username", u_name );
	};
	
	// generate login form and check user credentials
	boMobileAppLib.Login.LoginForm = function() {
		
		var _tf_width = 400;
		var _tf_height = 60;
		var login = false;
		// get defined username
		var user_name = boMobileAppLib.Login.getUserName();
		
		// create login window
		var login_window = Titanium.UI.createWindow({
    		tabBarHidden:true,
    		backgroundColor:"white",
    		title:'Prijava'
		});
		
		// create username input
		var username = Titanium.UI.createTextField({  
        	color:'#336699',  
        	top:30,  
        	left:30,  
        	width:_tf_width,  
        	height:_tf_height,  
        	hintText:'Ime',  
        	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
        	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
        	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
		});  
		
		login_window.add(username); 
		
		var password = Titanium.UI.createTextField({  
        	color:'#336699',  
        	top:100,  
        	left:30,  
        	width:_tf_width,  
        	height:_tf_height,
        	hintText:'Lozinka',  
        	passwordMask:true,  
        	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
        	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
        	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
		});  
		
		login_window.add(password);  
      
		var loginBtn = Titanium.UI.createButton({  
        	title:'Prijava',  
        	top:200,  
        	width:200,  
        	height:60,  
        	borderRadius:1,  
        	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:22}  
		});  
		
		login_window.add(loginBtn);  
		
		// if username exist, go to pwd 
		if(user_name != ''){
			username.value = user_name;
			username.blur();	
			password.focus();
		};
		
		login_window.open();
		
		// username text blur and focus to password
		username.addEventListener('return', function()
		{
			// set username
  			boMobileAppLib.Login.setUserName( username.value );
  			username.blur();
  			password.focus();
		});
		
		// password text blur and focus on button
		password.addEventListener('return', function()
		{
  			password.blur();
  			loginBtn.focus();
		});
		
		login_window.addEventListener('focus', function() {
    		if(user_name != ''){
				username.blur();	
				password.focus();
			};
		});
				
		loginBtn.addEventListener('click',function(e){  
    		
    		if (username.value != '' && password.value != ''){  
        		
        		var loginJSON = boMobileAppLib.db.getLoginData();
        
        		for(var i=0; i < loginJSON.userdata.length; i++){
    	    
    	   			if ( loginJSON.userdata[i].name == username.value && loginJSON.userdata[i].pwd == password.value) { 
    	   				Ti.App.fireEvent('loggedin');
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
		
	};
		    
})();
