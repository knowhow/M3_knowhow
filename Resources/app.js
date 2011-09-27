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

// Set's the background color

Titanium.UI.setBackgroundColor('#000');

// include lib 
Ti.include("lib.js");

// current user parameters
Ti.App.current_logged_user = "";
Ti.App.current_logged_user_id = 0;

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

