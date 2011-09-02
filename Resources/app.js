Titanium.UI.setBackgroundColor('#000');

var boMobileAppLib = {};

Ti.include("UI/login.js","db/dbmain.js");

var main_window = Titanium.UI.createWindow({
		backgroundColor:"green",
		title:"main window"
	});

// open login form
boMobileAppLib.Login.LoginForm();

// listen to login events... 
Ti.App.addEventListener('loggedout',function(){
    // if fail, try again
    boMobileAppLib.Login.LoginForm();
});

// listen to login events
Ti.App.addEventListener('loggedin',function(){
    // go to main form
    main_window.open();
});
