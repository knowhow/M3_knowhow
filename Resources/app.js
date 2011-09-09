Titanium.UI.setBackgroundColor('#000');

// global variables
Ti.App.current_logged_user = "";

// include lib 
Ti.include("lib.js");

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
    boPurchase.mainWindow();
});
