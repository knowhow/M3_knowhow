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

// ## Util's module
// This module have basic routines for strings, num's, math, etc...


// Set the global namespace for this module
M3.Util = {};
	
// Crate specific namespaces
M3.Util.Num = {};
M3.Util.Str = {};
M3.Util.DateT = {};
M3.Util.MathModule = {};
	
// ## String methods

// rPad string
// * input_string - string to input
// * length - lenght for padding
// * padding_character - which character will be used for padding, default is EMPTY

M3.Util.Str.rPad = function( input_string, length, padding_character ) {
	var s = input_string;
	if(padding_character == null){
		padding_character = " ";
	};
	while(s.length < length){
		s += padding_character; 
	};
	return s;
};

// lPad string
// * input_string - string to input
// * length - lenght for padding
// * padding_character - which character will be used for padding, default is EMPTY

M3.Util.Str.lPad = function( input_string, length, padding_character ) {
	var s = input_string;
	if(padding_character == null){
		padding_character = " ";
	};
    while (s.length < length){
        s = padding_character + s;
    };
    return s;
}

// Return's new row code
// If `count` is represent, this function will generate count rows, eg: **newRow(5)** will generate five new rows.
 
M3.Util.Str.newRow = function(count){
	var s = "";
	if(count == null){
		count = 1;
	};
	for (var i=0; i < count; i++) {
	  s += "\n";
	};
	return s;
};
	

// ## Date-Time method's

// Return's current date in human readable format 
//		day.month.year
	
M3.Util.DateT.getCurrentDate = function () {
		
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
 
	return day + "." + month + "." + year;
 
};

// ## Math method's


// Get control position based on device screen proportion

M3.Util.MathModule.getControlPostitionWidth = function( percentage ) {
	// standard device proportions
	var dev_widht = Ti.Platform.displayCaps.platformWidth;
	var result = dev_widht * (percentage / 100);
	return result;
};

// Get ctrl position based on device screen proportion

M3.Util.MathModule.getControlPostitionHeight = function( percentage ) {
	// standard device proportions
	var dev_height = Ti.Platform.displayCaps.platformHeight;
	var result = dev_height * (percentage / 100);
	return result;
};


// ## Number method's

// This function check for valud numeric
M3.Util.Num.isValidNum = function(val){
	var found=0;
  	var i=0;
  	var allowedChars=".1234567890";
  
  	for (i=0;(i<val.length) && (found==0);i++) { 
    	if (allowedChars.indexOf(val.charAt(i)) == -1) { 
      	found=1;
      	alert('Greška:: vrijednost sadrži neke karaktere...');
      	return false;
    	};
  	};

  	var dotCount=0;

  	for(i=0;i<val.length;i++) {
    	if (val.charAt(i)=='.')
      		dotCount++;
  	};

  	if (dotCount >1) {
    	alert('Vrijednost sadrži više decimalnih mjesta!');
    	return false;
  	} else if(dotCount==1) {
    	// Check for max. precision <=2
    	// GetIndex of '.'
    	if ((val.length - val.indexOf('.') ) > 3) {
      		alert('Limit precision to Max. 2 chars');
      		return false;
    	};
  	};

  	return true;
};

