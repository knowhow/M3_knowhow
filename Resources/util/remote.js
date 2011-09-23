var boRemote = {};
var server_url = 'http://192.168.47.119:3333';

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
			
		};
   	
   	};
		
	xhr.open('GET', url);
	xhr.send();

};


// synchronize pictures...
boRemote.synchro.synhroArticleImages = function() {
	
	var data;
	var art_data = boCodes.Articles.getArticleData();
	
	// example: http://localhost:3333/article_pict/3013
	var url = server_url + '/article_image/';
	var xhr = Ti.Network.createHTTPClient();
	var _id;
	
	// loop through article data
	for (var i=0; i < art_data.length; i++) {
		
		// set variables...
		_id = art_data[i].id;
	
		// add article id to url
		var tmp_url = url + _id;	  
		
		xhr.onload = function()
		{		
 			data = this.responseText;
 			boDb.updateArticleImage( _id, data ); 
 			   	
   		};
		
		xhr.open('GET', tmp_url);
		xhr.send();
	
	};
			
};
