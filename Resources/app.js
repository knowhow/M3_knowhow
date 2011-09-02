Titanium.UI.setBackgroundColor('#000');

// include lib 
Ti.include("lib.js","UI/main_window.js","UI/codes.js","UI/codes_matrix.js");

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
