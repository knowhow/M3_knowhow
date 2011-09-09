var boDb = {};	
	
boDb.getUsersData = function() {
	var acc = JSON.parse('{"userdata":[{"name":"vsasa","pwd":"11"},{"name":"bjasko","pwd":"22"},{"name":"hernad","pwd":"33"}]}');
	return acc;
};

// get articles data JSON
boDb.getArticlesData = function() {
	var art = JSON.parse('{"articles":[{"id":"3013","desc":"Drina MP Sarajevska","price":"18.803","pict":"3013.jpg"},'+
		'{"id":"3014","desc":"Drina TP lights","price":"21.368","pict":"3014.jpg"},' +
		'{"id":"3015","desc":"Drina TP jedina","price":"21.368","pict":"3015.jpg"},' +
		'{"id":"3016","desc":"Drina TP super lights","price":"21.368","pict":"3016.jpg"},' +
		'{"id":"3017","desc":"Tigra MP soft","price":"18.803","pict":"3017.jpg"},' +
		'{"id":"3018","desc":"Aura extra","price":"25.641","pict":"3018.jpg"},' +
		'{"id":"3019","desc":"Aura lights","price":"25.641","pict":"3019.jpg"},' +
		'{"id":"3024","desc":"Aura super lights","price":"25.641","pict":"3024.jpg"},' +
		'{"id":"3057","desc":"Osam (8)","price":"21.368","pict":"3057.jpg"},' +
		'{"id":"3070","desc":"Drina jedina zlatna","price":"21.368","pict":"3070.jpg"},' +
		'{"id":"3076","desc":"Code","price":"18.803","pict":"3076.jpg"},' +
		'{"id":"3091","desc":"Royal blue","price":"21.368","pict":"3091.jpg"},' +
		'{"id":"3092","desc":"Royal lights","price":"21.368","pict":"3092.jpg"},' +
		'{"id":"3095","desc":"Code red","price":"21.368","pict":"3095.jpg"},' +
		'{"id":"3096","desc":"Code sky","price":"0","pict":"3096.jpg"}]}' );
	return art;
};

// get customer data JSON
boDb.getCustomersData = function() {
	var cust = JSON.parse(
		'{"customers":[{"id":"1","desc":"Firma A","addr":"Ulica 1","city":"Zenica","postcode":"72000","tel":"032000000","user":"vsasa","lat":"44.20408666133","lon":"17.90695884"},'+
		'{"id":"2","desc":"Firma B","addr":"Ulica 2","city":"Zenica","postcode":"72000","tel":"032100000","user":"vsasa","lat":"43.915886","lon":"17.679076"},' +
		'{"id":"3","desc":"Firma C","addr":"Ulica 3","city":"Sarajevo","postcode":"71000","tel":"032110000","user":"vsasa","lat":"43.915886","lon":"17.679076"},' +
		'{"id":"4","desc":"Firma D","addr":"Ulica 4","city":"Sarajevo","postcode":"71000","tel":"032111000","user":"hernad","lat":"43.915886","lon":"17.679076"},' +
		'{"id":"5","desc":"Firma E","addr":"Ulica 5","city":"Sarajevo","postcode":"71000","tel":"032220000","user":"vsasa","lat":"43.915886","lon":"17.679076"},' +
		'{"id":"6","desc":"Firma F","addr":"Ulica 6","city":"Konjic","postcode":"75000","tel":"032555000","user":"vsasa","lat":"43.915886","lon":"17.679076"}]}' );
	return cust;
};

