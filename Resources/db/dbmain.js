(function() {
	
	boMobileAppLib.db = {};	
	
	boMobileAppLib.db.getLoginData = function() {
		var acc = JSON.parse('{"userdata":[{"name":"vsasa","pwd":"11"},{"name":"bjasko","pwd":"22"},{"name":"hernad","pwd":"33"}]}');
		return acc;
	};

	boMobileAppLib.db.getArticlesData = function() {
		var art = JSON.parse('{"articles":[{"id":"3000","desc":"Drina jedina","pict":"drina01.jpg"},'+
			'{"id":"3001","desc":"Drina light","pict":"drina02.jpg"},' +
			'{"id":"3002","desc":"Tigra","pict":"tigra01.jpg"},' +
			'{"id":"3003","desc":"Drina super light","pict":"drina03.jpg"}]}' );
		return art;
	};

	
})();
