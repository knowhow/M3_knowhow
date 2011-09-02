(function() {
	
	// set namespace	
	boMobileAppLib.Login = {};
	
	// generate login form and check user credentials
	boMobileAppLib.Login.LoginForm = function() {
		
		var _tf_width = 400;
		var _tf_height = 60;
		var login = false;
		
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
		login_window.open();
				
		loginBtn.addEventListener('click',function(e){  
    		
    		if (username.value != '' && password.value != ''){  
        		
        		var login_json_str = boMobileAppLib.db.getLoginData();
        		var loginJSON = JSON.parse( login_json_str );
        
        		for(var i=0; i < loginJSON.length; i++){
    	    
    	   			if ( loginJSON[i].name == username.value && loginJSON[i].pwd == password.value) { 
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
