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

// ## Main app js file
// In this module we set global variables, open the main db.
// After that login form appear and if user logged correctly main form show's.


// Set's the default background color for app
Titanium.UI.setBackgroundColor('#000');

// Create main namespace 
var M3 = {};

// Including modules.js. In modules.js we call other js files and modules. 
Ti.include("modules.js");

// Set's the current user parameters.
// These parametes are used through application latter.
Ti.App.current_logged_user = "";
Ti.App.current_logged_user_id = 0;

// Get global params of application.
M3.Params.getParams();

// open main database and init as oDb object
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

// listen to other event's
Ti.App.addEventListener('logincanceled',function(){
    // to do
});

Ti.App.addEventListener('close',function(e)
{
    // if app close, close the db
    if ( oDb ) {
        oDb.close();
    }
});

