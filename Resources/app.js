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

// ## Starting point of application
// 
// In this module global variables are set, main db is opened and we opening Login form.
// If user enter name and pwd correctly we going to main form.


// Set's the default background color for app
Titanium.UI.setBackgroundColor('#000');

// Create main namespace. The M3 will be used for every module in app.
// 		M3.Remote
// 		M3.DB
// 		M3.Util
// 		etc...
// See other modules for examples of usage.
var M3 = {};

// Including modules.js. 
// In modules.js we call other modules and their js files.
// See `modules.js` source for details. 
Ti.include("modules.js");

// Set's the current user parameters.
// These parametes will be used in application, later.
Ti.App.current_logged_user = "";
Ti.App.current_logged_user_id = 0;

// Get global params of application. 
// See `params.js` source for details.
M3.Params.getParams();

// Open main database. 
// oDb is global object which will be used through whole app.
// There is no need to open and close db through app. Just run query commands.
oDb = M3.DB.openDB();

// Open's the main login form before of any using of app
M3.Login.loginForm();

// Listen to eventListener `loggedout`.
// When we fireup this event through the loginForm it will execute code bellow and we will bring loginForm again
Ti.App.addEventListener('loggedout',function(){
   M3.Login.loginForm();
});

// Listen for eventListener `loggedin`. 
// When we fireup this event through the loginForm it will execute code bellow and we call the mainWindow of the application.
Ti.App.addEventListener('loggedin',function(){
    M3.Main.mainWindow();
});

// ## Listen to other events
//
// Listen for eventListener `logincanceled`.
// When we fireup this event app tend to close. But, currently, this function not work correcty yet.
Ti.App.addEventListener('logincanceled',function(){
});

// listen for eventListener `close`.
// If app close, then we closes main db too.
Ti.App.addEventListener('close',function(e)
{
    if ( oDb ) {
        oDb.close();
    }
});

