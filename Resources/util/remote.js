var boRemote = {};
var server_url = 'http://192.168.47.119:8080';

boRemote.synchro = {};

// synchronize articles from remote server
boRemote.synchro.synhroArticles = function() {
	
	var data;
	var url = server_url + '/articles';
	
	var xhr = Ti.Network.createHTTPClient();
		
	xhr.onload = function()
	{		
 		data = JSON.parse(this.responseText);	
		
		if(data != null){

			// first remove all articles from db
			boDb.deleteArticles();
		
			// insert data into db
			boDb.insertIntoArticles(data);
		
			// check for data inserted with server data
			var cnt = boDb.getArticleCount();
		
			// DEBUG msg
			if( cnt == data.length ){
				alert('Uspješno importovao ' + cnt.toString() + ' zapisa!');
			};
			
			Titanium.fireEvent("articlesSynchronized");
			
		};
   	
   	};
		
	xhr.open('GET', url);
	xhr.send();

};


// synchronize images...
boRemote.synchro.synhroArticleImages = function() {
	
	var art_data = boCodes.Articles.getArticles();
	
	// example: http://localhost:3333/article_pict/3013
	var _url = server_url + '/article_image/';
	var _srv_url;
	var _id;
	
	// loop through article data
	for (var i=0; i < art_data.length; i++) {

		// set variables...
		_id = art_data[i].id;
	
		// add article id to url
		_srv_url = _url + _id;	  
		
		// run synchronize of image
		boRemote.synchro.synchroImageOfArticle( _id, _srv_url );

	};
			
};


// synchronize image of one article
boRemote.synchro.synchroImageOfArticle = function( _article_id, _url ) {

	// create server
	var xhr = Ti.Network.createHTTPClient();
	var data;
	
	xhr.onload = function()
	{		
 		// retrieve data
 		data = this.responseData;
 			
 		// convert TiBlob to base64 string
 		data = Ti.Utils.base64encode(data);
 			
 		Ti.API.info("->" + _article_id + " data: " + Ti.Utils.base64encode(data));
 			
 		if (data != null) {
 			boDb.updateArticleImage( _article_id, data ); 
 		};
 			
 		//Titanium.fireEvent('articleImagesSynchronized');   	
   	
   	};
		
	xhr.open('GET', _url);
	xhr.send();	
	
};
