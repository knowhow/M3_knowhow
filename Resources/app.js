// Set's the background color

Titanium.UI.setBackgroundColor('#000');

// **global variables**
Ti.App.current_logged_user = "";
Ti.App.current_logged_user_id = 0;
Ti.App.current_device_id = 0;
Ti.App.current_device_id = Ti.Platform.id;
Ti.App.current_device_maddr = Ti.Platform.macaddress;
Ti.App.current_images_dir = Ti.Filesystem.applicationDataDirectory;

// include lib 
Ti.include("lib.js");

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

