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

// ## Forms module
// This module is used for the templating the forms

// Create global namespace for this module
M3.StdForms = {};

// Create standard form with numeric value entry.
// This form can be used in every situation when we need input of numeric value.
// Form returns **item_value** parameter which has value of textField.
//
// Usage:
// 		var frm = M3.StdForms.getNumValue();
//      frm.addEventListener("close", function(){
// 			var my_var = frm.item_value;  
//		});
//

M3.StdForms.getNumValue = function(curr_value){
	return M3.StdForms.getValue(curr_value, 'NUM');
};

// Create standard form with string value entry.
// This form can be used in every situation when we need input of string value.
// Form returns **item_value** parameter which has value of textField.
//
// Usage:
// 		var frm = M3.StdForms.getStrValue();
//      frm.addEventListener("close", function(){
// 			var my_var = frm.item_value;  
//		});
//

M3.StdForms.getStrValue = function(curr_value){
	return M3.StdForms.getValue(curr_value, 'STR');
};

// Open's the window with textField and button component. This function is used by:
// * M3.StdForms.getNumValue()
// * M3.StdForms.getStrValue()
// If **curr_value** is not empty the textField will be filled with this value.
// Type must be:
// * STR - for string input
// * NUM - for numeric input

M3.StdForms.getValue = function(curr_value, type){
	
	// create components
	var mv_win = Ti.UI.createWindow({
		backgroundColor:'white',
		height:'40%',
		width:'85%',
		top:'5%',
		borderRadius:10,
		borderColor:'gray',
		borderWidth:5
	});
	
	var mv_lbl = Ti.UI.createLabel({
		text:'Unesi željenu vrijednost:',
		top:'12%',
		color:'black',
		left:'12%',
		font:{fontSize:'8pt', fontWeight:'bold'}	
	});
	
	var mv_text = Ti.UI.createTextField({
		top:'35%',
		left:'10%',
		right:'10%',
		height:'25%'
	});
	
	// place the `curr_value` into textField control if not null
	if (curr_value != null) {
		mv_text.value = curr_value.toString();
	};
	
	var btn_ok = Ti.UI.createButton({
		top:'70%',
		left:'10%',
		width:'30%',
		height:'25%',
		title:'Uredu'
	});
	
	var btn_cancel = Ti.UI.createButton({
		top:'70%',
		right:'10%',
		width:'30%',
		height:'25%',
		title:'Odustani'
	});
	
	// add controls to the window
	mv_win.add(mv_lbl);
	mv_win.add(mv_text);
	mv_win.add(btn_ok);
	mv_win.add(btn_cancel);
	
	mv_text.addEventListener("return", function(){
		mv_text.blur();
		btn_ok.focus();
	});
	
	btn_ok.addEventListener("click", function(){
		
		mv_text.blur();
		
		switch (type)
		{
			// If type is numeric, check numeric value and set the `item_value`
			// and close the window
			case "NUM":
				if(mv_text.value != '' && M3.Util.Num.isValidNum(mv_text.value) ){
					mv_win.item_value = mv_text.value;
				};
				mv_win.close();
				break;
			
			// If type is string, set the `item_value`
			// and close the window
			case "STR":
				
				if(mv_text.value != ''){
					mv_win.item_value = mv_text.value;
				};
				mv_win.close();
				break;
		};
		
	});

	btn_cancel.addEventListener("click", function(){
		
		mv_win.item_value = '0';
		
		mv_text.blur();
		mv_win.close();
	});
	
	mv_text.focus();
	mv_win.open();
	
	return mv_win;

};
