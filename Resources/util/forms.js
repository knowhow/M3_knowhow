var boUtilForms = {};

boUtilForms.getNumValue = function(curr_value){
	return boUtilForms.getValue(curr_value, 'NUM');
};

boUtilForms.getStrValue = function(curr_value){
	return boUtilForms.getValue(curr_value, 'STR');
};

// get value in box
boUtilForms.getValue = function(curr_value, type){
	
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
		//keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
	});
	
	
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
			case "NUM":
				
				if(mv_text.value != '' && boUtil.num.isValidNum(mv_text.value) ){
					mv_win.item_value = mv_text.value;
				};
				mv_win.close();
				break;
			
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
