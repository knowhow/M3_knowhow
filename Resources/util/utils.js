var boUtil = {};
	
boUtil.num = {};
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


// check for valid num
boUtil.num.isValidNum = function(val){
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
