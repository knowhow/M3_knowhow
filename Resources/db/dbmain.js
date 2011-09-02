(function() {
	
	boMobileAppLib.db = {};	
	
	boMobileAppLib.db.getLoginData = function() {
		var acc = JSON.parse('[{"name":"vsasa","pwd":"11"},{"name":"bjasko","pwd":"22"},{"name":"hernad","pwd":"33"}]');
		return acc;
	};

	boMobileAppLib.db.getArticlesData = function() {
		var art = JSON.parse('[{"id":"3000","desc":"Drina jedina","pict":"pict/drina01.jpg"},'+
			'{"id":"3001","desc":"Drina light","pict":"pict/drina02.jpg"},' +
			'{"id":"3002","desc":"Drina super light","pict":"pict/drina03.jpg"}]' );
		return art;
	};

	
})();
