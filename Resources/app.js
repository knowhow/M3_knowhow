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

// #### Starting point of application
// 
// In this module global variables are set, main db is opened and we opening Login form.
// If user enter name and pwd correctly we going to main form.


// Set's the default background color for app
Titanium.UI.setBackgroundColor('#000');

// Create main namespace. The M3 will be used for every module in app.
// Like M3.Remote, M3.DB, M3.Util, etc...
var M3 = {};

// Including modules.js. 
// In modules.js we call other modules and their js files.
// See *modules.js* for details. 
Ti.include("modules.js");

// Set's the current user parameters.
// These parametes will be used in application, later.
Ti.App.current_logged_user = "";
Ti.App.current_logged_user_id = 0;

// Get global params of application. 
// See *params.js* for details.
M3.Params.getParams();

// Open main database. 
// oDb is global object which will be used through whole app.
// There is no need to open and close db through app. Just run query commands.
oDb = M3.DB.openDB();

// Open's the main login form before of any using of app
M3.Login.loginForm();

// Listen to eventListener 'loggedout', if this event fire's login form open's again
Ti.App.addEventListener('loggedout',function(){
   M3.Login.loginForm();
});

// Listen for eventListener 'loggedin', if this event fire's main windos show's
Ti.App.addEventListener('loggedin',function(){
    // open's the main form of the app
    M3.Main.mainWindow();
});

// listen to other event's : to do
Ti.App.addEventListener('logincanceled',function(){
});

// listen for app close event
Ti.App.addEventListener('close',function(e)
{
    // if app close, close the db
    if ( oDb ) {
        oDb.close();
    }
});

