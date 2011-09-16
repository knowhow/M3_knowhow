var boUtil = {};
	
boUtil.str = {};
boUtil.date = {};
boUtil.math = {};
	
// rPad string
boUtil.str.rPad = function( input_string, length, padding_character ) {
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
boUtil.str.lPad = function( input_string, length, padding_character ) {
	var s = input_string;
	if(padding_character == null){
		padding_character = " ";
	};
    while (s.length < length){
        s = padding_character + s;
    };
    return s;
}

// returns new row 
boUtil.str.newRow = function(count){
	var s = "";
	if(count == null){
		count = 1;
	};
	for (var i=0; i < count; i++) {
	  s += "\n";
	};
	return s;
};
	
	
boUtil.date.getCurrentDate = function () {
		
	var currentTime = new Date();
	var month = currentTime.getMonth();
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
 
	return day + "." + month + "." + year;
 
};

// get ctrl position based on device screen proportion
boUtil.math.getControlPostitionWidth = function( percentage ) {
	// standard device proportions
	var dev_widht = Ti.Platform.displayCaps.platformWidth;
	var result = dev_widht * (percentage / 100);
	return result;
};

// get ctrl position based on device screen proportion
boUtil.math.getControlPostitionHeight = function( percentage ) {
	// standard device proportions
	var dev_height = Ti.Platform.displayCaps.platformHeight;
	var result = dev_height * (percentage / 100);
	return result;
};

