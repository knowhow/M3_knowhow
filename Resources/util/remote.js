
// Main remote methode's. Here are the logic of http request's, send's, etc...

// This is the unique namespace for remote method's
var boRemote = {};

// Adding synchro into namespace...
boRemote.synchro = {};


//var server_url = 'http://192.168.47.119:8080';
var server_url = 'http://192.168.45.147:8080';


// Synchronize articles, main function 
boRemote.synchro.synhroArticles = function() {
	
	var data;
	// url to send request
	var url = server_url + '/articles';
	
	// create http client
	var xhr = Ti.Network.createHTTPClient();
		
	xhr.onload = function()
	{	
		// retrieve data into JSON object	
 		data = JSON.parse(this.responseText);	
		
		if(data != null){

			// remove all articles from db
			boDb.deleteArticles();
		
			// insert data into db
			boDb.insertIntoArticles(data);
		
			// check for data inserted with server data
			var cnt = boDb.getArticleCount();
		
			// DEBUG msg
			if( cnt == data.length ){
				alert('Uspješno importovao ' + cnt.toString() + ' zapisa!');
			};
			
			// fire event and run 'boRemote.synchro.synhroArticleImages()'
			Titanium.fireEvent("articlesSynchronized");
			
		};
   	
   	};
		
	xhr.open('GET', url);
	xhr.send();

};


// Synchronize images from http server...
boRemote.synchro.synhroArticleImages = function() {
	
	// Get article JSON
	var art_data = boCodes.Articles.getArticles();
	
	// per example: http://localhost:3333/article_pict/3013
	var _url = server_url + '/article_image/';
	var _srv_url;
	var _id;
	
	// Simply loop through the article data
	for (var i=0; i < art_data.length; i++) {

		// { _id }
		// This will be an article id variable
		_id = art_data[i].id;
	
		// { _srv_url } 
		// This will be a complete server url for creating http server and get request
		_srv_url = _url + _id;	  
		
		// save image to local storage of the phone
		boRemote.synchro.saveImageToDevice( _id, _srv_url );
	};
			
};


// Get image from http server and update into local table "articles"
boRemote.synchro.saveImageIntoTable = function( _article_id, _url ) {

	// Create http server
	var xhr = Ti.Network.createHTTPClient();
	var data;
	
	xhr.onload = function()
	{		
 		// Retrieve data from http server
 		data = this.responseData;
 			
 		// Debug info
 		//Ti.API.info("->" + _article_id + " data: " + Ti.Utils.base64encode(data));
 			
 		if (data != null) {
 			// Update data into blob field of local table "articles"
 			boDb.updateArticleImage( _article_id, data ); 
 		};
 			   	
   	};
		
	xhr.open('GET', _url);
	xhr.send();	
	
};


// Get image from http server and save to local storage of android device
boRemote.synchro.saveImageToDevice = function( _article_id, _url ) {

	// Create http server
	var xhr = Ti.Network.createHTTPClient();
	var data;
	
	xhr.onload = function()
	{		
 		// Retrieve data from http server
 		data = this.responseData;
 					
 		if (data != null) {
 		
 			var s_file = Ti.Filesystem.getFile(Ti.App.current_images_dir, _article_id + '.jpg');
 			
 			// Create file only if not exist
 			if(!s_file.exist){
 				s_file.write(data);
 			};
 			
 			// debug info
 			//Ti.API.info("->" + _article_id + " data: " + data + " size: " + s_file.size );
  
 		};					
   	};
		
	xhr.open('GET', _url);
	xhr.send();	
	
};
