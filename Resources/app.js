// Set's the background color

Titanium.UI.setBackgroundColor('#000');

// include lib 
Ti.include("lib.js");

// Get params for application
boParams.getParams();

// open main database and init as oDb object
oDb = boDb.openDB();

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
    mainWindow();
});

// listen to logincanceled events
Ti.App.addEventListener('logincanceled',function(){
    // go to main form
	
});


Ti.App.addEventListener('close',function(e)
{
    if ( oDb ) {
        oDb.close();
    }
});

