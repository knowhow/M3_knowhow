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
		
	var login = false;
	// get defined username
	var user_name = boMobileAppLib.Login.getUserName();
		
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
        value:"vsasa",  
        height:'11%',  
        hintText:'...korisničko ime',  
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
        value:"11", 
        height:'11%',
        hintText:'...lozinka',  
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
		
	// when open window go to pwd if username allready exist!
	login_window.addEventListener('open', function() {
    	if(user_name != ''){
			username.blur();	
			password.focus();
		};
	});
	
	closeBtn.addEventListener('click',function(){  
   		login_window.close();
   	});
	
				
	loginBtn.addEventListener('click',function(e){  
    		
    	if (username.value != '' && password.value != ''){  
        		
        	var loginJSON = boCodes.Users.getUsersData();
        
        	for(var i=0; i < loginJSON.userdata.length; i++){
    	    
    	   		if ( loginJSON.userdata[i].name == username.value && loginJSON.userdata[i].pwd == password.value) { 
    	   				
    	   			Ti.App.fireEvent('loggedin');
    	   			// set global variable...
    	   			Ti.App.current_logged_user = username.value;
    	   			Ti.App.current_logged_user_id = Number(loginJSON.userdata[i].id);
    	   			
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
		    
